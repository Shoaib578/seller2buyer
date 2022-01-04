import React from 'react';
import {View,Text,TouchableOpacity,Image, Alert} from 'react-native';
import styles from '../Styles/Home_Style'
import Tag from '../Home/Tag';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import base_url from '../../base_url'
import  Axios  from 'axios';
class Order extends React.Component {
    
    delete_order = ()=>{
        Axios.get(base_url+'/apis/delete_placed_orders?order_id='+this.props.data.placed_order_id)
        .then(res=>{
            console.log(res.data)
            this.props.get_all_orders_func()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }
    render(){
        return (
            <View  style={styles.order_container}>

                {this.props.data.is_accepted==0?<TouchableOpacity onPress={this.delete_order} style={{left:'90%'}}>
                <FontAwesome name="close" color="red" size={20}/>
                </TouchableOpacity>:null}

              <View style={styles.order_top}> 

           
             

              
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('ViewAnotherUserProfile',{posted_by:this.props.data.owner_id})} style={{flexDirection:'row'}}>
              <Image source={require('../../Assets/logo.png')} style={{width:30,height:30,borderRadius:30,borderColor:'black',borderWidth:1}}/>
              <Text style={{color:'black',fontWeight:'bold',left:10}}>{this.props.data.companyname}</Text>
              </TouchableOpacity>

                <Text style={{color:'gray',}}>Order Date {this.props.data.posted_date}</Text>


               


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
                <Text style={{color:'#57b5b6',fontWeight:'bold'}}>isAccepted : </Text>
                <Text >{this.props.data.is_accepted==0?'no':'yes'}</Text>

                </View>



                <View style={{flexDirection:'row',marginTop:5}}>
                <Text style={{color:'#57b5b6',fontWeight:'bold'}}>isCompleted : </Text>
               
                <Text >{this.props.data.is_completed==0?'no':'yes'}</Text>

                

                </View>

                <View style={{flexDirection:'row',marginTop:5}}>
                <Text style={{color:'#57b5b6',fontWeight:'bold'}}>isRejected : </Text>
               
                <Text >no</Text>

                

                </View>


                
          
            </View>

                
            </View>
        )
    }
}

export default Order