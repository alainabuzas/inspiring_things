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

});
