/**
 * Created by kangleyuan on 16/10/14.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';

//屏幕的宽高控制
var Dimensions = require('Dimensions');
var screenHeight = Dimensions.get('window').height;
var screenWidth = Dimensions.get('window').width;
//网络请求
var Request = require('../common/request');
//定时器模块
var TimerMixin = require('react-timer-mixin');

var Login = React.createClass({

    getInitialState(){
        return{
            text:'',
            second:0,
            code:''
        }
    },

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleS}>快速登录</Text>
                <TextInput
                    style={{height: 40, borderColor: 'lightgray', borderWidth: 1,
                        borderRadius:5,margin:15,padding:5,fontSize:14}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    placeholder='请输入您的手机号码'
                    keyboardType="numeric"
                />
                <View style={{width:screenWidth}}>
                    <TextInput
                        style={{height: 40, borderColor: 'lightgray', borderWidth: 1,
                            borderRadius:5,margin:15,padding:5,fontSize:14}}
                        placeholder='请输入您的验证码'
                        keyboardType="numeric"
                        onChangeText={(code) => this.setState({code})}
                    />
                    <Text style={{position:'absolute',right:20,top:26,color:'#ee735c'}}
                          onPress={this._reGetCode}
                    >
                        {this.state.second > 0 ? this.state.second : '获取验证码'}
                    </Text>
                </View>
                <TouchableOpacity
                    style={{width:300,height:50,marginTop:20, borderColor:'#ee735c',borderWidth:1,
                    borderRadius:10,justifyContent:'center',alignItems:'center',}}
                    onPress={this._login}
                >
                    <Text style={{fontSize:16,color:'#ee735c'}}>登  录</Text>
                </TouchableOpacity>
            </View>
        );
    },

    mixins: [TimerMixin],
    componentDidMount: function() {
        this.setInterval(() => {
            if (this.state.second < 1){

            }else {
                this.setState({
                    second:this.state.second - 1
                })
            }
        }, 1000);

    },

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        clearTimeout(this.timer);
    },

    _reGetCode(){
        if (this.state.second < 1){
            this._getCode()
        }
    },

    _getCode(){
        //alert("我被点了")
        Request.get('/api/verifcode',{
            'phoneNum':this.state.text
        }).catch((error) => {
            alert('网络失败')
            console.log(error)
        }).then((data) => {
            if (data.success){
                //alert('验证码获取成功')
                this.setState({
                    second:10
                })
            }
        })
    },
    _login(){
        var that = this
        console.log(this.state.code,this.state.text)
        Request.post('/api/login',{
            'code':this.state.code,
            'phoneNum':this.state.text,
        }).catch((err) => {
            alert('网络失败')
            console.log(error)
        }).then((data) => {
            //alert('登录成功')
            //console.log(data.data)
            if (data.success){
                //数据回调
                that.props.afterLogin(data.data)
            }
        })
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    titleS: {
        fontSize: 20,
        textAlign: 'center',
        margin: 40,
        color:'#ee735c'
    },
});

module.exports = Login;