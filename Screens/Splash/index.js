import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from 'react-native';
import Loading from './Loading'


class SplashScreen extends React.Component {

    state = {
        isLoggedIn:false,
      
      }

    isLoggedIn = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
      
        if(parse == null){
          this.setState({isLoggedIn:false})
        }else{
          this.setState({isLoggedIn:true})
        }
        
        setTimeout(()=>{
          if(this.state.isLoggedIn){
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'home', screen: 'Home' }]
            });
        }else{
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'auth', screen: 'select_location' }]
            });
        }
        },1000)
        

        
        }

componentDidMount(){
    this.isLoggedIn()

   
 
   
    
}

render(){
    
        
      return <Loading />
        
    }
    
}


export default SplashScreen