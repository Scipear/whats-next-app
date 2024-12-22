import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';
import { Pressable, StyleSheet, View } from "react-native";

export default function BackBTN({ onPress }){
    return(
        <Pressable style={styles.button} onPress={onPress}>
            <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button:{
        width: 50,
        height: 50,
        position: 'absolute',
        top: Constants.statusBarHeight + 15,
        left: 15, // Distancia desde la izquierda
    }
})