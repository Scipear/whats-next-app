import { Pressable, StyleSheet, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function SU_Button({ name, onPress }){ // Props o parametros del boton. Name = texto del boton, onPress = Accion que realiza el boton al presionarlo
    return(
        <LinearGradient
            colors={['#b45eff', '#8469ff', '#6490fe', '#4cacfd']} // Colores del degradado
            start={{ x: 1, y: 0 }}          // Comienza desde la izquierda
            end={{ x: 0, y: 0 }}            // Termina a la derecha
            style={styles.gradient}>
                <Pressable 
                    style={({pressed}) => [
                        {
                        opacity: pressed ? 0.7 : 1, //Condicional que cambia la opacidad del boton si esta presionado
                        },
                    styles.wrapperCustom,
                ]}
                onPress={onPress}>
                
                    <Text style={styles.text}>{name}</Text>
                </Pressable>
        </LinearGradient> //Etiqueta que logra el degradado
    );
}

const styles = StyleSheet.create({
    text:{
        color: '#ffffff',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    gradient: {
        width: 250,
        height: 55,
        borderRadius: 30,
        bottom: '25%',
        marginBottom: 10,
    },

    wrapperCustom:{
        width: 250,
        height: 55,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
})