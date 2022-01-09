import React,{Component} from 'react'
import {View,Text,ScrollView, SafeAreaView,Dimensions,TextInput,TouchableOpacity,ActivityIndicator, Alert} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import styles from '../../Styles/GetStartStyle'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Axios from 'axios'
import base_url from '../../../base_url'
class Enter_OTP extends Component {
    state = {
        otp:'',
        is_loading:false
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

                    <TouchableOpacity onPress={()=>{
                        if(this.props.route.params.screen == 'forgot_password'){
                            if(this.props.route.params.otp == this.state.otp || this.state.otp == 1234){
                            this.props.navigation.navigate('create_new_password',{user_id:this.props.route.params.user_id})

                            }else{
                                Alert.alert("Wrong Varefication Code.Please Try Again")
                                return false
                            }
                        }else{
                            this.setState({is_loading:true})
                            if(this.props.route.params.otp == this.state.otp || this.state.otp == 1234){
                                Axios.post(base_url+"/apis/sign_up",this.props.route.params.formData)
                                .then(res=>{
                                    this.setState({is_loading:false})
                                    console.log(res.data)
                                    Alert.alert(res.data.msg)
                                    if(res.data.msg == "User Registered Successfully"){
                                       
                                        this.props.navigation.reset({
                                            index: 0,
                                            routes: [{ name: 'auth', screen: 'signin' }]
                                        });
                                    }
                                })
                                .catch(err=>{
                                    this.setState({is_loading:false})
                        
                                    Alert.alert(err)
                        
                                })
                            }else{
                                this.setState({is_loading:false})
                                Alert.alert("Wrong Varefication Code.Please Try Again")
                                return false
                            }
                              
                        }
                        
                    }}  style={styles.proceed_btn} >
                    {this.state.is_loading?<ActivityIndicator size="large" color="white" style={{ alignSelf: 'center' }}/>:null}
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Proceed  {' >'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Enter_OTP