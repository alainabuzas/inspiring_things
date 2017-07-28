console.log('loaded js')
$(document).ready(function() {

    $('.modal').modal();

    $('.tooltipped').tooltip({ delay: 50 });

    $('#newimage').click(function() {
        console.log('clickity clack');
        $.ajax({
            url: '/getpic',
            type: 'GET',
            success: function(photo) {
                var newpic = JSON.parse(photo);
                $('#bigpicture').attr('src', newpic.urls.regular);
            }
        });
    });

    $('#newquote').click(function() {
        console.log('clicked it');
        $.ajax({
            url: '/getquote',
            type: 'GET',
            success: function(data) {
                var newquote = JSON.parse(data)[0];
                $('#qod-quote').empty().append(newquote.content + "<p> –" + newquote.title + "</p>");
            }
        });
    });

    $('#fontswap').click(function() {
        console.log('trying');
        $('.type').toggleClass('typeblack');
        $('.type a').toggleClass('typeblack a');
    });

    $('#styleswap').click(function() {
        console.log('trying swap');
        $('.type').toggleClass('typeserif');
        $('.type a').toggleClass('typeserif a');
    });

    // $('#download').click(function() {
    //     console.log('tried-dl');
    //      api.capture('http://api.screenshotlayer.com/api/capture?access_key=THESETHINGS&url=http://www.cnn.com', function(error, response, body) {
    //         if (err) {
    //         return console.log('Capture Callback (Error): ' + JSON.stringify(err));
    //         }
    //     console.log('Live Capture (Result): ' + result.length);
    //     });
    // });
    //             var downloaded =
        //         $(screenshot('/downloadimg', {
        //                 ignoreSslErrors: true,
        //                 sslProtocol: any,
        //                 format: jpg
        //             }))
        //             .width(1200)
        //             .height(800)
        //             .capture(function(err, img) {
        //                 if (err) throw err;
        //                 res.writeHead(200, {
        //                     'Content-Type': 'image/png'
        //                 });
        //                 res.end(img, 'binary');
        //             });

        //     }
        // });
        // $('#download').click(function() {
        //     console.log('download try');
        //     window.location.href = '/save/' +
        //         encodeURIComponent($('#qod-quote').text()) + '/' +
        //         encodeURIComponent($('#bigpicture').attr('src'));
    //     // });
    // });
});
