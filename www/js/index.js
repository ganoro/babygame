var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('load', this.load, false);
        document.addEventListener('online', this.online, false);
        document.addEventListener('touchmove', this.touchmove, false);
        document.addEventListener('pause', this.pause, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.devicereadyEvent();
    },
    // load Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    load: function() {
        alert('load');
    },
    // online Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    online: function() {
        app.onlineEvent();
    },

    touchmove : function(e) {
        e.preventDefault();
    },

    pause : function() {
        // page('#/screen/1');
    },

    onlineEvent : function () {},
    offlineEvent : function() {},

    devicereadyEvent : function() {
        var self = this;

        $('#cloud1').transition({ y: '420px',  x: '200px', easing: 'easeInOutCirc', delay : 1400, duration : 1400 });
        $('#cloud2').transition({ y: '460px',  x: '500px', easing: 'easeInOutCirc', delay : 1400, duration : 1400 });
        $('#cloud3').transition({ y: '450px',  x: '-300px', easing: 'easeInOutCirc', delay : 1400, duration : 1400 });
        $('#cloud4').transition({ y: '520px',  x: '10px', easing: 'easeInOutCirc', delay : 1400, duration : 1400 });
        $('#cloud5').transition({ rotateX: '180deg' }).transition({ y: '-460px',  x: '-110px', easing: 'easeInOutCirc', delay : 1400, duration : 1400 });
        $('#cloud6').transition({ y: '-420px',  x: '200px', easing: 'easeInOutCirc', delay : 1400, duration : 1400 });
        $('#cloud7').transition({ y: '-380px',  x: '-110px', easing: 'easeInOutCirc', delay : 1400, duration : 1400 });

        $('#sun').transition({ y: '400px',  x: '400px', easing: 'easeInOutCirc', delay : 2400, duration : 1400 })
            .transition({ y: '390px',  x: '400px', easing: 'easeInOutCirc', duration : 1000 });


        $('#logo1').transition({ scale: 1.1 , easing: 'easeInOutCirc', duration: 700})
            .transition({ scale: 1 , easing: 'easeInOutCirc', delay : 200, duration: 700 }, function() {
                $('#gback').fadeTo(4000, 1);
                $('#logo1').fadeTo(1000, 0);
                $('#logo2').fadeTo(1000, 0, function() {
                    // $('#gsplash').fadeTo(0, 0);
                    $('.puzzle').fadeTo('slow', 1);
                    $('.memory').fadeTo('slow', 1);
                    $('.painting').fadeTo('slow', 1);
                    $('.sounds').fadeTo('slow', 1);
                    $('.mute').fadeTo('slow', 1);
                    $('.purchase').fadeTo('slow', 1);
                
                    $('.puzzle').css({ transformOrigin: '10px 10px' }).transition({ x: '+=4', y: '+=4', rotate: '2deg', easing: 'easeInOutCirc', duration : 1000 }).transition({ rotate: '0deg', easing: 'easeInOutCirc', duration : 2000 });
                    $('.memory').css({ transformOrigin: '10px 10px' }).transition({ translate: '+=4', rotate: '-4deg', easing: 'easeInOutCirc', delay : 1400, duration : 5000 }).transition({ rotate: '0deg', easing: 'easeInOutCirc', delay : 1400, duration : 5000 });
                    $('.painting').css({ transformOrigin: '10px 10px' }).transition({ translate: '+=4', rotate: '3deg', easing: 'easeInOutCirc', delay : 1400, duration : 5000 }).transition({ rotate: '0deg', easing: 'easeInOutCirc', delay : 1400, duration : 5000 });
                    $('.sounds').css({ transformOrigin: '10px 10px' }).transition({ translate: '+=4', rotate: '-2deg', easing: 'easeInOutCirc', delay : 1400, duration : 5000 }).transition({ rotate: '0deg', easing: 'easeInOutCirc', delay : 1400, duration : 5000 });

                });

                return;
                self.start();



            
            });
    },

    start : function() {
        this.home = this.loadAssetFile('home.txt');
        this.screen1 = this.loadAssetFile('screen1.txt');
        this.screen2 = this.loadAssetFile('screen2.txt');
        this.screen3 = this.loadAssetFile('screen3.txt');
        this.screen4 = this.loadAssetFile('screen4.txt');
        this.screen5 = this.loadAssetFile('screen5.txt');
        this.screen6 = this.loadAssetFile('screen6.txt');
        this.screen7 = this.loadAssetFile('screen7.txt');

        this.bodyImages = [ 'img/1/1-background.png', 'img/back_puzzle.jpg', 'img/back_painting.jpg', 'img/back_memory.jpg', 'img/back_touch.jpg', 'img/flower.jpg',  'img/flower.jpg' ];
        page('#/screen/:id', app.screenShow);
        page('#/screen/1');
    },

    screenShow : function(ctx, next) {

        var raw = eval('app.screen' + ctx.params.id);
        var compiled = _.template(raw);

        var messages = { }, config = { };
        var content = compiled($.extend({}, messages, config));
        
        $('body').css('background', 'url(' + app.bodyImages[ctx.params.id - 1] + ') no-repeat');
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

        switch(parseInt(ctx.params.id)) {
            case 2 :
                app.puzzlePage();
                break;
            case 3 :
                app.paitingPage(); 
                break;
            case 4 :
                app.memoryPage(); 
                break;
            case 5 :
                app.soundPage(); 
                break;

        }
    },

    puzzlePage : function() {
        var p = new Puzzle($(".puzzle"));
    },

    paitingPage : function() {
        var p = new Painting();
    },

    memoryPage : function() {
        var p = new Memory();
    },

    soundPage : function() {
        // var p = new Sound();
    },

    loadAssetFile : function(filename) {
         var strUrl = "js/" + filename, strReturn = "";
          jQuery.ajax({ url: strUrl, async:false, dataType: "text", 
            success: function(html) {
              strReturn = html;
            },
            error: function() {
              strReturn = "error reading file";
            }
          });
          return strReturn;
    },
};
