import { View, Text, StyleSheet } from "react-native";

export default function Login(){
    return(
        <View style={styles.template}>
            <Text>Hola amigaaaaaaaaaa</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    template:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }

})