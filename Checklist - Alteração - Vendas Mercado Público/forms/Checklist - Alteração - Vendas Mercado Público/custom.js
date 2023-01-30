$(document).ready(function () {

	if ($("#atividade").val() != "0") {

		changeCheckbox();

		const listaCampos = ["razaoSocial", "cnpj", "codigoCliente", "numeroWinner", "numEditEmp", "contratoAta", "numPedidoContrato", "vigenciaContratoIni", "vigenciaContratoFim", "ateZerarSaldo", "unidadeFaturamento", "unidadeOrigem", "produtoBauminas", "produtoAmbientaly", "codigoProduto", "qtdeLicitKg", "qtdeLicitTon", "qtdeLicitLitros", "qtdeLicitBaseSeca", "qtdeLicitM3", "qtdeTotalKg", "qtdeTotalTon", "qtdeTotalLitros", "qtdeTotalBaseSeca", "qtdeTotalM3", "precoFinalKg", "precoFinalTon", "precoFinalLitros", "precoFinalBaseSeca", "precoFinalM3", "condicaoPagamento", "prazoEntrega", "especificarDias", "tipoFrete", "valorFrete", "seRedespacho", "horarioRecebimento", "mangote", "tamanho", "bomba", "engate", "especPolegadas", "obsParaLogistica", "especificacaoProduto", "envioLaudosEspecificos", "demandaEquip", "especificarEquip", "obsLicitacoes", "obsAtendimentoClientes"];

		for (x = 0; x < listaCampos.length; x++) {


			verificarAlteracao(listaCampos[x], $("#" + listaCampos[x]).val());
			verificarAlteracao("_" + listaCampos[x], $("#_" + listaCampos[x]).val());
			setTimeout(() => {
				$("#" + listaCampos[x]).blur();
				$("#_" + listaCampos[x]).blur();
			}, 1000);
		}
	}

	if ($('#atividade').val() == '7') {
		if (getformMode() == "VIEW") {
			var arr = $("form[name='form']").find("select[disabled='disabled']");
			for (let index = 0; index < arr.length; index++) {

				arr[index].nextElementSibling.nextElementSibling.value == "Mudou" ? arr[index].style = "border-color: #e3b420 !important; color: black" : "";

			}
		}
	}

	$('input[type="checkbox"]').on('change', function (e) {

		var id = $("#" + e.target.id);
		var idOriginal = $("#" + e.target.id + "valOri").val();

		if (id.is(':checked').toString() != idOriginal) {

			id.siblings()[1].value = "Mudou";
			id.siblings()[2].setAttribute('class', 'text-warning');
			id.parent().removeClass('custom-checkbox-primary').addClass('custom-checkbox-warning');

		} else {
			id.siblings()[1].value = "";
			id.siblings()[2].classList.remove('text-warning');
			id.parent().removeClass('custom-checkbox-warning').addClass('custom-checkbox-primary');

		}

	})

	buscaHistorico();

});


