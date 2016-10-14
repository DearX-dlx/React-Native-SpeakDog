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
    ActivityIndicator,
    RefreshControl,
} from 'react-native';

//网络模块
var Request = require('../common/request');
//数据缓存
var cacheResults = {
    page:1,
    items:[],
    total:0,
}
//rowItem
var ContentItem = require('./VideoListItem')
var Detail = require('./ContentDetail');

var Creation = React.createClass({
    getInitialState(){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows([]),
            isLoadingTail:false,
            isRefresh:false,
        };
    },
    render() {
        return (
            <View style={styles.container}>
                {/*导航栏*/}
                <View style={{height:64,paddingTop:20,alignItems:'center',justifyContent:'center',backgroundColor:"#ee735c"}}>
                    <Text style={{color:'white',fontSize:16, color:'#fff', fontWeight:'600'}}>视频列表</Text>
                </View>
                {/*列表*/}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections={true}
                    //automaticallyAdjustContentInsets={false}
                    //滑动到底的操作
                    onEndReached={this.fetchMoreData}
                    //滑动到理低多少的时候算"到底"了
                    //onEndReachedThreshould={5}
                    renderFooter={this._renderFooter}
                    renderHeader={this._renderHeader}
                    //下拉刷新控件
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefresh}
                            onRefresh={this._onRefresh}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                        />
                    }
                />
            </View>
        );
    },
    componentDidMount(){
        this._fetchData(1)
    },
    renderRow(rowData){
        return(
            <ContentItem key={rowData.id}
                         onSelect={() => this._loadPage(rowData)}
                         rowData={rowData}
            />
        );
    },
    _fetchData(page){
        this.setState({
            isLoadingTail:true
        })
        Request.get('/api/creations',{
            accessToken:'123456',
            page:page,
        })
            .then((responseData) => {
                //console.log(responseData);
                //slice是把数组里面的东西都拿出来,而不改变数组
                var items = cacheResults.items.slice()
                items = items.concat(responseData.data)
                cacheResults.items = items
                cacheResults.total = responseData.total
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(cacheResults.items),
                });
                this.setState({
                    isLoadingTail:false
                })
            })
            .catch((error) => {
                this.setState({
                    isLoadingTail:false
                })
            })
    },
    fetchMoreData(){
        if ((cacheResults.items.length >= cacheResults.total) || this.state.isLoadingTail){
            return
        }else {
            //console.log('items:' + cacheResults.items.length + "total" + cacheResults.total)
            this._fetchData(1)
        }
    },
    _renderFooter(){
        if (this.state.isLoadingTail && cacheResults.items.length !== 0){
            return(
                <ActivityIndicator
                    style={{height: 80}}
                    size="small"
                />
            )
        }else {
            if (cacheResults.items.length >= cacheResults.total && cacheResults.items.length !== 0){
                return(
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <Text style={styles.noMoreDataTitle}>没有更多数据了</Text>
                    </View>
                )
            }
        }
    },
    _renderHeader(){
        if (cacheResults.items.length === 0){
            return(
                <ActivityIndicator
                    style={{height: 80}}
                    size="small"
                />
            )
        }
    },
    _onRefresh(){
        this.setState({
            isRefresh:true
        })
        Request.get('/api/creations',{
            accessToken:'123456',
            page:0,
        })
            .then((responseData) => {
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(responseData.data),
                })
                this.setState({
                    isRefresh:false
                })
            })
            .catch((error) => {
                this.setState({
                    isRefresh:false
                })
            })
    },
    _loadPage(rowData){
        this.props.navigator.push({
            name:'detail',
            component:Detail,
            params:{rowData:rowData}
        })
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
    noMoreDataTitle:{
        paddingTop:10,
        paddingBottom:10,
        fontSize:14,
    },
});

module.exports = Creation;