import React from 'react'
import {View,Text,ScrollView, SafeAreaView,Dimensions,TextInput,TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import styles from '../Styles/SignupStyle'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import {Picker} from '@react-native-picker/picker';

import Foundation from 'react-native-vector-icons/Foundation'
import  Axios  from 'axios';
import base_url from '../../base_url';
import validator from 'validator'

class EditProfile extends React.Component {
    state = {
        user:'',
        isLoading:true,
        company_name:"",
        company_initials:"",
        password:"",
        email:"",
        phone_no:"",
        primary_contact:"",
        postal_code:"",
        firstname:"",
        lastname:'',
        form_loading:false,
        make_your_product_visible_to_everyone:''
    }
    getUserInfo = ()=>{
        Axios.get(base_url+'/apis/profile?user_id='+this.props.route.params.user_id)
        .then(res=>{
              this.setState({user:res.data.user,
           
                company_name:res.data.user.companyname,
                firstname:res.data.user.firstname,
                lastname:res.data.user.lastname,
                email:res.data.user.email,
                phone_no:res.data.user.phone_no,
                primary_contact:res.data.user.primary_contact,
                postal_code:res.data.user.postal_code,
                make_your_product_visible_to_everyone:res.data.user.make_your_product_visible_to_everyone,
                isLoading:false})
        })
    }

    UpdateProfile = ()=>{
        if(this.state.user.role == "seller" && this.state.company_name.length<5){
            Alert.alert("Company Name must be at least 5 characters")
            return false

        }

        if(this.state.user.role == "seller" && validator.isEmail(this.state.email) == false){
            Alert.alert("Invalid Email")
            return false
 
         }

        if(this.state.user.role == "buyer" && this.state.firstname.length<5){
            Alert.alert("First Name must be at least 5 characters")
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

        this.setState({form_loading:true})


        let formData = new FormData()
        formData.append("user_id",this.state.user.id)
        formData.append("firstname",this.state.firstname)
        formData.append("email",this.state.email)
        formData.append("phone_no",this.state.phone_no)
        formData.append("primary_contact",this.state.primary_contact)
        formData.append("postal_code",this.state.postal_code)
        formData.append("company_name",this.state.company_name)
        formData.append("make_your_product_visible_to_everyone",this.state.make_your_product_visible_to_everyone)
        Axios.post(base_url+'/apis/update_profile',formData)
        .then(res=>{
            this.setState({form_loading:false});
            Alert.alert(res.data.msg)

        })
        .catch(err=>{
            this.setState({form_loading:false});

            Alert.alert("Something Went Wrong")
            return false
        })


       
    }
    componentDidMount(){
        this.getUserInfo()
    }
    render(){
        if(this.state.isLoading == false){

        return(
    <ScrollView style={[styles.SignupSellerContainer,{backgroundColor:'white'}]}>
            <SafeAreaView style={{marginTop:10,alignItems: 'center',alignSelf: 'center',}}>
          

            {this.state.user.role == "seller"?<View style={[styles.text_input,{borderColor:'#57b5b6',backgroundColor:"#57b5b6"}]}>
            <Foundation name="torso-business" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput placeholder="Company Name"  onChangeText={(val)=>this.setState({company_name:val})} value={this.state.company_name} selectionColor="white"  placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} />
           

            </View>:
            
            <View style={[styles.text_input,{borderColor:'#57b5b6',backgroundColor:"#57b5b6"}]}>
            <Feather name="user" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput placeholder="First Name" value={this.state.firstname} selectionColor="white"  placeholderTextColor="#DBDBDB" onChangeText={(val)=>this.setState({firstname:val})} style={{flex:1,color:'white'}} />

            </View>}


          

            <View style={[styles.text_input,{borderColor:'#57b5b6',backgroundColor:"#57b5b6"}]}>
            <Feather name="smartphone" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput placeholder="Phone" value={this.state.phone_no} selectionColor="white" onChangeText={(val)=>this.setState({phone_no:val})}  placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} />
            
          

            </View>



            {this.state.email?<View style={[styles.text_input,{borderColor:'#57b5b6',backgroundColor:"#57b5b6"}]}>
            <Feather name="mail" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput placeholder="Email" value={this.state.email} onChangeText={(val)=>this.setState({email:val})} selectionColor="white"  placeholderTextColor="#DBDBDB" style={{flex:1,color:"white"}} />
           

            </View>:null}



            <View style={[styles.text_input,{borderColor:'#57b5b6',backgroundColor:"#57b5b6"}]}>
            <AntDesign name="contacts" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput placeholder="Primary Contact" value={this.state.primary_contact} selectionColor="white" value={this.state.primary_contact} onChangeText={(val)=>this.setState({primary_contact:val})} placeholderTextColor="#DBDBDB" style={{flex:1,color:"white"}} />
           
          
            
            </View>

            {this.state.user.role == 'seller'?<View style={{ borderWidth:1,borderColor:'#57b5b6',backgroundColor:'#57b5b6',borderRadius:5,marginTop:20,width:Dimensions.get('window').width*2/2.5,height:50}}>

                <Picker

                selectedValue={this.state.make_your_product_visible_to_everyone}
                onValueChange={(val)=>{this.setState({make_your_product_visible_to_everyone:val})}}
                style={{color:'white'}}
                mode="dropdown">
                <Picker.Item label="Make Your Product Visible To Every One" value='' />

                <Picker.Item label="Yes" value={1} />
                <Picker.Item label="No" value={0} />
                

              

                </Picker>

                </View>:null}



            <View style={[styles.text_input,{borderColor:'#57b5b6',backgroundColor:"#57b5b6"}]}>
            <Entypo name="location-pin" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput  placeholder="Postal" value={this.state.postal_code} selectionColor="white"  onChangeText={(val)=>this.setState({postal_code:val})}  placeholderTextColor="white" style={{flex:1,color:'white'}} />
           
           

            </View>



            <TouchableOpacity onPress={this.UpdateProfile} style={[styles.submit_btn,{marginBottom:20,flexDirection: 'row',borderColor:'#57b5b6',backgroundColor:'#57b5b6'}]} >
                {this.state.form_loading?<ActivityIndicator size="large" color="white" style={{alignSelf:'center'}} />:null}
                <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Update  {' >'} </Text>
            </TouchableOpacity>

            </SafeAreaView>
        </ScrollView>
        )
    }else{
        return <ActivityIndicator size="large" color="#57b5b6" style={{alignSelf:'center',marginTop:30}}/>
    }

    }
}

export default EditProfile