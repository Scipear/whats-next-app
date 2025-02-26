import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { URL } from "../config/config";

export default function ListContainer({ list, onPress }){
    const [category, setCategory] = useState('');

    useEffect(() => {
        const getCategory = async () => {
            try{
                const response = await fetch(`${URL}/category/${list.categoryID}`);
                const category = await response.json();

                setCategory(category.name);
            }catch(error){
                console.error(error.message);
                alert('Error obteniendo la categoria de la lista');
            }
        }

        getCategory();
    }, []);
    return (
        <View key={list.ID} style={styles.container}>
            <Pressable style={styles.listButton} onPress={onPress}>
                <Text style={styles.title}>{list.title}</Text>
                <Text style={styles.categoryText}>Categoría: {category}</Text>
                <Text style={styles.description}>{list.description}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: 5,
    },

    title:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#3c3a55',
    },

    categoryText:{
        marginBottom: 22,
        color: '#413f54',
    },

    description:{
        fontSize: 17,
        marginBottom: 5,
        color: '#413f54',
    },

    listButton:{
        width: 320,
        padding: 10,
        borderRadius: 20,
        marginTop: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        elevation: 5,

    }
});