$(document).ready(function () {
    datasHoras();

    if ($("#atividade").val() == "2") {
        $("#guiaSolicitante").removeClass("active");
        $("#guiaGerente").addClass("active");
        $("#div_solicitante").removeClass("in active");
        $("#div_gerente").addClass("in active");

    } else if ($("#atividade").val() == "54") {

        $("#guiaSolicitante").removeClass("active");
        $("#div_solicitante").removeClass("in active");
        $("#guiaGerente").removeClass("active");
        $("#guiaDiretoria").addClass("active");
        $("#div_gerente").removeClass("in active");
        $("#div_diretoria").addClass("in active");

    } else if ($("#atividade").val() == "3") {
        $("#guiaSolicitante").removeClass("active");
        $("#guiaRH").addClass("active");
        $("#div_solicitante").removeClass("in active");
        $("#div_RH").addClass("in active");
    } else if ($("#atividade").val() == "4") {
        $("#guiaSolicitante").removeClass("active");
        $("#guiaDP").addClass("active");
        $("#div_solicitante").removeClass("in active");
        $("#div_DP").addClass("in active");
    } else if ($("#atividade").val() == "5") {
        $("#guiaSolicitante").removeClass("active");
        $("#guiaTI").addClass("active");
        $("#div_solicitante").removeClass("in active");
        $("#div_TI").addClass("in active");
    }

    radiosSelected();
    calculateDays("#daysGozo", "#dt_dataInicialGozo", "#dt_dataFinalGozo");
    calculateDays("#daysAbono", "#txt_periodoAbonoDe", "#txt_periodoAbonoAte");

    changeDays("#daysAbono", "#txt_periodoAbonoDe", "#txt_periodoAbonoAte");
    changeDays("#daysGozo", "#txt_periodoAbonoDe", "#txt_periodoAbonoAte");


    WKNumState == 1 ? validateDynamicFields('rad_abonoPecuniario') : validateDynamicFields('_rad_abonoPecuniario');

});

const radiosSelected = () => {

    const radios = document.querySelectorAll('input[name="rad_abonoPecuniario"]')

    for (radio in radios) {
        radios[radio].onclick = function () {
            console.log(this.value);

            if (this.value === "Sim") {
                document.querySelectorAll(".divAbono")[0].classList.remove("hide")
                document.querySelectorAll(".divAbono")[1].classList.remove("hide")
            } else {
                document.querySelectorAll(".divAbono")[0].classList.add("hide");
                document.querySelectorAll(".divAbono")[1].classList.add("hide");
            }
        }
    }

}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const calculateDays = (days, field, result) => {

    const daysCount = document.querySelector(days).value;
    if (daysCount != null || daysCount != undefined || daysCount != "" || daysCount != "0") {
        $(field).on('blur', () => {
            // DATE INICIAL
            const fieldDate = transformDate(document.querySelector(field).value);
            let finalDate = addDays(fieldDate, daysCount);

            return document.querySelector(result).value = finalDate.toLocaleDateString();

        });

    } else {

        FLUIGC.toast({
            title: 'Atenção',
            message: 'Preencha o campo de dias',
            type: 'warning'
        });

    }

}

const transformDate = date => {

    const data = date.split('/').reverse().join('-');
    let day = data.split('-')[2].startsWith('0') ? data.split('-')[2].replace('0', '') : data.split('-')[2];
    let month = data.split('-')[1].startsWith('0') ? data.split('-')[1].replace('0', '') : data.split('-')[1];
    let year = data.split('-')[0];

    return `${year}-${month}-${day}`;
}


function datasHoras() {
    FLUIGC.calendar('#dt_dataInicialGozo, #txt_periodoAbonoDe, #txt_substFeriasApartir', {
        pickDate: true,
        pickTime: false
    });
}

const validateDynamicFields = field => {
    const fields = document.querySelectorAll('[name^="' + field + '"]');
    const fieldsArray = Array.from(fields);

    fieldsArray.forEach(field => {
        if (field.checked) {
            if (field.value === "Sim") {
                document.querySelectorAll(".divAbono")[0].classList.remove("hide")
                document.querySelectorAll(".divAbono")[1].classList.remove("hide")
            }
        }
    });
}

const changeDays = (days, field, result) => {

    $('#' + days).on('chaneg', e => {

        if (e.value == null || e.value == undefined || e.value == "" || e.value == "0") {

            const fieldDate = transformDate(document.querySelector(field).value);
            let finalDate = addDays(fieldDate, e.value);

            return document.querySelector(result).value = finalDate.toLocaleDateString();

        } else {

            FLUIGC.toast({
                title: 'Atenção',
                message: 'Preencha o campo de dias corretamente',
                type: 'warning'
            });

        }

    })
}