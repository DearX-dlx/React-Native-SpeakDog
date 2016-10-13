/**
 * Created by kangleyuan on 16/10/12.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Image,
    ListView,
} from 'react-native';
//后面的default叫默认倒出 倒出一些参数的
var Video = require('react-native-video').default
//屏幕的宽高控制
var Dimensions = require('Dimensions');
var screenHeight = Dimensions.get('window').height;
var screenWidth = Dimensions.get('window').width;
//导入图标库
var Icon = require('react-native-vector-icons/Ionicons');
//网络模块
var Request = require('../common/request');

var ContentDetail = React.createClass({

    getInitialState(){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return{
            dataSource: ds.cloneWithRows(['sfasd','dasdasd','dasdasdasd']),
            videoLoading:false,
            isPlaying:false,
            playProcess:1,
            isVideoStop:true,
            isNetWorkingError:false,
        }
    },

    render() {
        var rowData = this.props.rowData
        //console.log(rowData)
        return (
            <View style={styles.container}>
                {/*头部*/}
                <View style={styles.headerView}>
                    <Text style={styles.headerTitle}>视频详情</Text>
                    <TouchableOpacity style={styles.backItemS} onPress={() => {this.props.navigator.pop()}}>
                        <Icon name="ios-arrow-back" size={25} color="white" />
                        <Text style={{color:'white',marginLeft:2}}> 返回</Text>
                    </TouchableOpacity>
                </View>
                {/*视频播放控制区*/}
                <View style={styles.videoViewStyle}>
                    <Video ref='videoPlay'
                           source={{uri: rowData.video}} // Can be a URL or a local file.
                           rate={1.0}                   // 0 is paused, 1 is normal.
                           volume={1.0}                 // 0 is muted, 1 is normal.
                           muted={false}                // Mutes the audio entirely.
                           paused={this.state.isVideoStop}               // Pauses playback entirely.
                           //resizeMode="cover"           // Fill the whole screen at aspect ratio.
                           repeat={false}                // Repeat forever.
                           playInBackground={false}     // Audio continues to play when app entering background.
                           playWhenInactive={false}     // [iOS] Video continues to play when control or notification center are shown.
                           onLoadStart={this.loadStart} // Callback when video starts to load
                           onLoad={this.setDuration}    // Callback when video loads
                           onProgress={this.setTime}    // Callback every ~250ms with currentTime
                           onEnd={this.onEnd}           // Callback when playback finishes
                           onError={this.videoError}    // Callback when video cannot be loaded
                           style={{flex:1}}
                    />
                    {!this.state.isPlaying && !this.state.videoLoading ? <Icon onPress={this._clickPlay} style={styles.playViewS} name="ios-play" size={40} color="#900" /> : null}
                    {this.state.videoLoading ? <ActivityIndicator style={styles.indicatorStyle} size="large" color="#900" /> : null}
                    {this.state.isPlaying ? <TouchableOpacity activeOpacity={0} style={styles.stopVideoS} onPress={this._clickVideoStop}></TouchableOpacity> : null}
                    {this.state.isNetWorkingError ? <Text style={styles.netErrorTextS} >网络出错啦</Text> : null}
                    <View style={styles.processBackS}>
                        <View style={[styles.processS,{width:this.state.playProcess}]}></View>
                    </View>
                </View>
                {/*视频信息展示区*/}
                <ScrollView>
                    <View style={styles.videoDetailViewS}>
                        <Image style={styles.headPortraitS} source={{uri:rowData.headPortraits}}/>
                        <View style={{flexDirection:'column',flex:1}}>
                            <Text style={{fontSize:16,fontWeight:'600'}}>{rowData.author}</Text>
                            <Text style={{fontSize:14,color:'gray',marginTop:5}}>{rowData.title}</Text>
                        </View>
                    </View>
                    {/*评论展示区*/}
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                        enableEmptySections={true}
                    />
                </ScrollView>
            </View>
        );
    },

    componentDidMount(){
        //获取网络数据
        Request.get('http://rap.taobao.org/mockjs/8327/api/comment',{
            'accessToken':'123456',
            'id':'123456'
        }).then((data) => {
            //console.log(data)
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(data.data)
            })
        }).catch((error) => {
            console.log(error)
        })
    },

    renderRow(rowData){
        return(
            <View style={{flexDirection:'row',alignItems:'center',marginTop:5,marginBottom:5}}>
                <Image source={{uri:rowData.commentAuthorHP}} style={{width:40,height:40,marginLeft:5,marginRight:5,borderRadius:20}} />
                <View style={{flex:1,flexDirection:'column'}}>
                    <Text style={{fontSize:14,marginBottom:5}}>{rowData.commentAuthor}</Text>
                    <Text style={{fontSize:12,color:'gray'}}>{rowData.comment}</Text>
                </View>
            </View>
        )
    },

    _clickPlay(){

        //如果不是暂停的就播放
        if (!this.state.isVideoStop){
            this.refs.videoPlay.seek(0)
        }
        this.setState({
            isPlaying:true,
            isVideoStop:false
        })
    },
    _clickVideoStop(){
        this.setState({
            isVideoStop:true,
            isPlaying:false,
        })
    },

    loadStart(){
        console.log('video starts to load')
        this.setState({
            videoLoading:true
        })
    },
    setDuration(){
        console.log('video loads')
        this.setState({
            videoLoading:false
        })
    },
    setTime(duration){
        //console.log(duration)
        var totalDuration = duration.playableDuration
        var currentTime = duration.currentTime
        var process = Number(currentTime / totalDuration)*screenWidth
        this.setState({
            playProcess:process
        })
    },
    onEnd(){
        console.log('playback finishes')
        this.setState({
            isPlaying:false,
            playProcess:screenWidth
        })
    },
    videoError(error){
        console.log('playback error')
        console.log(error)
        this.setState({
            isNetWorkingError:true,
            videoLoading:false,
        })
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    headerView:{
        paddingTop:20,
        backgroundColor:'#ee735c',
        flexDirection:'row',
        height:54,
        alignItems:'center',
    },
    backItemS:{
        position:'absolute',
        flexDirection:'row',
        bottom:5,
        left:10,
        alignItems:'center',
        justifyContent:'center',
    },
    headerTitle: {
        fontSize: 16,
        textAlign: 'center',
        color:'#fff',
        fontWeight:'600',
        width:screenWidth,
    },
    videoViewStyle: {
        width:screenWidth,
        height:300,
        backgroundColor:'black',
    },
    indicatorStyle: {
        position:'absolute',
        bottom:(300 - 50) * 0.5,
        right:(screenWidth - 50) * 0.5,
        width:50,
        height:50,
    },
    playViewS:{
        position:'absolute',
        bottom:(300 - 50) * 0.5,
        right:(screenWidth - 50) * 0.5,
        width:50,
        height:50,
        paddingLeft:18,
        paddingTop:5,

        borderWidth:1,
        borderColor:'#fff',
        borderRadius:25,
        backgroundColor:'transparent',
    },
    processBackS:{
        width:screenWidth,
        height:5,
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    processS:{
        width:0.0001,
        height:5,
        backgroundColor:'#ff6600'
    },
    stopVideoS:{
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
    },
    netErrorTextS:{
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        textAlign:'center',
        color:'white',
        paddingTop:145,
    },
    videoDetailViewS:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:10,
    },
    headPortraitS:{
        height:60,
        width:60,
        borderRadius:20,
        marginLeft:10,
        marginRight:10,
    },

});

module.exports = ContentDetail;