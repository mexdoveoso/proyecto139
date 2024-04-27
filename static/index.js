$(document).ready(function(){

    console.log('El documento está listo')

    //  Obtener la fecha usando el objeto Date() y convertirla en una cadena de caracteres.
    let date = new Date()
    let current_date = date.toDateString()

    //  Mostrar la fecha en la página HTML usando JQUERY Y JS.
    $('#date').text('Date : ' + current_date)

    
    let review = ""
    let input_data = ""
    let product = ""
    let emotion = ""
    let emoji_url = ""

    //   Hacer una función para el requerimiento AJAX
    function ajax_request(api_url , input_data){

        $.ajax({

            // Escribir el requerimiento.
            type : 'POST',

            // url
            url : api_url,

            //  Datos JSON
            data : JSON.stringify(input_data),

            //  Tipo de datos de la respuesta esperada
            dataType : 'json',

            //  Tipo de contenido
            contentType : 'application/json',

            //  Método success - (éxito)
            success : function(result)
            {
                //  Extraer el sentimiento y la ruta del emoticón.
                emotion = result.sentiment
                emoji_url = result.path

                //  Actualizar el emoticón y el sentimiento segú corresponda.
                if (product  ==  'Smartphone'){
                    $('#m_emoji').attr('src' , emoji_url)
                    $('#m_emotion').text(emotion)
                    $('#m_emoji').show()
                    $('#m_emotion').show()
                }

                else if (product  ==  'Digital Camera'){
                    $('#c_emoji').attr('src' , emoji_url)
                    $('#c_emotion').text(emotion)
                    $('#c_emoji').show()
                    $('#c_emotion').show()
                }

                else if (product  ==  'Headphones'){
                    $('#h_emoji').attr('src' , emoji_url)
                    $('#h_emotion').text(emotion)
                    $('#h_emoji').show()
                    $('#h_emotion').show()
                }

                else if (product  ==  'Video Games'){
                    $('#v_emoji').attr('src' , emoji_url)
                    $('#v_emotion').text(emotion)
                    $('#v_emoji').show()
                    $('#v_emotion').show()
                }
            },

            //  Método error
            error : function(result)
            {
                console.log(result)
            }

        })

        console.log('Requerimiento AJAX enviado')
        
    }


    //  Verificar si se hace clic sobre el botón 'enviar' debajo de 'smartphone' y obtener la revisión correspondiente.
    $('#m_button').click(function(){

        review = $('#m_textbox').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Smartphone'
    })

    //  Verificar si se hace clic sobre el botón 'enviar' debajo de 'cámara' y obtener la revisión correspondiente.
    $('#c_button').click(function(){

        review = $('#c_textbox').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Digital Camera'
    })

    //  Verificar si se hace clic sobre el botón 'enviar' debajo de 'audífonos' y obtener la revisión correspondiente.
    $('#h_button').click(function(){

        review = $('#h_textbox').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Headphones'
    })

    //  Verificar si se hace clic sobre el botón 'enviar' debajo de 'videojuego' y obtener la revisión correspondiente.
    $('#v_button').click(function(){

        review = $('#v_textbox').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Video Games'
    })


    //   Si se hace clic sobre el botón GUARDAR, poner un requerimientopost en la API.

    $('#save_button').click(function(){

        console.log('Se ha hecho clic en el botón de guardar')

        //  Datos de entrada  
        input_data = {'date' : date , 'product' : product , 'review' : review , 'sentiment' : emotion}

        //  Llamada a AJAX.
        $.ajax({
            type : 'POST',
            url : '/save',
            data : JSON.stringify(input_data),
            dataType : 'json',
            contentType : 'application/json',
            success : function(result){
                console.log(result)
            },
            error : function(result){
                console.log(result)
            }
        })

        // Vaciar cajas de texto.
        $('#m_textbox').val('')
        $('#c_textbox').val('')
        $('#h_textbox').val('')
        $('#v_textbox').val('')
    })

    // Llamar a la función displaybot, cuando DOM está listo
    displayBot()

})


function displayBot() {

    //  Cuando se hace clic en el botón del chatbot.
    //Actividad1
    $('').click(function () {

        //  Cambiar la ventana de chat del chatbot.
        $('.chatbox__chat').toggle()
    });

    //Iniciar conversación con el bot.
    askBot()
}

function askBot() {

    //  Cuando se hace clic en el botón de enviar
    //Actividad2
    $("").click(function () {

        //  Obtener el texto de la caja de texto en el chatbot.
        var user_bot_input_text = $("#bot_input_text").val()

        if (user_bot_input_text != "") {
           
            //  Añadir un nuevo elemento div en la ventana de chat.
            $("#chat_messages").append('<div class="user__messages">' + user_bot_input_text + ' </div>')
            
            //Borrar el cuadro de entrada de texto después de enviar el mensaje.
            $("#bot_input_text").val('');

            let chat_input_data = {
                "user_bot_input_text": user_bot_input_text
            }

            $.ajax({
                type: 'POST',

                //  Escribir la misma URL que en el archivo app.py
                //Actividad3
                url: "",

                data: JSON.stringify(chat_input_data),
                dataType: "json",
                contentType: 'application/json',
                    success: function (result) {
                        
                        $("#chat_messages").append('<div class="bot__messages">' + result.bot_response + ' </div>')                        
                        $('.chatbox__messages__cotainer').animate({
                            scrollTop: $('.chatbox__messages__cotainer')[0].scrollHeight}, 1000);
                    },
                    error: function (result) {
                        alert(result.responseJSON.message)
                    }
            });

        }

    })

    $('#bot_input_text').keypress(function(e){
        //Si se pulsa la tecla Intro (código de la tecla es 13):
        if(e.which == 13){         
            $('#send_button').click(); //Activar evento de clic de botón de envío
        }
    });
}

    
