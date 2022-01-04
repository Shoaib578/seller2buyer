import React from "react";
import { SafeAreaView, Text, FlatList, Image, View, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage'
import base_url from "../../base_url";
import Axios from 'axios'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
class ChatProfiles extends React.Component{

    state = {
        data:[],
        isLoading:true,
        netwok_error:false,
    }


    getRecentChats = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/get_recent_chats?my_id='+parse.id)
        .then(res=>{
            this.setState({data:res.data.recent_chats,isLoading:false})
        })
        .catch(err=>{
            this.setState({netwok_error:true,isLoading:false})
        })
    }

    componentDidMount(){
        this.getRecentChats()
    }


    render(){
        if(this.state.isLoading == false){

        return(
            <SafeAreaView style={styles.container}>
                <FlatList
                showsVerticalScrollIndicator={false}
                style={{height:'100%'}}
                data={this.state.data}
                keyExtractor={item=>item.recent_chat_id}
                renderItem={({item}) => (
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Messages',{user_id:item.recent_chat})}  style={styles.Profile}>
                        <View style={styles.ImageBorder}>
                        <FontAwesome size={50} name="user-circle-o" color="black"/>
                        </View>
                        <Text style={styles.Name}>{item.companyname?item.companyname:item.firstname+' '+item.lastname}</Text>
                    </TouchableOpacity>
                )}
                />
            </SafeAreaView>
        )
    }else{
        return <ActivityIndicator size="large" color="#57b5b6" style={{ marginTop:50 }}/>
    }

    }
}

export default ChatProfiles;