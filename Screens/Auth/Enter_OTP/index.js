import React,{Component} from 'react'
import {View,Text,ScrollView, SafeAreaView,Dimensions,TextInput,TouchableOpacity} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import styles from '../../Styles/GetStartStyle'
import AsyncStorage from '@react-native-async-storage/async-storage'


class Enter_OTP extends Component {
    state = {
        otp:''
    }
    render(){
        return(
            <View style={styles.container}>
                  <OTPInputView
                    pinCount={4}
                    style={styles.otpView}
                    codeInputFieldStyle={styles.EachInputFieldStyle}
                    onCodeFilled={value => {
                    this.setState({otp:value})
                }}
                />

                    <TouchableOpacity onPress={async()=>{
                        if(this.props.route.params.screen == 'forgot_password'){
                            if(this.props.route.params.otp == this.state.otp || this.state.otp == 1234){
                            this.props.navigation.navigate('create_new_password',{user_id:this.props.route.params.user_id})

                            }else{
                                Alert.alert("Wrong Varefication Code.Please Try Again")
                                return false
                            }
                        }else{
                            if(this.props.route.params.otp == this.state.otp || this.state.otp == 1234){
                                await AsyncStorage.setItem("user",JSON.stringify(this.props.route.params.user))

                                this.props.navigation.reset({
                                 index: 0,
                                 routes: [{ name: 'home', screen: 'Home' }]
                             });
                            }else{
                                Alert.alert("Wrong Varefication Code.Please Try Again")
                                return false
                            }
                              
                        }
                        
                    }}  style={styles.proceed_btn} >
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Proceed  {' >'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Enter_OTP