/**
 * Created by kangleyuan on 16/10/9.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';

//屏幕的宽高控制
var Dimensions = require('Dimensions');
var screenHeight = Dimensions.get('window').height;
var screenWidth = Dimensions.get('window').width;
//导入图标库
var Icon = require('react-native-vector-icons/Ionicons');
//mock数据解析
var Mock = require('mockjs');

var Creation = React.createClass({

    getInitialState(){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows([]),
        };
    },

    render() {
        return (
            <View style={styles.container}>
                {/*头部*/}
                <View style={styles.headerView}>
                    <Text style={styles.headerTitle}>视频列表</Text>
                </View>
                {/*列表*/}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections={true}
                    //automaticallyAdjustContentInsets={false}
                />
            </View>
        );
    },

    componentDidMount(){
        fetch('http://rap.taobao.org/mockjs/8327/api/creations?accessToken=123456')
            .then((response) => response.json())
            .then((responseJson) => {
                var mockData = Mock.mock(responseJson);
                if(mockData.success){
                    this.setState({
                        dataSource:this.state.dataSource.cloneWithRows(mockData.data)
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    },

    renderRow(rowData){
        return (
                <View>
                    <Text style={styles.rowTitle}>{rowData.title}</Text>
                    <Image source={{uri: rowData.thumb}} style={styles.rowImage}>
                        <TouchableOpacity style={{flex:1}} onPress={() => {alert("hello")}}>
                            <Icon style={styles.rowPlay} name="ios-play" size={40} color="#900" />
                        </TouchableOpacity>
                    </Image>
                    <View style={styles.rowContent}>
                        <TouchableOpacity>
                            <View style={styles.rowContentItem}>
                                <Icon name="ios-heart-outline" size={28} color="#900" />
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

});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    headerView:{
        paddingTop:25,
        paddingBottom:12,
        backgroundColor:'#ee735c'
    },
    headerTitle: {
        fontSize: 16,
        textAlign: 'center',
        color:'#fff',
        fontWeight:'600'
    },
    rowTitle:{
        fontSize:14,
        paddingTop:5,
        bottom:5,
        fontWeight:'600'
    },
    rowImage:{
        width:screenWidth,
        height:screenWidth * 129 / 270,
    },
    rowContent:{
        flexDirection:'row',
        //justifyContent:'space-between'
        backgroundColor:'white'
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
});

module.exports = Creation;