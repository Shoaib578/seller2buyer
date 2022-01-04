import React from 'react';
import {View,Text,Button,TouchableOpacity, ScrollView,ActivityIndicator, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../Styles/Home_Style'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import  Axios  from 'axios';
import base_url from '../../base_url';
class Notifications extends React.Component {
    state = {
        data:[],
        isLoading:true,
        network_error:false
    }

    getAllNotifications = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/get_all_notifications?my_id='+parse.id)
        .then(res=>{
            console.log(res.data.notifications)
            this.setState({data:res.data.notifications},()=>{
                this.setState({isLoading:false})
            })
        })
        .catch(err=>{
            this.setState({isLoading:false})

        })
    }

    SeenAllNotifications = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/seen_all_notifications?my_id='+parse.id)
        .then(res=>{
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    Delete_Notification = (id)=>{
        Axios.get(base_url+'/apis/delete_notification?notification_id='+id)
        .then(res=>{
            console.log(res.data.msg)
            if(res.data.msg == "deleted"){
                this.getAllNotifications()
            }
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }

    componentDidMount(){
        this.getAllNotifications()
        this.SeenAllNotifications()
    }
    render(){
        if(this.state.network_error == false){

        if(this.state.isLoading == false){
            if(this.state.data.length>0){

        return (
            <ScrollView>
              {this.state.data.map(data=>{
                  return (

              <TouchableOpacity key={data.notification_id} style={styles.notification_card} >
                <View style={{flexDirection:'row'}}>

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('ViewAnotherUserProfile',{posted_by:data.notification_created_by,})} >
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'#57b5b6'}}>{data.firstname?data.firstname:data.companyname}</Text>

                    </TouchableOpacity>
                        
                <Text style={{ fontSize:14,color:'black',marginLeft:'5%'}}>{data.text}</Text>
                </View>

                <TouchableOpacity onPress={()=>this.Delete_Notification(data.notification_id)}>
                <FontAwesome name="close" size={25} color="red"/>
                </TouchableOpacity>

            </TouchableOpacity>
                  )

            })
            
            }


            
            
            </ScrollView>
        )
    }else{
        return(
            <View style={{marginTop:'30%',alignSelf:'center'}}>
                <Text style={{color:'black',fontWeight:'bold',fontSize:17}}>You Dont Have Any Notification yet</Text>
            </View>
        )
    }

        }else{
            return <ActivityIndicator size="large" color="#57b5b6" style={{alignSelf:'center',marginTop:50}}/>
        }

   
    }else{
        return(
            <View style={{alignSelf:'center',marginTop:50,alignItems: 'center'}}>
            <Text style={{fontSize:17,fontWeight:"bold",textAlign:'center'}}>Something Went Wrong</Text>
            <TouchableOpacity onPress={()=>{
                this.setState({isLoading:true,offset:0,network_error:false})
                this.onRefreshgetposts()
            }} style={{marginTop:10,alignSelf:'center'}}>
                <Text>Click Here To Try Again</Text>
            </TouchableOpacity>
            </View>
        )
    }

    }
}


export default Notifications