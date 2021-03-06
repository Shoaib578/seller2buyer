import React from 'react';
import {View,Text,Button,FlatList, ActivityIndicator,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Product from './Product';
import base_url from '../../base_url'
import Axios from 'axios'
class MyProducts extends React.Component {
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
        Axios.get(base_url+'/apis/get_my_products?my_id='+parse.id+'&&offset='+this.state.offset)
        .then(res=>{

                console.log('this is the length '+res.data.products.length)
                console.log(res.data)
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

    get_all_products_by_deleting = ()=>{
        this.setState({isLoading:true,data:[]})
        this.getAllPosts()
    }

    onRefreshgetposts = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/get_my_products?my_id='+parse.id+'&&offset='+this.state.offset)
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
        console.log("My")
        this.getAllPosts()
    }

    render(){
        if(this.state.network_error == false){

        if(this.state.isLoading == false){

        return (
            <View>
            <FlatList 
            keyExtractor={item=>item}
            data={this.state.data} 
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={.1}
            ListFooterComponent={this.renderFooter}
            refreshing={this.state.isLoading}
                    
            onRefresh={this.handleRefresh}
            renderItem={({item,index})=>(
                <Product get_all_products={this.get_all_products_by_deleting} key={item.product_id} navigation={this.props.navigation} data={item}/>

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


export default MyProducts