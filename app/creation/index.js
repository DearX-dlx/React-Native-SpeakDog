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
} from 'react-native';

//屏幕的宽高控制
var Dimensions = require('Dimensions');
var screenHeight = Dimensions.get('window').height;
var screenWidth = Dimensions.get('window').width;
//导入图标库
var Icon = require('react-native-vector-icons/Ionicons');

var Creation = React.createClass({

    getInitialState(){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows([
                {
                    "id":"310000199211234741","thumb":"https://www.baidu.com/img/2016_10_09logo_61d59f1e74db0be41ffe1d31fb8edef3.png","title":"Rldpjv Yhmhm Fbghial Eohofwk Twvhjxka","video":"http://szv1.mukewang.com/md5/e191e522-e8fc-41d4-b1de-f0d049e233d2/H.mp4"
                }
                ,
                {
                    "id":"130000199102037251","thumb":"https://www.baidu.com/img/2016_10_09logo_61d59f1e74db0be41ffe1d31fb8edef3.png","title":"Hjrbtvjuo Ujhmhvxel Akek Cgnwjgim Ifew","video":"http://szv1.mukewang.com/md5/e191e522-e8fc-41d4-b1de-f0d049e233d2/H.mp4"
                }
                ,
                {
                    "id":"370000198002265441","thumb":"https://www.baidu.com/img/2016_10_09logo_61d59f1e74db0be41ffe1d31fb8edef3.png","title":"Ureqyepgt Byuc Mqk Uxlqcle Bmolxhbyy","video":"http://szv1.mukewang.com/md5/e191e522-e8fc-41d4-b1de-f0d049e233d2/H.mp4"
                }
                ,
                {
                    "id":"630000200704033577","thumb":"https://www.baidu.com/img/2016_10_09logo_61d59f1e74db0be41ffe1d31fb8edef3.png","title":"Etpx Wjhyj Bqwj Ncu Eelwqyc","video":"http://szv1.mukewang.com/md5/e191e522-e8fc-41d4-b1de-f0d049e233d2/H.mp4"
                }
            ]),
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

    renderRow(rowData){
        return (
            <View>
                <Text style={styles.rowTitle}>{rowData.title}</Text>
                <Image source={{uri: rowData.thumb}} style={styles.rowImage} />
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
});

module.exports = Creation;