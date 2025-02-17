//EN LO POSIBLE VER COMO SE PUEDE OPTIMIZAR ESTA PANTALLA

import React, { useEffect, useRef, useState } from 'react';
import Constants from 'expo-constants';
import { Animated, View, Text, StyleSheet, Image, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import  Logo  from "../components/icon";
import SU_Button from "../components/sign_up_button";
import BackBTN from '../components/back_button';
import Text_Field from '../components/text_field';



export default function Login({ navigation }){
    const animation = useRef(new Animated.Value(0)).current; //La verdad no tengo idea pero funciona
    const [showComponents, setShowComponents] = useState(false); // Controla la visibilidad de los campos
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (username, password) => {
        try{
            const response = await fetch(`http://localhost:3000/login`, { //Cambiar el localhost por la IP en la que esta corriendo el front
                method: 'POST', // Tipo de metodo HTTP
                headers:{
                    'Content-Type': 'application/json', // Tipo de documento que va a leer
                },
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json();
    
            if(response.ok){
                console.log('Inicio de sesión exitoso:', data);
                navigation.navigate('Home', { userID: username });
            }else{
                console.error('Error de inicio de sesión:', data.message);
                alert(data.message); 
            }

        }catch(error){
            console.error(error.message);
            alert('No se pudo conectar con el servidor.');
        }
    };

    const animationLoginPress = () => {
        Animated.timing(animation, {
          toValue: 350, // Mueve los botones 300px hacia la derecha
          duration: 400, // Duración de la animación en ms
          useNativeDriver: true, // Mejora el rendimiento
        }).start(()=> setShowComponents(true));
    };

    const animationBackPress = () => {
        Animated.timing(animation, {
          toValue: 0, // Mueve los botones devuelta a donde estaban
          duration: 400, // Duración de la animación en ms
          useNativeDriver: true, // Mejora el rendimiento
        }).start(() => setShowComponents(false)); // Devuelve los botones 
    };
    
    return(
        <View style={styles.template}>
            <StatusBar style="dark"/>
                <Logo />
                <Animated.View style={[styles.animationContainer, { transform: [{ translateX: animation }] }, // Aplica la animación de desplazamiento
                ]}>
                    <SU_Button name="Iniciar Sesión" onPress={animationLoginPress}/>
                    <SU_Button name="Registrarse" onPress={() => navigation.navigate('Register')}/>
                </Animated.View>
                
                <BackBTN onPress={animationBackPress} />
                
                {showComponents && (
                    <View style={styles.fieldContainer}>
                        <Text_Field text="Usuario" value={username} onChangeText={(value) => setUsername(value)}/>
                        <Text_Field text="Contraseña" secure={true} value={password} onChangeText={(value) => setPassword(value)}/>
                        <View style={{marginTop:25}}>
                            <SU_Button name="Iniciar Sesión" onPress={() => handleLogin(username, password)}/>
                        </View>
                    </View>
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    template:{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        //justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
    },

    fieldContainer:{
        alignItems: "center",
        //justifyContent: "center",
        top:'10%'
    },

    animationContainer:{
        top:'32%',
    },

})