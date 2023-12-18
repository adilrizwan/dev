import { ColorModeContext, useMode } from "./constants/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import GuestUser from "./components/GuestUser";
import LoggedUser from "./components/LoggedUser";
import Homepage from "./scenes/global/Homepage";
import RegisterPage from "./scenes/global/RegisterPage";
import RegisterAdmin from "./scenes/global/RegisterAdmin";
import LoginPage from "./scenes/global/LoginPage";
import NotFound from "./scenes/global/NotFound";
import Footer from "./components/Footer";

function App() {
  const [theme, colorMode] = useMode();
  const [user] = useState(localStorage.getItem("userRole"));

  return (
    <ColorModeContext.Provider value={colorMode}>
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
                <Route path="/admin/register" element={<RegisterAdmin />} />
                {/* <Route
                path="/register/applicant"
                element={<RegisterApplicant />}
              />
              <Route path="/register/employer" element={<RegisterEmployer />} /> */}
                <Route path="/*" element={<NotFound />} />
              </Routes>
            ) : user === "APPLICANT" ? (
              <Routes>
                <Route path="/" element={<Homepage />}></Route>
                {/* <Route
                path="/applicant/dashboard"
                element={<DashboardApplicant />}
              ></Route>
              <Route path="/*" element={<NotFound />} /> */}
              </Routes>
            ) : user === "EMPLOYER" ? (
              <Routes>
                <Route path="/" element={<Homepage />}></Route>
                {/* <Route
                path="/employer/dashboard"
                element={<DashboardEmployer />}
              ></Route> */}
                {/* <Route path="/*" element={<NotFound />} /> */}
              </Routes>
            ) : user === "ADMIN" ? (
              <Routes>
                <Route path="/" element={<Homepage />}></Route>
                {/* <Route
                path="/admin/dashboard"
                element={<DashboardAdmin />}
              ></Route> */}
                {/* <Route path="/*" element={<NotFound />} /> */}
              </Routes>
            ) : (
              // <NotFound></NotFound>
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
