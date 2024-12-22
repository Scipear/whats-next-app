import { Image } from "react-native";

const icon = require('../assets/Logo.png');

export default function Logo(){
    return(
        <Image source={icon} style={{ width: 125, height: 125, resizeMode: 'center', bottom: '10%'}}/>
    );
}