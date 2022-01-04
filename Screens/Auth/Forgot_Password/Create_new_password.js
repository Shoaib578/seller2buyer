import React from 'react';
import {View,Text,ScrollView, SafeAreaView,Dimensions,TextInput,TouchableOpacity,Image, Alert, ActivityIndicator} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import Foundation from 'react-native-vector-icons/Foundation'

import styles from '../../Styles/SigninStyle';
import  Axios  from 'axios';
import base_url from '../../../base_url';

class CreateNewPassword extends React.Component {
    state = {
        password:'',
        confirm_password:'',
        isLoading:false
    }

    create_new_password = ()=> {
        if(this.state.password.length<6){
            Alert.alert("Password Must Be Atleast 6 characters")
            return false
        }

        if(this.state.confirm_password != this.state.password){
            Alert.alert("Please Confirm Your Password")
            return false

        }
        this.setState({isLoading: true})
        let formData = new FormData()
        formData.append("password",this.state.password)
        formData.append("user_id",this.props.route.params.user_id)
        Axios.post(base_url+'/apis/create_new_password',formData)
        .then(res=>{
        this.setState({isLoading: false})

            Alert.alert("Password Updated")
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'auth', screen: 'signin' }]
            });
        })
        .catch(err=>{
        this.setState({isLoading: false})

            Alert.alert("Something Went Wrong")
        })
    }
    render(){
        return(
            <ScrollView style={styles.container}>
                <SafeAreaView style={{marginTop:10,alignItems: 'center',alignSelf: 'center',}}>

                

                <View style={[styles.text_input,{marginTop:'40%'}]}>
                <Feather name="lock" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="New Password" selectionColor="white" secureTextEntry placeholderTextColor="#DBDBDB" onChangeText={(val)=>this.setState({password:val})} style={{flex:1,color:'white'}} 
                />
                </View>

                <View style={[styles.text_input]}>
                <Feather name="lock" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="Confirm Password" selectionColor="white" secureTextEntry placeholderTextColor="#DBDBDB" onChangeText={(val)=>this.setState({confirm_password:val})} style={{flex:1,color:'white'}} 
                />
                </View>

                {this.state.isLoading?<ActivityIndicator size="large" color="white" style={{ alignSelf: 'center' }}/>:null}

                <TouchableOpacity onPress={this.create_new_password} style={styles.submit_btn} >
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'#57b5b6'}}>Create</Text>
                </TouchableOpacity>
            

                </SafeAreaView>
            </ScrollView>
        )
    }
}

export default CreateNewPassword