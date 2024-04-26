import * as React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { Card, Provider, Appbar, Title, Paragraph, BottomNavigation } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CurrentSession from '../components/Session/CurrentSession';
import PastSession from '../components/Session/PastSession';
import SessionsHeader from '../components/Session/SessionsHeader';
import { theme } from '../constants/themes'

const SessionPage = () => {

    return (
        <View style={{ backgroundColor: theme.colors.white }}>
            <SessionsHeader />
            <ScrollView>
                <CurrentSession props={{ CarRegNo: 'ABC-123', InTime: new Date(), DayIn: '1 Jan 2024', LotName: 'IBA Main Campus' }} />
                <PastSession props={{ CarRegNo: 'ABC-123', InTime: new Date(), DayIn: '1 Jan 2024', OutTime: new Date(), DayOut: '2 Jan 2024', LotName: 'IBA Main Campus' }} />
                <PastSession props={{ CarRegNo: 'XYZ-123', InTime: new Date(), DayIn: '2 Jan 2024', OutTime: new Date(), DayOut: '21 Jan 2024', LotName: 'Regent Plaza' }} />
                <PastSession props={{ CarRegNo: 'ABC-123', InTime: new Date(), DayIn: '1 Jan 2024', OutTime: new Date(), DayOut: '2 Jan 2024', LotName: 'IBA Main Campus' }} />
                <PastSession props={{ CarRegNo: 'XYZ-123', InTime: new Date(), DayIn: '2 Jan 2024', OutTime: new Date(), DayOut: '21 Jan 2024', LotName: 'Lucky One Mall' }} />
            </ScrollView>
        </View>
    );
};

export default SessionPage;