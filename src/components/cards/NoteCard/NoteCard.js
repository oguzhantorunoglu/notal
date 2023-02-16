import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from "./NoteCard.styles";

const NoteCard = ({text, active, onPress, longPress}) => {

    return(
        <TouchableOpacity
            style={(active) ? styles.active_container : styles.pasif_container}
            onPress={onPress}
            onLongPress={longPress}
        >
            <Text style={(active) ? styles.active_text : styles.pasif_text}>{text}</Text>
        </TouchableOpacity>
    )
};

export default NoteCard;