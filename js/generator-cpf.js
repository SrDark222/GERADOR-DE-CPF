const NAME_COOKIE_GENERATOR_CPF = "nv-cookie-generator-cpf";

$(document).ready(() => {
    setCookieGeneratorCpf();
    getCpf();
});

$("#nv-new-generator-cpf").click(() => {
    getCpf();
});

$("#nv-new-generator-copy-cpf").click(() => {
  	getCpf();
  	copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keyPressed = e.key;

    if (keyPressed.toLowerCase() === 'enter') {
        getCpf();
        copy(".nv-field-copy");
    }
});

function getCpf() {
    const n1 = Math.round(Math.random() * 9);
    const n2 = Math.round(Math.random() * 9);
    const n3 = Math.round(Math.random() * 9);
    const n4 = Math.round(Math.random() * 9);
    const n5 = Math.round(Math.random() * 9);
    const n6 = Math.round(Math.random() * 9);
    const n7 = Math.round(Math.random() * 9);
    const n8 = Math.round(Math.random() * 9);
    const n9 = getStatesCpf();
    let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
    d1 = 11 - (mod(d1, 11));
    if (d1 >= 10) d1 = 0;
    let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
    d2 = 11 - (mod(d2, 11));
    if (d2 >= 10) d2 = 0;

    const field = $("#nv-field-generator-cpf");
    const cookie = getCookie(`${NAME_COOKIE_GENERATOR_CPF}`) === "true";
    const cpf = cookie
        ? `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${d1}${d2}`
        : `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;

    field.text(cpf);
}

function getStatesCpf() {
    const state = $("#states-cpf").val();
    let number = 0;

    switch (state) {
        case "RS":
            number = 0;
            break;
        case "DF":
        case "GO":
        case "MT":
        case "MS":
        case "TO":
            number = 1;
            break;
        case "AC":
        case "AP":
        case "AM":
        case "PA":
        case "RO":
        case "RR":
            number = 2;
            break;
        case "CE":
        case "MA":
        case "PI":
            number = 3;
            break;
        case "AL":
        case "PB":
        case "PE":
        case "RN":
            number = 4;
            break;
        case "BA":
        case "SE":
            number = 5;
            break;
        case "MG":
            number = 6;
            break;
        case "ES":
        case "RJ":
            number = 7;
            break;
        case "SP":
            number = 8;
            break;
        case "PR":
        case "SC":
            number = 9;
            break;
        case "XX":
            number = Math.round(Math.random() * 9);
            break;
    }

    return number;
}

function mod(dividend, divider) {
    return Math.round(dividend - (Math.floor(dividend / divider) * divider));
}

function setCookieGeneratorCpf() {
  	const checkbox = $(`#${NAME_COOKIE_GENERATOR_CPF}`);
  	checkbox.change(() => {
        setCookie(`${NAME_COOKIE_GENERATOR_CPF}`, checkbox.prop("checked"));
        formatCpf(checkbox.prop("checked"));
  	})
  	checkbox.attr("checked", getCookie(`${NAME_COOKIE_GENERATOR_CPF}`) === "true");

    const states = $("#states-cpf");
    states.change(() => setCookie(states.attr("id"), states.val()))
    states.val(getCookie(states.attr("id")) || "XX");
}

function formatCpf(format) {
    const field = $("#nv-field-generator-cpf");
    const cpf = format
        ? `${field.text().substring(0, 3)}.${field.text().substring(3, 6)}.${field.text().substring(6, 9)}-${field.text().substring(9, 11)}`
        : field.text().replace(/[^0-9]/g,"");

    field.text(cpf);
}
