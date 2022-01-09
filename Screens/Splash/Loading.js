import React from 'react';
import {View,Text,StyleSheet,ImageBackground,Image,Dimensions} from 'react-native';

class Loading extends React.Component {
    render(){
        return (
         <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor:'#57b5b6'}}>
           <Image source={require('../../Assets/logo.png')} style={{width:'100%', height:100}}/>

         </View>
            
        )
    }
}

export default Loading