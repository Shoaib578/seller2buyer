import {StyleSheet,Dimensions} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#57b5b6'

    },
    Select_location_container:{
        flex:1,
        
        alignItems: 'center',
        backgroundColor: '#57b5b6'
    },
    proceed_btn:{
        borderWidth:1,
        borderColor:'white',
        padding:10,
        width:Dimensions.get('window').width*2/2.5,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5 ,
        flexDirection:'row'
    },

    signup_btn:{
        borderWidth:1,
        borderColor:'white',
        padding:10,
        width:Dimensions.get('window').width*2/2.5,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5 ,
        flexDirection:'row'
    },
    
    text_input:{
        flexDirection: 'row',
        borderWidth:1,
        borderColor:"white",
        color:"#BB952D",
        
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.5,
        marginTop:Dimensions.get('window').height*2/16,
    },
     icon:{
        padding: 0,
        marginLeft:9,  
       
       
        alignItems: 'center',
        margin:12,
     },
    
     OTPInfo:{
        marginTop:'15%',
    },

    OTPText:{
        color:'#333333',
        fontSize:28
    },

    VerifyOTPText:{
        fontSize:16,
        marginTop:'6%',
        color:'gray'
    },

    EnteringData:{
        width:'100%',
        marginTop:'5%'

    },

    OTPInputBoxes:{
        width:'100%',
        alignItems:'center',
        marginTop:'20%'
    },

    otpView: {
        width: '90%',
        height: '30%',
        color: 'black',
      },
      EachInputFieldStyle: {
        width: 75,
        height: 70,
        color: 'black',
        backgroundColor: '#F2F2F7',
        fontSize: 24,
        borderRadius:10
      },
   
})

export default styles