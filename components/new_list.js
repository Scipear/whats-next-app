import { View, Text, StyleSheet, Pressable } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { LinearGradient } from 'expo-linear-gradient';

export default function NewList({ onPress }){
    return(
        <LinearGradient
            colors={['#b45eff', '#8469ff', '#6490fe', '#4cacfd']} // Colores del degradado
            start={{ x: 1, y: 0 }}  // Comienza desde la izquierda
            end={{ x: 0, y: 0 }}    // Termina a la derecha
            style={styles.gradient}>

                <Pressable style={styles.container} onPress={onPress}>
                    <View style={styles.button}>
                        <FontAwesome6 name="square-plus" size={75} color="#3c3a55" />
                    </View>
                    <Text style={styles.title}>Nueva Lista</Text>
                </Pressable>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container:{
        height: 100,
        width: '70%',
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
        borderRadius: 20,
        margin: 8,
        /*shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,*/
        flexDirection: 'row',
    },

    button:{
        width: '40%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
/*      shadowOffset:{
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5, solo ios q desgracia*/
        elevation: 4,
    },

    title:{
        fontWeight: 'bold',
        fontSize: 30,
        padding: 10,
        margin: 10,
        color: '#3c3a55',
    },

    gradient:{
        borderRadius: 25,
        marginBottom: 10,
        //height: 150,
        shadowColor: '#000',
        elevation: 10,
        //margin: 10
    },

});