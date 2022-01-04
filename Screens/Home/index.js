import React from 'react';
import {View,Text,Button,FlatList,TextInput, ActivityIndicator,TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Product from './Product';
import Feather from 'react-native-vector-icons/Feather'
import styles from '../Styles/Home_Style'
import  Axios  from 'axios';
import base_url from '../../base_url';
class Home extends React.Component {
    state = {
        data:[],
        isLoading:true,
        network_error:false,
        offset:0,
        refreshing:false,
        prev_length:0,
        is_searching:false,
        search:'',
        search_data:[]
    }

    getAllPosts = async()=>{
        
       
        const user = await AsyncStorage.getItem("user")
        

        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/get_all_products?my_id='+parse.id+'&&offset='+this.state.offset)
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

    Search_Products = async(search)=>{

        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        
        Axios.get(base_url+'/apis/search_product?search='+search+'&&my_id='+parse.id+"&&offset="+this.state.offset)
        .then(res=>{
            console.log('this is the length '+res.data.products.length)
            this.state.search_data.filter(i=>{
                res.data.products.filter(p=>{
                    if(i.product_id == p.product_id){
                      this.setState({search_data:[]})
                    }
                })
            })

            this.setState({search_data:[...this.state.search_data,...res.data.products],isLoading:false,refreshing:false,prev_length:res.data.products.length});

          
            if(this.state.prev_length==0){
                this.setState({offset:this.state.offset-5})
                console.log("lower"+this.state.offset)
            }
        })
    }

    

    handleLoadMore = ()=>{
      

        if(this.state.prev_length >0 && this.state.prev_length <=5 ){

            this.setState({refreshing:true,offset:this.state.offset+5,})
           
                this.getAllPosts()

          
        }
   
        
    }

    SearchLoadmore = ()=>{
        if(this.state.prev_length >0 && this.state.prev_length <=5 ){

            this.setState({refreshing:true,offset:this.state.offset+5,})
            this.Search_Products(this.state.search)
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
        Axios.get(base_url+'/apis/get_all_products?my_id='+parse.id+'&&offset='+this.state.offset)
        .then(res=>{
             
            this.setState({data:res.data.products,isLoading:false,refreshing:false,});
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

        
            return (
                <View style={{flex:1}}>
                <View style={styles.search_input}>
                    <Feather name="search" style={styles.search_icon} color="#57b5b6" size={25}/>
                    <TextInput  onChangeText={value => {
                    if(value.length >0){
                        this.setState({is_searching:true,isLoading:true,search:value,data:[]});
                        this.Search_Products(value)

                    }else{
                        this.setState({is_searching:false,offset:0,isLoading:true,search:value,search_data:[],data:[]});
                        this.getAllPosts()
                    }
                    
                    } } placeholder="Search Product"  selectionColor="#57b5b6" placeholderTextColor="#57b5b6" style={{flex:1,color:'black'}} 
                    />
                    </View>
    
    
                
                    {this.state.isLoading == false?<FlatList 
                    
                    data={this.state.is_searching?this.state.search_data:this.state.data} 
                    onEndReached={this.state.is_searching == false?this.handleLoadMore:this.SearchLoadmore}
                    onEndReachedThreshold={.1}
                    ListFooterComponent={this.renderFooter}
                    refreshing={this.state.isLoading}
                    keyExtractor={item=>item.product_id}
                    
                    onRefresh={this.handleRefresh}
                    renderItem={({item,index})=>(
                       
                        <Product key={index} navigation={this.props.navigation} data={item}/>
                    
                    )}
                    />:<ActivityIndicator size="large" color="#57b5b6" style={{alignSelf:'center',marginTop:50}}/>}
               
               
                   
              
                
                
                
                </View>
            )
        
       
    }else{
        return(
            <View style={{alignSelf:'center',marginTop:50,alignItems: 'center'}}>
            <Text style={{fontSize:17,fontWeight:"bold",textAlign:'center'}}>Something Went Wrong</Text>
            <TouchableOpacity onPress={()=>{
                this.setState({isLoading:true,offset:0,network_error:false})
                this.onRefreshgetposts()
            }} style={{marginTop:10,alignSelf:'center'}}>
                <Text>Click Here To Try Again</Text>
            </TouchableOpacity>
            </View>
        )
    }
}

}


export default Home