import React, { useState } from 'react';
import { View, Pressable, Platform, StyleSheet, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateCalendar({value, onChange}){
    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const selectDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setSelectedDate(currentDate);
        onChange(currentDate);
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={() => setShow(true)}>
                <Text>{ selectedDate ? selectedDate.toLocaleDateString() : "Fecha De Nacimiento" }</Text>
                {show && (
                    <DateTimePicker
                        value={value}
                        mode="date"
                        display="default"
                        onChange={selectDate}
                    />
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 45,
        borderRadius: 15,
        backgroundColor: '#d0d3d4',
        justifyContent: 'center',
        marginBottom: 10,
    },

    button: {
        paddingHorizontal: 15,
    }
})