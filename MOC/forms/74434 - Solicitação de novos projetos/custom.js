$(document).ready(function () {
	$("#addAutoridade").on("click", tools.adicionaAutoridade);
	$("#addConsultado").on("click", tools.adicionaConsultado);
	$("#addInformado").on("click", tools.adicionaInformado);
	$("#btnApprove").on("click", tools.pareceresResponsavel);
	$("#btnHistory").on("click", tools.showHisotry);
	$('td[class="bpm-mobile-trash-column"]').addClass('col-md-1');
	$("#tabs").tabs();

	tools.showAprovacao();
	tools.tableHide();
});

const setSelectedZoomItem = selectedItem => {

	if (selectedItem.inputId == "evento") {

		$("#docId").val(selectedItem.documentId);

	} else if (selectedItem.inputId.indexOf("consultado_usuario___") == 0) {

		let line = selectedItem.inputId.split("___")[1];
		let control = $("[name^='consultado_codusuario'][value='" + selectedItem.colleagueId + "']")
			.not("#consultado_codusuario" + line).toArray();

		document.querySelector("#consultado_codusuario___" + line).value = selectedItem.colleagueId;

		if (control.length == 1) {

			window["consultado_usuario___" + line].clear();
			document.querySelector("#consultado_codusuario___" + line).value = "";

			FLUIGC.toast({
				title: '<b>Consultados: </b>',
				message: 'Esse consultado já esta na lista.',
				type: 'warning'
			});

		}

	} else if (selectedItem.inputId.indexOf("informado_usuario___") == 0) {

		let line = selectedItem.inputId.split("___")[1];
		let control = $("[name^='informado_codusuario'][value='" + selectedItem.colleagueId + "']").not("#informado_codusuario" + line).toArray();

		document.querySelector("#informado_codusuario___" + line).value = selectedItem.colleagueId;

		if (control.length == 1) {

			window["informado_usuario___" + line].clear();
			document.querySelector("#informado_codusuario___" + line).value = "";

			FLUIGC.toast({
				title: '<b>Informado: </b>',
				message: 'Esse informado já esta na lista.',
				type: 'warning'
			});

		}

	}

}