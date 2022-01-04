import React from 'react';
import {View,Text,ScrollView,TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import Feather from 'react-native-vector-icons/Feather'
import styles from '../Styles/Home_Style'
import Order from './Order';
import base_url from '../../base_url';
import Axios from 'axios'
class PlacedOrders extends React.Component {
    state = {
        data:[],
        isLoading:true,
        network_error:false
    }

    get_all_orders = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+"/apis/my_placed_orders?my_id="+parse.id)
        .then(res=>{
            console.log(res.data)
            this.setState({data:res.data.placed_orders},()=>{

                this.setState({isLoading:false})
            })
        })
        .catch(err=>{
            this.setState({isLoading:false,network_error:true})
        })
    }

    componentDidMount(){
        this.get_all_orders()
    }
    render(){
        if(this.state.network_error == false){

        if(this.state.isLoading == false){
        return(
        <View style={{flex:1}}>
            <FlatList 
                data={this.state.data} 
                keyExtractor={item=>item.placed_order_id}
               
                renderItem={({item})=>(
                    <Order key={item.placed_order_id} get_all_orders_func={this.get_all_orders} navigation={this.props.navigation} data={item}/>

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
                    this.get_all_orders()
                }} style={{marginTop:10,alignSelf:'center'}}>
                    <Text>Click Here To Try Again</Text>
                </TouchableOpacity>
                </View>
            )
        }
    }
 }

 export default PlacedOrders;