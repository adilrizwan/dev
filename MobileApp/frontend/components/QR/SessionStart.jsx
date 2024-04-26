import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, RadioButton, Text } from 'react-native-paper';
import { theme } from '../../constants/themes';

const SessionStart = ({ route, navigation }) => {

    const { result, carList } = { result: route.params.result, carList: ["au", "kaka"] }
    const [value, setValue] = React.useState('');
    const [buttonState, setbuttonState] = React.useState('disbled');

    const margin = 10

    return (
        <ScrollView style={{ backgroundColor: theme.colors.white }}>

            <Card style={{ paddingHorizontal: margin, paddingVertical: margin * 1.8, margin: margin }}>

                <View>
                    <Text style={{
                        fontFamily: "Quicksand_700Bold",
                        fontSize: 23
                    }}>
                        Select Car
                    </Text>
                </View>

                <View>
                    <RadioButton.Group onValueChange={newValue => { setValue(newValue); setbuttonState('contained') }} value={value}>
                        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                            <RadioButton style={{ marginRight: 'auto' }} value="car 1" />
                            <Text style={{
                                fontFamily: "Quicksand_500Medium",
                                fontSize: 18
                            }}
                            >
                                car 1
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <RadioButton style={{ marginLeft: 'auto' }} value="car 2" />
                            <Text style={{
                                fontFamily: "Quicksand_500Medium",
                                fontSize: 18
                            }}>
                                car 2
                            </Text>
                        </View>
                    </RadioButton.Group>
                </View>

            </Card>

            <Card style={{ paddingHorizontal: margin, paddingVertical: margin * 1.8, margin: margin }}>

                <View>
                    <Text style={{
                        fontFamily: "Quicksand_700Bold",
                        fontSize: 23
                    }}>
                        Lot information
                    </Text>
                    <Text style={{
                        fontFamily: "Quicksand_500Medium",
                        fontSize: 18
                    }}
                    >
                        name
                    </Text>
                    <Text style={{
                        fontFamily: "Quicksand_500Medium",
                        fontSize: 18
                    }}
                    >
                        location?
                    </Text>
                    <Text style={{
                        fontFamily: "Quicksand_500Medium",
                        fontSize: 18
                    }}
                    >
                        {result}
                        {console.log(route)}
                    </Text>
                    <Text style={{
                        fontFamily: "Quicksand_500Medium",
                        fontSize: 18
                    }}
                    >
                        zone
                    </Text>
                    <Text style={{
                        fontFamily: "Quicksand_500Medium",
                        fontSize: 18
                    }}
                    >
                        capacity
                    </Text>
                </View>

            </Card>

            <View style={{ flexDirection: 'row', justifyContent: 'center', margin: margin }}>
                <Button mode={buttonState} onPress={() => console.log('Pressed')} style={{ marginLeft: 'auto', }}>
                    <Text style={{ fontFamily: "Quicksand_500Medium", color: theme.colors.onPrimary }}>
                        Start Session
                    </Text>
                </Button>
            </View>

        </ScrollView>

    );
};

export default SessionStart;    