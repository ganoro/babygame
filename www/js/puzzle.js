/**
 * Puzzle toolkit 
 */
var Puzzle = (function () {
    // private static
    var nextId = 1;
    var images = [ { img: '1.jpg', pieces : ['1a.png', '1b.png', '1c.png', '1d.png'] } ];

    // constructor
    var cls = function (e) {

        for (var i = images[0].pieces.length - 1; i >= 0; i--) {
            var p = images[0].pieces[i];
            $(e).append('<div class="piece' + i +'target" style="position:absolute;top: ' + (i * 15) + '%;left:20%"><img src="img/' + p + '"></div>');
            $(e).append('<div class="piece' + i +'" style="position:absolute;top: ' + (i * 15) + '%;left:60%"><img src="img/' + p + '"></div>');

            $('.piece' + i ).draggable();
            $('.piece').droppable({tolerance: "intersect" , accept : 'piece' + i,
                drop: function( event, ui ) {
                    var y = $('.piece1').position().top - $('.piece').position().top;
                    var x = $('.piece1').position().left - $('.piece').position().left;
                    $('.piece1').transition({  x: -x + 'px', y: -y + 'px'})
                    $('.piece1').draggable( 'disable' );
                    }
            });

            $('.piece' + i).click(function() {
                alert(JSON.stringify($(this).position()));
            });




        };

        // $(e).append('<div class="piece" style="position:absolute;top: 30%; left:40%"><img src="img/1a.png"></div>');
        // $(e).append('<div class="piece1" style="position:absolute;top: 0%"><img src="img/1a.png"></div>');

        // $('.piece').fadeTo(0, 0.3);
        // $('.piece1').draggable();
        // $('.piece').droppable({tolerance: "intersect" , 
        //   drop: function( event, ui ) {
        //     var y = $('.piece1').position().top - $('.piece').position().top;
        //     var x = $('.piece1').position().left - $('.piece').position().left;
        //     $('.piece1').transition({  x: -x + 'px', y: -y + 'px'})
        //     $('.piece1').draggable( 'disable' );
        //   }
        // });

    };

    cls.fillEdge = function(data, width) {
        for(var i = 0; i < data.length; i += 4) {
          if ( !data[i + 3] && (data[i + 7] || data[i + width*4 + 3] )) { // heighlight image
            data[i] = 255;            // red
            data[i + 1] = 0;          // green
            data[i + 2] = 0;          // blue  
            data[i + 3] = 255;
          }
        }
        for(var i = data.length - 4; i > 0; i -= 4) {
          if ( !data[i + 3] && data[i - 1] ) { // heighlight image
            data[i] = 255;            // red
            data[i + 1] = 0;          // green
            data[i + 2] = 0;          // blue  
            data[i + 3] = 255;
          }
        }
        return data;
    }

    // public static
    cls.get_nextId = function () {
        return nextId;
    };

    return cls;
})();


