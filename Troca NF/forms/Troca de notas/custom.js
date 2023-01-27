$(function () {

    carregarCalendar();
    desabilitarBotoes();

    $(".segundaPassada").hide();
    if ($("#atividade").val() >= 72) {

        $(".segundaPassada").show();

    }

    $("#guia_log").removeClass("active");
    $("#div_log").removeClass("in active");

    if ($("#atividade").val() == "0" || $("#atividade").val() == "1") {

        $("#log_anexoNF, #log_anexoLaudoFornecedor").removeAttr('disabled');

        $("#log_transferencia").change(function () {
            if (this.value == "S") {

                $(".transfSim").show(500);

            } else if (this.value == "N" || this.value == "") {

                $(".transfSim").hide(500);
                $("#log_unidadeDestino, #log_numCargaTransferencia, #log_numPedidoTransferencia").val("")
            }
        });

        $("#guia_log").addClass("active");
        $("#div_log").addClass("in active");

    } else if ($("#atividade").val() == "2") {

        $("#bal1_anexo").removeAttr('disabled');

        $("#guia_bal1").addClass("active");
        $("#div_bal1").addClass("in active");

    } else if ($("#atividade").val() == "3") {


        $("#guia_fis").addClass("active");
        $("#div_fis").addClass("in active");

    } else if ($("#atividade").val() == "4") {

        $("#lab_anexo").removeAttr('disabled');


        $("#guia_lab").addClass("active");
        $("#div_lab").addClass("in active");

    } else if ($("#atividade").val() == "5") {

        $("#guia_ind").addClass("active");
        $("#div_ind").addClass("in active");

    } else if ($("#atividade").val() == "6") {

        $("#transf_anexoNF, #transf_anexoXML, #transf_anexoLaudo, #venda_anexoNF, #venda_anexoXML, #venda_anexoLaudo").removeAttr('disabled');

        $("#guia_bal2").addClass("active");
        $("#div_bal2").addClass("in active");

    } else if ($("#atividade").val() == "72") {

        $("#bal2_anexo").removeAttr('disabled');

        $("#guia_2bal1").addClass("active");
        $("#div_2bal1").addClass("in active");

    } else if ($("#atividade").val() == "73") {

        $("#guia_2fis").addClass("active");
        $("#div_2fis").addClass("in active");

    } else if ($("#atividade").val() == "74") {

        $("#lab2_anexo").removeAttr('disabled');

        $("#guia_2lab").addClass("active");
        $("#div_2lab").addClass("in active");

    } else if ($("#atividade").val() == "75") {

        $("#guia_2ind").addClass("active");
        $("#div_2ind").addClass("in active");

    } else if ($("#atividade").val() == "76") {

        $("#venda2_anexoNF, #venda2_anexoXML, #venda2_anexoLaudo").removeAttr('disabled');

        $("#guia_2bal2").addClass("active");
        $("#div_2bal2").addClass("in active");

    }

    if ($("#log_transferencia").val() == "N" || $("#log_transferencia").val() == "") {
        $(".transfSim").hide();
    }
});

const verifySelected = () => {
    let selected = document.querySelector('select[name="log_transferencia"]').value;
    if (selected == "") {
        $('#log_transferencia').show(500);
    }
}

function carregarCalendar() {

    var log_dataEntrega = FLUIGC.calendar('#log_dataEntrega', {
        pickDate: true,
        pickTime: false,
        showToday: true,
        language: 'pt-br'
    });

}

function showCamera(e) {
    let nomeAnexo = e.value;
    JSInterface.showCamera(nomeAnexo);
    $("#" + e.id).removeClass().addClass("btn btn-success");

}

function desabilitarBotoes() {
    $("#log_anexoNF, #log_anexoLaudoFornecedor, #bal1_anexo, #lab_anexo, #transf_anexoNF, #transf_anexoXML, #transf_anexoLaudo, #venda_anexoNF, #venda_anexoXML, #venda_anexoLaudo, #bal2_anexo, #lab2_anexo, #venda2_anexoNF, #venda2_anexoXML, #venda2_anexoLaudo").attr('disabled', 'disabled');
}