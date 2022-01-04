import React from 'react';
import {View,Text,ScrollView, SafeAreaView,Dimensions,TextInput,TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import styles from '../../Styles/SignupStyle'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import Axios from 'axios'
import base_url from '../../../base_url'
import Foundation from 'react-native-vector-icons/Foundation'
import validator from 'validator'
class SignupSeller extends React.Component {
    state = {
        company_name:"",
        company_initials:"",
        password:"",
        email:"",
        phone_no:"",
        primary_contact:"",
        postal_code:"",
        is_loading:false
    }

    SignUp = ()=>{
        
        if(validator.isEmail(this.state.email)){
           console.log('valid email')

        }else{
            Alert.alert("Invalid Email")
            return false
        }
        if(this.state.company_name.length<5){
            Alert.alert("First Name must be at least 5 characters")
            return false

        }

        if(this.state.company_initials.length<5){
            Alert.alert("Last Name must be at least 5 characters")
            return false

        }

        if(validator.isMobilePhone(this.state.phone_no)){
           console.log("valid phone number")
        }else{
            Alert.alert("Invalid Phone Number")
            return false
        }

        if(this.state.primary_contact.length<1){
            Alert.alert("Please Enter Your Primary Contact")
            return false
        }

        if(this.state.postal_code.length<1){
            Alert.alert("Please Enter Your Postal Code")
            return false
        }
       
        if(this.state.password.length<6){
            Alert.alert("Password Must Be Atleast 6 characters")
            return false
        }


        console.log("Validated")
        this.setState({is_loading:true})
        let formData = new FormData();
        formData.append("role","seller")
        formData.append("company_name",this.state.company_name)
        formData.append("company_initials",this.state.company_initials)
        formData.append("password",this.state.password)
        formData.append("phone_number",this.state.phone_no)
        formData.append("primary_contact",this.state.primary_contact)
        formData.append("postal_code",this.state.postal_code)
        formData.append("email",this.state.email)
        Axios.post(base_url+"/apis/sign_up",formData)
        .then(res=>{
            this.setState({is_loading:false})
            console.log(res.data)
            Alert.alert(res.data.msg)
            if(res.data.msg == "User Registered Successfully"){
                this.setState({
                    company_name:"",
                    company_initials:"",
                    password:"",
                    email:"",
                    phone_no:"",
                    primary_contact:"",
                    postal_code:"",
                    
                })
            }
        })
        .catch(err=>{
            this.setState({is_loading:false})

            Alert.alert(err)

        })
    }
    render(){
        return(
            <ScrollView style={styles.SignupSellerContainer}>
            <SafeAreaView style={{alignItems: 'center',alignSelf: 'center',}}>
            <Text style={{color:'white',fontSize:18,marginTop:Dimensions.get('window').height*2/16,}}>Create  Your Account</Text>

            <View style={styles.text_input}>
            <Foundation name="torso-business" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput placeholder="Company Name"  onChangeText={(val)=>this.setState({company_name:val})} value={this.state.company_name} selectionColor="white"  placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
            />
            </View>


            <View style={styles.text_input}>
            <Foundation name="torso-business" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput placeholder="Company Initials" onChangeText={(val)=>this.setState({company_initials:val})} value={this.state.company_initials} selectionColor="white"  placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
            />
            </View>

            <View style={styles.text_input}>
            <Feather name="smartphone" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput placeholder="Phone" selectionColor="white" onChangeText={(val)=>this.setState({phone_no:val})} value={this.state.phone_no} keyboardType="numeric" placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
            />
            </View>



            <View style={styles.text_input}>
            <Feather name="mail" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput placeholder="Email"  selectionColor="white" value={this.state.email} onChangeText={(val)=>this.setState({email:val})} placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
            />
            </View>


            <View style={styles.text_input}>
            <Feather name="lock" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput placeholder="Password" value={this.state.password} secureTextEntry value={this.state.password} onChangeText={(val)=>this.setState({password:val})} selectionColor="white" placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
            />
            </View>

            <View style={styles.text_input}>
            <AntDesign name="contacts" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput placeholder="Primary Contact" value={this.state.primary_contact} selectionColor="white" value={this.state.primary_contact} onChangeText={(val)=>this.setState({primary_contact:val})} placeholderTextColor="#DBDBDB" style={{flex:1,color:"white"}} 
            />
            </View>



            <View style={styles.text_input}>
            <Entypo name="location-pin" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput  placeholder="Postal" value={this.state.postal_code} selectionColor="white" keyboardType="numeric" onChangeText={(val)=>this.setState({postal_code:val})}  placeholderTextColor="white" style={{flex:1,color:'white'}} 
            />
            </View>

            {this.state.is_loading?<ActivityIndicator size="large" color="white"/>:null}

            <TouchableOpacity onPress={this.SignUp} style={[styles.submit_btn,{marginBottom:20}]} >
                
                <Text style={{ fontSize:16,fontWeight:'bold',color:'#57b5b6'}}>Proceed  {' >'} </Text>
            </TouchableOpacity>

            </SafeAreaView>
        </ScrollView>
        )
    }
}

export default SignupSeller