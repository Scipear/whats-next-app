import { Alert, FlatList, Keyboard, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import SU_Button from "../components/sign_up_button";
import { useEffect, useState } from "react";
import Text_Field from "../components/text_field";
import DateCalendar from "../components/dateCalendar";
import ElementContainer from "../components/elementContainer";
import { URL } from '../config/config';

export default function ListView({ route }) {
    const listTitle = route.params?.list.title;
    const listID = route.params?.list.ID;
    const [elements, setElements] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [expectedDate, setExpectedDate] = useState(new Date());

    useEffect(() => {
        
        getElements();
    }, []);
    
    const getElements = async () =>{
        try{
            const response = await fetch(`${URL}/list/${listID}/elements`);
            const data = await response.json();
            
            setElements(data);
        
        }catch(error){
            console.error(error.message);
            alert('Error obteniendo los elementos.');
        }
    }

    const createElement = async (name, description, expectedDate, listID) => {
            try{
                console.log(name, description, expectedDate, listID);
                const response = await fetch(`${URL}/element`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name, description, expectedDate, listID}),
                });
    
                const data = await response.json();
    
                if(response.ok){
                    console.log('Elemento creado exitosamente', data);
                    alert('Elemento creado exitosamente');
    
                    if(elements){
                        setElements((oldElements) => [...oldElements, data]);
                    }
    
                    setName('');
                    setDescription('');
                    setExpectedDate(new Date());
                    setModalVisible(!modalVisible);
                }else{
                    console.error('Error al crear el elemento:', data.message);
                    alert(data.message);
                }
    
            }catch(error){
                console.error(error.message);
                alert('No se pudo crear el elemento');
            }
        }

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
                                <Text_Field text='Nombre' value={name} onChangeText={(value) => setName(value)}/>
                                <Text_Field text='Descripción' multiline={true} style={{height: 100}} value={description} onChangeText={(value) => setDescription(value)}/>
                                <DateCalendar text="Fecha para cumplir" value={expectedDate} onChange={setExpectedDate}/>
                                
                                <View style={styles.buttonContainer}>
                                    <SU_Button name='Aceptar' onPress={() => createElement(name, description, expectedDate, listID)}/>
                                </View>
                            </View>
                
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </Modal>
            <Text style={styles.title}>{listTitle}</Text>
            <View>
                <SU_Button name='New Element' onPress={() => setModalVisible(true)}/>
            </View>

            <FlatList 
                data={elements} 
                keyExtractor={(element) => element.ID} 
                renderItem={({ item }) => 
                    <ElementContainer 
                        element={item}
                        updateList={getElements}/>
                }/>

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
        minHeight: 325,
        padding: 15,
        borderRadius: 20,
    },

    buttonContainer:{
        marginTop: 25,
    }
})