/**
 * Callables toolkit 
 */
var Callables = (function () {
    // private static
    var nextId = 1;

    // constructor
    var cls = function () {  
        return cls;
    };

    cls.trigger_sound = function() {
        var config = new Configuration();
        var s = config.toggleSound() ? "1-mute.png" : "1-mutes.png";
        $('.mute_img').attr("src", "img/1/" + s);
        app.playBackground();
        return 0;
    };

    cls.trigger_purchase = function() {
        var t = "text"
        $('#mainpage').bindPopup( { popupContent : t});
        return 0;
    };

    cls.trigger_question = function() {
        var t = app.loadAssetFile("tip1.txt");
        $('#mainpage').bindPopup( { popupContent : t});
        return 0;
    };

    // public static
    cls.get_nextId = function () {
        return nextId;
    };

    return cls;
})();


