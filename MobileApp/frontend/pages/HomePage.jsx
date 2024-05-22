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

                <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between', }}>
                    <Card style={{ flex: 1, marginHorizontal: 10 }}>
                        <Card.Title
                            variant="titleLarge"
                            title="Data #1"
                            titleStyle={{
                                fontFamily: 'Quicksand_600SemiBold'
                            }}
                        />
                        <Card.Content>
                            <Text
                                style={{
                                    fontFamily: 'Quicksand_400Regular'
                                }}>
                                insert graph chart or sum thing idk
                            </Text>
                        </Card.Content>
                    </Card>
                    <Card style={{ flex: 1, marginHorizontal: 10 }}>
                        <Card.Title
                            // variant="titleLarge"
                            title="Data #2"
                            titleStyle={{
                                fontFamily: 'Quicksand_600SemiBold'
                            }} />
                        <Card.Content>
                            <Text
                                // variant="bodyMedium"
                                style={{
                                    fontFamily: 'Quicksand_400Regular'
                                }}>
                                insert graph chart or sum thing idk
                            </Text>
                        </Card.Content>
                    </Card>
                </View>

                <View style={{ margin: 10, }}>
                    <Card >
                        <Card.Title
                            title="Data #3"
                            // titleVariant='titleLarge'
                            titleStyle={{
                                fontFamily: 'Quicksand_600SemiBold'
                            }}
                        />
                        <Card.Content>
                            <Text
                                // variant="bodyMedium"
                                style={{
                                    fontFamily: 'Quicksand_400Regular'
                                }}>
                                insert graph chart or sum thing idk
                                insert graph chart or sum thing idk
                                insert graph chart or sum thing idk
                            </Text>
                        </Card.Content>
                    </Card>
                </View>

                <View style={{ marginTop: 22, marginHorizontal: 10 }}>
                    <Text
                        // variant='titleLarge'
                        style={{
                            fontFamily: 'Quicksand_700Bold',
                            fontSize: 20
                        }}>
                        Active Sessions
                    </Text>
                </View>

                {/* <CurrentSession props={{ CarRegNo: 'ABC-123', InTime: new Date(), DayIn: '1 Jan 2024', LotName: 'IBA Main Campus' }} /> */}

                <Text style={{ textAlign: 'right', marginHorizontal: 10, fontFamily: 'Quicksand_400Regular' }}
                // variant='bodyLarge'
                >
                    See All --{`>`}
                </Text>
            </ScrollView>

        </>
    )
}

export default HomePage