let userName//input de nombre
let userHeight//input de altura
let userWeigth//input de peso
let totalIMC //variable del total del imc
let user = {}//variable de usuario

const ow = 'OVERWEIGTH'
const iw = 'IDEALWEIGTH'
const uw = 'UNDERWEIGTH'

function validationForm() {
    
    const inputName = $('#userName')//input de nombre
    const inputHeight = $('#userHeight')//input de altura
    const inputWeigth = $('#userWeigth')//input de peso

    const expRegDEC = /^[1-2][.]\d\d/ //expresion regular para decimales
    const expRegNAME = /^([a-záéíóúA-ZÁÉÍÓÚ]{1}[a-záéíóúA-ZÁÉÍÓÚ]+[\s]*)+$/ //expresion regular para nombres propios
    const expRegENT = /^([1-9])([0-9])([0-9]?)$/ //expresion regular para un numero entero de dos cifras que no comience con 0

    let validName//variable para almacenar validacion de nombre
    let validHeight//variable para almacenar validacion de altura
    let validWeigth//variable para almacenar validacion de peso
    
    if (inputName.val() == null || inputName.val().length == 0 || expRegNAME.test(inputName.val()) == false){
        $('#errMjsN').remove()
        $('#form__item--name').append('<p class="errMjs" id="errMjsN">ingresa tu nombre (solo letras sin signos ni numeros)</p>')
        validName = false //valida nombre que no sea nulo, que este escrito
    }else{
        validName = true
    }
    if (inputHeight.val() == null || inputHeight.val().length == 0 || expRegDEC.test(inputHeight.val()) == false){
        $('#errMjsH').remove()
        $('#form__item--height').append('<p class="errMjs" id="errMjsH">ingresa tu altura (solo numeros con <b>"."</b>)</p>')
        validHeight = false //valida la altura, que no sea nula, que este escrita y que sea decimal
    }else{
        validHeight = true
    }
    if (inputWeigth.val() == null || inputWeigth.val().length == 0 || expRegENT.test(inputWeigth.val()) == false || inputWeigth.val() < 10 && inputWeigth.val() > 500){
        $('#errMjsW').remove()
        $('#form__item--weigth').append('<p class="errMjs" id="errMjsW">ingresa tu peso correctamente</p>')
        validWeigth = false //valida que el peso no sea nulo, que este escrito y sea un numero de hasta tres cifras y que no sea menor a 10 ni mayor a 500.
    }else{
        validWeigth = true
    }

    if(validName == false || validHeight == false || validWeigth == false){
        return false //valida falso si alguno de los filtros da error
    }else{
        return true
    }
}

function pow(height) {//obtiene el cuadrado de la altura
    return Math.pow(height, 2)
}

function getIMC(height, weigth) {//realiza la division entre el peso y el cuadrado de la altura, dando como resultado el ICM
    return weigth / pow(height)
}

function printIMC(user) {//imprime en pantalla el resultado con los datos obtenidos.

    const {name, bmi, type} = user//deconstruir el objeto de user

    $('form').remove() //eliminar el form
    $('.main__div__form--contain').html('<div id="resultFinal"></div>')
    $('#resultFinal').append('<h4>YOUR RESULT IS:</h4>').append(`<p>${name}, your IMB is ${bmi}, you have ${type}</p>`).append('<button id="reloadPage-btn" class="btn">CLEAR</button>')
    $('#reloadPage-btn').on('click', ()=> location.reload(false))
    
}

function getDATA(e) {//obtine los datos del form y ejecuta el calculo y el print con el resultado
    e.preventDefault()
  
    if (validationForm() == true){ //si la validacion es correcta pasa a realizar los calculos
    let userName = $('#userName').val()//
    let userHeight = parseFloat($('#userHeight').val())
    let userWeigth = parseFloat($('#userWeigth').val())
    
    let totalBMI = getIMC(userHeight, userWeigth).toFixed(0)//redondea el numero obtenido hacia un numero enteror

    if (totalBMI > 25) {
        let user = {'name': `${userName}`,'imc': `${totalBMI}`, 'type': `${ow}`}
        printIMC(user)//imprime resultado
    }else if(totalBMI < 20 ){
        let user = {'name': `${userName}`,'imc': `${totalBMI}`, 'type': `${uw}`}
        printIMC(user)//imprime resultado
    }else if (totalBMI > 20 && totalIMC < 25){
        let user = {'name': `${userName}`,'imc': `${totalBMI}`, 'type': `${iw}`}
        printIMC(user)//imprime resultado
    }
}
}

$('#send-info').on('click', getDATA) //listener del evento clic en get IBM
