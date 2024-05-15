import { AppRegistry, Image } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import Navbar from './components/Overlay/Navbar';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from './constants/themes';
import ParkSense from './components/Overlay/ParkSense';
import { startTransition } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import * as Keychain from "react-native-keychain";
import { useAuth } from './AuthProvider';

import { AuthContext } from "./auth-context"

import {
    useFonts,
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import LoginPage from './pages/LoginPage';
import { View } from 'react-native';
import AppLoading from 'expo-app-loading';
import HomePage from './pages/HomePage';
import QRcode from './pages/QRcode';
import SessionPage from './pages/SessionPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {

    const { token, login, logout, userId } = useAuth();

    const Stack = createNativeStackNavigator();

    let [fontsLoaded] = useFonts({
        Quicksand_300Light,
        Quicksand_400Regular,
        Quicksand_500Medium,
        Quicksand_600SemiBold,
        Quicksand_700Bold,
    });

    // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    // useDeferredValue(userName)
    // const { isLoggedIn } = useAuth();

    // React.useEffect(() => {
    //     (async () => {
    //         try {
    //             const credentials = await Keychain.getGenericPassword();
    //             if (credentials) {
    //                 setIsLoggedIn(true);
    //             } else {
    //                 console.log("No credentials stored");
    //             }
    //         } catch (error) {
    //             console.log("Keychain couldn't be accessed!", error);
    //         }
    //     })();
    // }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    if (!fontsLoaded) {
        return null;
        // return (<AppLoading/>); // Or render a loading indicator
    }
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                login: login,
                logout: logout,
            }}
        >
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: true,
                        headerTitle: props => <ParkSense {...props} />, // Render ParkSense component in headerTitle
                        headerTitleAlign: 'left',
                    }}
                >
                    {!token ?
                        // <PaperProvider theme={theme}>
                        <Stack.Screen name="LoginPage" component={LoginPage}
                        // options={{ headerTitle: (props) => <ParkSense {...props} /> }} 
                        />
                        // </PaperProvider>
                        :
                        // <PaperProvider theme={theme}>
                        <>
                            <Stack.Screen name="HomePage" component={HomePage} options={{ headerTitleAlign: 'center' }} />
                            <Stack.Screen name="ProfilePage" component={ProfilePage} />
                            <Stack.Screen name="QRcode" component={QRcode} />
                            <Stack.Screen name="SessionPage" component={SessionPage} />
                            {/* <Navbar /> */}
                        </>
                        // </PaperProvider>

                    }
                </Stack.Navigator>

            </NavigationContainer >
        </AuthContext.Provider>
    );
}

AppRegistry.registerComponent(appName, () => App);