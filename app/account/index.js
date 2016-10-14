/**
 * Created by kangleyuan on 16/10/9.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

//屏幕的宽高控制
var Dimensions = require('Dimensions');
var screenHeight = Dimensions.get('window').height;
var screenWidth = Dimensions.get('window').width;

var Account = React.createClass({

    getInitialState(){
        return{
            headImage:'http://g.hiphotos.baidu.com/image/pic/item/55e736d12f2eb9385d36f594d6628535e5dd6f79.jpg'
        }
    },

    render() {
        return (
            <View style={styles.container}>
                {/*导航栏*/}
                <View style={{height:64,paddingTop:20,alignItems:'center',justifyContent:'center',backgroundColor:"#ee735c"}}>
                    <Text style={{color:'white',fontSize:16, color:'#fff', fontWeight:'600'}}>我的账户</Text>
                </View>
                {/*头图*/}
                <View style={{height:150}}>
                    <Image source={{uri:this.state.headImage}} style={{width:screenWidth , height:200}}
                           resizeMode="cover"
                    >
                        <TouchableOpacity
                            style={{position:'absolute',top:1,left:1,bottom:1,right:1,alignItems:'center',justifyContent:'center'}}
                            onPress={this._pickImage}
                        >
                            <Image source={{uri:this.state.headImage}}
                                   style={{width:80,height:80,borderRadius:40}}
                            />
                        </TouchableOpacity>
                    </Image>
                </View>
            </View>
        );
    },

    _pickImage(){

    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

module.exports = Account;