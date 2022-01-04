import React from 'react';
import {View,Text,ScrollView, SafeAreaView,Dimensions,TextInput,TouchableOpacity,Image, Alert,ActivityIndicator} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import Foundation from 'react-native-vector-icons/Foundation'

import styles from '../../Styles/SigninStyle';
import  Axios  from 'axios';
import base_url from '../../../base_url';

class ForgotPassword extends React.Component {
     state = {
         phone_no:'',
         isLoading:false
     }

     forgot = ()=>{
         let formData = new FormData();
         formData.append("phone_no",this.state.phone_no)
         Axios.post(base_url+'/apis/forgot_password',formData)
         .then(res=>{
             this.setState({isLoading:false})
            if(res.data.msg == 'success'){
                this.props.navigation.navigate("enter_otp",{screen:'forgot_password',otp:res.data.otp,user_id:res.data.user_id})
            }else{
                Alert.alert(res.data.msg)
            }
         })
         .catch(err=>{
            this.setState({isLoading:false})
            Alert.alert("Something Went Wrong")
         })
     }
    render(){
        return(
            <ScrollView style={styles.container}>
                <SafeAreaView style={{marginTop:'20%',alignItems: 'center',alignSelf: 'center',}}>

                

                <View style={[styles.text_input,{marginTop:'40%'}]}>
                <Feather name="smartphone" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="10 Digit Mobile Number" selectionColor="white" keyboardType="numeric" onChangeText={(val)=>this.setState({phone_no:val})} placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
                />
                </View>



                
                {this.state.isLoading ?<ActivityIndicator size="large" color="white" style={{ alignSelf: 'center' }}/>:null}

                <TouchableOpacity onPress={this.forgot} style={styles.submit_btn} >
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'#57b5b6'}}>Forgot</Text>
                </TouchableOpacity>
            

                </SafeAreaView>
            </ScrollView>
        )
    }
}

export default ForgotPassword