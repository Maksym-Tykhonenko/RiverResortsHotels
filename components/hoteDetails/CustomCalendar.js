import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Calendar, LocalConfig} from 'react-native-calendars';
import {COLORS} from '../../constant/colors';

const CustomCalendar = () => {
  const [selected, setSelected] = useState('');

  return (
    <View style={{marginTop: 10, padding: 10, marginBottom: 40}}>
      <Text style={{color: 'white', marginBottom: 10}}>Find Required Date</Text>
      <Calendar
        theme={{
          calendarBackground: COLORS.white + 10,
          textDisabledColor: '#d9e',
          // textSectionTitleColor: '#b6c1cd',
          backgroundColor: COLORS.activeTind,
          todayTextColor: 'red',
          dayTextColor: COLORS.white,
          borderRadius: 20,
          padding: 20,
          monthTextColor: COLORS.activeTind,
        }}
        style={{
          borderRadius: 20,
          backgroundColor: COLORS.glassWhite,
          borderBlockColor: COLORS.white,
          height: 350,
          borderWidth: 1,
          borderColor: 'gray',
          height: 350,
          paddingBottom: 10,
        }}
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: 'orange',
          },
        }}
      />
    </View>
  );
};

export default CustomCalendar;

const styles = StyleSheet.create({});
