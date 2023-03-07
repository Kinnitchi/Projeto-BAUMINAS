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

const calculateDays = (days, field, result) => {

    const daysCount = document.querySelector(days).value;
    $(field).on('blur', () => {
        const fieldDate = transformDate(document.querySelector(field).value);
        const returnData = new Date(fieldDate);
        const day = returnData.getDate() + parseInt(daysCount);
        const month = returnData.getMonth() + 1;
        const year = returnData.getFullYear();

        return document.querySelector(result).value = `${day}/${month}/${year}`;
    });

}

const transformDate = date => {

    const data = date.split('/').reverse().join('-');
    let day = data.split('-')[2].startsWith('0') ? day = data.split('-')[2].replace('0', '') : day = data.split('-')[2];
    let month = !data.split('-')[1].length == 2 ? month = '0' + data.split('-')[1] : month = data.split('-')[1];
    let year = data.split('-')[0];

    return `${year}-${month}-${day}`;
}


function datasHoras() {
    FLUIGC.calendar('#dt_dataInicialGozo, #txt_periodoAbonoDe, #txt_periodoAbonoAte, #txt_substFeriasApartir, #txt_periodoGozoDe, #txt_periodoGozoAte', {
        pickDate: true,
        pickTime: false
    });
}