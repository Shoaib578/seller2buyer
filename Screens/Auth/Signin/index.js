import React from 'react';
import {View,Text,ScrollView, SafeAreaView,Dimensions,TextInput,TouchableOpacity,Image, Alert, ActivityIndicator} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import Foundation from 'react-native-vector-icons/Foundation'

import styles from '../../Styles/SigninStyle';
import validator from 'validator';
import  Axios  from 'axios';
import base_url from '../../../base_url';
class Signin extends React.Component {
    state = {
        phone_no:"",
        password:"",
        is_loading:false
    }

    SignIn = ()=>{
    
    
        if(validator.isMobilePhone(this.state.phone_no) == false){
            Alert.alert("Invalid Phone Number")
            return false;
        }

        if(this.state.password.length<6){
            Alert.alert("Password Must Be at least 6 characters")
            return false;
        }

        this.setState({is_loading:true})
        let formData = new FormData();
        formData.append("phone_no",this.state.phone_no)
        formData.append("password",this.state.password)

        Axios.post(base_url+"/apis/sign_in",formData)
        .then(async(res)=>{
            this.setState({is_loading:false})

            if(res.data.msg == "success"){
           
            this.props.navigation.navigate("enter_otp",{otp:res.data.verification_code,user:res.data.user,screen:'login'})
            }else{
                Alert.alert("Invalid Phone Number or Password")
            }

        })
        .catch(err=>{
            this.setState({is_loading:false})
            Alert.alert(err)
        })
    }
    render(){
        return(
            <ScrollView style={styles.container}>
                <SafeAreaView style={{marginTop:10,alignItems: 'center',alignSelf: 'center',}}>

                <Text style={{fontSize:40,color:'white',fontFamily:'san-serif',marginTop:'10%'}}>S2B NOW</Text>
             <Text style={{ color:'white',fontSize:22 ,}}>SELLER TO BUYER MADE EASY</Text>


                <Text style={{color:'white',fontSize:18,marginTop:30}}>Login to Your Account</Text>
                <Text style={{color:'white'}}>{this.props.route.params.country} User</Text>

                <View style={styles.text_input}>
                <Feather name="smartphone" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="Digit Mobile Number +9....." onChangeText={(val)=>this.setState({phone_no:val})} value={this.state.phone_no} selectionColor="white" keyboardType="numeric" placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
                />
                </View>



                <View style={styles.text_input}>
                <Feather name="lock" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="Password" secureTextEntry selectionColor="white" onChangeText={(val)=>this.setState({password:val})} value={this.state.password} placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
                />
                </View>

                {this.state.is_loading?<ActivityIndicator size="large" color="white" style={{ alignSelf: 'center' }}/>:null}

                <TouchableOpacity onPress={this.SignIn} style={styles.submit_btn} >
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'#57b5b6'}}>Sign In</Text>
                </TouchableOpacity>
                
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:30}}>

                <TouchableOpacity onPress={()=>this.props.navigation.navigate('signup')}>
                    <Text style={{color:'white',fontSize:15}}>Create An Account</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.props.navigation.navigate('forgotpassword')} style={{marginLeft:40}}>
                    <Text style={{color:'white',fontSize:15}}>Forgot Password</Text>
                </TouchableOpacity>

                </View>

                </SafeAreaView>
            </ScrollView>
        )
    }
}

export default Signin