import React, { useState, useEffect } from 'react';
import {View, Modal, Text, StyleSheet, ScrollView, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import NewList from '../components/new_list';
import Constants from 'expo-constants';
import Text_Field from '../components/text_field';
import SU_Button from "../components/sign_up_button";

export default function Home({ navigation }){

    const [modalVisible, setModalVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            try{
                const response = await fetch('http://localhost:3000/categories');
                const data = await response.json();
    
                setCategories(data);

            }catch(error){
                console.error(error.message);
                alert('Error obteniendo las categorias.');
            }
        };

        getCategories();
    }, []);

    const createList = async () => {

    }

    return(
        <ScrollView contentContainerStyle={styles.container} style={styles.template}>
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
                            <Text_Field text="Nombre"/>
                            <Text style={styles.textStyle}>Categoría</Text>
                            <Picker
                                selectedValue={selected}
                                onValueChange={(itemValue) => 
                                    setSelected(itemValue)
                                }
                                style={styles.pickerStyle}
                            >
                                {categories.map((category) =>
                                    <Picker.Item key={category.id} label={category.name} value={category.id}/>
                                )}
                                                    
                            </Picker>
                            <Text_Field text="Descripcion" multiline={true} style={{height: 100}}/>
                            <View style={styles.buttonContainer}>
                                <SU_Button name='Aceptar' onPress={() => setModalVisible(!modalVisible)}/>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </Modal>
            
            <NewList onPress={() => setModalVisible(true)}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flexGrow: 1, // Asegura que el contenido ocupe todo el espacio disponible
        //justifyContent: "center", // Centra los elementos verticalmente
        alignItems: "center", // Centra los elementos horizontalmente
    },

    modalContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },

    pickerStyle:{
        //backgroundColor: '#d0d3d4',
        //borderRadius: 15,
        marginBottom: 10,

    },
    
    modalView:{
        width: '78%',
        minHeight: 350,
        height: '50%',
        //margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        //alignItems: 'center',
        shadowColor: '#000',
        elevation: 10,
    },

    textStyle:{
        fontSize: 20,
        marginTop: 10,
    },

    template:{
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight, // Agrega la altura de la barra de estado al contenido	        
    },

    buttonContainer:{
        marginTop: 25,
    }
})