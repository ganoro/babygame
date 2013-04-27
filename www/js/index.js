/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('offline', this.offline, false);
        document.addEventListener('online', this.online, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.devicereadyEvent();
    },
    // offline Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    offline: function() {
        app.offlineEvent();
    },
    // online Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    online: function() {
        app.onlineEvent();
    },

    onlineEvent : function () {},
    offlineEvent : function() {},

    devicereadyEvent : function() {
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        this.home = this.loadAssetFile('home.txt');
        this.screen1 = this.loadAssetFile('screen1.txt');
        this.screen2 = this.loadAssetFile('screen2.txt');
        this.screen3 = this.loadAssetFile('screen3.txt');
        this.screen4 = this.loadAssetFile('screen4.txt');
        this.screen5 = this.loadAssetFile('screen5.txt');
        this.screen6 = this.loadAssetFile('screen6.txt');
        this.screen7 = this.loadAssetFile('screen7.txt');
        this.bodyImages = [ '/img/flower.jpg', '/img/flower.jpg', '/img/flower.jpg', '/img/flower.jpg', '/img/flower.jpg', '/img/flower.jpg',  '/img/flower.jpg' ];
        page.base('/babygame');
        page('#/screen/:id', app.screenShow);
        page('#/screen/1');
    },

    screenShow : function(ctx, next) {
        var raw = eval('app.screen' + ctx.params.id);
        var compiled = _.template(raw);
        var messages = { }, config = { };
        var content = compiled($.extend({}, messages, config));

        $('body').css('background', 'url(' + page.base() + '/' + app.bodyImages[ctx.params.id - 1] + ') no-repeat');
        $('body').css('-webkit-background-size', 'cover');

        $('#mainpage').html(content);

        // if it's not the welcome page - add the home button
        if (ctx.params.id > 1) {
            $('#mainpage').prepend(app.home);
        }

        // clickable links
        $("div[class*='clickable-']").bind('touchend', function() {
            cs = $(this).attr("class").split(/\s+/);
            $.each(cs, function(index, item) {
                cn = item.split("-");
                if (cn[0] == "clickable") {
                    page('#/screen/' + cn[1]);
                }
            });
        });

        $(".puzzle").each(function(item) {
            var p = new Puzzle($(this));
        });



    },

    loadAssetFile : function(filename) {
         var strUrl = "assets/" + filename, strReturn = "";
          jQuery.ajax({ url: strUrl, async:false,
            success: function(html) {
              strReturn = html;
            }
          });
          return strReturn;
    },
};
