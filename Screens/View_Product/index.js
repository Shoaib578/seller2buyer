import React from 'react'
import {View,Text,Dimensions,TextInput, ActivityIndicator, Alert} from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
import ReadMore from '@fawazahmed/react-native-read-more';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styles from '../Styles/Home_Style'
import Tag from '../Home/Tag'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios';
import base_url from '../../base_url';
import Heart from './Heart';

const {width} = Dimensions.get('window');
const height = width*100/180
class ViewProduct extends React.Component {
    state = {
        is_favorite:false,
        tags:"Shoe red",
        data:[],
        isLoading:true,
        quantity:0,
        quantit_btn_available:false,
        page:0,
        my_id:'',
    }

    add_to_cart = async()=>{
        this.setState({quantit_btn_available:true})

        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
        if(this.state.quantity >0){

        let formData = new FormData()
        formData.append('product_id',this.props.route.params.product_id)
        formData.append('user_id',parse.id)
        formData.append('quantity',this.state.quantity)
        Axios.post(base_url+'/apis/add_to_cart_product',formData)
        .then(res=>{
            this.setState({quantity:0,quantit_btn_available:false})
            Alert.alert(res.data.msg)
           
        })
        .catch(err=>{
            Alert.alert(err)
        })
    }else{
        Alert.alert('Quantity Field is required')
    }

    }

    getPostDetails = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
        this.setState({my_id:parse.id})
       
        Axios.get(base_url+'/apis/view_product?product_id='+this.props.route.params.product_id+"&&my_id="+this.props.route.params.posted_by)
        .then(res=>{
            
            this.setState({data:res.data.product},()=>{
                this.setState({isLoading:false})
            })
        })
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
        formData.append("product_id",this.props.route.params.product_id)
        Axios.post(base_url+'/apis/make_product_favorite',formData)
        .then(res=>{
            console.log(res.data.msg)
        })

    }



    componentDidMount(){
        this.getPostDetails()
        

    }
    render(){
        if(this.state.isLoading == false){
            return <View>

        {this.state.data.map(data=>{
            return(
                <ScrollView key={data}>
                    <SliderBox
                    images={[
                        {uri:base_url+'/static/uploads/'+data.product_picture1},
                        {uri:base_url+'/static/uploads/'+data.product_picture2},
                        {uri:base_url+'/static/uploads/'+data.product_picture3},

    
                    ]}
                    dotColor="black"
                    sliderBoxHeight={height}
                    onCurrentImagePressed={index =>
                        console.warn(`image ${index} pressed`)
                    }
                    autoplay
                    circleLoop
                    parentWidth={width}
                    />
    
                <View style={{flexDirection:'row',padding:10}}>
                {data.tags?data.tags.split(',').map((tag)=>(
                    <Tag key={tag} tag={tag}/>
                  
                )):null}
                
    
                </View>
    
    
                   
                    <Text style={{fontSize:18,fontWeight:'bold',color:'black',padding:10,marginLeft:7}}>{data.product_name}</Text>
    
                    {data.posted_by != this.state.my_id?<View style={{left:'85%'}}  >
                    <Heart product_id={data.product_id} is_favorite={data.is_favorite}/>

    
                    </View>:null}
                   
    
                    <View style={{ marginLeft:Dimensions.get('window').width*2/40 }}>
                    <Text style={{ fontWeight:'bold',fontSize:16 }}>Details</Text>
    
                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>Price</Text>
                    <Text style={{ right:20,fontSize:15 }}>{data.price} rup</Text>
                    </View>
    
    
    
                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>SKU Code</Text>
                    <Text style={{ right:20,fontSize:15 }}>{data.sku_code} </Text>
                    </View>
    
    
    
                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>HSN Code</Text>
                    <Text style={{ right:20,fontSize:15 }}>{data.hsn_code}</Text>
                    </View>
    
                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>Tax Tier</Text>
                    <Text style={{ right:20,fontSize:15 }}>{data.tax_tier}</Text>
                    </View>
    
    
    
                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>Stock Keeping Unit</Text>
                    <Text style={{ right:20,fontSize:15 }}>{data.stock_keeping_unit}</Text>
                    </View>
    
                   
    
                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>Ordering unit</Text>
                    <Text style={{ right:20,fontSize:15 }}>{data.order_unit}</Text>
                    </View>
    
    
                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>Category</Text>
                    <Text style={{ right:20,fontSize:15 }}>{data.category}</Text>
                    </View>
    
    
                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>Minimum order quantity</Text>
                    <Text style={{ right:20,fontSize:15 }}>{data.moq}</Text>
                    </View>
    
                   </View>
                    
    
                    <View style={{padding:15,width:'95%'}}>
                    <Text style={{fontWeight:'bold',color:'#57b5b6'}}>Description : </Text>
                    <ReadMore numberOfLines={3} seeMoreStyle={{color:'#57b5b6'}} seeLessStyle={{color:'#57b5b6'}} style={{fontSize:14}}>
                    {
                        data.product_description
                    }
                    </ReadMore>
                    </View>
                    
    
                   


                    {this.props.route.params.is_cart == false?<Text style={{marginLeft:10}}>Quantity*</Text>:null}
    
                    {this.props.route.params.is_cart == false?<View style={styles.text_input}>
                    <TextInput placeholder="" value={this.state.quantity.toString()} onChangeText={(val)=>this.setState({quantity:val})} keyboardType="numeric"  placeholderTextColor="black" style={{flex:1,color:'black'}} 
                    />
                    </View>:null}
    
                    {this.props.route.params.is_cart == false?<TouchableOpacity onPress={this.add_to_cart} disabled={this.state.quantit_btn_available} style={[styles.profile_screen_card,{justifyContent:'center',backgroundColor:'#57b5b6',marginBottom:50}]} >
                    <FontAwesome name="shopping-cart" size={25} color="white" style={{marginLeft:'5%'}}/>
                            
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'white',marginLeft:'5%'}}>Add To Cart</Text>
                    </TouchableOpacity>:null}
    
                </ScrollView>
            )

        })}    
            </View>
       
    }else{
        return(
            <ActivityIndicator size="large" color="#57b5b6" style={{alignSelf:'center',marginTop:50}}/>
        )
    }

    }
}

export default ViewProduct