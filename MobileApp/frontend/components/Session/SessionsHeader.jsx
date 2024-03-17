import * as React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

const SessionsHeader = () => {
    
    return (
        <View style={{ marginBottom: 0, marginTop: -30 }}>
            <Appbar.Header style={{ elevation: 2 }}>
                <Appbar.Content title="Session History" titleStyle={{
                    fontFamily: 'Quicksand_700Bold',
                    fontSize: 22
                }}
                />
                {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
                {/* <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
            </Appbar.Header>
        </View>

    );
};

export default SessionsHeader;