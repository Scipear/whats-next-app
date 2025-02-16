import { Pressable, StyleSheet } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Stats_Button({ onPress }){
    return(
        <Pressable style={styles.stats} onPress={onPress}>
            <FontAwesome6 name="chart-line" size={35} color="black" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    stats:{
        width: 35,
        height: 50,
        //position: 'absolute',
        top: 5,
        right: 15, // Distancia desde la izquierda
      }
})