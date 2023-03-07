function setSelectedZoomItem(selectedItem) {



	if (selectedItem.inputId == "estabelecimento") {
		$("#codigoUnidade").val(selectedItem.codigo)
	}

	if (selectedItem.inputId == "setor") {
		$("#codigoSetor").val(selectedItem.ID)
	}

	if (selectedItem.inputId == "cliente") {
		console.log(selectedItem);
	}
}

function radioB() {

	var radios = document.body.querySelectorAll("input[name='tipoSolicitacao']");

	for (var x = 0; x < radios.length; x++) {

		radios[x].onclick = function () {
			$("#codSolicitacao").val(this.value);
		}
	}

}


$(document).ready(function () {
	radioB();
})

/*
async function validaTipo(){
	if($("#tipoSolicitacao").val()=="2"){
		$("#faturamentoAprovado option[value='anterior']").each(function() {
			$(this).remove();
		});
	}
}*/