import React, { useState, useEffect } from 'react';
import {View, Modal, Text, StyleSheet, ScrollView, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import NewList from '../components/new_list';
import Constants from 'expo-constants';
import Text_Field from '../components/text_field';
import SU_Button from "../components/sign_up_button";
import ListContainer from '../components/listContainer';
import { URL } from '../config/config';

export default function Home({ navigation, route }){

    const userID = route.params?.userID || null;
    const [modalVisible, setModalVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [lists, setLists] = useState([]);
    const [selected, setSelected] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            try{
                const response = await fetch(`${URL}/categories`);
                const data = await response.json();
    
                setCategories(data);

            }catch(error){
                console.error(error.message);
                alert('Error obteniendo las categorias.');
            }
        };

        const getLists = async () => {
            try{
                const response = await fetch(`${URL}/user/${userID}/lists`);
                const data = await response.json();
                
                setLists(data);
            }catch(error){
                console.error(error.message);
                alert('Error obteniendo las listas.');
            }
        }

        getCategories();
        getLists();
    }, []);

    const createList = async (title, description, userID, categoryID) => {
        try{
            console.log(title, description, userID, categoryID);
            const response = await fetch(`${URL}/list`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, description, userID, categoryID}),
            });

            const data = await response.json();

            if(response.ok){
                console.log('Lista creada exitosamente', data);
                alert('Lista creada exitosamente');

                if(lists){
                    setLists((oldLists) => [...oldLists, data]);
                }

                setTitle('');
                setDescription('');
                setSelected(null);
                setModalVisible(!modalVisible);
            }else{
                console.error('Error al crear la lista:', data.message);
                alert(data.message);
            }

        }catch(error){
            console.error(error.message);
            alert('No se pudo crear la lista');
        }
    }

    return(
        <View style={styles.template}>
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
                            <Text_Field text="Nombre" value={title} onChangeText={(value) => setTitle(value)}/>
                            <Text style={styles.textStyle}>Categoría</Text>
                            <Picker 
                                selectedValue={selected} 
                                onValueChange={(itemValue) => 
                                    setSelected(itemValue)} 
                                style={styles.pickerStyle}>
                                
                                <Picker.Item label="Seleccione una categoría" value={null} enabled={false} />
                                {categories.map((category) =>
                                    <Picker.Item key={category.ID} label={category.name} value={category.ID}/>
                                )}
                                                    
                            </Picker>
                            <Text_Field text="Descripción" multiline={true} style={{height: 100}} value={description} onChangeText={(value) => setDescription(value)}/>
                            <View style={styles.buttonContainer}>
                                <SU_Button name='Aceptar' onPress={() => createList(title, description, userID, selected)}/>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </Modal>
            
            <NewList onPress={() => setModalVisible(true)}/>
            <FlatList 
                data={lists} 
                keyExtractor={(list) => list.ID} 
                renderItem={({ item }) => 
                    <ListContainer 
                        list={item} 
                        onPress={() => navigation.navigate('ListView', { list: item })}/>
                }/>
        </View>
    );
}

const styles = StyleSheet.create({
    template:{
        flex: 1, // Asegura que el contenido ocupe todo el espacio disponible
        //justifyContent: "center", // Centra los elementos verticalmente
        alignItems: "center", // Centra los elementos horizontalmente
        backgroundColor: '#fff',
        paddingTop: 20, // Agrega la altura de la barra de estado al contenido	        
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
        backgroundColor: '#fff',
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

    buttonContainer:{
        marginTop: 25,
    }
})