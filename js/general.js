document.addEventListener("deviceready", startup, false);

//var servidor_url = 'https://www.thepastoapps.com/proyectos/instaglam_service/';

var servidor_url = 'http://192.168.1.10/instaglam_service/';

function startup() {
//$(document).ready(function() {
    $.mobile.allowCrossDomainPages = true;

    $('#cuadro-fotos').height($(window).height() * 0.85);

    $('h3').css('font-size', ($(window).height() / 40.5) + 'px');
    $('label, input[type="text"], #filtros span').css('font-size', ($(window).height() / 58) + 'px');


    cargar_fotos();

    $('#filtros li a').on('tap', function() {
        $('#filtros li.current').removeClass('current');
        $(this).parent('li').addClass('current');

        if ($(this).attr('pre') !== 'none') {
            if ($(this).attr('pre') === '5') {
                $('#filtro-capa-a').attr('src', 'images/filtro-capa-5a.png').css({display: 'block', height: '100%', width: 'auto'});
                $('#filtro-capa-b').attr('src', '').css('display', 'none');

                $('#filtro-num').val($(this).attr('pre'));
            } else {
                $('#filtro-capa-a').attr('src', 'images/filtro-capa-' + $(this).attr('pre') + 'a.png').css({display: 'block', height: 'auto', width: '72%'});
                $('#filtro-capa-b').attr('src', 'images/filtro-capa-' + $(this).attr('pre') + 'b.png').css('display', 'block');

                $('#filtro-num').val($(this).attr('pre'));
            }
        } else {
            $('#filtro-capa-a').attr('src', '').css({display: 'none', height: 'auto', width: '72%'});
            $('#filtro-capa-b').attr('src', '').css('display', 'none');

            $('#filtro-num').val('0');
        }

    });


    $('#generar_portada').on('tap', function() {
        var data = {
            nombre: $('#nombre').val(),
            apellido: $('#apellido').val(),
            email: $('#email').val(),
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

                $.mobile.changePage('#paso5', {transition: "none"});
            },
            timeout: 10000,
            error: function() {
                alert('No se ha podido conectar con el servidor.');
            }
        });
    });

    //IR A LA HOME
    $('#home').on('tap', function() {
        $.mobile.changePage('#paso6', {transition: "none"});

        setTimeout(function() {
            cargar_fotos();
            
            $("#form-datos-1")[0].reset();
            $("#form-datos-2")[0].reset();

            $('input[type="hidden"]').each(function() {
                $(this).val('');
            });

            $('#filtro-capa-a').attr('src', '').css('display', 'none');
            $('#filtro-capa-b').attr('src', '').css('display', 'none');

            $('#filtros li.current').removeClass('current');
            $('#filtros li.none').addClass('current');

            $.mobile.changePage("#paso1", {transition: "none"});
        }, 5000);

    });
//});
}


function cargar_fotos() {
    $.ajax({
        url: servidor_url + 'lista_fotos.php',
        type: "POST",
        dataType: 'json',
        success: function(datos) {
            $('#cuadro-fotos ul').html('');
            for (i = 0; i < datos.length; ++i) {
                $('#cuadro-fotos ul').append('<li><a class="link-foto" href="javascript:;" pre="' + datos[i] + '"><img src="' + servidor_url + 'images/fotos/120x120/' + datos[i] + '"></a></li>');
            }
            
            $('#cuadro-fotos ul li a img').load(function(){
                myScroll.refresh();
                myScroll.scrollTo(0, 0, 0);
            });

            $('.link-foto').on('tap', function() {

                $('#foto').css({visibility: 'hidden'});
                $('#img-foto, #foto-crop img').attr('src', servidor_url + 'images/fotos/414x520/' + $(this).attr('pre'));
                $('#img-foto').load(function() {
                    $('#foto').css({visibility: 'visible'}); 

                });

                $('#imagen').val($(this).attr('pre'));

                $.mobile.changePage('#paso2', {transition: "none"});

            });
        },
        timeout: 40000,
        error: function() {
            alert('No se ha podido conectar con el servidor.');
        }
    });
}