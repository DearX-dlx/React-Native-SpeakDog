/**
 * Created by kangleyuan on 16/10/11.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

//屏幕的宽高控制
var Dimensions = require('Dimensions');
var screenHeight = Dimensions.get('window').height;
var screenWidth = Dimensions.get('window').width;
//导入图标库
var Icon = require('react-native-vector-icons/Ionicons');

var ContentItem = React.createClass({

    getInitialState(){
        var rowData = this.props.rowData
        return{
            up:rowData.voted,
            rowData:rowData
        }
    },

    render(){
        var rowData = this.state.rowData
        return(
            <View>
                <Text style={styles.rowTitle}>{rowData.title}</Text>
                <Image source={{uri: rowData.thumb}} style={styles.rowImage}>
                    <TouchableOpacity style={{flex:1}} onPress={() => {alert("hello")}}>
                        <Icon style={styles.rowPlay} name="ios-play" size={40} color="#900" />
                    </TouchableOpacity>
                </Image>
                <View style={styles.rowContent}>
                    <TouchableOpacity onPress={this._clickLike} activeOpacity={1}>
                        <View style={styles.rowContentItem}>
                            <Icon name={this.state.up ? "ios-heart" : "ios-heart-outline" } size={28} color="#900" />
                            <Text style={styles.rowContentTitle}>喜欢</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.rowContentItem}>
                            <Icon name="ios-chatboxes-outline" size={28} color="#900" />
                            <Text style={styles.rowContentTitle}>评论</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    },

    _clickLike(){
        this.setState({
            up:!this.state.up,
        });
    },
})

const styles = StyleSheet.create({
    rowTitle:{
        fontSize:14,
        paddingTop:10,
        bottom:10,
        fontWeight:'600'
    },
    rowImage:{
        width:screenWidth,
        height:screenWidth * 129 / 270,
    },
    rowContent:{
        flexDirection:'row',
        //justifyContent:'space-between'
        backgroundColor:'white',
        paddingTop:10,
        paddingBottom:10,
    },
    rowContentItem:{
        width:screenWidth * 0.5,
        height:35,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    rowContentTitle:{
        fontSize:16,
        marginLeft:10,
    },
    rowPlay:{
        position:'absolute',
        bottom:14,
        right:14,
        width:50,
        height:50,
        paddingLeft:18,
        paddingTop:5,

        borderWidth:1,
        borderColor:'#fff',
        borderRadius:25,
        backgroundColor:'transparent',
    },
})

module.exports = ContentItem