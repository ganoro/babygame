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
        this.config  = new Configuration();
        this.playBackground();

        var self = this;
        $('#logo1').transition({ scale: 1.1 , easing: 'easeOutCirc', duration: 700})
            .transition({ scale: 1 , easing: 'easeOutCirc', delay : 200, duration: 700 }, function() {
                $('#gback').fadeTo(3000, 1);
                $('#logo1').fadeTo(2000, 0);
                $('#logo2').fadeTo(2000, 0);
                
                $('#cloud2').transition({ y: '460px',  x: '500px', easing: 'easeOutCirc', duration : 2700 });
                $('#cloud3').transition({ y: '450px',  x: '-300px', easing: 'easeOutCirc', duration : 2500 });
                $('#cloud6').transition({ y: '-420px',  x: '120px', easing: 'easeOutCirc', duration : 2400 });
                $('#giraph').transition({ x: '-370px', easing: 'easeOutCirc', delay : 2000, duration : 2234 });
                $('#title').css({ transformOrigin: '800px 800px'}).transition({ rotate: '-25deg', delay : 1000, duration : 2000});
                $('#sun').transition({ y: '400px',  x: '400px', easing: 'easeOutCirc', duration : 2000 })
                    .transition({ y: '360px', easing: 'easeOutCirc', duration : 1000 }, function() {
                        self.start();
                });
        });
    },

    playBackground : function() {
        if (this.my_media != null) {
            this.my_media.release();
            this.my_media = null;
        }
        if (this.config.isSound()) {
            this.my_media = new Media('img/music/007765581-bouncing-along.wav', this.onPlaySuccess, this.onPlayError);
            this.my_media.play();
        }
    },

    onPlaySuccess : function() {
        console.log("playAudio():Audio Success");
    },

    onPlayError : function(error) {
        console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
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
        var self = this;
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

        // callable links
        $("div[class*='callable-']").bind('touchend', function() {
            cs = $(this).attr("class").split(/\s+/);
            $.each(cs, function(index, item) {
                cn = item.split("-");
                if (cn[0] == "callable") {
                    var c = new Callables();
                    var raw = eval('c.trigger_' + cn[1] + "()");
                }
            });
        });

        switch(parseInt(ctx.params.id)) {
            case 1:
                app.main();
                break;
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

    main : function() {
        $('.question').fadeTo('slow', 1);
        $('.mute').fadeTo('slow', 1);
        $('.purchase').fadeTo('slow', 1);

        $('.memory').fadeTo('slow', 1);
        $('.puzzle').fadeTo('slow', 1);
        $('.painting').fadeTo('slow', 1, function() {
            $('.paintingface').transition({ rotate: '15deg' });
            $('.paintingface').fadeTo('slow', 1);
            $('.paintingface').transition({ y : '-80px', delay: 8200, duration : 600 }).transition({ y : '30px', delay: 1000, duration : 1900 });
        });

        $('#title').css({ rotate: '-25deg', transformOrigin: '800px 800px'});

        $('#airplain').transition({ rotateY: '180deg' });
        $('#airplain').transition({ x: '-160px', easing: 'linear', delay : 3000, duration : 1400 }).transition({ x: '-110px', easing: 'linear', duration : 800 });
        $('#airplain').bind('touchend', function() {
            $('#airplain').unbind('touchend');
            $('#airplain').transition({ rotate: '5deg', x: '-200px', easing: 'linear', duration : 2000 })
                .transition({ rotate: '1deg', x: '-500px', easing: 'linear', duration : 3000 })
                .transition({ rotate: '-45deg', x: '-600px', y : '200px', easing: 'linear', duration : 3000 })
                .transition({ rotate: '-359deg', x: '-700px', easing: 'linear', duration : 2000 })
                .transition({ x: '-1300px', easing: 'linear', duration : 3000 });
        });


        $('.puzzle').transition({ delay: 1300, scale: '1.1', duration : 200 }).transition({ scale: '1', duration : 200 });
        $('.painting').transition({ delay: 2300, scale: '1.1', duration : 200 }).transition({ scale: '1', duration : 200 });
        $('.memory').transition({ delay: 3300, scale: '1.1', duration : 200 }).transition({ scale: '1', duration : 200 });
    
        for (var i = 1; i < 100; i++) {
            $('.buttons').css({ transformOrigin: '100% 100%' }).transition({ x: (i % 2 == 0 ? '+=1' : '-=1'), rotate: (i % 2 == 0 ? "-1deg" : "1deg"), duration : 7000 });
            $('.puzzle').css({ transformOrigin: '4px 7px' }).transition({ translate: '+=4', rotate: '-4deg', easing: 'easeOutCirc', delay : 400, duration : 5000 })
                .transition({ translate: '-=4', rotate: '1deg', easing: 'easeOutCirc', delay : 3400, duration : 5000 });
            $('.memory').css({ transformOrigin: '10px 8px' }).transition({ translate: '+=2', rotate: '-4deg', easing: 'easeOutCirc', delay : 300, duration : 5000 })
                .transition({ translate: '-=2', rotate: '1deg', easing: 'easeOutCirc', delay : 8400, duration : 5000 });
            $('.painting').css({ transformOrigin: '-4px 5px' }).transition({ translate: '-=6', rotate: '3deg', easing: 'easeOutCirc', delay : 200, duration : 5000 })
                .transition({ translate: '+=6', rotate: '-1deg', easing: 'easeOutCirc', delay : 400, duration : 5000 });
        };
        var s = this.config.isSound() ? "1-mute.png" : "1-mutes.png";
        $('.mute_img').attr("src", "img/1/" + s);
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
