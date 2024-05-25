import React from 'react'
import { ScrollView, View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import CurrentSession from '../components/Session/CurrentSession'
import { theme } from '../constants/themes'
import { useTheme } from 'react-native-paper';
import ParkSense from '../components/Overlay/ParkSense'

const HomePage = () => {

    return (
        <>
            <ScrollView style={{ backgroundColor: theme.colors.white }}>

                <View style={{ marginHorizontal: 10, marginBottom: 20, marginTop: 30 }}>
                    <Card>
                        <Card.Title
                            title="Locate a Parking Lot"
                            titleStyle={{
                                fontFamily: 'Quicksand_700Bold',
                                fontSize: 20
                            }} />
                        <Card.Content>
                            <Text style={{
                                fontFamily: 'Quicksand_500Medium'
                            }}>Insert map here Insert map here Insert map here Insert map here Insert map here Insert map here Insert map here Insert map here </Text>
                        </Card.Content>
                    </Card>
                </View>

                
            </ScrollView>

        </>
    )
}

export default HomePage