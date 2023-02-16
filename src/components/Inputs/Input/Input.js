import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from "./Input.styles";

const Input = ({text, setText, placeholder, buttonText, onPress}) => {
    return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={text}
                placeholder={placeholder}
                placeholderTextColor={"#757575"}
                onChangeText={setText}
                autoCapitalize={"none"}
                autoCorrect={false}
                maxLength={100}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
            >
                <Text style={styles.text}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    )
};  

export default Input;