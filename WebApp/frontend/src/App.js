import { ColorModeContext, useMode } from "./constants/theme";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState, useEffect } from "react";
import GuestUser from "./components/GuestUser";
import LoggedUser from "./components/LoggedUser";
import Homepage from "./scenes/global/Homepage";
import RegisterPage from "./scenes/global/RegisterPage";
import AdminRegister from "./scenes/dashboard/Admin/AdminRegister";
import CarRegister from "./scenes/dashboard/CarOwner/CarRegister";
import LotRegister from "./scenes/dashboard/LotOwner/LotRegister";
import LoginPage from "./scenes/global/LoginPage";
import NotFound from "./scenes/global/NotFound";
import CarDashboard from "./scenes/dashboard/CarOwner/CarDashboard";
import LotDashboard from "./scenes/dashboard/LotOwner/LotDashboard";
import AdminDashboard from "./scenes/dashboard/Admin/AdminDashboard";
import Footer from "./components/Footer";

function App() {
  const [theme, { toggleColorMode }] = useMode();
  const [user] = useState(localStorage.getItem("userRole"));

  useEffect(() => {
    const storedColorMode = sessionStorage.getItem("colorMode");
    if (!storedColorMode) {
      toggleColorMode();
    }
  }, [toggleColorMode]);

  return (
    <ColorModeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <Router> */}
        <div className="container">
          {user ? <LoggedUser></LoggedUser> : <GuestUser></GuestUser>}
          {!user ? (
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              <Route path="/car/register" element={<CarRegister />} />
              <Route path="/lot/register" element={<LotRegister />} />

              <Route path="/*" element={<NotFound />} />
            </Routes>
          ) : user === "CAROWNER" ? (
            <Routes>
              <Route path="/car/dashboard" element={<CarDashboard />}></Route>
              <Route path="/*" element={<NotFound />} />
            </Routes>
          ) : user === "LOTOWNER" ? (
            <Routes>
              <Route path="/lot/dashboard" element={<LotDashboard />}></Route>
              <Route path="/*" element={<NotFound />} />
            </Routes>
          ) : user === "ADMIN" ? (
            <Routes>
              <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
              ></Route>
              <Route path="/*" element={<NotFound />} />
            </Routes>
          ) : (
            <Homepage></Homepage>
          )}
          <Footer></Footer>
        </div>
        {/* </Router> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
