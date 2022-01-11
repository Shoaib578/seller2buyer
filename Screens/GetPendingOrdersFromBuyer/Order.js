import React from 'react';
import {View,Text,TouchableOpacity,Image, Alert} from 'react-native';
import styles from '../Styles/Home_Style'
import Tag from '../Home/Tag';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import base_url from '../../base_url'
import Axios from 'axios'
class Order extends React.Component {


    accept_order = ()=>{
        Axios.get(base_url+'/apis/accept_order_from_buyer?order_id='+this.props.data.placed_order_id)
        .then(res=>{
            console.log(res.data.msg)
            this.props.get_all_pending_orders_func()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrongt")
        })
    }

    reject_order = ()=>{
        

        Axios.get(base_url+'/apis/reject_order_from_buyer?order_id='+this.props.data.placed_order_id)
        .then(res=>{
            console.log(res.data.msg)
            this.props.get_all_pending_orders_func()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrongt")
        })
    }

    complete_order = ()=>{
        
        Axios.get(base_url+'/apis/complete_order?order_id='+this.props.data.placed_order_id)
        .then(res=>{
            this.props.get_all_pending_orders_func()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }

    
  
    render(){
        return (
            <View  style={styles.order_container}>

              <View style={styles.order_top}> 

           

              
                

                <Text style={{color:'gray',}}>Order Date {this.props.data.posted_date}</Text>

                {this.props.data.is_accepted==0?<TouchableOpacity onPress={this.reject_order} style={{right:10}}>
                <FontAwesome name="close" color="red" size={20}/>
                </TouchableOpacity>:null}


               


            </View> 


            <View style={styles.product_container_image}>
            <Image source={{uri:base_url+'/static/uploads/'+this.props.data.product_picture1}} style={{width:'100%',height:120,borderRadius:3}}/>
            
            </View>

            <View style={{flexDirection:'row',justifyContent: 'space-between',width:'100%',padding:10,marginTop:4}}>
            <Text style={styles.product_container_title}>{this.props.data.product_name}</Text>

           
            </View>

           
           
           <Text style={{borderColor:'gray',borderWidth:.2,height:.5,width:'100%',marginTop:10}}></Text>

            <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                <Entypo name="shopping-cart" size={25} color="#57b5b6"/>
                <Text style={{fontSize:18,color:'black'}}> {this.props.data.price} rup</Text>
                </View>

            

            </View>

            <View style={{marginTop:20,padding:10}}>
                <Text>Details</Text>
                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#57b5b6',fontWeight:'bold'}}>Address : </Text>
                <Text >{this.props.data.placed_order_address} </Text>

                </View>



                <View style={{flexDirection:'row',marginTop:5}}>
                <Text style={{color:'#57b5b6',fontWeight:'bold'}}>Ordered By : </Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('ViewAnotherUserProfile',{posted_by:this.props.data.placed_by})}>
                <Text style={{color:'blue',fontWeight:'bold'}}>{this.props.data.firstname} {' '} {this.props.data.lastname}</Text>

                </TouchableOpacity>

                </View>


                {this.props.data.is_completed==0?  <View>
            {this.props.data.is_accepted==0?<TouchableOpacity onPress={this.accept_order} style={styles.accept_order_btn}>
                <Text style={{color:'white',}}>Accept</Text>
            </TouchableOpacity>:
            <TouchableOpacity onPress={this.complete_order} style={styles.accept_order_btn}>
            <Text style={{color:'white',}}>Complete Order</Text>
        </TouchableOpacity>
            
            }
            </View>: <Text style={{textAlign:'center',color:'green',marginTop:20,fontWeight:'bold',}}>Completed</Text>}    

            </View>

                
            </View>
        )
    }
}

export default Order