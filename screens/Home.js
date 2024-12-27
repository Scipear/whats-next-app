import {View, StyleSheet, Text, ScrollView} from 'react-native';
import NewList from '../components/new_list';
import Constants from 'expo-constants';

export default function Home({ navigation}){
    return(
        <ScrollView contentContainerStyle={styles.container} style={styles.template}>
            <NewList onPress={() => navigation.navigate('Create List')}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flexGrow: 1, // Asegura que el contenido ocupe todo el espacio disponible
        //justifyContent: "center", // Centra los elementos verticalmente
        alignItems: "center", // Centra los elementos horizontalmente
    },

    template:{
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight, // Agrega la altura de la barra de estado al contenido	        
    },
})