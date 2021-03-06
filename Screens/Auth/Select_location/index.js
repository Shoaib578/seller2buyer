import React from 'react';
import {View,Text,TouchableOpacity,Dimensions,Image,Alert} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign'
import styles from '../../Styles/GetStartStyle'

import {Picker} from '@react-native-picker/picker';
import  Axios  from 'axios';
import base_url from '../../../base_url'
class SelectLocation extends React.Component {
    state = {
        country:'',
        countries:[]
    }
    get_all_countries = ()=>{
        Axios.get(base_url+'/apis/get_all_countries')
        .then(res=>{
            this.setState({countries:res.data.countries})
        })
    }

    componentDidMount(){
        this.get_all_countries()
    }
    render(){
        return (
            <View style={styles.Select_location_container}>
                         <Image source={require('../../../Assets/logo.png')} style={{width:'100%', height:100,marginTop:80}}/>

             <Text style={{color:'white',fontSize:20,marginTop:30}}>Select Location</Text>
                <Text style={{color:'white',width:'80%',height:.6,borderColor:'white',borderWidth:.6,marginTop:20}}></Text>
           
                
                
                <View style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#57b5b6',borderWidth:.5,marginTop:2,color:'white',backgroundColor:'#57b5b6',fontSize:15}}>

                <Picker
                selectedValue={this.state.country}
                style={{color:'white'}}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({country: itemValue})
                }>
                <Picker.Item label="Select Country" />
                {this.state.countries.map((data,index)=>(
                <Picker.Item key={index} label={data.name} value={data.name} />

                ))}
                
                </Picker>
                </View>

                <Text style={{color:'white',width:'80%',height:.6,borderColor:'white',borderWidth:.6,marginTop:2}}></Text>

                <TouchableOpacity onPress={()=>{
                    if(this.state.country.length>0){
                        this.props.navigation.navigate('signin',{country:this.state.country})
                    }else{
                        return Alert.alert("Please Select Your Country")
                    }
                }} style={[styles.proceed_btn,{marginTop:30}]} >
                    
                    <Text style={{ color:'white',fontSize:16,fontWeight:'bold',left:10 }}>Proceed</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

export default SelectLocation