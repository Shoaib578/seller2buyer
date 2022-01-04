import React from 'react';
import {View,Text,Button,FlatList,TextInput, ActivityIndicator, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Product from './Product';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../Styles/Home_Style';
import Axios from 'axios';
import base_url from '../../base_url';
class MyCart extends React.Component {
    state = {
        data:[],
        isLoading:true,
        network_error:false,
        first_time_place_order:true,
        place_order_loading:false,
        cart_length:0
     }

     getCartProducts = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/get_cart_products?user_id='+parse.id)
        .then(res=>{
          
           
            this.setState({data:res.data.cart})

            res.data.cart.map(c=>{
                console.log(c)

                if(c.is_placed == 0){
                 this.setState({cart_length:this.state.cart_length+1})
                }
            })

            this.setState({isLoading:false})

        })
        .catch(err=>{
            this.setState({isLoading:false,network_error:true})
        })
     }


     

     place_order = async()=>{
         const user = await AsyncStorage.getItem('user')
         const parse = JSON.parse(user)
         this.setState({place_order_loading:true})
         this.state.data.map(data=>{
            Axios.get(base_url+'/apis/place_order?placed_by='+parse.id+"&&cart_id="+data.cart_id+"&&owner_id="+data.posted_by+"&&product_id="+data.product_id+"&&address="+parse.primary_contact)
            .then(res=>{
                if(this.state.first_time_place_order == true){
                    this.setState({first_time_place_order:false,cart_length:0,isLoading:true})
                    this.getCartProducts()
                  
                   Alert.alert(res.data.msg)
   
                }
                this.setState({place_order_loading:false})

            })
            .catch(err=>{
                if(this.state.first_time_place_order == true){
                    this.setState({place_order_loading:false})

                    this.setState({first_time_place_order:false})
                     Alert.alert(err)
                }
            })
         })
         
     }

     componentDidMount(){
         this.getCartProducts()
     }
    render(){
        if(this.state.isLoading == false){
            if(this.state.data.length>0){

            return (
                <ScrollView style={{flex:1}}>
               
    
                
              {this.state.data.map(data=>{
                  if(data.is_placed == 0){
                    
                  return (
                    <Product key={data.cart_id} get_products_func={this.getCartProducts} navigation={this.props.navigation} data={data}/>
    
                  )
                }else{
                    return null
                }

              })}
               
               
                {this.state.place_order_loading?<ActivityIndicator size="large" color="#57b5b6" style={{alignSelf:'center',}}/>:null}
              
               {this.state.cart_length>0? <TouchableOpacity onPress={this.place_order} style={styles.placeOrderbtn}>
                    <Text style={{color:'white',}}>Place Order</Text>
                </TouchableOpacity>:null}
                
                
                </ScrollView>
            )
        }else{
            return(
                <View style={{alignSelf:'center',marginTop:50}}>
                    <Text style={{color:'red',fontSize:20}}>Dont Have Any Cart Yet!</Text>
                </View>
            )
        }

        }else{
            return <ActivityIndicator size="large" color="#57b5b6" style={{alignSelf:'center',marginTop:50}}/>
        }
        
    }
}


export default MyCart