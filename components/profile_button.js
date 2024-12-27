import { Pressable, StyleSheet } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Profile_Button({ onPress }){
    return(
        <Pressable style={styles.profile} onPress={onPress}>
            <FontAwesome6 name="circle-user" size={35} color="black" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    profile:{
        width: 50,
        height: 50,
        //position: 'absolute',
        top: 5,
        left: 15, // Distancia desde la izquierda
      },
})