import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SessionStart from '../components/QR/SessionStart';
import Scanner from '../components/QR/Scanner';
import Scanner1 from '../components/QR/Scanner1';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';

const QRcode = () => {

    const Stack = createNativeStackNavigator();

    function CustomNavigationBar({ navigation, route, options, back }) {
        const title = getHeaderTitle(options, route.name);

        return (
            <Appbar.Header>
                {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
                <Appbar.Content title={title} titleStyle={{fontFamily:"Quicksand_700Bold"}}/>
            </Appbar.Header>
        );
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            marginTop: -30
        }}>
            <Stack.Navigator initialRouteName="QR Code Scanner" screenOptions={{
                header: (props) => <CustomNavigationBar {...props} />,
            }}>
                <Stack.Screen name="QR Code Scanner" component={Scanner} />
                <Stack.Screen name="SessionStart" component={SessionStart} />
            </Stack.Navigator>
        </View>

    );


}
export default QRcode