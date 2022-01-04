import React from 'react';
import {View,Text,Button,TouchableOpacity,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../Styles/Home_Style'
import  Axios  from 'axios';
import base_url from '../../base_url';
class Profile extends React.Component {
    state = {
        user_id:'',
        user:'',
        isLoading:true,
        network_error:false,
    }
    getUserInfo = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
        this.setState({user_id:parse.id})
        Axios.get(base_url+'/apis/profile?user_id='+parse.id)
        .then(res=>{
            
            this.setState({user:res.data.user},()=>{
                this.setState({isLoading:false})
            })
        })
        .catch(err=>{
            this.setState({isLoading:false,network_error:true})
        })

    }
    Signout = async()=>{
    await AsyncStorage.removeItem('user')
    this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'auth', screen: 'signin' }]
    });
    }
    componentDidMount(){
        this.getUserInfo()
    }
    render(){
        if(this.state.network_error == false){

            if(this.state.isLoading == false){
        return (
            <View style={{flex:1,alignItems: 'center'}}>

            <ScrollView style={{flex:1,width:'100%'}}> 
            <View style={{width: '100%',backgroundColor:'white',justifyContent:'center',alignItems: 'center',padding:20}}>

            <FontAwesome name="user-circle-o" size={100} color="#57b5b6"/>
            <Text style={{color:'black',fontWeight:'bold',fontSize:25}}>{this.state.user.role == 'seller'?this.state.user.companyname:this.state.user.firstname+' '+this.state.user.lastname}</Text>
            </View>


            <TouchableOpacity onPress={()=>this.props.navigation.navigate("EditProfile",{user_id:this.state.user_id})} style={styles.profile_screen_card} >
            <FontAwesome name="user-circle-o" size={25} color="#57b5b6" style={{marginLeft:'5%'}}/>
                    
            <Text style={{ fontSize:16,fontWeight:'bold',color:'#57b5b6',marginLeft:'5%'}}>Profile</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={()=>this.props.navigation.navigate('MyCart')} style={styles.profile_screen_card} >
            <FontAwesome name="shopping-cart" size={25} color="#57b5b6" style={{marginLeft:'5%'}}/>
                    
            <Text style={{ fontSize:16,fontWeight:'bold',color:'#57b5b6',marginLeft:'5%'}}>My Cart</Text>
            </TouchableOpacity>

            {this.state.user.role == 'seller'?<TouchableOpacity onPress={()=>this.props.navigation.navigate('Pending Orders From Buyer')}  style={styles.profile_screen_card} >
            <FontAwesome5 name="clipboard-list" size={25} color="#57b5b6" style={{marginLeft:'5%'}}/>
                    
            <Text style={{ fontSize:16,fontWeight:'bold',color:'#57b5b6',marginLeft:'5%'}}>Pending Orders From Buyer</Text>
            </TouchableOpacity>:null}

            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Favorite Products')}  style={styles.profile_screen_card} >
            <FontAwesome name="heart" size={25} color="#57b5b6" style={{marginLeft:'5%'}}/>
                    
            <Text style={{ fontSize:16,fontWeight:'bold',color:'#57b5b6',marginLeft:'5%'}}>My Favorite products</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={()=>this.props.navigation.navigate('PlacedOrders')}  style={styles.profile_screen_card} >
            <FontAwesome5 name="clipboard-list" size={25} color="#57b5b6" style={{marginLeft:'5%'}}/>
                    
            <Text style={{ fontSize:16,fontWeight:'bold',color:'#57b5b6',marginLeft:'5%'}}>Your Placed Orders</Text>
            </TouchableOpacity>


            {this.state.user.role == 'seller'?<TouchableOpacity onPress={()=>this.props.navigation.navigate('MyProducts')}  style={styles.profile_screen_card} >
            <FontAwesome name="product-hunt" size={25} color="#57b5b6" style={{marginLeft:'5%'}}/>
                    
            <Text style={{ fontSize:16,fontWeight:'bold',color:'#57b5b6',marginLeft:'5%'}}>My Products</Text>
            </TouchableOpacity>:null}

            <TouchableOpacity onPress={this.Signout} style={[styles.profile_screen_card,{marginBottom:30}]} >
            <Feather name="log-out" size={25} color="#57b5b6" style={{marginLeft:'5%'}}/>
                    
            <Text style={{ fontSize:16,fontWeight:'bold',color:'#57b5b6',marginLeft:'5%'}}>Sign out</Text>
            </TouchableOpacity>

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
                    this.get_all_orders()
                }} style={{marginTop:10,alignSelf:'center'}}>
                    <Text>Click Here To Try Again</Text>
                </TouchableOpacity>
                </View>
            )
        }
    }
}


export default Profile