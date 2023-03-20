const topScreen = document.querySelector(".previous-display");
const bottomScreen = document.querySelector(".current-display");
const numberButtons = document.querySelectorAll(".num");
const operationButtons = document.querySelectorAll(".operator");
const equalButtons = document.querySelector(".equal");
const acButtons = document.querySelector(".ac");
const pmButtons = document.querySelector(".pm");
const percentButtons = document.querySelector(".percent");

let topScreencaption = "";
let bottomScreencaption = "";
let operator = "";
let equalOrPercentPressed = false;

numberButtons.forEach((number) => {
    number.onclick = () => {
        screen(number.textContent);
        updateScreen();
    };
});

const screen = (num) => {
    if (num != "0" && num != "." && bottomScreencaption == "0") {
        bottomScreencaption = num;
        return;
    }

    if (num === "." && bottomScreencaption == "") return;


    if (num === "." && bottomScreencaption.includes(".")) return;


    if (num === "0" && bottomScreencaption === "0") return;

    if (equalOrPercentPressed) {
        equalOrPercentPressed = false;
        bottomScreencaption = num;
        return;
    }

    bottomScreencaption = bottomScreencaption + num;
};


const updateScreen = () => {

    if (bottomScreencaption.toString().length > 9) {
        bottomScreencaption = bottomScreencaption.toString().slice(0, 9);
    }

    bottomScreen.textContent = bottomScreencaption;
    if (operator != null) {
        topScreen.textContent = `${topScreencaption} ${operator}`;
    }
};

operationButtons.forEach((op) => {
    op.onclick = () => {
        if (topScreencaption && bottomScreencaption == "") {
            operator = op.textContent;
            updateScreen();
        }

        if (bottomScreencaption === "") return;

        if (bottomScreencaption && topScreencaption) {
            calculate();
        }

        operator = op.textContent;
        topScreencaption = bottomScreencaption;
        bottomScreencaption = "";
        updateScreen();
    };
});

equalButtons.onclick = () => {
    calculate();
    updateScreen();
    equalOrPercentPressed = true;
};

const calculate = () => {
    let result;
    switch (operator) {
        case "+":
            result = +topScreencaption + Number(bottomScreencaption);
            break;

        case "-":
            result = topScreencaption - bottomScreencaption;
            break;

        case "x":
            result = topScreencaption * bottomScreencaption;
            break;

        case "÷":
            result = topScreencaption / bottomScreencaption;
            break;

        default:
            break;
    }
    bottomScreencaption = result;
    topScreencaption = "";
    operator = "";
};

acButtons.addEventListener("click", () => {
    operator = "";
    bottomScreencaption = "";
    topScreencaption = "";
    updateScreen();
});


pmButtons.onclick = () => {
    if (!bottomScreencaption) return;

    bottomScreencaption = bottomScreencaption * -1;
    updateScreen();
};

percentButtons.onclick = () => {
    if (!bottomScreencaption) return;

    bottomScreencaption = bottomScreencaption / 100;

    updateScreen();
    equalOrPercentPressed = true;
};