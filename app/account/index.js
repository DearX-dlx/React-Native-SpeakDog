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
//sha1加密
var sha1 = require('sha1');
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

//图片上传api数据
var CLOUDINARY = {
    'cloud_name': 'speakdog',
    'api_key': '223944527726924',
    'api_secret': 'LVeH4yoF-0F73AlqmBb51de2rFM',
    'base':'http://res.cloudinary.com/dearx',
    'image':'https://api.cloudinary.com/v1_1/dearx/image/upload',
    'video':'https://api.cloudinary.com/v1_1/dearx/video/upload',
    'audio':'https://api.cloudinary.com/v1_1/dearx/raw/upload',
}

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
            //console.log('Response = ', response);

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

                //上传图片设置 -- 拼接签名
                //文件夹位置
                let folder = 'avatar'
                let tags = 'app,avatar' //标签
                let timestamp = Date.now() //时间戳
                //进行signature数字签名
                //"public_id=图片id&timestamp=时间戳+API的secret"
                let public_id = 'avatar'
                let signature = 'public_id=' + public_id + "&timestamp=" + timestamp + CLOUDINARY.api_secret
                //console.log(signature)
                signature = sha1(signature)
                //发送表单进行上传
                //body
                /*
                 timestamp: 1315060510
                 public_id: "sample_image"
                 api_key: "1234"
                 file: "http://www.example.com/sample.jpg"
                 signature: "b4ad47fb4e25c7bf5f92a20089f9db59bc302313"
                 */
                var body = new FormData()
                body.append('timestamp',timestamp)
                body.append('public_id',public_id)
                body.append('api_key',CLOUDINARY.api_key)
                //注意这里文件的格式
                body.append('file',{uri: this.state.headImage, type: 'image/jpg', name: 'image.jpg'})
                body.append('signature',signature)
                this._upload(body)
            }
        })
    },

    //上传图片
    _upload(body){

        var xhr = new XMLHttpRequest()
        var url = CLOUDINARY.image

        xhr.open('POST',url)
        xhr.onload = () => {
            if (xhr.status !== 200) {
                alert('请求失败')
                console.log(xhr.responseText)
                return
            }
            if (!xhr.responseText) {
                alert('请求失败')
                return
            }

            //console.log(xhr.response)
            //进行json转换
            var respose
            try {
                respose = JSON.parse(xhr.response)
            }catch (e) {
                console.log(e)
                console.log('parse fails')
            }

            if (respose && respose.public_id) {
                let headImgAddr = avatar(respose.public_id,'image')
                console.log('图片地址' + headImgAddr)
            }
        }
        xhr.send(body)
    },

});
//拼接图片地址
function avatar (id,type) {
    return CLOUDINARY.base + '/' + type + '/upload/' + id
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

module.exports = Account;