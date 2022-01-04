import React from 'react';

import RootNavigator from './Routes'
import { NavigationContainer } from '@react-navigation/native';



class App extends React.Component {
  render(){
    return(
      <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
    )
  }
}

export default App