$(document).ready(function () {
	/*
	FLUIGC.richeditor(
		"requisicao_detalhe"
	);
	*/
	$("#addAutoridade").on("click", tools.adicionaAutoridade);
	$("#addConsultado").on("click", tools.adicionaConsultado);
	$("#addInformado").on("click", tools.adicionaInformado);

	$("#tabs").tabs();



})




function setSelectedZoomItem(selectedItem) {
	if (selectedItem.inputId == "evento") {
		$("#docId").val(selectedItem.documentId);
	} else if (selectedItem.inputId.indexOf("consultado_usuario___") == 0) {

		let line = selectedItem.inputId.split("___")[1];
		document.querySelector("#consultado_codusuario___" + line).value = selectedItem.colleagueId;

	} else if (selectedItem.inputId.indexOf("informado_usuario___") == 0) {

		let line = selectedItem.inputId.split("___")[1];
		document.querySelector("#informado_codusuario___" + line).value = selectedItem.colleagueId;

	}


}