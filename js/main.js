
/*
function convertir() {
    let valores = parseInt(document.getElementById("valor").value);
    let resultado = 0;
    let dolar = 280;
    let euro = 307.18;
    if (document.getElementById("uno").checked) {
        resultado = valores * dolar;
        alert("El cambio de Pesos a Dolares es: $" + resultado);
    }
    else if (document.getElementById("dos").checked) {
        resultado = valores * euro;
        alert("El cambio de Pesos a Euros es: $" + resultado);
    }
    else {
        alert("Elija una moneda")
    }
}
*/

function convertir() {
    var valor = parseFloat(document.getElementById("valor").value);
    var de = document.getElementById("de").value;
    var a = document.getElementById("a").value;
    const dolar = 280;
    const euro = 307.18;
    resultado = 0;
    //Peso a dolar
    if (de == 1 && a == 2) {
        resultado = valor / dolar;

    }
    //Peso a Euro
    else if (de == 1 && a == 3) {
        resultado = valor / euro;
    }
    //Dolar a peso
    else if (de == 2 && a == 1) {
        resultado = valor * dolar;
    }
    //Dolar a euro
    else if (de == 2 && a === 3) {
        resultado = valor * (dolar / euro);
    }
    //Euro a peso
    else if (de == 3 && a == 1) {
        resultado = valor * euro;
    }
    //Euro a Dolar
    else if (de == 3 && a == 2) {
        resultado = valor * (euro / dolar);
    }
    else {
        resultado = valor;
    }
    document.getElementById("resultado").innerHTML = "Resultado: $" + resultado.toFixed(2);
}
