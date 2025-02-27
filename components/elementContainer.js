import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { URL } from "../config/config";

export default function ElementContainer({ element, updateList }){

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('es-ES').format(new Date(date));
    };

    const daysUntil = (date) => {
        const todayDate = new Date();
        const expectedDate = new Date(date);
        
        // Calcula la diferencia en milisegundos
        const diff = expectedDate - todayDate;
        
        // Convierte de milisegundos a días
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const activityCompleted = async () => {
        
        try{
            console.log(element.ID);
            const culminationDate = new Date();
            let punctuality = true;
            let daysLate = 0;
            const daysTrack = daysUntil(element.expectedDate);
            
            if(daysTrack < 0){
                daysLate = daysTrack * -1;
                punctuality = false;
            }

            const response = await fetch(`${URL}/element/${element.ID}`, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    culminationDate,
                    daysLate,
                    punctuality,
                    status: true,
                }),
            });
        
            const data = await response.json();
        
            if(response.ok){
                console.log('Elemento completado exitosamente', data);
                alert('¡Actividad completada con éxito!');
                updateList();
    
            }else{
                console.error('Error al actualizar el elemento:', data.message);
                alert(data.message);
            }
        
        }catch(error){
            console.error(error.message);
            alert('No se pudo actualizar el elemento');
        }
    }
    
    const completeActivity = () => {
        Alert.alert(
            "Actividad realizada", 
            "¿Desea completar la actividad?", 
            [
                {text: "No", style: "cancel"},
                {text: "Sí", onPress: () => activityCompleted()}
            ]
        );
    };
    
    return (
        <View key={element.ID} style={styles.container}>
            <Pressable style={styles.listButton} onPress={() => completeActivity()}>
                <Text style={styles.title}>{element.name}</Text>
                <Text style={styles.description}>{element.description}</Text>
                <Text style={{fontWeight: 'bold'}}>Fecha ingresada: {element.additionDate}</Text>
                <Text style={{fontWeight: 'bold'}}>Fecha para completar: {element.expectedDate}</Text>
                <Text style={{fontWeight: 'bold'}}>Días que faltan para cumplir: {daysUntil(element.expectedDate)}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: 5,
    },

    listButton:{
        width: 320,
        padding: 10,
        borderRadius: 10,
        //marginTop: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        elevation: 2,
    },
    
    title:{
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#3c3a55',
    },

    description:{
        fontSize: 17,
        marginBottom: 10,
        color: '#413f54',
    }
});