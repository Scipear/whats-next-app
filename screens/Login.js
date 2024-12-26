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
                        <Text_Field text="Usuario"/>
                        <Text_Field text="Contraseña" secure={true}/>
                        <View style={{marginTop:25}}>
                            <SU_Button name="Iniciar Sesión" onPress={() => navigation.navigate('Home')}/>
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