import React from 'react';
import {View,Text,Button,FlatList,ActivityIndicator,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Product from './Product';
import base_url from '../../base_url'
import Axios from 'axios'
class Favorites extends React.Component {
    state = {
        data:[],
        isLoading:true,
        network_error:false,
        offset:0,
        refreshing:false,
        prev_length:0,
    }

    getAllPosts = async()=>{
        
       
        const user = await AsyncStorage.getItem("user")
        

        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/get_all_my_favorite_product?my_id='+parse.id+'&&offset='+this.state.offset)
        .then(res=>{

                console.log('this is the length '+res.data.products.length)
                this.setState({data:[...this.state.data,...res.data.products],isLoading:false,refreshing:false,prev_length:res.data.products.length});
                if(this.state.prev_length==0){
                    this.setState({offset:this.state.offset-5})
                    console.log("lower"+this.state.offset)
                }
            
        })
        .catch(err=>{
            this.setState({isLoading:false,network_error:true});
        })
    

    }

    handleLoadMore = ()=>{
      

        if(this.state.prev_length >0 && this.state.prev_length <=5 ){

            this.setState({refreshing:true,offset:this.state.offset+5,})
            this.getAllPosts()
        }
   
        
    }

    renderFooter = ()=>{
        if(this.state.refreshing){
            
        return (
            <ActivityIndicator size="large" color="#57b5b6" style={{alignSelf:'center'}}/>
        )
    }else{
        return null
    }

    }

    onRefreshgetposts = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/get_all_my_favorite_product?my_id='+parse.id+'&&offset='+this.state.offset)
        .then(res=>{
             
            this.setState({data:res.data.products,isLoading:false,refreshing:false});
        })
        .catch(err=>{
            this.setState({isLoading:false,network_error:true});
        })
    }

    handleRefresh  =()=>{
        this.setState({isLoading:true,offset:0},()=>{
            this.onRefreshgetposts()
        })
    }

    componentDidMount(){
        this.getAllPosts()
    }




    render(){
        if(this.state.network_error == false){

            if(this.state.isLoading == false){
        return (
            <View>
            <FlatList 
            keyExtractor={(item)=>item.product_id}

            data={this.state.data} 
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={.1}
            ListFooterComponent={this.renderFooter}
            refreshing={this.state.isLoading}
            
            onRefresh={this.handleRefresh}
            renderItem={({item})=>(
                <Product navigation={this.props.navigation} get_products_func={this.handleRefresh} data={item}/>

            )}
            />
            
            
            <View style={{marginTop:20}}></View>
            </View>
        )
    }else{
        return <ActivityIndicator size="large" color="#57b5b6" style={{alignSelf:'center',marginTop:50}}/>

    }
    }else{
        return(
            <View style={{alignSelf:'center',marginTop:50,alignItems: 'center'}}>
            <Text style={{fontSize:17,fontWeight:"bold",textAlign:'center'}}>Something Went Wrong</Text>
            <TouchableOpacity onPress={()=>{
                this.setState({isLoading:true,network_error:false,offset:0})
                this.onRefreshgetposts()
            }} style={{marginTop:10,alignSelf:'center'}}>
                <Text>Click Here To Try Again</Text>
            </TouchableOpacity>
            </View>
        )
    }
    }
}


export default Favorites