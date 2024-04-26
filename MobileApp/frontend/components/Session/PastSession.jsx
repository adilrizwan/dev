import React from 'react'
import { View } from 'react-native'
import { Divider, Text, Card, Icon, MD3Colors, } from 'react-native-paper'

const PastSession = ({ props }) => {

    const head = "Quicksand_700Bold"
    const content = "Quicksand_600SemiBold"

    const { CarRegNo, InTime, DayIn, OutTime, DayOut, LotName } = props

    const InHour = (InTime.getHours())
    const InMin = (InTime.getMinutes())
    const InSec = (InTime.getSeconds())

    const OutHour = (OutTime.getHours())
    const OutMin = (OutTime.getMinutes())
    const OutSec = (OutTime.getSeconds())

    const margin = 10
    return (
        <View>
            <Card style={{ paddingHorizontal: margin, paddingVertical: margin * 1.8, margin: margin }}>
                <View style={{ flexDirection: 'row', marginHorizontal: 3 }}>
                    <Text
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        style={{
                            marginRight: 'auto',
                            maxWidth: '70%',
                            minWidth: '60%',
                            fontFamily: head,
                            fontSize: 18
                        }}>
                        {LotName}
                    </Text>
                    <Text style={{
                        marginLeft: 'auto',
                        fontFamily: content,
                        fontSize: 18
                    }}>
                        $ 1.05
                    </Text>
                </View>
                <View style={{ marginVertical: margin, }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon
                            source="arrow-right-thick"
                            color='green'
                            size={25}
                        />
                        <Text style={{
                            fontFamily: content,
                            fontSize: 14
                        }}>
                            {((InHour) % 12 || 12) < 10 ? '0' : ''}{((InHour) % 12 || 12)}{":"}{InMin < 10 ? '0' : ''}{InMin}{InHour > 12 ? ' PM ' : ' AM '}{DayIn}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon
                            source="arrow-left-thick"
                            color='#bb0000'
                            size={25}
                        />
                        <Text style={{
                            fontFamily: content,
                            fontSize: 14
                        }}>
                            {((OutHour) % 12 || 12) < 10 ? '0' : ''}{((OutHour) % 12 || 12)}{":"}{OutMin < 10 ? '0' : ''}{OutMin}{OutHour > 12 ? ' PM ' : ' AM '}{DayOut}
                        </Text>
                    </View>
                </View>
            </Card>

        </View>
    )
}

export default PastSession