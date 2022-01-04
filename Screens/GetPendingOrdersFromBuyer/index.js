import React from 'react';
import {View,Text,ScrollView,TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import Feather from 'react-native-vector-icons/Feather'
import styles from '../Styles/Home_Style'
import Order from './Order';
import base_url from '../../base_url';
import  Axios  from 'axios';
class GetPendingOrdersFromBuyer extends React.Component {
    state = {
        data:[],
        isLoading:true,
        network_error:false,

    }
    getAllOrders = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url +"/apis/get_all_pending_orders_from_buyer?my_id="+parse.id)
        .then(res=>{
            this.setState({data:res.data.placed_orders},()=>{
                this.setState({isLoading:false})
            })
        })
        .catch(err=>{
            this.setState({network_error:false})
        })
    }

    componentDidMount(){
        this.getAllOrders()
    }
    render(){
        if(this.state.network_error == false){

            if(this.state.isLoading == false){
        return(
        <View style={{flex:1}}>
            <FlatList 
                keyExtractor={(item)=>item.placed_order_id}
                data={this.state.data} 
               
                renderItem={({item})=>(
                    <Order key={item.id} get_all_pending_orders_func={this.getAllOrders} navigation={this.props.navigation} data={item}/>

                )}
                />
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
                this.getAllOrders()
            }} style={{marginTop:10,alignSelf:'center'}}>
                <Text>Click Here To Try Again</Text>
            </TouchableOpacity>
            </View>
        )
    }
    }
 }

 export default GetPendingOrdersFromBuyer;