import React from 'react'
import {View,Text,Dimensions,TextInput, ActivityIndicator, Alert} from 'react-native'

import ReadMore from '@fawazahmed/react-native-read-more';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styles from '../Styles/Home_Style'

import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios';
import base_url from '../../base_url';


export default class Heart extends React.Component {
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
        formData.append("product_id",this.props.product_id)
        Axios.post(base_url+'/apis/make_product_favorite',formData)
        .then(res=>{
            console.log(res.data.msg)
        })

    }


    componentDidMount(){
        
        if(this.props.is_favorite == 1){
            this.setState({is_favorite:true})
        }else{
            this.setState({is_favorite:false})

        }


        
    }
    render(){
        return(
            <TouchableOpacity onPress={this.MakeitFavorite}>
                <AntDesign name="heart" color={this.state.is_favorite?'red':'black'} size={26}/>
            </TouchableOpacity>
        )
    }
}