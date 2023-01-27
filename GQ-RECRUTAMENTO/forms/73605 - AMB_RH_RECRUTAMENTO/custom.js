$(document).ready(function () {

    datasHoras();
    userShared();
    verifyCheckbox();

    if (!($("#chk_efetivoDataAdmissao").prop("checked"))) {
        $("#txt_efetivoDataAdmissao").prop("style", "pointer-events: none;");
    }

    if ($("#atividade").val() == "2") {
        $("#guiaSolicitante").removeClass("active");
        $("#guiaGerente").addClass("active");
        $("#div_solicitante").removeClass("in active");
        $("#div_gerente").addClass("in active");
    } else if ($("#atividade").val() == "3") {
        $("#guiaSolicitante").removeClass("active");
        $("#guiaRH").addClass("active");
        $("#div_solicitante").removeClass("in active");
        $("#div_RH").addClass("in active");
    } else if ($("#atividade").val() == "4") {
        $("#guiaSolicitante").removeClass("active");
        $("#guiaTI").addClass("active");
        $("#div_solicitante").removeClass("in active");
        $("#div_ti").addClass("in active");
    } else if ($("#atividade").val() == "5") {
        $("#guiaSolicitante").removeClass("active");
        $("#guiaDP").addClass("active");
        $("#div_solicitante").removeClass("in active");
        $("#div_DP").addClass("in active");
    }

    if ($("#atividade").val() == "0" || $("#atividade").val() == "1" || $("#atividade").val() == "" || $("#atividade").val() == null) {
        $("#chk_efetivoDataAdmissao").change(function () {
            if (this.checked) {
                $("#txt_efetivoDataAdmissao").prop("readonly", false);
                $("#txt_efetivoDataAdmissao").prop("style", "pointer-events: auto;");
            } else {
                $("#txt_efetivoDataAdmissao").prop("readonly", true);
                $("#txt_efetivoDataAdmissao").val("");
                $("#txt_efetivoDataAdmissao").prop("style", "pointer-events: none;");
            }

        })

        $("#chk_substituicao").change(function () {
            if (this.checked) {
                $("#txt_substituicao").prop("readonly", false);
            } else {
                $("#txt_substituicao").prop("readonly", true);
                $("#txt_substituicao").val("");
            }

        })
    }

})

function datasHoras() {
    var camposDatas = FLUIGC.calendar('#txt_efetivoDataAdmissao, #dt_prazoContratacaoAte, #dt_rhDataAdmissao, #dataTermino', {
        pickDate: true,
        pickTime: false
    });
}

const setSelectedZoomItem = selectedItem => {
    if (selectedItem.inputId == 'txt_matricula') {
        document.querySelector('#RA_RG').value = selectedItem.RA_RG;
        document.querySelector('#RA_CIC').value = selectedItem.RA_CIC;
        document.querySelector('#RA_NASC').value = formatDate(selectedItem.RA_NASC);
    }
}
const removedZoomItem = removedItem => {
    if (removedItem.inputId == 'txt_matricula') {
        document.querySelector('#RA_RG').value = "";
        document.querySelector('#RA_CIC').value = "";
        document.querySelector('#RA_NASC').value = "";
    }
}

const formatDate = (date) => {

    const day = date.substring(6);
    const month = date.substring(4, 6);
    const year = date.substring(0, 4);

    return `${day}/${month}/${year}`;
}

const verifyCheckbox = () => {
    const notebookComp = document.querySelector('#chk_recTI_notebook');
    const desktopComp = document.querySelector('#chk_recTI_desktopComp');
    const celular = document.querySelector('#chk_recTI_celular');

    let nextElement = nextElementSibling.nextElementSibling.nextElementSibling.classList;

    if (notebookComp.checked) {
        notebookComp.nextElement.remove('hide');
    } else if (desktopComp.checked) {
        desktopComp.nextElement.remove('hide');
    } else if (celular.checked) {
        celular.nextElement.remove('hide');
    }


}

const userShared = () => {
    $('.userShared').on('change', function (e) {
        const nextElementSibling = e.currentTarget.nextElementSibling.nextElementSibling.nextElementSibling.classList;
        e.target.checked == true ? nextElementSibling.remove('hide') : nextElementSibling.add('hide')
    })
}