import React from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera/next';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Scanner = ({ navigation }) => {

    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = React.useState(false);
    const [result, setResult] = React.useState("null");

    const scanHandler = ({ data }) => {
        setTimeout(() => {
            // setScanned(true);
            // setResult(data)
            console.log(data);
            navigation.navigate('SessionStart', {
                result: data,
            });
        }, 1000);

        // navigation.navigate('SessionStart', {
        //     result: "ur mom",
        // });
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
        },
        camera: {
            flex: 1,
        },
        buttonContainer: {
            flex: 2,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            margin: 2,
        },
        button: {
            flex: 1,
            alignSelf: 'flex-end',
            alignItems: 'center',
        },
        text: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
        },
    });

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing='back'
                barCodeScannerSettings={{
                    barCodeTypes: ["qr"],
                }}
                onBarcodeScanned={scanned ? undefined : scanHandler}
            >

            </CameraView>
        </View>
    )
}

export default Scanner