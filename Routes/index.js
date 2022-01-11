import React,{useEffect, useRef,useState,} from 'react';
import {Text,Animated,View,Dimensions,Platform,TouchableOpacity,Image} from 'react-native'
import { createStackNavigator,CardStyleInterpolators  } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Axios from 'axios'
import base_url from '../base_url'
import SignUp from '../Screens/Auth/Signup'
import SplashScreen from '../Screens/Splash'

import Home from '../Screens/Home'


import AddProduct from '../Screens/Add_product';
import Notifications from '../Screens/Notifications';
import Profile from '../Screens/Profile';
import SelectLocation from '../Screens/Auth/Select_location';
import Signin from '../Screens/Auth/Signin';
import SignupSeller from '../Screens/Auth/Signup/seller';
import SignupBuyer from '../Screens/Auth/Signup/buyer';
import Enter_OTP from '../Screens/Auth/Enter_OTP';
import ForgotPassword from '../Screens/Auth/Forgot_Password';
import CreateNewPassword from '../Screens/Auth/Forgot_Password/Create_new_password';
import Favorites from '../Screens/Favorites'
import ViewProduct from '../Screens/View_Product';
import Messages from '../Screens/Messages';
import EditProfile from '../Screens/EditProfile';
import MyCart from '../Screens/MyCart';
import MyProducts from '../Screens/MyProducts'

import GetPendingOrdersFromBuyer from '../Screens/GetPendingOrdersFromBuyer';
import ViewAnotherUserProfile from '../Screens/ViewAnotherUserProfile';
import ChatProfiles from '../Screens/ChatProfiles';
import PlacedOrders from '../Screens/PlacedOrders';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Subscriptions from '../Screens/Subscriptions';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



function getWidth() {
    let width = Dimensions.get("window").width
  
    // Horizontal Padding = 20...
    width = width - 80
  
    // Total five Tabs...
    return width / 5
  }