$(function () {

	if ($("#atividade").val() != "7") {
		carregarCalendar();
	}
	carregarDivsRetorno();

	if ($("#atividade").val() == "15") {
		$("#div_enviarAtivPara").show();
		$('#cmb_enviarAtividadePara').prop('selectedIndex', 0);
	}

	$('#numeroFluig').change(function () {

		// Códigos verificando dataset
		var con1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
		var con2 = DatasetFactory.createConstraint("numeroFluig", $("#numeroFluig").val(), $("#numeroFluig").val(), ConstraintType.MUST);
		var dsVerifi = DatasetFactory.getDataset("DSFormulariodeChecklist-Alteracao-VendasMercadoPublico", null, [con1, con2], null);
		var repetiu = false;

		for (var l = 0; l < dsVerifi.values.length; l++) {

			var cos1 = DatasetFactory.createConstraint("processId", "AC_0008", "AC_0008", ConstraintType.MUST);
			var cos2 = DatasetFactory.createConstraint("status", 0, 0, ConstraintType.MUST);
			var cos3 = DatasetFactory.createConstraint("cardDocumentId", dsVerifi.values[l]["metadata#id"], dsVerifi.values[l]["metadata#id"], ConstraintType.MUST);
			var dsVerifica = DatasetFactory.getDataset("workflowProcess", null, [cos1, cos2, cos3], null);

			if (dsVerifica.values.length > 0) {
				//repetiu = true;
				break;
			}

		}

		if (!repetiu) {

			var c1 = DatasetFactory.createConstraint("textbox40", $(this).val(), $(this).val(), ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
			var dsSol = DatasetFactory.getDataset("DSFormulariodeChecklist-VendasMercadoPublicoQuimica", null, [c1, c2], null);

			if (dsSol.values.length > 0) {

				$("#razaoSocial, #razaoSocialOriginal").val(dsSol.values[0]);
				$("#cnpj, #cnpjOriginal").val(dsSol.values[0].TXT_CNPJ);
				$("#codigoCliente, #codigoClienteOriginal").val(dsSol.values[0].TXT_CodCliente);
				$("#numeroWinner, #numeroWinnerOriginal").val(dsSol.values[0].txt_numWinner);
				$("#numEditEmp, #numEditEmpOriginal").val(dsSol.values[0].TXT_EditEmpenho);
				$("#contratoAta, #contratoAtaOriginal").val(dsSol.values[0].TXT_ContratoAta);
				$("#numPedidoContrato, #numPedidoContratoOriginal").val(dsSol.values[0].TXT_NumPed);
				$("#vigenciaContratoIni, #vigenciaContratoIniOriginal").val(dsSol.values[0].DT_ContratoDe);
				$("#vigenciaContratoFim, #vigenciaContratoFimOriginal").val(dsSol.values[0].DT_ContratoAte);
				$("#ateZerarSaldo, #ateZerarSaldoOriginal").val(dsSol.values[0].Rd_ZerarSd);
				$("#unidadeFaturamento, #unidadeFaturamentoOriginal").val(dsSol.values[0].CMB_UnidFaturam);
				$("#unidadeOrigem, #unidadeOrigemOriginal").val(dsSol.values[0].CMB_UnidOrigem);
				$("#produtoBauminas, #produtoBauminasOriginal").val(dsSol.values[0].CMB_Produto);
				$("#produtoAmbientaly, #produtoAmbientalyOriginal").val(dsSol.values[0].CMB_Produto);
				$("#codigoProduto, #codigoProdutoOriginal").val(dsSol.values[0].TXT_CodProd);
				$("#qtdeLicitTon, #qtdeLicitTonOriginal").val(dsSol.values[0].TXT_QntLicit);
				$("#qtdeTotalKg, #qtdeTotalKgOriginal").val(dsSol.values[0].TXT_QTotalKg);
				$("#qtdeTotalLitros, #qtdeTotalLitrosOriginal").val(dsSol.values[0].TXT_QTotalLt);
				$("#qtdeTotalBaseSeca, #qtdeTotalBaseSecaOriginal").val(dsSol.values[0].TXT_QTotalBS);
				$("#precoFinalKg, #precoFinalKgOriginal").val(dsSol.values[0].TXT_PFKg);
				$("#precoFinalLitros, #precoFinalLitrosOriginal").val(dsSol.values[0].TXT_PFLt);
				$("#precoFinalBaseSeca, #precoFinalBaseSecaOriginal").val(dsSol.values[0].TXT_PFBs);
				$("#condicaoPagamento, #condicaoPagamentoOriginal").val(dsSol.values[0].TXT_CondPg);
				$("#prazoEntrega, #prazoEntregaOriginal").val(dsSol.values[0].radio35);
				$("#especificarDias, #especificarDiasOriginal").val(dsSol.values[0].TXT_PrazoEntreg);
				$("#tipoFrete, #tipoFreteOriginal").val(dsSol.values[0].CMB_TipoFrete);
				$("#valorFrete, #valorFreteOriginal").val(dsSol.values[0].TXT_Valor);
				$("#seRedespacho, #seRedespachoOriginal").val(dsSol.values[0].PAR_SERED);
				$("#horarioRecebimento, #horarioRecebimentoOriginal").val(dsSol.values[0].TXT_HrReb);
				$("#mangote, #mangoteOriginal").val(dsSol.values[0].Rd_Mangote);
				$("#tamanho, #tamanhoOriginal").val(dsSol.values[0].TXT_MangMetros);
				$("#bomba, #bombaOriginal").val(dsSol.values[0].Rd_Bomba);
				$("#engate, #engateOriginal").val(dsSol.values[0].Rd_Engate);
				$("#especPolegadas, #especPolegadasOriginal").val(dsSol.values[0].TXT_Polegadas);
				$("#obsParaLogistica, #obsParaLogisticaOriginal").val(dsSol.values[0]);
				$("#especificacaoProduto, #especificacaoProdutoOriginal").val(dsSol.values[0].TXT_EspProd);
				$("#envioLaudosEspecificos, #envioLaudosEspecificosOriginal").val(dsSol.values[0].TXT_LaudoEsp);
				$("#demandaEquip, #demandaEquipOriginal").val(dsSol.values[0].Rd_DemEquip);
				$("#especificarEquip, #especificarEquipOriginal").val(dsSol.values[0].TXT_EspEquip);
				$("#obsLicitacoes, #obsLicitacoesOriginal").val(dsSol.values[0].PAR_OBSAREALICT);
				$("#obsAtendimentoClientes, #obsAtendimentoClientesOriginal").val(dsSol.values[0]);


				// reseta checkbox
				$("#tipoEntrega1").prop("checked", true);
				$("#tipoEntrega2").prop("checked", false);
				$("#tipoEntrega3").prop("checked", false);
				$("#tipoEntrega4").prop("checked", false);
				$("#tipoEntrega5").prop("checked", false);
				$("#tipoEntrega6").prop("checked", false);
				$("#tipoEntrega7").prop("checked", false);
				$("#tipoEntrega8").prop("checked", false);
				$("#tipoEntrega9").prop("checked", false);
				$("#tipoEntrega10").prop("checked", false);
				$("#tipoEntrega11").prop("checked", false);
				$("#tipoEntrega12").prop("checked", false);
				$("#tipoEntrega13").prop("checked", false);
				$("#tipoEntrega14").prop("checked", false);
				$("#tipoEntrega15").prop("checked", false);
				$("#tipoEntrega16").prop("checked", false);
				$("#tipoEntrega17").prop("checked", false);
				$("#tipoEntrega18").prop("checked", false);
				$("#tipoEntrega19").prop("checked", false);
				$("#tipoEntrega20").prop("checked", false);
				$("#optPaletizado").prop("checked", false);
				$("#optFilmado").prop("checked", false);
				$("#optCargaBatida").prop("checked", false);
				$("#optDemandaAjudante").prop("checked", false);
				$("#optExigeLogReversa").prop("checked", false);
				$("#optDemandaContratEmpilh").prop("checked", false)

			} else {
				var c1 = DatasetFactory.createConstraint("solicitacao", $(this).val(), $(this).val(), ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
				var ds = DatasetFactory.getDataset("ds_form_vendas_mercado_publico", null, [c1, c2], null);

				if (ds.values.length > 0) {

					$("#razaoSocial, #razaoSocialOriginal").val(ds.values[0].TXT_Cliente);
					$("#cnpj, #cnpjOriginal").val(ds.values[0].TXT_CNPJ);
					$("#codigoCliente, #codigoClienteOriginal").val(ds.values[0].TXT_CodCliente);
					$("#numeroWinner, #numeroWinnerOriginal").val(ds.values[0].txt_numWinner);
					$("#numEditEmp, #numEditEmpOriginal").val(ds.values[0].TXT_EditEmpenho);
					$("#contratoAta, #contratoAtaOriginal").val(ds.values[0].TXT_ContratoAta);
					$("#numPedidoContrato, #numPedidoContratoOriginal").val(ds.values[0].TXT_PedContr);
					$("#vigenciaContratoIni, #vigenciaContratoIniOriginal").val(ds.values[0].DT_ContratoDe);
					$("#vigenciaContratoFim, #vigenciaContratoFimOriginal").val(ds.values[0].DT_ContratoAte);
					$("#ateZerarSaldo, #ateZerarSaldoOriginal").val(ds.values[0].Rd_ZerarSd);
					$("#unidadeFaturamento, #unidadeFaturamentoOriginal").val(ds.values[0].CMB_UnidFaturam);
					$("#unidadeOrigem, #unidadeOrigemOriginal").val(ds.values[0].CMB_UnidOrigem);
					$("#produtoBauminas, #produtoBauminasOriginal").val(ds.values[0].CMB_Produto);
					$("#produtoAmbientaly, #produtoAmbientalyOriginal").val(ds.values[0].txt_ProdAmb);
					$("#codigoProduto, #codigoProdutoOriginal").val(ds.values[0].TXT_CodProd);
					$("#qtdeLicitKg, #qtdeLicitKgOriginal").val(ds.values[0].qtdeLicitKg);
					$("#qtdeLicitTon, #qtdeLicitTonOriginal").val(ds.values[0].qtdeLicitTon);
					$("#qtdeLicitLitros, #qtdeLicitLitrosOriginal").val(ds.values[0].qtdeLicitLitros);
					$("#qtdeLicitBaseSeca, #qtdeLicitBaseSecaOriginal").val(ds.values[0].qtdeLicitBaseSeca);
					$("#qtdeLicitM3, #qtdeLicitM3Original").val(ds.values[0].qtdeLicitM3);
					$("#qtdeTotalKg, #qtdeTotalKgOriginal").val(ds.values[0].qtdeTotalKg);
					$("#qtdeTotalTon, #qtdeTotalTonOriginal").val(ds.values[0].qtdeTotalTon);
					$("#qtdeTotalLitros, #qtdeTotalLitrosOriginal").val(ds.values[0].qtdeTotalLitros);
					$("#qtdeTotalBaseSeca, #qtdeTotalBaseSecaOriginal").val(ds.values[0].qtdeTotalBaseSeca);
					$("#qtdeTotalM3, #qtdeTotalM3Original").val(ds.values[0].qtdeTotalM3);
					$("#precoFinalKg, #precoFinalKgOriginal").val(ds.values[0].precoFinalKg);
					$("#precoFinalTon, #precoFinalTonOriginal").val(ds.values[0].precoFinalTon);
					$("#precoFinalLitros, #precoFinalLitrosOriginal").val(ds.values[0].precoFinalLitros);
					$("#precoFinalBaseSeca, #precoFinalBaseSecaOriginal").val(ds.values[0].precoFinalBaseSeca);
					$("#precoFinalM3, #precoFinalM3Original").val(ds.values[0].precoFinalM3);
					$("#condicaoPagamento, #condicaoPagamentoOriginal").val(ds.values[0].TXT_CondPg);
					$("#prazoEntrega, #prazoEntregaOriginal").val(ds.values[0].radio35);
					$("#especificarDias, #especificarDiasOriginal").val(ds.values[0].TXT_PrazoEntreg);
					$("#tipoFrete, #tipoFreteOriginal").val(ds.values[0].CMB_TipoFrete);
					$("#valorFrete, #valorFreteOriginal").val(ds.values[0].TXT_Valor);
					$("#seRedespacho, #seRedespachoOriginal").val(ds.values[0].PAR_SERED);
					$("#horarioRecebimento, #horarioRecebimentoOriginal").val(ds.values[0].TXT_HrReb);
					$("#mangote, #mangoteOriginal").val(ds.values[0].Rd_Mangote);
					$("#tamanho, #tamanhoOriginal").val(ds.values[0].TXT_MangMetros);
					$("#bomba, #bombaOriginal").val(ds.values[0].Rd_Bomba);
					$("#engate, #engateOriginal").val(ds.values[0].Rd_Engate);
					$("#especPolegadas, #especPolegadasOriginal").val(ds.values[0].TXT_Polegadas);
					$("#obsParaLogistica, #obsParaLogisticaOriginal").val(ds.values[0].PAR_ObsLogistic);
					$("#especificacaoProduto, #especificacaoProdutoOriginal").val(ds.values[0].TXT_EspProd);
					$("#envioLaudosEspecificos, #envioLaudosEspecificosOriginal").val(ds.values[0].TXT_LaudoEsp);
					$("#demandaEquip, #demandaEquipOriginal").val(ds.values[0].Rd_DemEquip);
					$("#especificarEquip, #especificarEquipOriginal").val(ds.values[0].TXT_EspEquip);
					$("#obsLicitacoes, #obsLicitacoesOriginal").val(ds.values[0].PAR_OBSAREALICT);
					$("#obsAtendimentoClientes, #obsAtendimentoClientesOriginal").val(ds.values[0].obsAtendimentoClientes);

					ds.values[0].sel_tipoEntrega0 ? $("#tipoEntrega1").prop("checked", true) : $("#tipoEntrega1").prop("checked", false);
					ds.values[0].sel_tipoEntrega1 ? $("#tipoEntrega2").prop("checked", true) : $("#tipoEntrega2").prop("checked", false);
					ds.values[0].sel_tipoEntrega2 ? $("#tipoEntrega3").prop("checked", true) : $("#tipoEntrega3").prop("checked", false);
					ds.values[0].sel_tipoEntrega3 ? $("#tipoEntrega4").prop("checked", true) : $("#tipoEntrega4").prop("checked", false);
					ds.values[0].sel_tipoEntrega4 ? $("#tipoEntrega5").prop("checked", true) : $("#tipoEntrega5").prop("checked", false);
					ds.values[0].sel_tipoEntrega5 ? $("#tipoEntrega6").prop("checked", true) : $("#tipoEntrega6").prop("checked", false);
					ds.values[0].sel_tipoEntrega6 ? $("#tipoEntrega7").prop("checked", true) : $("#tipoEntrega7").prop("checked", false);
					ds.values[0].sel_tipoEntrega7 ? $("#tipoEntrega8").prop("checked", true) : $("#tipoEntrega8").prop("checked", false);
					ds.values[0].sel_tipoEntrega8 ? $("#tipoEntrega9").prop("checked", true) : $("#tipoEntrega9").prop("checked", false);
					ds.values[0].sel_tipoEntrega9 ? $("#tipoEntrega10").prop("checked", true) : $("#tipoEntrega10").prop("checked", false);
					ds.values[0].sel_tipoEntrega10 ? $("#tipoEntrega11").prop("checked", true) : $("#tipoEntrega11").prop("checked", false);
					ds.values[0].sel_tipoEntrega11 ? $("#tipoEntrega12").prop("checked", true) : $("#tipoEntrega12").prop("checked", false);
					ds.values[0].sel_tipoEntrega12 ? $("#tipoEntrega13").prop("checked", true) : $("#tipoEntrega13").prop("checked", false);
					ds.values[0].sel_tipoEntrega13 ? $("#tipoEntrega14").prop("checked", true) : $("#tipoEntrega14").prop("checked", false);
					ds.values[0].sel_tipoEntrega14 ? $("#tipoEntrega15").prop("checked", true) : $("#tipoEntrega15").prop("checked", false);
					ds.values[0].sel_tipoEntrega15 ? $("#tipoEntrega16").prop("checked", true) : $("#tipoEntrega16").prop("checked", false);
					ds.values[0].sel_tipoEntrega16 ? $("#tipoEntrega17").prop("checked", true) : $("#tipoEntrega17").prop("checked", false);
					ds.values[0].sel_tipoEntrega17 ? $("#tipoEntrega18").prop("checked", true) : $("#tipoEntrega18").prop("checked", false);
					ds.values[0].sel_tipoEntrega18 ? $("#tipoEntrega19").prop("checked", true) : $("#tipoEntrega19").prop("checked", false);
					ds.values[0].sel_tipoEntrega19 ? $("#tipoEntrega20").prop("checked", true) : $("#tipoEntrega20").prop("checked", false);
					ds.values[0].checkbox41opc0 ? $("#optPaletizado").prop("checked", true) : $("#optPaletizado").prop("checked", false);
					ds.values[0].checkbox41opc1 ? $("#optFilmado").prop("checked", true) : $("#optFilmado").prop("checked", false);
					ds.values[0].checkbox41opc2 ? $("#optCargaBatida").prop("checked", true) : $("#optCargaBatida").prop("checked", false);
					ds.values[0].checkbox41opc3 ? $("#optDemandaAjudante").prop("checked", true) : $("#optDemandaAjudante").prop("checked", false);
					ds.values[0].checkbox41opc4 ? $("#optExigeLogReversa").prop("checked", true) : $("#optExigeLogReversa").prop("checked", false);
					ds.values[0].checkbox41opc5 ? $("#optDemandaContratEmpilh").prop("checked", true) : $("#optDemandaContratEmpilh").prop("checked", false);

				} else {

					FLUIGC.toast({
						title: 'Atenção!',
						message: 'Nenhum registro foi encontrado com o número informado',
						type: 'warning'
					});

				}
			}
			buscaHistorico();
			verifyCheckbox();
		} else {

			FLUIGC.toast({
				title: 'Atenção!',
				message: 'Já existe uma solicitação ativa alterando esse número de Fluig! <a target="_blank" href="https://bauminashom.fluig.com:9100/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + dsVerifica.values[0]["workflowProcessPK.processInstanceId"] + '">Solicitação ' + dsVerifica.values[0]["workflowProcessPK.processInstanceId"] + '</a>',
				type: 'danger'
			});

		}

	});
})

function verificarAlteracao(id, texto) {

	if ($('#' + id + 'Original').val() != texto) {

		$('#' + id).parent().addClass('has-warning');
		$('#' + id).addClass('corFundo');
		$('#' + id + 'Hidden').val('Mudou');

		var valorOriginal = $('#' + id + 'Original').val();
		if (valorOriginal == "" || valorOriginal == null) {
			valorOriginal = "(Vazio)";
		}

		$('#' + id).prop('title', "Valor anterior: " + valorOriginal);
		$('#' + id + 'ValSpan').html("Valor anterior: " + valorOriginal);


	} else {

		$('#' + id).parent().removeClass('has-warning');
		$('#' + id).removeClass('corFundo');
		$('#' + id + 'Hidden').val('');
		$('#' + id + 'ValSpan').html('');

		const element = document.getElementById(id);
		if (element != null) {
			element.title = "";
		}
	}
}
const carregarCalendar = () => {
	FLUIGC.calendar('#dvInicioContrato, #dvFimContrato', {
		pickDate: true,
		pickTime: false
	})
}

function carregarDivsRetorno() {
	var atividade = $("#atividade").val();

	if ($("#obs_enviarAtividadePara").val() != "") {
		$("#div_enviarAtivPara").show();
	}
	if ($("#obs_enviarAtividadeParaValida").val() != "") {
		$("#div_enviarAtivParaValida").show();
	}

	switch (atividade) {
		case "15":
			$("#div_enviarAtivPara").show();
			setTimeout(() => $("#obs_enviarAtividadePara").focus(), 500);
			break;
		case "37":
			$("#div_enviarAtivParaValida").show();
			setTimeout(() => $("#obs_enviarAtividadeParaValida").focus(), 500);
			break;
	}
}

const verifyCheckbox = () => {

	const arr = $("form[name='form']").find("input[type='checkbox']");
	for (let index = 0; index < arr.length; index++) {
		let id = '#' + arr[index].id + 'valOri';

		$(id).val(arr[index].checked.toString())

	}
}

const changeCheckbox = () => {

	let arr = $("form[name='form']").find("input[type='checkbox']");

	for (let index = 0; index < arr.length; index++) {

		let id = '#' + arr[index].id;
		let idOriginal = $('#' + arr[index].id + 'valOri').val()

		if (arr[index].checked.toString() != idOriginal) {

			$(id).parent().removeClass('custom-checkbox-primary').addClass('custom-checkbox-warning');
			$(id).siblings()[2].setAttribute('class', 'text-warning');

		} else {

			$(id).siblings()[2].classList.remove('text-warning');
			$(id).parent().removeClass('custom-checkbox-warning').addClass('custom-checkbox-primary');

		}
	}
}

function buscaHistorico() {

	var cn1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
	var cn2 = DatasetFactory.createConstraint("numeroFluig", $("#numeroFluig").val(), $("#numeroFluig").val(), ConstraintType.MUST);
	var dsHist1 = DatasetFactory.getDataset("DSFormulariodeChecklist-Alteracao-VendasMercadoPublico", ["dataSolicitacao"], [cn1, cn2], null);

	if (dsHist1.values.length == 0) {

		var dsHistVal = "<span>Ainda não existem solicitações alterando esse número de Fluig</span>";

	} else {
		// Primeira consulta para verificar a data da solicitação de Vendas
		var numSolicOrigem = $("#numeroFluig").val();
		var solicitacao = $("#solicitacao").val();

		var cs1 = DatasetFactory.createConstraint("solicitacao", numSolicOrigem, numSolicOrigem, ConstraintType.MUST);
		var cs2 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
		var dsVendas = DatasetFactory.getDataset("ds_form_vendas_mercado_publico", ["dataSolicitacao"], [cs1, cs2], null);

		var dsHistVal = "<span><u><b><a target='_blank' href='https://bauminashom.fluig.com:9100/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + numSolicOrigem + "'>Solicitação principal " + numSolicOrigem + "</a></b> feita em " + dsVendas.values[0]["dataSolicitacao"] + "</u></span><br>";

		for (var i = 0; i < (dsHist1.values.length /*  - 1 */ ); i++) {

			var co1 = DatasetFactory.createConstraint("processId", "AC_0008", "AC_0008", ConstraintType.MUST);
			var co2 = DatasetFactory.createConstraint("cardDocumentId", dsHist1.values[i]["metadata#id"], dsHist1.values[i]["metadata#id"], ConstraintType.MUST);
			var dsHist2 = DatasetFactory.getDataset("workflowProcess", ["workflowProcessPK.processInstanceId", "cardDocumentId"], [co1, co2], null);

			var numSolici = dsHist2.values[0]["workflowProcessPK.processInstanceId"];
			var dataSolic = dsHist1.values[i]["dataSolicitacao"];

			if (solicitacao != numSolici) {

				dsHistVal += "<span><b><a target='_blank' href='https://bauminashom.fluig.com:9100/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + numSolici + "'>Solicitação " + numSolici + "</a></b> feita em " + dataSolic + "</span><br>";

				if (getformMopde() == "VIEW") {

					$('#conteudoHistorico').html("<span><b><a target='_blank' href='https://bauminashom.fluig.com:9100/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + numSolici + "'>Solicitação " + numSolici + "</a></b> feita em " + dataSolic + "</span><br>");
				}

			}
		}
	}

	$("#conteudoHistorico").html(dsHistVal);

}