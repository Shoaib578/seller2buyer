import React from 'react';
import {View,Text,ScrollView, SafeAreaView,Dimensions,TextInput,TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import styles from '../../Styles/SignupStyle'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import base_url from '../../../base_url'
import Axios from 'axios';
import validator from 'validator'





class SignupBuyer extends React.Component {
    state = {
        first_name:"",
        last_name:"",
        password:"",
        email:"",
        phone_no:"",
        primary_contact:"",
        postal_code:"",
        is_loading:false
    }

    SignUp = ()=>{
        
       
        if(this.state.first_name.length<5){
            Alert.alert("First Name must be at least 5 characters")
            return false

        }

        if(this.state.last_name.length<5){
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
        formData.append("role","buyer")
        formData.append("first_name",this.state.first_name)
        formData.append("last_name",this.state.last_name)
        formData.append("password",this.state.password)
        formData.append("phone_number",this.state.phone_no)
        formData.append("primary_contact",this.state.primary_contact)
        formData.append("postal_code",this.state.postal_code)
      


        let otpForm = new FormData();
        otpForm.append("phone_no",this.state.phone_no)
        Axios.post(base_url+'/apis/send_otp',otpForm)
        .then(res=>{
            if(res.data.msg =='success'){
                this.props.navigation.navigate("enter_otp",{otp:res.data.otp,formData:formData,screen:'register'})
                this.setState({is_loading:false})
                this.setState({
                    first_name:"",
                    last_name:"",
                    password:"",
                    email:"",
                    phone_no:"",
                    primary_contact:"",
                    postal_code:"",
                    
                })
            }else{
                this.setState({is_loading:false})
                Alert.alert(res.data.msg)
            }
           
        })
        .catch(err=>{
            this.setState({is_loading:false})

            Alert.alert("Something Went Wrong")
        })
        


      
    }



   
    render(){
        return(
            <ScrollView style={styles.SignupSellerContainer}>
                <SafeAreaView style={{marginTop:10,alignItems: 'center',alignSelf: 'center',}}>
                <Text style={{color:'white',fontSize:18,marginTop:Dimensions.get('window').height*2/30,}}>Create  Your Account</Text>

                <View style={styles.text_input}>
                <Feather name="user" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="First Name" value={this.state.first_name} selectionColor="white"  placeholderTextColor="#DBDBDB" onChangeText={(val)=>this.setState({first_name:val})} style={{flex:1,color:'white'}} 
                />
                </View>
                <View style={styles.text_input}>
                <Feather name="user" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="Last Name" value={this.state.last_name} onChangeText={(val)=>this.setState({last_name:val})} selectionColor="white"  placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
                />
                </View>

                <View style={styles.text_input}>
                <Feather name="smartphone" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="Phone" value={this.state.phone_no} selectionColor="white" onChangeText={(val)=>this.setState({phone_no:val})}  placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
                />
                </View>



              

                <View style={styles.text_input}>
                <Feather name="lock" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="Password" value={this.state.password} secureTextEntry onChangeText={(val)=>this.setState({password:val})} selectionColor="white" placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
                />
                </View>


                <View style={styles.text_input}>
                <AntDesign name="contacts" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="Primary Contact" value={this.state.primary_contact} onChangeText={(val)=>this.setState({primary_contact:val})} selectionColor="white"  placeholderTextColor="#DBDBDB" style={{flex:1,color:"white"}} 
                />
                </View>



                <View style={styles.text_input}>
                <Entypo name="location-pin" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput  placeholder="Postal" value={this.state.postal_code} selectionColor="white" onChangeText={(val)=>this.setState({postal_code:val})} keyboardType="numeric"  placeholderTextColor="white" style={{flex:1,color:'white'}} 
                />
                </View>


                {this.state.is_loading?<ActivityIndicator size="large" color="white" />:null}
                <TouchableOpacity onPress={this.SignUp}  style={styles.submit_btn} >
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'#57b5b6'}}>Proceed  {' >'} </Text>
                </TouchableOpacity>

                </SafeAreaView>
            </ScrollView>

        )
    }
}

export default SignupBuyer