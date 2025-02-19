import { Keyboard, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import SU_Button from "../components/sign_up_button";
import { useState } from "react";
import Text_Field from "../components/text_field";
import DateCalendar from "../components/dateCalendar";

export default function ListView({ route }) {
    const listTitle = route.params?.list.title;
    const [modalVisible, setModalVisible] = useState(false);
    const [expectedDate, setExpectedDate] = useState(new Date());

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
            }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView 
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                <Text_Field text='Nombre'/>
                                <Text_Field text='Descripción' multiline={true} style={{height: 100}}/>
                                <DateCalendar text="Fecha para cumplir" value={expectedDate}/>
                                
                                <View style={styles.buttonContainer}>
                                    <SU_Button name='Aceptar' onPress={() => setModalVisible(!modalVisible)}/>
                                </View>
                            </View>
                
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </Modal>
            <Text style={styles.title}>{listTitle}</Text>
            <View>
                <SU_Button name='New Element' onPress={() => setModalVisible(true)}/>
            </View>
        </View>
    );
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    title:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    
    modalContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },

    modalView:{
        backgroundColor: '#fff',
        width: '80%',
        height: '45%',
        padding: 15,
        borderRadius: 20,
    },

    buttonContainer:{
        marginTop: 25,
    }
})