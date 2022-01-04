import React from 'react';
import {View,Text,TouchableOpacity,Image, Alert} from 'react-native'
import styles from '../Styles/Home_Style'
import Tag from './Tag';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import base_url from '../../base_url';
import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios';

class Product extends React.Component {
    state = {
        is_favorite:false
    }
    MakeitFavorite = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        if(this.state.is_favorite){
            this.setState({is_favorite:false})
        }else{
            this.setState({is_favorite:true})

        }

        let formData = new FormData()
        formData.append("my_id",parse.id)
        formData.append("product_id",this.props.data.product_id)
        Axios.post(base_url+'/apis/make_product_favorite',formData)
        .then(res=>{
            console.log(res.data.msg)
        })

    }
    componentDidMount(){
        
        if(this.props.data.is_favorite == 1){
            this.setState({is_favorite:true})
        }else{
            this.setState({is_favorite:false})

        }


        
    }
    removeCart = ()=>{
        
        Axios.get(base_url+'/apis/remove_product_from_cart?cart_id='+this.props.data.cart_id)
        .then(res=>{
            console.log('deleted')
            this.props.get_products_func()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
        
    }
    render(){
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Product',{posted_by:this.props.data.posted_by,product_id:this.props.data.product_id,is_cart:true})} style={styles.product_container}>

              <View style={styles.product_container_top}> 

              <TouchableOpacity onPress={()=>this.props.navigation.navigate('ViewAnotherUserProfile',{posted_by:this.props.data.posted_by,phone_no:this.props.data.phone_no,companyname:this.props.data.companyname})} style={{flexDirection:'row'}}>
              <Image source={require('../../Assets/logo.png')} style={{width:30,height:30,borderRadius:30}}/>
              <Text style={{color:'black',fontWeight:'bold',left:10}}>{this.props.data.companyname}</Text>
              </TouchableOpacity>

                <View >
                <TouchableOpacity onPress={this.removeCart} style={{left:50}}>
                <FontAwesome name="close" color="red" size={20}/>
                </TouchableOpacity>

                <Text style={{color:'gray',}}>{this.props.data.posted_date}</Text>

               
                </View>


            </View> 


            <View style={styles.product_container_image}>
            <Image source={{uri:base_url +'/static/uploads/'+this.props.data.product_picture1}} style={{width:'100%',height:120,borderRadius:3}}/>
            
            </View>

            <View style={{flexDirection:'row',justifyContent: 'space-between',width:'100%',padding:10,marginTop:4}}>
            <Text style={styles.product_container_title}>{this.props.data.product_name}</Text>

            <TouchableOpacity onPress={this.MakeitFavorite}>
                <AntDesign name="heart" size={25} color={this.state.is_favorite?'red':'black'}/>
            </TouchableOpacity>
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