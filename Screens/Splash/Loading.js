import React from 'react';
import {View,Text,StyleSheet,ImageBackground,Image,Dimensions} from 'react-native';

class Loading extends React.Component {
    render(){
        return (
         <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor:'#57b5b6'}}>
             <Text style={{fontSize:40,color:'white',fontFamily:'san-serif'}}>S2B NOW</Text>
             <Text style={{ color:'white',fontSize:22 ,}}>SELLER TO BUYER MADE EASY</Text>

         </View>
            
        )
    }
}

export default Loading