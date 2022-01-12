import React from 'react'
import {View,Text,TouchableOpacity,Dimensions,ScrollView,ActivityIndicator,Alert} from 'react-native'
import base_url from '../../base_url'
import  Axios  from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../Styles/Home_Style'
import Entypo from 'react-native-vector-icons/Entypo'
import RazorpayCheckout from 'react-native-razorpay';

export default class Subscriptions extends React.Component {
    state = {
        subscriptions:[],
        need_to_buy_subscription:false,
        my_subscription:[],
        is_loading:true
    }
    get_all_subscription = ()=>{
    Axios.get(base_url+'/apis/get_all_subscriptions')
    .then(res=>{
        console.log(res.data.subs)
        this.setState({subscriptions:res.data.subs})
    })
    }

    get_my_subscription = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/get_my_subscription?user_id='+parse.id)
        .then(res=>{
            this.setState({my_subscription:res.data.subscriptions})
        })
    }

    check_exist_subscription = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url +'/apis/check_my_subscription?my_id='+parse.id)
        .then(res=>{
            res.data.check.map(data=>{
                if(data.has_susbs == 0){
                    this.setState({need_to_buy_subscription:true,is_loading:false})
                    this.get_all_subscription()
                }else{
                    this.setState({need_to_buy_subscription:false})

                }
            })
        })
    }

    buy_subscription = async(duration)=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        let formData = new FormData()
        formData.append("user_id",parse.id)
        formData.append("duration",duration)
        Axios.post(base_url +'/apis/buy_subscription',formData)
        .then(res=>{
            this.check_exist_subscription()
            Alert.alert("You have bought Subscription Successfully")
            this.get_my_subscription()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }

    razor_pay = (amount,duration)=>{
        console.log('there')
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_fGtlLHUltQX5T4',
            amount: amount,
            name: 'Acme Corp',
            
          
            theme: {color: '#53a20e'}
          }
          RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
            this.buy_subscription(duration)
          }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
          });
    }

    componentDidMount(){
        this.check_exist_subscription()
        if(this.state.need_to_buy_subscription == false){
            this.get_my_subscription()
        }
    }
    render(){
        if(this.state.is_loading == false){

        if(this.state.need_to_buy_subscription){

        return (
            <ScrollView>
               
                <Text style={{textAlign: 'center',marginTop:30,fontSize:20}}>Need to buy subscription</Text>
                <Text style={{textAlign: 'center',marginTop:5}}>To be able to upload products</Text>
               

                    {this.state.subscriptions.map((data,index)=>(
                    <TouchableOpacity key={index} style={styles.product_container}>

                    <View style={{flexDirection:'row',justifyContent: 'space-between',width:'100%',padding:10,marginTop:4}}>
                    <Text style={styles.product_container_title}>{data.duration} Days Subscription</Text>


                    </View>

                <Text style={{borderColor:'gray',borderWidth:.2,height:.5,width:'100%',marginTop:10}}></Text>

                <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                <Entypo name="shopping-cart" size={25} color="#57b5b6"/>
                <Text style={{fontSize:18,color:'black'}}> {data.price} rup</Text>
                </View>

                

                </View>

                <TouchableOpacity onPress={()=>this.razor_pay(data.price,data.duration)}  style={styles.accept_order_btn}>
                     <Text style={{color:'white',}}>Buy Now</Text>
                </TouchableOpacity>
                </TouchableOpacity>
                
                
                    ))}





            </ScrollView>
        )
    }else{
        return <View style={{alignItems: 'center',marginTop:30}}>
            <Text>Already Have An Subscription</Text>

            <ScrollView>
            {this.state.my_subscription.map((data,index)=>(
                    <TouchableOpacity key={index} style={[styles.product_container,{width:Dimensions.get('window').width*2/2.2,}]}>

                    <View style={{flexDirection:'row',justifyContent: 'space-between',width:'100%',padding:10,marginTop:4}}>
                    <Text style={styles.product_container_title}>{data.remaing_time} Days Remaining In Your Subscription Expiration</Text>


                    </View>

                <Text style={{borderColor:'gray',borderWidth:.2,height:.5,width:'100%',marginTop:10}}></Text>

              

              
                </TouchableOpacity>
                
                
                    ))}
            </ScrollView>
        </View>
    }

    

}else{
    return(
        <ActivityIndicator size="large" color="#57b5b6" style={{alignSelf: 'center',marginTop:50}} />
    )
}
}

}