import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { URL } from "../config/config";

export default function ListContainer({ list }){
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
        <View key={list.ID}>
            <Text>{list.title}</Text>
            <Text>{category}</Text>
            <Text>{list.description}</Text>
        </View>
    );
}