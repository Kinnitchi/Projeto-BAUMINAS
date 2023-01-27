$(document).ready(function() {

    datasHoras();

    if ($("#atividade").val() == "2") {
        $("#guiaSolicitante").removeClass("active");
        $("#guiaGerente").addClass("active");
        $("#div_solicitante").removeClass("in active");
        $("#div_gerente").addClass("in active");
    }else if ($("#atividade").val() == "3") {
        $("#guiaSolicitante").removeClass("active");
        $("#guiaRH").addClass("active");
        $("#div_solicitante").removeClass("in active");
        $("#div_RH").addClass("in active");
    }else if ($("#atividade").val() == "4") {
        $("#guiaSolicitante").removeClass("active");
        $("#guiaDP").addClass("active");
        $("#div_solicitante").removeClass("in active");
        $("#div_DP").addClass("in active");
    }else if ($("#atividade").val() == "5") {
        $("#guiaSolicitante").removeClass("active");
        $("#guiaTI").addClass("active");
        $("#div_solicitante").removeClass("in active");
        $("#div_TI").addClass("in active");
    }

})

function datasHoras(){
    var camposDatas = FLUIGC.calendar('#dt_dataInicialGozo, #dt_dataFinalGozo, #txt_periodoAbonoDe, #txt_periodoAbonoAte, #txt_substFeriasApartir, #txt_periodoGozoDe, #txt_periodoGozoAte', {
        pickDate: true,
        pickTime: false
    });
}