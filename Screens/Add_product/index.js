import React from 'react';
import {View,Text,Button, ScrollView, Dimensions,TextInput,TouchableOpacity,Image, ActivityIndicator, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from "react-native-image-picker"
import Tags from "react-native-tags";
import styles from '../Styles/Home_Style';
import  Axios  from 'axios';
import base_url from '../../base_url';


class AddProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product_image1:'',
      product_image2:'',
      product_image3:'',
      tags:[],
     
      category:'',
      product_name:'',
      product_description:'',
      quality_description:'',
      sku_code:'',
      hsn_code:'',
      tax_tier:'',
      ordering_unit:'',
      
      stock_keeping_unit_size:'',
      moq:'',
      price:'',
      subscription:false,
      all_categories:[],
      add_product_loading:false,
      isLoading:true
      }
      
      this.check_exist_subscription()
       
      this.getAllCategories()

  }
  




  check_exist_subscription = async()=>{
    const user = await AsyncStorage.getItem("user")
    const parse = JSON.parse(user)
    Axios.get(base_url +'/apis/check_my_subscription?my_id='+parse.id)
    .then(res=>{
        res.data.check.map(data=>{
            if(data.has_susbs == 1){
                this.setState({subscription:true})
                
            }else{
                this.setState({subscription:false})

            }
            this.setState({isLoading:false})
        })
    })
}

    pickImage1 =  () => {
        const options = {
            noData:true
          };
        ImagePicker.launchImageLibrary(options, response => {
           
            console.log("response", response);
            if(response.assets){
            
         response.assets.map(data=>{
        console.log(data);

         this.setState({product_image1: data});
        })
        
      }
        })
    
     
      }

      pickImage2 = async () => {
        const options = {
            noData:true
          };
        ImagePicker.launchImageLibrary(options, response => {
           
            console.log("response", response);
            if(response.assets){
            
         response.assets.map(data=>{
        console.log(data);

         this.setState({product_image2: data});
        })
        
      }
        })
     
      }


      pickImage3 = async () => {
        const options = {
            noData:true
          };
        ImagePicker.launchImageLibrary(options, response => {
           
            console.log("response", response);
            if(response.assets){
            
         response.assets.map(data=>{
        console.log(data);

         this.setState({product_image3: data});
        })
        
      }
        })
     
      }

      getAllCategories = ()=>{
        Axios.get(base_url+'/apis/get_all_categories')
        .then(res=>{
          this.setState({all_categories:res.data.all_categories})
        })
      }

      AddProduct = async()=>{
      
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
        if(this.state.product_name.length <1 || this.state.product_description.length<1 ||
           this.state.tax_tier.length<1  ||
            
             this.state.category.length<1 || 
            this.state.product_image1.length<1 || this.state.product_image2.length<1 || 
            this.state.product_image3.length<1 || this.state.price.length<1  
          
            ){
              Alert.alert("Please Fill All the Fields")
              return false;
        }


        this.setState({add_product_loading:true});
        
        
        let formData = new FormData()
        formData.append('posted_by',parse.id)
        formData.append("product_title",this.state.product_name)
        formData.append("product_description",this.state.product_description)
        
        formData.append("price",this.state.price)
        formData.append("sku_code",this.state.sku_code)
        formData.append("hsn_code",this.state.hsn_code)
        formData.append("category",this.state.category)
        formData.append("tax_tier",this.state.tax_tier)
        formData.append("stock_keeping_unit",this.state.stock_keeping_unit_size)
     
        formData.append("ordering_unit",this.state.ordering_unit)
        formData.append("moq",this.state.moq)
        formData.append("tags",this.state.tags.toString())
        formData.append("product_image1", {
          name: this.state.product_image1.fileName,
          type: this.state.product_image1.type,
          uri: Platform.OS === 'ios' ? this.state.product_image1.uri.replace('file://', '') : this.state.product_image1.uri,
        });
        formData.append("product_image2", {
          name: this.state.product_image2.fileName,
          type: this.state.product_image2.type,
          uri: Platform.OS === 'ios' ? this.state.product_image2.uri.replace('file://', '') : this.state.product_image2.uri,
        });

        formData.append("product_image3", {
          name: this.state.product_image3.fileName,
          type: this.state.product_image3.type,
          uri: Platform.OS === 'ios' ? this.state.product_image3.uri.replace('file://', '') : this.state.product_image3.uri,
        });

        Axios.post(base_url+'/apis/add_product',formData)
        .then(res=>{
       

        this.setState({add_product_loading:false});
        console.log(res.data.msg)
        if(res.data.msg == "success"){
          this.setState({
            product_image1:'',
            product_image2:'',
            product_image3:'',
            tags:[],
           
            category:'',
            product_name:'',
            product_description:'',
            quality_description:'',
            sku_code:'',
            hsn_code:'',
            tax_tier:'',
            ordering_unit:'',
           
            stock_keeping_unit_size:'',
            moq:'',
            price:'',
           
          })
          Alert.alert("Product Has Been Added")

        }

        })
        .catch(err=>{
          console.log(err)
          Alert.alert(err)

        })
      }


    render(){
      if(this.state.isLoading == false){

      if(this.state.subscription == true){

        return (
            <View  style={{marginTop:20,alignItems: 'center',flex:1}}>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
                
                
                   
                    <View style={{ flexDirection:'row',flexWrap:'wrap',justifyContent: 'space-between',marginTop:20 }}>
                    <TouchableOpacity onPress={this.pickImage1} style={{ borderWidth:1,borderColor:'#57b5b6',alignItems:'center',justifyContent:'center',padding:10,width:100,height:100,borderRadius:5 }}>
                    {this.state.product_image1.uri?<Image style={{width:90,height:90,borderRadius:5}} source={{uri: this.state.product_image1.uri}}/>:<Image style={{width:90,height:90,borderRadius:5}} source={require('../../Assets/pick_image.png')}/>}
                      
                    </TouchableOpacity>


                    <TouchableOpacity onPress={this.pickImage2} style={{ borderWidth:1,borderColor:'#57b5b6',alignItems:'center',justifyContent:'center',padding:10,width:100,height:100,borderRadius:5 }}>
                    {this.state.product_image2.uri?<Image style={{width:90,height:90,borderRadius:5}} source={{uri: this.state.product_image2.uri}}/>:<Image style={{width:90,height:90,borderRadius:5}} source={require('../../Assets/pick_image.png')}/>}
                    </TouchableOpacity>


                    <TouchableOpacity onPress={this.pickImage3} style={{ borderWidth:1,borderColor:'#57b5b6',alignItems:'center',justifyContent:'center',padding:10,width:100,height:100,borderRadius:5,marginRight:10 }}>
                        <Image source={this.state.product_image3.uri?{uri:this.state.product_image3.uri}:require('../../Assets/pick_image.png')} style={{width:90,height:90,borderRadius:5}}/>
                    </TouchableOpacity>

                    </View>
           
            <Text style={{ marginTop:20 }}>Category*</Text>

            <View style={{ borderWidth:1,borderColor:'#57b5b6',borderRadius:5,width:Dimensions.get('window').width*2/2.2,marginTop:7,height:50 }}>
            <Picker

            selectedValue={this.state.category}
            onValueChange={(val)=>{this.setState({category:val})}}

            mode="dropdown">
            <Picker.Item label="Select Category"  value=" " />

              {this.state.all_categories.map((data,index)=>(
            <Picker.Item label={data.category_name} key={index} value={data.category_name} />

              ))}


            </Picker>
            
            </View>



            <View>
                <Text style={{ marginTop:20 }}>Add name*</Text>

                <TextInput value={this.state.product_name} onChangeText={(val)=>this.setState({product_name:val})} placeholder=''   
                style={{ borderWidth:1,borderColor:'#57b5b6',borderRadius:5,width:Dimensions.get('window').width*2/2.2,padding:5,marginTop:10 }}
                />
             

                </View>


                <View>
                <Text style={{ marginTop:20 }}>Add Price*</Text>

                <TextInput value={this.state.price} keyboardType="numeric" onChangeText={(val)=>this.setState({price:val})} placeholder=''   
                style={{ borderWidth:1,borderColor:'#57b5b6',borderRadius:5,width:Dimensions.get('window').width*2/2.2,padding:5,marginTop:10 }}
                />
             

                </View>



            <View >
                <Text style={{ marginTop:20 }}>Describe What you are selling*</Text>

                <TextInput multiline = {true}
                onChangeText={(val)=>this.setState({product_description:val})}
                numberOfLines = {2}
                value={this.state.product_description}
                
                placeholder=''   
                style={{ borderWidth:1,borderColor:'#57b5b6',borderRadius:5,width:Dimensions.get('window').width*2/2.2,padding:5,marginTop:10 }}
             />
                    
            </View>


                <View>
                <Text style={{ marginTop:20 }}>Add SKU Code*</Text>

                <TextInput keyboardType='numeric' 
                onChangeText={(val)=>this.setState({sku_code:val})}
                value={this.state.sku_code}
                
                placeholder=''   
                style={{ borderWidth:1,borderColor:'#57b5b6',borderRadius:5,width:Dimensions.get('window').width*2/2.2,padding:5,marginTop:10 }}
                />
             

                </View>


                <View>
                <Text style={{ marginTop:20 }}>Add HSN Code*</Text>

                <TextInput keyboardType='numeric' 
                onChangeText={(val)=>this.setState({hsn_code:val})}
                value={this.state.hsn_code}

                placeholder=''   
                style={{ borderWidth:1,borderColor:'#57b5b6',borderRadius:5,width:Dimensions.get('window').width*2/2.2,padding:5,marginTop:10 }}
                />
             

                </View>

              


                <View>
                <Text style={{ marginTop:20 }}>Add Tax tier Code*</Text>

                <TextInput 
                onChangeText={(val)=>this.setState({tax_tier:val})}
                value={this.state.tax_tier}
                placeholder=''   
                style={{ borderWidth:1,borderColor:'#57b5b6',borderRadius:5,width:Dimensions.get('window').width*2/2.2,padding:5,marginTop:10 }}
                />
             

                </View>



               


                <Text style={{ marginTop:20 }}>Stock Keeping Unit Size*</Text>

                <View style={{ borderWidth:1,borderColor:'#57b5b6',borderRadius:5,width:Dimensions.get('window').width*2/2.2,marginTop:7,height:50 }}>
                <Picker

                selectedValue={this.state.stock_keeping_unit_size}
                onValueChange={(val)=>{this.setState({stock_keeping_unit_size:val})}}

                mode="dropdown">
                <Picker.Item label="Stock Keeping Unit Size" value='' />

                <Picker.Item label="S" value='S' />
                <Picker.Item label="M" value='M'/>

                <Picker.Item label="L" value='L'/>

                <Picker.Item label="XL" value='XL'/>

                <Picker.Item label="0.5kg" value='0.5kg'/>
                <Picker.Item label="1kg" value='1kg'/>
                <Picker.Item label="2kg" value='2kg'/>
               
                </Picker>

                </View>

              




                <Text style={{ marginTop:20 }}>Ordering Unit*</Text>

                <View style={{ borderWidth:1,borderColor:'#57b5b6',borderRadius:5,width:Dimensions.get('window').width*2/2.2,marginTop:7 }}>
                <Picker

                selectedValue={this.state.ordering_unit}
                onValueChange={(val)=>{this.setState({ordering_unit:val})}}

                mode="dropdown">
                <Picker.Item label="Ordering Unit" value='' />

                <Picker.Item label="Set" value='Set' />
                <Picker.Item label="Packet" value='Packet'/>

                <Picker.Item label="box" value='box'/>

              

                </Picker>

                </View>


              
                <Text style={{ marginTop:20 }}>Add Minimum Ordering Unit*</Text>

                <TextInput 
                onChangeText={(val)=>this.setState({moq:val})}
                value={this.state.moq}
                keyboardType='numeric'  placeholder=''   
                style={{ borderWidth:1,borderColor:'#57b5b6',borderRadius:5,width:Dimensions.get('window').width*2/2.2,padding:5,marginTop:10 }}
                />
             

                

               
                <Text style={{ marginTop:20 }}>Add Tags*</Text>

                <Tags
                initialText={this.state.tags}
                
                textInputProps={{
                placeholder: "Add Tags"
                }}
                initialTags={[]}
                onChangeTags={tags =>{
                  console.log(tags)
                  this.setState({tags: tags})}}
                onTagPress={(index, tagLabel, event, deleted) =>
                console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                }
                tagContainerStyle={{marginLeft:20,padding:5,borderRadius:5,borderColor:'#57b5b6',borderWidth:1,color:'#57b5b6',backgroundColor:'#57b5b6'}}
                containerStyle={{ borderWidth:1,borderColor:'#57b5b6',borderRadius:5,width:Dimensions.get('window').width*2/2.2,padding:5,marginTop:10 }}
                inputStyle={{ backgroundColor: "white" }}
                renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                <TouchableOpacity style={{marginLeft:5,padding:5,borderRadius:5,borderColor:'#57b5b6',borderWidth:1,color:'white',backgroundColor:'#57b5b6'}} key={`${tag}-${index}`} onPress={onPress}>
                    <Text>{tag}</Text>
                </TouchableOpacity>
                )}
            />
           
            <TouchableOpacity onPress={this.AddProduct} style={[styles.AddProductBtn,{flexDirection:'row'}]}>
            {this.state.add_product_loading?<ActivityIndicator size="large" color="white6" />:null}

                <Text style={{color:'white'}}>Add Product</Text>
            </TouchableOpacity>



                </ScrollView>
            </View>
           
        )
      }else{
        return(
          <View style={{marginTop:'30%',justifyContent:'center',alignItems: 'center'}}>
            <Image source={require("../../Assets/sorry.png")} style={{height:200,width:200}}/>
            <Text style={{fontSize:20}}>Sorry You Do Not Have Any Subscription</Text>
            <Text style={{fontSize:15}}>Please Go To Account{'>'} Subscription and Buy Subscription To Be Able To Add Product</Text>

          </View>
        )
      }

    }else{
      return <ActivityIndicator size="large" color="#57b5b6" style={{marginTop:50,alignSelf:'center'}}/>
    }
  }

}


export default AddProduct