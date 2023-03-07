$(function () {
	validaBtnGestor();
	validaAprovacao();
	validaBtnTabela();
	carregarSwitcher();
})

function setSelectedZoomItem(selectedItem) {

	if (selectedItem.inputId == "zoom_unidade") {

		$("#codUnidade").val(selectedItem.codigo);


	} else if (selectedItem.inputId == "cp_CC_Desc") {
		let unidade = $("#zoom_unidade").val()[0]

		if (!unidade) {
			FLUIGC.toast({
				title: "SELECIONE UMA FILIAL UNIDADE.",
				type: 'danger'
			});

			window[selectedItem.inputName].clear()

			return false
		}

		let CC = selectedItem['CTT_CUSTO'].trim()
		window[selectedItem.inputId].setValue(selectedItem['CTT_DESC01'])

		let C1 = DatasetFactory.createConstraint("FILIAL", unidade, unidade, ConstraintType.MUST)
		let C2 = DatasetFactory.createConstraint("CC", CC, CC, ConstraintType.MUST)
		let ret = DatasetFactory.getDataset("ds_busca_aprovador", null, [C1, C2], null);

		if (!ret) {
			FLUIGC.toast({
				title: "NÃO TEM UM RESPONSÁVEL CADASTRADO PARA ESSE CENTRO DE CUSTO",
				message: "Acionar a TI para cadastrar um responsável",
				type: 'danger'
			});
			window[selectedItem.inputName].clear()

		} else {
			if (ret.values.length > 0) {
				let aprovador = ret.values[0].APROVADOR
				let aprovadorAtivo = validaGestor(aprovador)

				if (aprovadorAtivo == "true") {
					$("#cpAprovador").val(aprovador)
				} else {
					window[selectedItem.inputName].clear()

					FLUIGC.toast({
						title: "O GESTOR DO CENTRO DE CUSTO SELECIONADO",
						message: "Acione o responsável pelo sistema através de abertura de chamado no canal ELLEVO",
						type: 'danger'
					});

					return true
				}
			}
		}

		$("#cp_CC").val(CC);
	} else {

		var numeroLinha = selectedItem.inputId.split("___")[1];

		if (selectedItem.inputId == "zoom_gestor___" + numeroLinha) {

			$("#usuarioGestor___" + numeroLinha).val(selectedItem.colleagueId);
		}
	}
}

function removedZoomItem(removedItem) {

	var numeroLinha = removedItem.inputId.split("___")[1];

	if (removedItem.inputId == "zoom_gestor___" + numeroLinha) {
		$("#usuarioGestor___" + numeroLinha).val("");
	}
}

function addNF(el) {
	row = wdkAddChild('tblNF');

	var dataEmissao = FLUIGC.calendar('.date', {
		pickDate: true,
		pickTime: false,
		showToday: true,
		language: 'pt-br'
	});

	$(".maskMoney").maskMoney({
		thousands: ".",
		decimal: ","
	});
}

function addGestor() {
	row = wdkAddChild('tblGestor');
}

var indice = 0; // contador para gerar um valor para cada anexo

function showCamera() {
	indice++;
	JSInterface.showCamera($('#nfCTE___' + indice).val() + '_' + indice);
	// alterei o css para gerar uma confirmação visual após o click
	$("#anexo___" + indice).removeClass().addClass("btn btn-success");
}

function carregarSwitcher() {
	$("#cpDecisaoAprovador").val("APROVADO")
	FLUIGC.switcher.init('#swAprovado');
	FLUIGC.switcher.setTrue('#swAprovado');
	FLUIGC.switcher.onChange('#swAprovado', function (event, state) {
		if (state === true) {
			$('#dvJustificativa').hide();
			$('#justificativa').val('');
			$("#cpDecisaoAprovador").val("APROVADO")
		} else {
			$('#dvJustificativa').show();
			$("#cpDecisaoAprovador").val("REPROVADO")
		}
	});
}

function validaAprovacao() {
	if (atividade == 0 || atividade == 4) {
		$("#swAprovado").closest(".row").hide();
	}
}

function validaBtnTabela() {
	if (atividade != 0 && atividade != 4) {
		$("#btnAddNF").hide();
	}
}

function validaBtnGestor() {
	if (atividade == 35) {
		$("#btnAddGestor").hide();
	}
}


function validaGestor(loginGestor) {
	let C1 = DatasetFactory.createConstraint("login", loginGestor, loginGestor, ConstraintType.MUST)
	let ret = DatasetFactory.getDataset("colleague", null, [C1], null).values;

	return ret[0].active

}