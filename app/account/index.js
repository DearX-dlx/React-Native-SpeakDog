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
//图片选择组件
var ImagePicker = require('react-native-image-picker');
var Platform = require('react-native').Platform;
var options = {
    title: '选择照片',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'相册',
    mediaType:'photo',
    allowsEditing:true,
    // customButtons: [
    //     {name: 'fb', title: 'Choose Photo from Facebook'},
    // ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

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
                            style={{position:'absolute',top:50,left:100,bottom:50,right:100,alignItems:'center',justifyContent:'center'}}
                            onPress={this._pickImage}
                            activeOpacity={0.8}
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
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            // else if (response.customButton) {
            //     console.log('User tapped custom button: ', response.customButton);
            // }
            else {
                // You can display the image using either data...
                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                // or a reference to the platform specific asset location
                if (Platform.OS === 'ios') {
                    const source = {uri: response.uri.replace('file://', ''), isStatic: true};
                } else {
                    const source = {uri: response.uri, isStatic: true};
                }

                this.setState({
                    headImage: response.uri.replace('file://', '')
                });
            }
        })
    }
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