import { View, StyleSheet, TextInput } from "react-native";

export default function Text_Field({ text, secure, style, value, onChangeText, multiline }) {
    return (
        <View style={[styles.textBox, style]}>
            <TextInput 
                placeholder={text} 
                style={styles.text} 
                secureTextEntry={secure} 
                value={value}
                onChangeText={onChangeText}
                multiline={multiline}
                textAlignVertical="top"/>
        </View>
    );
}

const styles = StyleSheet.create({
    textBox:{
        width: 260,
        height: 45,
        borderRadius: 15,
        backgroundColor: '#d0d3d4',
        //position: 'absolute',
        //bottom: '22%',
        //justifyContent: 'center',
        marginBottom: 10,
    },

    text:{
        paddingTop: 12,
        paddingHorizontal: 15,
    }
})