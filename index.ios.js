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
        return({
            selectedTab: 'videocam'
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
    },

    //由于Ionicons的Icon.TabBarItem不成熟,因此考虑不使用Icon.TabBarItem,使用RN原生的tabbar组件
    render(){
        return(
            <TabBarIOS>
                <TabBarIOS.Item
                    icon= {this.state.videocam}
                    selectedIcon={this.state.videocam_s}
                    selected={this.state.selectedTab === 'videocam'}
                    title="Videocam"
                    onPress={() => {this.setState({selectedTab:'videocam'})}}
                >
                    <View style={styles.container}>
                        <Text style={styles.welcome}> videocam</Text>
                    </View>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon= {this.state.recording}
                    selectedIcon={this.state.recording_s}
                    selected={this.state.selectedTab === 'recording'}
                    title="Recording"
                    onPress={() => {this.setState({selectedTab:'recording'})}}
                >
                    <View style={styles.container}>
                        <Text style={styles.welcome}> recording</Text>
                    </View>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon= {this.state.more}
                    selectedIcon={this.state.more_s}
                    selected={this.state.selectedTab === 'more'}
                    title="More"
                    onPress={() => {this.setState({selectedTab:'more'})}}
                >
                    <View style={styles.container}>
                        <Text style={styles.welcome}> more</Text>
                    </View>
                </TabBarIOS.Item>

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
