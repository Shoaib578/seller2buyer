import React from 'react';
import {View,Text,Button,TouchableOpacity,Linking,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../Styles/Home_Style'
import Axios from 'axios' 
import base_url from '../../base_url'
class ViewAnotherUserProfile extends React.Component {
    state = {
        my_id:'',
        isLoading:true,
        network_error:false,
        phone_no:'',
        companyname:'',
    
        user:[]
    }
    openWhatsApp = ()=>{
        let url = "whatsapp://send?text=" +
          "Hello "+this.state.companyname +
          "&phone=" +
          this.state.phone_no;
        Linking.openURL(url)
          .then(data => {
            console.log("WhatsApp Opened successfully " + data);  //<---Success
          })
          .catch(() => {
            alert("Make sure WhatsApp installed on your device");  //<---Error
          });
    }

    getmy_id = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
        this.setState({my_id:parse.id})
    }

    getUserInfo = ()=>{
        Axios.get(base_url+'/apis/profile?user_id='+this.props.route.params.posted_by)
        .then(res=>{
            let user_data = []
            user_data.push(res.data.user)
            user_data.map(data=>{
                console.log('this is the company name'+data.companyname)
                this.setState({phone_no:data.phone_no,companyname:data.companyname})
            })
            console.log(res.data)
            this.setState({user:res.data.user},()=>{
                this.setState({isLoading:false})
            })
            
        })
        .catch(err=>{
            this.setState({isLoading:false,network_error:true})
        })
    }

    componentDidMount() {
        this.getmy_id()
        this.getUserInfo()
      
    }
    render(){
        if(this.props.route.params.posted_by != this.state.my_id){
            if(this.state.network_error == false){
            if(this.state.isLoading == false){

        return(
            <View style={{flex:1,alignItems: 'center'}}>

            <ScrollView style={{flex:1,width:'100%'}}> 
            <View style={{width: '100%',backgroundColor:'white',justifyContent:'center',alignItems: 'center',padding:20}}>

            <FontAwesome name="user-circle-o" size={100} color="#57b5b6"/>
            <Text style={{color:'black',fontWeight:'bold',fontSize:25}}>{this.state.companyname?this.state.companyname:this.state.user.firstname+' '+this.state.user.lastname}</Text>
            </View>


            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',padding:20}}>
            <TouchableOpacity onPress={this.openWhatsApp} style={styles.whatsAppBtn}>
            <FontAwesome name="whatsapp" color="white" size={20}/>
            <Text style={{left:10,color:'white'}}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Messages',{user_id:this.props.route.params.posted_by})} style={styles.chatBtn}>
            <AntDesign name="message1" color="white" size={20}/>
            <Text style={{left:10,color:'white'}}>Message</Text>

            </TouchableOpacity>
            </View>
           

            </ScrollView>

            </View>
        )
    }else{
        return <ActivityIndicator size="large" color="#57b5b6" style={{alignSelf:'center',marginTop:50}}/>
    }

    }else{
        return(
            <View style={{alignSelf:'center',marginTop:50,alignItems: 'center'}}>
            <Text style={{fontSize:17,fontWeight:"bold",textAlign:'center'}}>Something Went Wrong</Text>
            <TouchableOpacity onPress={()=>{
                this.setState({isLoading:true,network_error:false})
                this.getUserInfo()
            }} style={{marginTop:10,alignSelf:'center'}}>
                <Text>Click Here To Try Again</Text>
            </TouchableOpacity>
            </View>
        )
    }

    }else{
        return <View style={{alignSelf: 'center',marginTop:50}}>
            <Text style={{color:'black',fontWeight:'bold',fontSize:16}}>This Page Not Available For You</Text>
            <Text>because your are the owner of this product</Text>

        </View>
    }

    }
}

export default ViewAnotherUserProfile