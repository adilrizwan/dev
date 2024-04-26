import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Scanner1 = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [result, setResult] = useState("null");

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const scanHandler = ({ type, data }) => {
        setTimeout(() => {
            setScanned(true);
            setResult(data);
            console.log(data);
            navigation.navigate('SessionStart', {
                result: data,
            });
        }, 1000);
    };

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
        barcodeGuideline: {
            width: 300, // Adjust for desired size
            height: 300, // Adjust for desired size
            borderWidth: 5,
            borderColor: 'white',
            borderRadius: 20,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 'auto',
            marginBottom: 'auto'
        },
    });


    if (!hasPermission) {
        // ... Handle permission request ...
        return <View />;
    }

    // Note: The 'facing' prop is not available in expo-camera
    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                onBarCodeScanned={scanned ? undefined : scanHandler}
            >
                <View style={styles.barcodeGuideline} />
            </Camera>
        </View>
    );
};

export default Scanner1
