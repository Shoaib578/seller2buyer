import React from 'react';
import {View,Text,TouchableOpacity,Dimensions,Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../../Styles/SignupStyle';

class Signup extends React.Component {
    render(){
        return(
            <View style={styles.container}>
             

                <TouchableOpacity onPress={()=>this.props.navigation.navigate('i_am_seller',{category: 'seller'})} style={[styles.i_am_seller_btn,{marginTop:35}]} >
                    <Feather name="user" color="white" size={25}/>
                    <Text style={{ color:'white',fontSize:16,fontWeight:'bold',left:10 }}>I Am Seller</Text>
                </TouchableOpacity>


                <TouchableOpacity  onPress={()=>this.props.navigation.navigate('i_am_buyer',{category: 'buyer'})} style={[styles.i_am_buyer_btn,{marginTop:32}]} >
                    <Feather name="user" color="white" size={25}/>
                    <Text style={{ color:'white',fontSize:16,fontWeight:'bold',left:10 }}>I Am Buyer</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Signup