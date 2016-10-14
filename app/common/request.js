/**
 * Created by kangleyuan on 16/10/11.
 */

'use strict'

//url转接RI字符串
var QueryString = require('query-string')
var _ = require('lodash')
var Mock = require('mockjs')
var HostUrl = 'http://rap.taobao.org/mockjs/8327'

var request = {}
request.get = function (url,params) {
    let uri = ''
    if (params){
        uri = HostUrl + url + '?' + QueryString.stringify(params);
        //console.log(uri)
    }

    return fetch(uri)
        .then((response) => response.json())
        .then((responseJson) => Mock.mock(responseJson))
}

request.post = function (url,body) {
    var header = {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
    var options = _.extend(header,{
        body:JSON.stringify(body)
    })
    return fetch(HostUrl + url,options)
        .then((response) => response.json())
        .then((responseJson) => Mock.mock(responseJson))
}

module.exports = request;