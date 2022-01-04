import React from 'react';
import {View,Text,} from 'react-native'
import styles from '../Styles/Home_Style';


export default class Tag extends React.Component {
    render(){
        return(
            <View style={styles.tag_container}>
                <Text>{this.props.tag}</Text>
            </View>
        )
    }
}