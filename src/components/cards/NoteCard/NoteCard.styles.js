import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    active_container:{
        padding:15,
        width:"94%",
        marginHorizontal:"3%",
        marginTop:"5%",
        backgroundColor:"#558047",
        borderRadius:8
    },
    pasif_container:{
        padding:15,
        width:"94%",
        marginHorizontal:"3%",
        marginTop:"5%",
        backgroundColor:"#395059",
        borderRadius:8
    },
    active_text:{
        fontWeight:"400",
        fontSize:16,
        color:"white"
    },
    pasif_text:{
        fontWeight:"400",
        fontSize:16,
        color:"#858585",
        textDecorationLine:"line-through"
    }
})