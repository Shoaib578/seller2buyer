import React from 'react';

import { SafeAreaView, Text, FlatList, Image, View, TouchableOpacity, ScrollView,Dimensions,TextInput, Alert ,ActivityIndicator} from "react-native"
import styles from './styles'
import * as ImagePicker from "react-native-image-picker"
import Entypo from 'react-native-vector-icons/Entypo'
import  AntDesign from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base_url from '../../base_url';
import Axios from 'axios'
let flatlistref;
class Messages extends React.Component {
    state = {
        image:'',
        msg:"",
        messages:[],
        isLoading:true,
        network_error:false,
       
        my_id:''
    }
    pickImage =  () => {
        const options = {
            noData:true
          };
        ImagePicker.launchImageLibrary(options, response => {
           
            console.log("response", response);
            if(response.assets){
            
         response.assets.map(data=>{
        console.log(data);

         this.setState({image: data});
        })
        
      }
        })
    
     
      }

      SendMessage = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse  = JSON.parse(user)
        if(this.state.msg.length>0 || this.state.image.uri){
            let formData = new FormData()
            
            if(this.state.msg.length>0){

            formData.append("msg",this.state.msg)
            }

            if(this.state.image.uri){
                formData.append("image",{
                    name: this.state.image.fileName,
                    type: this.state.image.type,
                    uri: Platform.OS === 'ios' ? this.state.image.uri.replace('file://', '') : this.state.image.uri,
                  })
            }


            formData.append("inserted_by",parse.id)
            formData.append("msg_for",this.props.route.params.user_id)
           
            Axios.post(base_url+'/apis/send_message',formData)
            .then(res=>{
                this.setState({msg:'',image:''})
                flatlistref.scrollToEnd({ animated: true });
                this.getAllMessages()
            })
            .catch(err=>{
                Alert.alert("Something Went Wrong")
            })
        }
        
        
      }

      getAllMessages = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        this.setState({my_id:parse.id})
        Axios.get(base_url+'/apis/get_messages?my_id='+parse.id+"&&user_id="+this.props.route.params.user_id)
        
        .then(res=>{
            console.log(res.data.msgs)
            this.setState({messages:res.data.msgs,isLoading:false});
            
        })
      }
    


    
      componentDidMount(){
          this.getAllMessages()
          setInterval(()=>{
            this.getAllMessages()

          },10000)
      }
 
    render(){
        
        if(this.state.isLoading == false){
            return (
                <SafeAreaView style={styles.container}>
                  
    
                   <FlatList 
                        
                        
                        data={this.state.messages}
                        ref={(ref) => {
                            flatlistref = ref;
                          }}
                        keyExtractor={item=>item.message_id}
                        renderItem={({item})=>(
                        
    
                        
                       
                        <View style={item.reciever == this.state.my_id?styles.SecondMessageBox:styles.MessageBox}>
                            {item.media?
                            <Image source={{uri:base_url+'/static/message_images/'+item.media}} style={{ width:'100%',height:150,borderRadius:10, }}/>
                            :null}
                            <Text style={styles.MessageText}>{item.text}</Text>
                        </View>
                       
                      
    
    
                    )}
                    />
                   
    
            
    
                   
    
    
                        <View style={{width:Dimensions.get('window').width,height:50,padding:5,flexDirection:'row',backgroundColor:'#57b5b6',borderTopRightRadius:10,borderTopLeftRadius:10}}>
                            {this.state.image.uri?<Image source={{uri:this.state.image.uri}} style={{width:18,height:18,borderRadius:20,position:'absolute'}}/>:null}
                            <TouchableOpacity style={{left:10,top:10}} onPress={this.pickImage}>
                            <Entypo name="attachment" size={23} color="white" />
    
                            </TouchableOpacity>
    
                            
    
                            <View style={{borderWidth:1,borderColor:'white',position:'relative',borderRadius:5,width:Dimensions.get('window').width*2/2.8,marginLeft:25}}>
                            <TextInput placeholder="Message.." value={this.state.msg} placeholderTextColor='#7f7f7f' style={{color:'white',}} multiline={true}
                            textStyle={{ minHeight: 128 }}
                            numberOfLines={5}
                            onChangeText={(val)=>this.setState({msg:val})}
                            value={this.state.msg}
                            />
    
                            </View>
                          
                            <TouchableOpacity style={{left:13,top:10}} onPress={this.SendMessage}>
                            <AntDesign name="right" size={26} color="white" />
    
                            </TouchableOpacity>
    
                            </View>
                    
                </SafeAreaView>
            )
        }else{
            return <ActivityIndicator size="large" color="#57b5b6" style={{ marginTop:50 }}/>
        }

     
    }
}


export default Messages