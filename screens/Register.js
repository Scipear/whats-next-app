import {View, StyleSheet, ScrollView} from "react-native";
import Text_Field from "../components/text_field";
import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import SU_Button from "../components/sign_up_button";
export default function Register(){
    return(
        <ScrollView contentContainerStyle={styles.container} style={{backgroundColor: '#ffffff', paddingTop: Constants.statusBarHeight,}}>
            <View style={styles.pictureHolder}>
                <Ionicons name="person" size={100} color="black" />
                <View style={styles.cameraHolder}>
                    <Ionicons name="camera" size={40} color="black"/>
                </View>
            </View>

            <View style={styles.textsHolder}>
                <View style={styles.rowContainer}>
                    <Text_Field text="Nombre" style={{width: '47%'}}/>
                    <Text_Field text="Apellido" style={{width: '47%'}}/>
                </View>
                <Text_Field text="Usuario" style={{width: '100%', }}/>
                <Text_Field text="Correo Electronico" style={{width: '100%'}}/>
                <Text_Field text="Contraseña" secure={true} style={{width: '100%'}}/>
                <View style={styles.buttonHolder}>
                    <SU_Button name="Registrarse"/>
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
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },

    pictureHolder:{
        width: 150,
        height: 150,
        top:'20%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },

    textsHolder:{
        width: '100%',
        alignItems: 'flex-start',
        paddingLeft: 20,
        paddingRight: 20,
        //backgroundColor: '#ccc',
        top: "28%",
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