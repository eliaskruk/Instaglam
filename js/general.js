document.addEventListener("deviceready", startup, false);

function startup() {

//$(document).ready(function() {
    $(window).resize(function() {
        $('#foto').height($(window).height() * 0.50);
        $('#cuadro-fotos').height($(window).height() * 0.85);
    });

    $.mobile.allowCrossDomainPages = true;

    var servidor_url = 'https://www.thepastoapps.com/proyectos/instaglam_service/';

    $('#cuadro-fotos').height($(window).height() * 0.85);

    $.ajax({
        url: servidor_url + 'lista_fotos.php',
        dataType: 'json',
        success: function(datos) {
            for (i = 0; i < datos.length; ++i) {
                $('#cuadro-fotos ul').append('<li><a class="link-foto" href="javascript:;" pre="' + datos[i] + '"><img src="' + servidor_url + 'images/fotos/120x120/' + datos[i] + '"></a></li>');
            }

            var myScroll;
            function loaded() {
                myScroll = new iScroll('cuadro-fotos', {
                    scrollbarClass: 'myScrollbar',
                });
            }
            document.addEventListener('touchmove', function(e) {
                e.preventDefault();
            }
            , false);
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(loaded, 200);
            }
            , false);

            $('.link-foto').on('tap', function() {

                $('#img-foto, #foto-crop img').attr('src', servidor_url + 'images/fotos/446x560/' + $(this).attr('pre'));

                $('#imagen').val($(this).attr('pre'));

                $.mobile.changePage('#paso2', {transition: "slide"});
                $('#foto').css({visibility: 'hidden'});
                $('#foto').height($(window).height() * 0.55);
                $('#foto').css({visibility: 'visible'});
            });
        },
        timeout: 40000,
        error: function(e) {
            alert('Error!');
        }
    });


    $('#filtros li a').on('tap', function() {
        $('#filtros li.current').removeClass('current');
        $(this).parent('li').addClass('current');

        if ($(this).attr('pre') !== 'none') {
            if ($(this).attr('pre') === '5') {
                $('#filtro-capa-a').attr('src', 'images/filtro-capa-5a.png').css('display', 'block');
                $('#filtro-capa-b').attr('src', '').css('display', 'none');

                $('#filtro-num').val($(this).attr('pre'));
            } else {
                $('#filtro-capa-a').attr('src', 'images/filtro-capa-' + $(this).attr('pre') + 'a.png').css('display', 'block');
                $('#filtro-capa-b').attr('src', 'images/filtro-capa-' + $(this).attr('pre') + 'b.png').css('display', 'block');

                $('#filtro-num').val($(this).attr('pre'));
            }
        } else {
            $('#filtro-capa-a').attr('src', '').css('display', 'none');
            $('#filtro-capa-b').attr('src', '').css('display', 'none');

            $('#filtro-num').val('0');
        }

    });


    $('#form-datos-1').submit(function() {
        $.mobile.changePage('#paso4', {transition: "slide"});

        return false;
    });

    $('#form-datos-2').submit(function() {
        var data = {
            nombre: $('#nombre').val(),
            apellido: $('#apellido').val(),
            dni: $('#dni').val(),
            telefono: $('#telefono').val(),
            name: $('#name').val(),
            artist: $('#artist').val(),
            friends: $('#friends').val(),
            city: $('#city').val(),
            boyfriend: $('#boyfriend').val(),
            imagen: $('#imagen').val(),
            filtro: $('#filtro-num').val()
        }

        $.ajax({
            url: servidor_url + 'generar_portada.php',
            type: "POST",
            data: data,
            success: function(datos) {
                $('#img-portada').attr('src', servidor_url + 'images/portadas/' + datos)

                $.mobile.changePage('#paso5', {transition: "slide"});
            },
            timeout: 10000,
            error: function() {
                alert('Error!');
            }
        });

        return false;
    });

    //IR A LA HOME
    $('#home').on('tap', function() {
        $.mobile.changePage('#paso6', {transition: "slide"});

        setTimeout(function() {
            $("#form-datos-1")[0].reset();
            $("#form-datos-2")[0].reset();

            $('input[type="hidden"]').each(function() {
                $(this).val('');
            });

            $('#filtro-capa-a').attr('src', '').css('display', 'none');
            $('#filtro-capa-b').attr('src', '').css('display', 'none');

            $('#filtros li.current').removeClass('current');
            $('#filtros li.none').addClass('current');

            $.mobile.changePage('#paso1', {transition: "slide"});
        }, 5000);

    });
//});

}

