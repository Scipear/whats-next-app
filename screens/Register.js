// ESTRUCTURAR Y ACOMODAR TODA ESTA PANTALLA EN COMPONENTES, ARREGLAR

import React, { useState } from 'react';
import {View, StyleSheet, ScrollView} from "react-native";
import Text_Field from "../components/text_field";
import DateCalendar from "../components/dateCalendar";
import { StatusBar } from "expo-status-bar";
import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import SU_Button from "../components/sign_up_button";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
export default function Register({ navigation }){
    
    const [username, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());

    const handleLogin = async (username, mail, password, name, lastName, birthDate) => {
        try{
            const response = await fetch(`http://localhost:3000/register`, { //Cambiar el localhost por la IP en la que esta corriendo el front
                method: 'POST', // Tipo de metodo HTTP
                headers:{
                    'Content-Type': 'application/json', // Tipo de documento que va a leer
                },
                body: JSON.stringify({ username, mail, password, name, lastName, birthDate }),
            });
    
            const data = await response.json();
    
            if(response.ok){
                console.log('Registro exitoso:', data);
                navigation.navigate('Home'/*, { user: data.user }*/);
            }else{
                console.error('Error al registrar usuario:', data.message);
                alert(data.message); 
            }

        }catch(error){
            console.error(error.message);
            alert('No se pudo conectar con el servidor.');
        }
    };

    return(
        <ScrollView contentContainerStyle={styles.container} style={{backgroundColor: '#ffffff', paddingTop: Constants.statusBarHeight}}>
            <StatusBar style="dark"/>
            <View style={styles.pictureHolder}>
                <FontAwesome6 name="user-large" size={100} color="black" />
                <View style={styles.cameraHolder}>
                    <FontAwesome6 name="camera" size={30} color="black" />
                </View>
            </View>

            <View style={styles.textsHolder}>
                <View style={styles.rowContainer}>
                    <Text_Field text="Nombre" value={name} onChangeText={(value) => setName(value)} style={{width: '47%'}}/>
                    <Text_Field text="Apellido" value={lastName} onChangeText={(value) => setLastName(value)} style={{width: '47%'}}/>
                </View>
                <Text_Field text="Usuario" value={username} onChangeText={(value) => setUsername(value)} style={{width: '100%'}}/>
                <Text_Field text="Correo Electronico" value={mail} onChangeText={(value) => setMail(value)} style={{width: '100%'}}/>
                <Text_Field text="Contraseña" value={password} onChangeText={(value) => setPassword(value)} secure={true} style={{width: '100%'}}/>
                <DateCalendar value={birthDate} onChange={setBirthDate}/>

                <View style={styles.buttonHolder}>
                    <SU_Button name="Registrarse" onPress={() => handleLogin(username, mail, password, name, lastName, birthDate)}/> 
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flexGrow: 1, // Asegura que el contenido ocupe todo el espacio disponible
        //justifyContent: "center", // Centra los elementos verticalmente
        alignItems: "center", // Centra los elementos horizontalmente
    },

    cameraHolder:{
        width: 55,
        height: 55,
        backgroundColor: '#fff',
        borderColor: '#000',
        borderRadius: 100,
        position: 'absolute',
        top: '68%',
        left: '68%',
        alignItems: 'center',
        justifyContent: "center",
        shadowColor: '#000',
/*        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,*/
        elevation: 10,
    },

    pictureHolder:{
        width: 150,
        height: 150,
        top:'10%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        shadowColor: '#000',
/*        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84, */
        elevation: 3,
    },

    textsHolder:{
        width: '100%',
        alignItems: 'flex-start',
        paddingLeft: 20,
        paddingRight: 20,
        //backgroundColor: '#ccc',
        top: "18%",
        //right: "10%",
        
    },

    rowContainer:{
        flexDirection: 'row', // Organiza los elementos horizontalmente
        justifyContent: 'space-between', // Espacio uniforme entre los campos
        width: '100%',
        //marginBottom: 10, // Espaciado entre filas
    },

    buttonHolder:{
        width: '100%',
        alignItems: 'center',
        marginTop: 40,
    }
})