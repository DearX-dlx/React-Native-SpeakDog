/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
} from 'react-native';

//导入图标库
var Icon = require('react-native-vector-icons/Ionicons');

var SpeakDog = React.createClass({

    getInitialState(){
        return{
            selectedTab: 'videocam'
        };
    },

    /*

     iconName="ios-videocam-outline"
     selectedIconName = 'ios-videocam'

     selected={this.state.seletedTab === 'videocam'}
     onPress={() => {this.setState({seletedTab:'videocam'})}}

     selected={this.state.seletedTab === 'recording'}
     onPress={() => {this.setState({seletedTab:'recording'})}}

     selected={this.state.seletedTab === 'more'}
     onPress={() => {this.setState({seletedTab:'more'})}}

     <Icon.TabBarItem
     iconName="ios-videocam-outline"
     selectedIconName = 'ios-videocam'
     selected={this.state.selectedTab == 'videocam'}
     onPress={() => {this.setState({selectedTab:'videocam'})}}
     >
     </Icon.TabBarItem>
    */

    render() {
        return (
            <TabBarIOS
                unselectedTintColor="yellow"
                tintColor="white"
                barTintColor="darkslateblue">
                <Icon.TabBarItem
                    iconName="ios-videocam-outline"
                    selectedIconName = 'ios-videocam'
                    selected={this.state.selectedTab == 'videocam'}
                    onPress={() => {this.setState({selectedTab:'videocam'})}}
                >
                    <View><Text>AAAAAA</Text></View>
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    iconName="ios-recording-outline"
                    selectedIconName = 'ios-recording'
                    selected={this.state.seletedTab === 'recording'}
                    onPress={() => {this.setState({seletedTab:'recording'})}}
                >
                    <View><Text>BBBBB</Text></View>
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    iconName="ios-more-outline"
                    selectedIconName = 'ios-more'
                    selected={this.state.seletedTab === 'more'}
                    onPress={() => {this.setState({seletedTab:'more'})}}
                >
                    <View><Text>CCCCC</Text></View>
                </Icon.TabBarItem>
            </TabBarIOS>
        );
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
