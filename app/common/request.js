/**
 * Created by kangleyuan on 16/10/11.
 */

'use strict'

//url转接RI字符串
var QueryString = require('query-string')
var _ = require('lodash')
var Mock = require('mockjs')

var request = {}
request.get = function (url,params) {
    if (params){
        url + '?' + QueryString.stringify(params);
    }

    return fetch(url)
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
    return fetch(url,options)
        .then((response) => response.json())
        .then((responseJson) => Mock.mock(responseJson))
}

module.exports = request;