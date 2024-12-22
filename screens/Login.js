import React, { useRef } from 'react';
import { Animated, View, Text, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Logo from "../components/icon";
import SU_Button from "../components/sign_up_button";


export default function Login(){
    const animation = useRef(new Animated.Value(0)).current; //La verdad no tengo idea pero funciona
    
    const animationLoginPress = () => {
        Animated.timing(animation, {
          toValue: 350, // Mueve los botones 300px hacia la derecha
          duration: 400, // Duración de la animación en ms
          useNativeDriver: true, // Mejora el rendimiento
        }).start(); // Muestra los campos después de la animación
      };

    return(
        <View style={styles.template}>
            <StatusBar style="dark"/>
                <Logo />
                <Animated.View style={[
                    styles.buttonContainer,
                    { transform: [{ translateX: animation }] }, // Aplica la animación de desplazamiento
                ]}>
                    <SU_Button name="Iniciar Sesion" onPress={animationLoginPress}/>
                    <SU_Button name="Registrarse"/>
                </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    template:{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer: {
        gap: 10,
      },

})