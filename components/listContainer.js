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
                <Text>{list.title}</Text>
                <Text>{category}</Text>
                <Text>{list.description}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: 5,
    },

    listButton:{
        width: 300,
        padding: 10,
        borderRadius: 25,
        marginTop: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        elevation: 5,

    }
});