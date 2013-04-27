/**
 * Puzzle toolkit 
 */
var Puzzle = (function () {
    // private static
    var nextId = 1;

    // constructor
    var cls = function (e) {
		$(e).append('<div class=""><img src="img/1.jpg" style="width:600px"></div>')       
    };

    // public static
    cls.get_nextId = function () {
        return nextId;
    };

    return cls;
})();


