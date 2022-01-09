import React from 'react'
import {View,Text,ScrollView, SafeAreaView,Dimensions,TextInput,TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from '../Styles/SignupStyle'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'

import Foundation from 'react-native-vector-icons/Foundation'
import  Axios  from 'axios';
import base_url from '../../base_url';

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
        lastname:''
    }
    getUserInfo = ()=>{
        Axios.get(base_url+'/apis/profile?user_id='+this.props.route.params.user_id)
        .then(res=>{
              this.setState({user:res.data.user,
           
                companyname:res.data.user.companyname,
                firstname:res.data.user.firstname,
                lastname:res.data.user.lastname,
                email:res.data.user.email,
                phone_no:res.data.user.phone_no,
                primary_contact:res.data.user.primary_contact,
                postal_code:res.data.user.postal_code,

                isLoading:false})
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
           

            <Text style={{flex:1,color:'white',top:15}}>{this.state.companyname}</Text>
            </View>:
            
            <View style={[styles.text_input,{borderColor:'#57b5b6',backgroundColor:"#57b5b6"}]}>
            <Feather name="user" style={styles.phoneImageStyle} color="white" size={25}/>
            <Text style={{flex:1,color:'white',top:15}}>{this.state.firstname}</Text>

            </View>}


          

            <View style={[styles.text_input,{borderColor:'#57b5b6',backgroundColor:"#57b5b6"}]}>
            <Feather name="smartphone" style={styles.phoneImageStyle} color="white" size={25}/>
            
            <Text style={{flex:1,color:'white',top:15}}>{this.state.phone_no}</Text>

            </View>



            {this.state.email?<View style={[styles.text_input,{borderColor:'#57b5b6',backgroundColor:"#57b5b6"}]}>
            <Feather name="mail" style={styles.phoneImageStyle} color="white" size={25}/>
           
            <Text style={{flex:1,color:'white',top:15}}>{this.state.email}</Text>

            </View>:null}



            <View style={[styles.text_input,{borderColor:'#57b5b6',backgroundColor:"#57b5b6"}]}>
            <AntDesign name="contacts" style={styles.phoneImageStyle} color="white" size={25}/>
           
            <Text style={{flex:1,color:'white',top:15}}>{this.state.user.primary_contact}</Text>

            
            </View>



            <View style={[styles.text_input,{borderColor:'#57b5b6',backgroundColor:"#57b5b6"}]}>
            <Entypo name="location-pin" style={styles.phoneImageStyle} color="white" size={25}/>
           
            <Text style={{flex:1,color:'white',top:15}}>{this.state.user.postal_code}</Text>

            </View>



          

            </SafeAreaView>
        </ScrollView>
        )
    }else{
        return <ActivityIndicator size="large" color="#57b5b6" style={{alignSelf:'center',marginTop:30}}/>
    }

    }
}

export default EditProfile