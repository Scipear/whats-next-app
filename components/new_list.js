import { View, Text, StyleSheet, Pressable } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { LinearGradient } from 'expo-linear-gradient';

export default function NewList(){
    return(
        <LinearGradient
            colors={['#b45eff', '#8469ff', '#6490fe', '#4cacfd']} // Colores del degradado
            start={{ x: 1, y: 0 }}          // Comienza desde la izquierda
            end={{ x: 0, y: 0 }}
            style={styles.gradient}            // Termina a la derecha
        >
        <Pressable style={styles.container}>
            <View style={styles.button}>
                <FontAwesome6 name="square-plus" size={125} color="black" />
            </View>
            <Text style={styles.title}>New List</Text>
        </Pressable>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container:{
        height: 150,
        width: '90%',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 25,
        margin: 8,
/*        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,*/
        flexDirection: 'row',

    },

    button:{
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        shadowColor: '#000',
/*        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84, ios tristemente*/
        elevation: 5,
    },

    title:{
        fontWeight: 'bold',
        fontSize: 30,
        padding: 10,
    },

    gradient:{
        borderRadius: 32,
        //height: 150,
        shadowColor: '#000',
        elevation: 5,
    },

});