export default function  RootNavigator (){
    return(
     
    <Stack.Navigator initialRouteName="splashscreen" screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
    <Stack.Screen name='splashscreen' component={SplashNavigator} options={{headerShown:false}}/>
    <Stack.Screen name='auth' component={AuthNavigator} options={{headerShown:false}}/>
    <Stack.Screen name='home' component={HomeNavigator} options={{headerShown:false}}/>
    </Stack.Navigator>
    )
    }




  const ProfileStack = ({navigation,route})=>{
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "Messages"){
            navigation.setOptions({tabBarStyle: {display: 'none'}});
        }else{
            navigation.setOptions({tabBarStyle: {display: 'flex'}});
        }
    }, [navigation, route]);

    return(
        <Stack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
        <Stack.Screen name="Profile" component={Profile} options={{headerTransparent:true,headerTitle:'',headerTintColor:'#57b5b6'}}/>
        <Stack.Screen name="Favorite Products" component={Favorites}options={{headerTransparent:false,headerTintColor:'#57b5b6'}}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{headerTransparent:false,headerTintColor:'#57b5b6',headerTitle:'Profile'}}/>
        <Stack.Screen name="MyCart" component={MyCart} options={{headerTransparent:false,headerTintColor:'#57b5b6'}}/>
        <Stack.Screen name="Pending Orders From Buyer" component={GetPendingOrdersFromBuyer} options={{headerTransparent:false,headerTintColor:'#57b5b6'}}/>
        <Stack.Screen name="ViewAnotherUserProfile" component={ViewAnotherUserProfile} options={{headerTransparent:true,headerTitle:'',headerTintColor:'#57b5b6'}}/>
        <Stack.Screen name="Product" component={ViewProduct} options={{headerTransparent:true,headerTitle:'',headerTintColor:'#57b5b6'}}/>
        <Stack.Screen name="PlacedOrders" component={PlacedOrders} options={{headerTransparent:false,headerTintColor:'#57b5b6'}}/>
        <Stack.Screen name="MyProducts" component={MyProducts} options={{headerTransparent:false,headerTintColor:'#57b5b6'}}/>
        <Stack.Screen name="Subscription" component={Subscriptions} options={{headerTransparent:false,headerTintColor:'#57b5b6'}}/>

  <Stack.Screen name="Messages" component={Messages} options={{headerTransparent:false,headerTintColor:'#57b5b6',tabBarVisible:false}}/>
         
    </Stack.Navigator>
    )
  }
     
  
   
  const HomeStack = ({navigation,route})=>{
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "Messages"){
            navigation.setOptions({tabBarStyle: {display: 'none'}});
        }else{
            navigation.setOptions({tabBarStyle: {display: 'flex'}});
        }
    }, [navigation, route]);

    return(
<Stack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
    <Stack.Screen name="Home" options={{headerShown:false}} component={Home}/>
    <Stack.Screen name="ViewAnotherUserProfile" component={ViewAnotherUserProfile} options={{headerTransparent:true,headerTitle:'Account',headerTintColor:'#57b5b6'}}/>

    <Stack.Screen name="Product" component={ViewProduct} options={{headerTransparent:true,headerTitle:'',headerTintColor:'#57b5b6'}}/>
    <Stack.Screen name="Messages" component={Messages} options={{headerTransparent:false,headerTintColor:'#57b5b6',tabBarVisible:false}}/>

    </Stack.Navigator>
    )
  }
    
  

  const ChatStack = ({ navigation, route })=>{
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "Messages"){
            navigation.setOptions({tabBarStyle: {display: 'none'}});
        }else{
            navigation.setOptions({tabBarStyle: {display: 'flex'}});
        }
    }, [navigation, route]);

   
      return(
        <Stack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
        <Stack.Screen name="Chats" component={ChatProfiles} options={{headerTransparent:false,headerTintColor:'#57b5b6',tabBarVisible:false}}/>
        <Stack.Screen name="Messages" component={Messages} options={{headerTransparent:false,headerTintColor:'#57b5b6',tabBarVisible:false}}/>

  </Stack.Navigator>
      )
   
  }


  const NotificationsStack = ({ navigation, route })=>{
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "Messages"){
            navigation.setOptions({tabBarStyle: {display: 'none'}});
        }else{
            navigation.setOptions({tabBarStyle: {display: 'flex'}});
        }
    }, [navigation, route]);
    return (
        <Stack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
        <Stack.Screen name="Notifications" component={Notifications} options={{headerTransparent:false,headerTintColor:'#57b5b6',tabBarVisible:false}}/>
        <Stack.Screen name="Messages" component={Messages} options={{headerTransparent:false,headerTintColor:'#57b5b6',tabBarVisible:false}}/>
        <Stack.Screen name="ViewAnotherUserProfile" component={ViewAnotherUserProfile} options={{headerTransparent:true,headerTitle:'Account',headerTintColor:'#57b5b6'}}/>
        
        </Stack.Navigator>
    )
  }
   
   const HomeNavigator = (props)=>{
       const[role,setRole] = useState('')
    useEffect(async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        if(parse.role == 'buyer'){
            setRole("buyer")
        }else{
            setRole("seller")

        }

    },[])
  
    const tabOffsetValue = useRef(new Animated.Value(0)).current;
    return(
    <Tab.Navigator tabBarOptions={{
        
        showLabel: false,
        keyboardHidesTabBar: true,
        // Floating Tab Bar...
        style: {
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 40,
          marginHorizontal: 20,
          // Max Height...
          height: 60,
          borderRadius: 10,
          // Shadow...
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10
          },
          paddingHorizontal: 20,
        }
      }} initialRouteName="Home">



            <Tab.Screen name='HomeScreen' component={HomeStack} options={{
                headerShown:false,
                tabBarIcon: ({ focused }) => (
                <View style={{
                // centring Tab Button...
                position: 'absolute',
               
                }}>
                <FontAwesome5
                    name="home"
                    size={22}
                    color={focused ? '#57b5b6' : 'gray'}
                ></FontAwesome5>
                </View>
            )
            }} listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: e => {
                Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true
                }).start();
            }
            })}/>




            <Tab.Screen name='ChatsScreen' component={ChatStack} options={{
               headerShown:false,
            
                tabBarIcon: ({ focused }) => (
                <View style={{
                // centring Tab Button...
                
                position: 'absolute',
               
                }}>
                <Entypo
                    name="mail"
                    size={22}
                    color={focused ? '#57b5b6' : 'gray'}
                ></Entypo>
                </View>
            )
            }} listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: e => {
                Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true
                }).start();
            }
            })}/>

        
        {role == 'seller'?<Tab.Screen name="Add product" component={AddProduct}  options={{
                    headerTransparent:false,
                    headerTintColor:"#57b5b6",
                  
                   
                    
                    tabBarIcon: ({ focused }) => (

                        <View style={{
                            width: 45,
                            height: 45,
                            backgroundColor: focused ? '#57b5b6' : 'gray',
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: Platform.OS == "android" ? 50  : 30,
                            position:'relative'
                        }}>
                    
                        <Image source={require('../Assets/plus.png')} style={{
                        width: 22,
                        height: 22,
                        tintColor: 'white',
                        }}/>
                    
                    </View>
                )
                }} ></Tab.Screen>:null}
               





        <Tab.Screen name='NotificationsScreen' component={NotificationsStack} options={{
             headerTransparent:false,
             headerTintColor:"#57b5b6",
             headerShown:false,
                tabBarIcon: ({ focused }) => {
                const [notificationscount,setNotificationsCount] = useState(0)
                async function get_notifications_count(){
                        const user =await AsyncStorage.getItem("user")
                        const parse = JSON.parse(user)
                        Axios.get(base_url+'/apis/get_all_notifications_count?my_id='+parse.id)
                        .then(res=>{
                            console.log("This is the Notifications Count "+ res.data.notifications.length)
                           setNotificationsCount(res.data.notifications.length)
                            
                        })
                    }
                  useEffect(()=>{
                      get_notifications_count()
                     
                    
                  },[])
                   return(
                    <View style={{
                        // centring Tab Button...
                        position: 'absolute',
                       
                        }}>
                        <FontAwesome5
                            name="bell"
                            size={22}
                            color={focused ? '#57b5b6' : 'gray'}
                        ></FontAwesome5>
                            {notificationscount>0?<View style={{backgroundColor:'red',borderRadius:100,justifyContent: 'center',alignItems: 'center',padding:2,position: 'absolute',paddingRight:2}}><Text style={{color:'white'}}>{notificationscount}</Text></View>:null}

                        </View>
                   )
                   
                }
               
            
            }} listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: e => {
                Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true
                }).start();
            }
            })}/>



            
        <Tab.Screen name='ProfileTab' component={ProfileStack} options={{
                headerShown:false,
                tabBarIcon: ({ focused }) => (
                <View style={{
                // centring Tab Button...
                position: 'absolute',
               
                }}>
                <FontAwesome
                    name="user-circle-o"
                    size={22}
                    color={focused ? '#57b5b6' : 'gray'}
                ></FontAwesome>
                </View>
            )
            }} listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: e => {
                Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true
                }).start();
            }
            })}/>

        </Tab.Navigator>
    )
        
    }

    const AuthNavigator = ()=>(
        <Stack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
            <Stack.Screen name='select_location' options={{headerShown:false}} component={SelectLocation}/>
            
            <Stack.Screen name='enter_otp' options={{headerTransparent:true,headerTitle:'Enter OTP',headerTintColor:'white'}} component={Enter_OTP}/>


            <Stack.Screen name='signup' options={{headerTransparent:true,headerTitle:'Choose Your Role',headerTintColor:'white'}} component={SignUp}/>
            <Stack.Screen name='i_am_seller' options={{headerTransparent:true,headerTitle:'Seller',headerTintColor:'white'}} component={SignupSeller}/>
            <Stack.Screen name='i_am_buyer' options={{headerTransparent:true,headerTitle:'Buyer',headerTintColor:'white'}} component={SignupBuyer}/>

            <Stack.Screen name='signin' options={{headerTransparent:true,headerTitle:'Sign In',headerTintColor:'white'}} component={Signin}/>
            <Stack.Screen name='forgotpassword' options={{headerTransparent:true,headerTitle:'Forgot Password',headerTintColor:'white'}} component={ForgotPassword}/>
            <Stack.Screen name='create_new_password' options={{headerTransparent:true,headerTitle:'Create New Password',headerTintColor:'white'}} component={CreateNewPassword}/>
           

        </Stack.Navigator>
    )


    const SplashNavigator = ()=>(
        <Stack.Navigator initialRouteName="splash" >
            <Stack.Screen name='splash' component={SplashScreen} options={{headerShown:false}}/>

        </Stack.Navigator>
    )