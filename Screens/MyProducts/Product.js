import React from 'react';
import {View,Text,TouchableOpacity,Image, Alert} from 'react-native'
import styles from '../Styles/Home_Style'
import Tag from './Tag';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import base_url from '../../base_url'
import { Axios } from 'axios';
class Product extends React.Component {
   
   delete_product = ()=>{
       Axios.get(base_url+'/apis/delete_product?id='+this.props.data.product_id)
       .then(res=>{
           this.props.get_all_products()
       })
       .catch(err=>{
           Alert.alert("Something Went Wrong")
       })
   }
    render(){
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Product',{is_cart:true,posted_by:this.props.data.posted_by,product_id:this.props.data.product_id,})} style={styles.product_container}>

              <View style={styles.product_container_top}> 

              <TouchableOpacity onPress={()=>this.props.navigation.navigate('ViewAnotherUserProfile',{posted_by:this.props.data.posted_by})} style={{flexDirection:'row'}}>
              <Image source={require('../../Assets/logo.png')} style={{width:30,height:30,borderRadius:30}}/>
              <Text style={{color:'black',fontWeight:'bold',left:10}}>{this.props.data.companyname}</Text>
              </TouchableOpacity>

                <View >
                <Text style={{color:'gray',}}>{this.props.data.posted_date}</Text>
                </View>

                <TouchableOpacity onPress={this.delete_product}>
                    <FontAwesome name="trash" color="red" size={25}/>
                </TouchableOpacity>
            </View> 


            <View style={styles.product_container_image}>
            <Image source={{uri:base_url+'/static/uploads/'+this.props.data.product_picture1}} style={{width:'100%',height:120,borderRadius:3}}/>
            
            </View>

            <View style={{flexDirection:'row',justifyContent: 'space-between',width:'100%',padding:10,marginTop:4}}>
            <Text style={styles.product_container_title}>{this.props.data.product_name}</Text>

           
            </View>

            <View style={{flexDirection:'row'}}>
            {this.props.data.tags.split(',').map((tag)=>(
                <Tag tag={tag}/>
              
            ))}
            

            </View>
           
           <Text style={{borderColor:'gray',borderWidth:.2,height:.5,width:'100%',marginTop:10}}></Text>

            <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                <Entypo name="shopping-cart" size={25} color="#57b5b6"/>
                <Text style={{fontSize:18,color:'black'}}> {this.props.data.price} rup</Text>
                </View>

               
            </View>


            </TouchableOpacity>
        )
    }
}

export default Product