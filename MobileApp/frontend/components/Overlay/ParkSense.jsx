import React from 'react'
import { Appbar, Divider } from 'react-native-paper';
import { Image, View } from 'react-native';
import { theme } from '../../constants/themes';

const ParkSense = () => {
    return (
        <View>
            <Appbar.Header style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: theme.colors.white
            }}>
                {/* <Appbar.Content title="ParkSense" style={{ alignItems: 'center' }} /> */}
                <Image
                    source={require('../../assets/parksense_logo.png')} // Provide the path to your image
                    style={{
                        resizeMode: 'center',
                        height: 100,
                        width: 250,
                        marginBottom:20
                    }} />
            </Appbar.Header>
            <Divider style={{height:0.4}}/>
        </View>

    )
}

export default ParkSense