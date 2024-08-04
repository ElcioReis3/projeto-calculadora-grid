let caixaContainer = document.querySelector(".container");
let buttons = caixaContainer.querySelectorAll("button");
let display = document.querySelector(".display__container");

let numeroAtual = "";
let primeiraOperação = null;
let operador = null;
let restart = false;

function updateResult(origemLimpa = false) {
    display.innerHTML = origemLimpa ? 0 : numeroAtual.replace(".", ",");
}

function addDigit(digit) {
    if (digit === "," && (numeroAtual.includes(",") || !numeroAtual)) return;

    if (restart) {
        numeroAtual = digit;
        restart = false;
    } else {
        numeroAtual += digit;
    }

    updateResult();
}

function calculador() {
    if (operador === null || primeiraOperação === null) return;

    let segundoOperador = parseFloat(numeroAtual.replace(",", "."));
    let resultadoValor;

    switch (operador) {
        case "+":
            resultadoValor = primeiraOperação + segundoOperador;
            break;
        case "-":
            resultadoValor = primeiraOperação - segundoOperador;
            break;
        case "x":
            resultadoValor = primeiraOperação * segundoOperador;
            break;
        case "/":
            resultadoValor = primeiraOperação / segundoOperador;
            break;
        default:
    }

    if (resultadoValor.toString().split(".")[1]?.length > 5) {
        numeroAtual = parseFloat(resultadoValor.toFixed(5)).toString();
    } else {
        numeroAtual = resultadoValor.toString();
    }


    operador = null;
    primeiraOperação = null;
    restart = true;
    updateResult();
}
function porcentagemValor() {
    let resultado = parseFloat(numeroAtual) / 100;

    if (["+", "-"].includes(operador)) {
        resultado = resultado * (primeiraOperação || 1);
    }

    if (resultado.toString().split(".")[1]?.length > 5) {
        resultado = resultado.toFixed(5).toString();
    }

    numeroAtual = resultado.toString();
    updateResult();
}

function OperadorDeConjunto(newOperador) {
    if (numeroAtual) {
        calculador();

        primeiraOperação = parseFloat(numeroAtual.replace(",", "."));
        numeroAtual = "";
    }
    operador = newOperador;
}

function limparCalculador() {
    numeroAtual = "";
    primeiraOperação = null;
    operador = null;
    updateResult(true)
    buttons[0].innerHTML = "AC";
}

buttons.forEach((button) => {

    button.addEventListener("click", (e) => {
        const buttonText = e.target.innerHTML;

        if (+buttonText >= 0 || buttonText === ",") {
            addDigit(buttonText);
            removerClass();
            buttons[0].innerHTML = "C";
        } else if (["+", "-", "/", "x"].includes(buttonText)) {
            OperadorDeConjunto(buttonText);
            removerClass();
            button.classList.contains("active") ? button.classList.remove("active") : button.classList.add("active")
        } else if (buttonText === "=") {
            calculador();
            removerClass();
        } else if (buttonText === "AC" || buttonText === "C") {
            limparCalculador();
            removerClass();
        } else if (buttonText === "+/-") {
            numeroAtual = (parseFloat(numeroAtual || primeiraOperação) * -1).toString();
            updateResult();
            removerClass();
        } else if (buttonText === "%") {
            porcentagemValor();
            removerClass();
        }


    });

})


function removerClass() {
    buttons.forEach((button) => {
        button.classList.remove("active")
    })
}




