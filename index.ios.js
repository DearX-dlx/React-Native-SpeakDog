/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,View,
    TabBarIOS,
    Navigator,
    AsyncStorage
} from 'react-native';

//导入图标库
var Icon = require('react-native-vector-icons/Ionicons');
//系统组件
var Account = require('./app/account/index');
var Edit = require('./app/edit/index');
var Common = require('./app/common/index');
var Creation = require('./app/creation/index');
var Login = require('./app/account/login');

var SpeakDog = React.createClass({

    getInitialState(){
        return({
            selectedTab: 'videocam',
            logined:false
        });
    },
    componentWillMount() {
        //使用Icon获取对于的图片
        Icon.getImageSource('ios-more-outline', 30).then((source) => this.setState({ more: source }));
        Icon.getImageSource('ios-more', 30).then((source) => this.setState({ more_s: source }));

        Icon.getImageSource('ios-recording-outline', 30).then((source) => this.setState({ recording: source }));
        Icon.getImageSource('ios-recording', 30).then((source) => this.setState({ recording_s: source }));

        Icon.getImageSource('ios-videocam-outline', 30).then((source) => this.setState({ videocam: source }));
        Icon.getImageSource('ios-videocam', 30).then((source) => this.setState({ videocam_s: source }));

        this._asyncAppStatus()
    },

    //由于Ionicons的Icon.TabBarItem不成熟,因此考虑不使用Icon.TabBarItem,使用RN原生的tabbar组件
    render(){

        if (!this.state.logined){
            return <Login afterLogin={this.afterLogin}/>
        }

        return(
            <TabBarIOS
                tintColor='#ee735c'
            >
                <TabBarIOS.Item
                    icon= {this.state.videocam}
                    selectedIcon={this.state.videocam_s}
                    selected={this.state.selectedTab === 'videocam'}
                    title="视频"
                    onPress={() => {this.setState({selectedTab:'videocam'})}}
                >
                    <Navigator
                        initialRoute={{
                            name:'creation',
                            component:Creation,
                        }}
                        //配置转场动画-- 可选项
                        configureScene={(router) => {
                            return Navigator.SceneConfigs.FloatFromRight
                        }}
                        renderScene={(route,navigator) => {
                            //这里拿到的Component其实就是initialRoute方法里面的component
                            var Component = route.component
                            //这里可用伪代码表示就是 <list navigator={navigatir}>
                            return <Component {...route.params} navigator={navigator} />
                        }}
                    />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon= {this.state.recording}
                    selectedIcon={this.state.recording_s}
                    selected={this.state.selectedTab === 'recording'}
                    title="制作"
                    onPress={() => {this.setState({selectedTab:'recording'})}}
                >
                    <Edit/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon= {this.state.more}
                    selectedIcon={this.state.more_s}
                    selected={this.state.selectedTab === 'more'}
                    title="账户"
                    onPress={() => {this.setState({selectedTab:'more'})}}
                >
                    <Account/>
                </TabBarIOS.Item>

            </TabBarIOS>
        );
    },

    //登录成功的数据回调
    afterLogin(data){
        //console.log(data)
        //进行数据的存储
        var that = this
        user = JSON.stringify(data)
        AsyncStorage.setItem('user', user)
            .then(() => {
                that.setState({
                    logined:true,
                    user:user
                })
            })
    },

    _asyncAppStatus(){
        console.log('hello')
        //拿到上下文
        var that = this
        AsyncStorage.getItem('user')
            .then((data) => {
                //console.log(data)
                var user = JSON.parse(data)
                that.setState({
                    user:user,
                    logined:true
                })
            })
    },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('SpeakDog', () => SpeakDog);
