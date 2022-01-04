import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FFFFFF',
        width:'100%',
        paddingRight:'5%',
        paddingLeft:'5%',
    },

    Profile:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        marginTop:'5%'
    },

    ProfileImage:{
        width:50,
        height:50,
        borderRadius:25,
    },

    Name:{
        marginLeft:15,
        color:'#000000',
        fontSize:15,
    },

    ImageBorder:{
        width:60,
        height:60,
        borderRadius:30,
        borderColor:'#57b5b6',
        borderWidth:2,
        alignItems:'center',
        justifyContent:'center'
    }

})

export default styles