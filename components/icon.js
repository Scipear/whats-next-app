import { Image, View } from "react-native";
import Constants from 'expo-constants';

const icon = require('../assets/Logo.png');

export default function Logo(){
    return(
        <View style={{top:'25%'}}>
            <Image source={icon} style={{ width: 125, height: 125, resizeMode: 'center', bottom: '10%'}}/>
        </View>
    );
}