$(document).ready(function () {

	if ($("#atividade").val() != "0") {

		if ($('#oldFluig').val() == "") {
			buscaHistorico($('#numeroFluig').val())
		} else {
			buscaHistorico($('#oldFluig').val())
		};

		changeCheckbox();

		const listaCampos = ["razaoSocial", "cnpj", "codigoCliente", "numeroWinner", "numEditEmp", "contratoAta", "numPedidoContrato", "vigenciaContratoIni", "vigenciaContratoFim", "ateZerarSaldo", "unidadeFaturamento", "unidadeOrigem", "aditivo", "produtoBauminas", "produtoAmbientaly", "codigoProduto", "qtdeLicitKg", "qtdeLicitTon", "qtdeLicitLitros", "qtdeLicitBaseSeca", "qtdeLicitM3", "qtdeTotalKg", "qtdeTotalTon", "qtdeTotalLitros", "qtdeTotalBaseSeca", "qtdeTotalM3", "precoFinalKg", "precoFinalTon", "precoFinalLitros", "precoFinalBaseSeca", "precoFinalM3", "condicaoPagamento", "prazoEntrega", "especificarDias", "tipoFrete", "valorFrete", "seRedespacho", "horarioRecebimento", "mangote", "tamanho", "bomba", "engate", "especPolegadas", "obsParaLogistica", "especificacaoProduto", "envioLaudosEspecificos", "demandaEquip", "especificarEquip", "obsLicitacoes", "obsAtendimentoClientes"];

		for (x = 0; x < listaCampos.length; x++) {


			if (atv == 37) {

				verificarAlteracao("_" + listaCampos[x], $("#_" + listaCampos[x]).val(), listaCampos[x]);
				setTimeout(() => {
					$("#" + listaCampos[x]).blur();
					$("#_" + listaCampos[x]).blur();
				}, 1000);


			} else if (atv != 7) {

				verificarAlteracao(listaCampos[x], $("#" + listaCampos[x]).val(), listaCampos[x])
				setTimeout(() => {
					$("#" + listaCampos[x]).click();
				}, 1000);

			} else {

				verificarAlteracao("_" + listaCampos[x], $("#_" + listaCampos[x]).val(), listaCampos[x]);
				verificarAlteracao(listaCampos[x], $("#" + listaCampos[x]).val(), listaCampos[x]);
				setTimeout(() => {
					$("#" + listaCampos[x]).click();
					$("#_" + listaCampos[x]).click();
				}, 1000);

			}

			if (getformMode() == "VIEW") {
				verificarAlteracao(listaCampos[x], $("#" + listaCampos[x]).val(), listaCampos[x]);
				setTimeout(() => {
					$("#" + listaCampos[x]).blur();
					$("#" + listaCampos[x]).addClass('corFundo');
					// $("#_" + listaCampos[x]).blur();
				}, 1000);


				if ($('#' + listaCampos[x] + "Hidden").val() == "Mudou") {
					$("#" + listaCampos[x]).attr("style", "border-bottom: 2px solid #e3b420 !important")
				}
			}


		}
	}

	// if ($('#atividade').val() == '7') {
	if (getformMode() == "VIEW" || getformMode() == "MOD") {
		var arr = $("form[name='form']").find("select[disabled='disabled']");
		for (let index = 0; index < arr.length; index++) {

			arr[index].nextElementSibling.nextElementSibling.value == "Mudou" ? arr[index].style = "border-bottom: 2px solid #e3b420 !important; color: gray !important" : "";

		}
		// }
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

	$('#numeroFluig').on('change', function () {

		const numProcess = $(this).val();

		console.log(numProcess);

		var dataset = DatasetFactory.getDataset(
			"ds_vendas_mercado_publico_geral",
			null,
			[
				DatasetFactory.createConstraint("numeroSolicitacao", numProcess, numProcess, ConstraintType.MUST)
			],
			null);


		if (dataset.values.length > 0) {

			const type = dataset.values[0].tipo;

			if (type == "ALTERACAO") {

				var alteracao = DatasetFactory.getDataset(
					"DSFormulariodeChecklist-Alteracao-VendasMercadoPublico",
					null,
					[
						DatasetFactory.createConstraint("numeroSolicitacao", numProcess, numProcess, ConstraintType.MUST),
						DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST)
					],
					null);

				if (alteracao.values.length > 0) {

					const value = alteracao.values[0];

					var control;
					var fluig;

					if (value.oldFluig == null || value.oldFluig == undefined || value.oldFluig == "") {
						fluig = value.numeroFluig;
						console.log("NUMERO FLUIG: " + value.numeroFluig + " - FLUIG: " + fluig + " - OLD FLUIG: " + value.oldFluig);
					} else {
						fluig = value.oldFluig;
						console.log("OLDFLUIG: " + value.oldFluig + " - NUMEROFLUIG: " + value.numeroFluig + " - FLUIG: " + fluig);
					}



					const dsValues = new Array();

					const alteracaoNumFluig = DatasetFactory.getDataset("dsChecklistAlteracaoVendasMercadoPublico",
						["solicitacao"],
						[
							DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST),
							DatasetFactory.createConstraint("numeroFluig", fluig, fluig, ConstraintType.MUST)
						],
						null);

					const alteracaoOldFluig = DatasetFactory.getDataset("dsChecklistAlteracaoVendasMercadoPublico",
						["solicitacao"],
						[
							DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST),
							DatasetFactory.createConstraint("oldFluig", fluig, fluig, ConstraintType.MUST)
						],
						null);

					for (let i = 0; i < alteracaoNumFluig.values.length; i++) dsValues.push(alteracaoNumFluig.values[i]);
					for (let i = 0; i < alteracaoOldFluig.values.length; i++) dsValues.push(alteracaoOldFluig.values[i]);

					console.log(dsValues);

					dsValues.sort(function (a, b) {

						if (a.solicitacao > b.solicitacao) {
							return 1;
						}

						if (a.solicitacao < b.solicitacao) {
							return -1;
						}

						return 0;

					});

					if (dsValues.length > 0) {
						if (dsValues.at(-1).solicitacao <= numprocess) {
							control = true;
						} else {
							control = false;
						}
					}
					if (control) {

						if (alteracao.values.length > 0) {

							$("#razaoSocial, #razaoSocialOriginal").val(value.razaoSocial);
							$("#cnpj, #cnpjOriginal").val(value.cnpj);
							$("#codigoCliente, #codigoClienteOriginal").val(value.codigoCliente);
							$("#numeroWinner, #numeroWinnerOriginal").val(value.numeroWinner);
							$("#numEditEmp, #numEditEmpOriginal").val(value.numEditEmp);
							$("#contratoAta, #contratoAtaOriginal").val(value.contratoAta);
							$("#numPedidoContrato, #numPedidoContratoOriginal").val(value.numPedidoContrato);
							$("#aditivo, #aditivoOriginal").val(value.aditivo);
							$("#vigenciaContratoIni, #vigenciaContratoIniOriginal").val(value.vigenciaContratoIni);
							$("#vigenciaContratoFim, #vigenciaContratoFimOriginal").val(value.vigenciaContratoFim);
							$("#ateZerarSaldo, #ateZerarSaldoOriginal").val(value.ateZerarSaldo);
							$("#unidadeFaturamento, #unidadeFaturamentoOriginal").val(value.unidadeFaturamento);
							$("#unidadeOrigem, #unidadeOrigemOriginal").val(value.unidadeOrigem);
							$("#produtoBauminas, #produtoBauminasOriginal").val(value.produtoBauminas);
							$("#produtoAmbientaly, #produtoAmbientalyOriginal").val(value.produtoAmbientaly);
							$("#codigoProduto, #codigoProdutoOriginal").val(value.codigoProduto);
							$("#qtdeLicitKg, #qtdeLicitKgOriginal").val(value.qtdeLicitKg);
							$("#qtdeLicitTon, #qtdeLicitTonOriginal").val(value.qtdeLicitTon);
							$("#qtdeLicitLitros, #qtdeLicitLitrosOriginal").val(value.qtdeLicitLitros);
							$("#qtdeLicitBaseSeca, #qtdeLicitBaseSecaOriginal").val(value.qtdeLicitBaseSeca);
							$("#qtdeLicitM3, #qtdeLicitM3Original").val(value.qtdeLicitM3);
							$("#qtdeTotalKg, #qtdeTotalKgOriginal").val(value.qtdeTotalKg);
							$("#qtdeTotalTon, #qtdeTotalTonOriginal").val(value.qtdeTotalTon);
							$("#qtdeTotalLitros, #qtdeTotalLitrosOriginal").val(value.qtdeTotalLitros);
							$("#qtdeTotalBaseSeca, #qtdeTotalBaseSecaOriginal").val(value.qtdeTotalBaseSeca);
							$("#qtdeTotalM3, #qtdeTotalM3Original").val(value.qtdeTotalM3);
							$("#precoFinalKg, #precoFinalKgOriginal").val(value.precoFinalKg);
							$("#precoFinalTon, #precoFinalTonOriginal").val(value.precoFinalTon);
							$("#precoFinalLitros, #precoFinalLitrosOriginal").val(value.precoFinalLitros);
							$("#precoFinalBaseSeca, #precoFinalBaseSecaOriginal").val(value.precoFinalBaseSeca);
							$("#precoFinalM3, #precoFinalM3Original").val(value.precoFinalM3);
							$("#condicaoPagamento, #condicaoPagamentoOriginal").val(value.condicaoPagamento);
							$("#prazoEntrega, #prazoEntregaOriginal").val(value.prazoEntrega);
							$("#especificarDias, #especificarDiasOriginal").val(value.especificarDias);
							$("#tipoFrete, #tipoFreteOriginal").val(value.tipoFrete);
							$("#valorFrete, #valorFreteOriginal").val(value.valorFrete);
							$("#seRedespacho, #seRedespachoOriginal").val(value.seRedespacho);

							value.tipoEntrega1 ? $("#tipoEntrega1").prop("checked", true) : $("#tipoEntrega1").prop("checked", false);
							value.tipoEntrega2 ? $("#tipoEntrega2").prop("checked", true) : $("#tipoEntrega2").prop("checked", false);
							value.tipoEntrega3 ? $("#tipoEntrega3").prop("checked", true) : $("#tipoEntrega3").prop("checked", false);
							value.tipoEntrega4 ? $("#tipoEntrega4").prop("checked", true) : $("#tipoEntrega4").prop("checked", false);
							value.tipoEntrega5 ? $("#tipoEntrega5").prop("checked", true) : $("#tipoEntrega5").prop("checked", false);
							value.tipoEntrega6 ? $("#tipoEntrega6").prop("checked", true) : $("#tipoEntrega6").prop("checked", false);
							value.tipoEntrega7 ? $("#tipoEntrega7").prop("checked", true) : $("#tipoEntrega7").prop("checked", false);
							value.tipoEntrega8 ? $("#tipoEntrega8").prop("checked", true) : $("#tipoEntrega8").prop("checked", false);
							value.tipoEntrega9 ? $("#tipoEntrega9").prop("checked", true) : $("#tipoEntrega9").prop("checked", false);
							value.tipoEntrega10 ? $("#tipoEntrega10").prop("checked", true) : $("#tipoEntrega10").prop("checked", false);
							value.tipoEntrega11 ? $("#tipoEntrega11").prop("checked", true) : $("#tipoEntrega11").prop("checked", false);
							value.tipoEntrega12 ? $("#tipoEntrega12").prop("checked", true) : $("#tipoEntrega12").prop("checked", false);
							value.tipoEntrega13 ? $("#tipoEntrega13").prop("checked", true) : $("#tipoEntrega13").prop("checked", false);
							value.tipoEntrega14 ? $("#tipoEntrega14").prop("checked", true) : $("#tipoEntrega14").prop("checked", false);
							value.tipoEntrega15 ? $("#tipoEntrega15").prop("checked", true) : $("#tipoEntrega15").prop("checked", false);
							value.tipoEntrega16 ? $("#tipoEntrega16").prop("checked", true) : $("#tipoEntrega16").prop("checked", false);
							value.tipoEntrega17 ? $("#tipoEntrega17").prop("checked", true) : $("#tipoEntrega17").prop("checked", false);
							value.tipoEntrega18 ? $("#tipoEntrega18").prop("checked", true) : $("#tipoEntrega18").prop("checked", false);
							value.tipoEntrega19 ? $("#tipoEntrega19").prop("checked", true) : $("#tipoEntrega19").prop("checked", false);
							value.tipoEntrega20 ? $("#tipoEntrega20").prop("checked", true) : $("#tipoEntrega20").prop("checked", false);
							value.optPaletizado ? $("#optPaletizado").prop("checked", true) : $("#optPaletizado").prop("checked", false);
							value.optFilmado ? $("#optFilmado").prop("checked", true) : $("#optFilmado").prop("checked", false);
							value.optCargaBatida ? $("#optCargaBatida").prop("checked", true) : $("#optCargaBatida").prop("checked", false);
							value.optDemandaAjudante ? $("#optDemandaAjudante").prop("checked", true) : $("#optDemandaAjudante").prop("checked", false);
							value.optExigeLogReversa ? $("#optExigeLogReversa").prop("checked", true) : $("#optExigeLogReversa").prop("checked", false);
							value.optDemandaContratEmpilh ? $("#optDemandaContratEmpilh").prop("checked", true) : $("#optDemandaContratEmpilh").prop("checked", false);

							$("#horarioRecebimento, #horarioRecebimentoOriginal").val(value.horarioRecebimento);
							$("#mangote, #mangoteOriginal").val(value.mangote);
							$("#tamanho, #tamanhoOriginal").val(value.tamanho);
							$("#bomba, #bombaOriginal").val(value.bomba);
							$("#engate, #engateOriginal").val(value.engate);
							$("#especPolegadas, #especPolegadasOriginal").val(value.especPolegadas);
							$("#obsParaLogistica, #obsParaLogisticaOriginal").val(value.obsParaLogistica);
							$("#especificacaoProduto, #especificacaoProdutoOriginal").val(value.especificacaoProduto);
							$("#envioLaudosEspecificos, #envioLaudosEspecificosOriginal").val(value.envioLaudosEspecificos);
							$("#demandaEquip, #demandaEquipOriginal").val(value.demandaEquip);
							$("#especificarEquip, #especificarEquipOriginal").val(value.especificarEquip);
							$("#informacoes, #informacoesOriginal").val(value.informacoes);
							$("#obsLicitacoes, #obsLicitacoesOriginal").val(value.obsLicitacoes);
							$("#obsAtendimentoClientes, #obsAtendimentoClientesOriginal").val(value.obsAtendimentoClientes);

							$("#oldFluig").val(fluig);


							verifyCheckbox();
							buscaHistorico(fluig);
						}

					} else {

						buscaHistorico(value.numeroFluig);
						resetValues();

						FLUIGC.toast({
							title: 'Aten????o!',
							message: 'J?? existe uma solicita????o em aberto para este n??mero de pedido',
							type: 'info'
						});

						$('#UltimaSolicitacao').html('Ultima solicita????o: <a href="' + parent.WCMAPI.tenantURL + '/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + dsValues.at(-1).solicitacao + '" target="_blank" rel="noopener noreferrer "><strong class="text-info">' + dsValues.at(-1).solicitacao + '<strong></a>');


					}


				} else {

					var alteracao2 = DatasetFactory.getDataset(
						"dsChecklistAlteracaoVendasMercadoPublico",
						null,
						[
							DatasetFactory.createConstraint("numeroSolicitacao", numProcess, numProcess, ConstraintType.MUST),
							DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST)
						],
						null);

					const value2 = alteracao2.values[0];

					var control;
					var fluig;

					if (value2.oldFluig == null || value2.oldFluig == undefined || value2.oldFluig == "") {
						fluig = value2.numeroFluig;
						console.log("NUMERO FLUIG: " + value2.numeroFluig + " - FLUIG: " + fluig + " - OLD FLUIG: " + value2.oldFluig);
					} else {
						fluig = value2.oldFluig;
						console.log("OLDFLUIG: " + value2.oldFluig + " - NUMEROFLUIG: " + value2.numeroFluig + " - FLUIG: " + fluig);
					}



					const dsValues2 = new Array();

					const alteracaoNumFluig = DatasetFactory.getDataset("dsChecklistAlteracaoVendasMercadoPublico",
						["solicitacao"],
						[
							DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST),
							DatasetFactory.createConstraint("numeroFluig", fluig, fluig, ConstraintType.MUST)
						],
						null);

					const alteracaoOldFluig = DatasetFactory.getDataset("dsChecklistAlteracaoVendasMercadoPublico",
						["solicitacao"],
						[
							DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST),
							DatasetFactory.createConstraint("oldFluig", fluig, fluig, ConstraintType.MUST)
						],
						null);

					for (let i = 0; i < alteracaoNumFluig.values.length; i++) dsValues2.push(alteracaoNumFluig.values[i]);
					for (let i = 0; i < alteracaoOldFluig.values.length; i++) dsValues2.push(alteracaoOldFluig.values[i]);

					console.log(dsValues2);

					dsValues2.sort(function (a, b) {

						if (a.solicitacao > b.solicitacao) {
							return 1;
						}

						if (a.solicitacao < b.solicitacao) {
							return -1;
						}

						return 0;

					});

					if (dsValues2.length > 0) {
						if (dsValues2.at(-1).solicitacao <= numprocess) {
							control = true;
						} else {
							control = false;
						}
					}
					if (control) {

						if (alteracao2.values.length > 0) {

							$("#razaoSocial, #razaoSocialOriginal").val(value2.razaoSocial);
							$("#cnpj, #cnpjOriginal").val(value2.cnpj);
							$("#codigoCliente, #codigoClienteOriginal").val(value2.codigoCliente);
							$("#numeroWinner, #numeroWinnerOriginal").val(value2.numeroWinner);
							$("#numEditEmp, #numEditEmpOriginal").val(value2.numEditEmp);
							$("#contratoAta, #contratoAtaOriginal").val(value2.contratoAta);
							$("#numPedidoContrato, #numPedidoContratoOriginal").val(value2.numPedidoContrato);
							$("#aditivo, #aditivoOriginal").val(value2.aditivo);
							$("#vigenciaContratoIni, #vigenciaContratoIniOriginal").val(value2.vigenciaContratoIni);
							$("#vigenciaContratoFim, #vigenciaContratoFimOriginal").val(value2.vigenciaContratoFim);
							$("#ateZerarSaldo, #ateZerarSaldoOriginal").val(value2.ateZerarSaldo);
							$("#unidadeFaturamento, #unidadeFaturamentoOriginal").val(value2.unidadeFaturamento);
							$("#unidadeOrigem, #unidadeOrigemOriginal").val(value2.unidadeOrigem);
							$("#produtoBauminas, #produtoBauminasOriginal").val(value2.produtoBauminas);
							$("#produtoAmbientaly, #produtoAmbientalyOriginal").val(value2.produtoAmbientaly);
							$("#codigoProduto, #codigoProdutoOriginal").val(value2.codigoProduto);
							$("#qtdeLicitKg, #qtdeLicitKgOriginal").val(value2.qtdeLicitKg);
							$("#qtdeLicitTon, #qtdeLicitTonOriginal").val(value2.qtdeLicitTon);
							$("#qtdeLicitLitros, #qtdeLicitLitrosOriginal").val(value2.qtdeLicitLitros);
							$("#qtdeLicitBaseSeca, #qtdeLicitBaseSecaOriginal").val(value2.qtdeLicitBaseSeca);
							$("#qtdeLicitM3, #qtdeLicitM3Original").val(value2.qtdeLicitM3);
							$("#qtdeTotalKg, #qtdeTotalKgOriginal").val(value2.qtdeTotalKg);
							$("#qtdeTotalTon, #qtdeTotalTonOriginal").val(value2.qtdeTotalTon);
							$("#qtdeTotalLitros, #qtdeTotalLitrosOriginal").val(value2.qtdeTotalLitros);
							$("#qtdeTotalBaseSeca, #qtdeTotalBaseSecaOriginal").val(value2.qtdeTotalBaseSeca);
							$("#qtdeTotalM3, #qtdeTotalM3Original").val(value2.qtdeTotalM3);
							$("#precoFinalKg, #precoFinalKgOriginal").val(value2.precoFinalKg);
							$("#precoFinalTon, #precoFinalTonOriginal").val(value2.precoFinalTon);
							$("#precoFinalLitros, #precoFinalLitrosOriginal").val(value2.precoFinalLitros);
							$("#precoFinalBaseSeca, #precoFinalBaseSecaOriginal").val(value2.precoFinalBaseSeca);
							$("#precoFinalM3, #precoFinalM3Original").val(value2.precoFinalM3);
							$("#condicaoPagamento, #condicaoPagamentoOriginal").val(value2.condicaoPagamento);
							$("#prazoEntrega, #prazoEntregaOriginal").val(value2.prazoEntrega);
							$("#especificarDias, #especificarDiasOriginal").val(value2.especificarDias);
							$("#tipoFrete, #tipoFreteOriginal").val(value2.tipoFrete);
							$("#valorFrete, #valorFreteOriginal").val(value2.valorFrete);
							$("#seRedespacho, #seRedespachoOriginal").val(value2.seRedespacho);

							value2.tipoEntrega1 ? $("#tipoEntrega1").prop("checked", true) : $("#tipoEntrega1").prop("checked", false);
							value2.tipoEntrega2 ? $("#tipoEntrega2").prop("checked", true) : $("#tipoEntrega2").prop("checked", false);
							value2.tipoEntrega3 ? $("#tipoEntrega3").prop("checked", true) : $("#tipoEntrega3").prop("checked", false);
							value2.tipoEntrega4 ? $("#tipoEntrega4").prop("checked", true) : $("#tipoEntrega4").prop("checked", false);
							value2.tipoEntrega5 ? $("#tipoEntrega5").prop("checked", true) : $("#tipoEntrega5").prop("checked", false);
							value2.tipoEntrega6 ? $("#tipoEntrega6").prop("checked", true) : $("#tipoEntrega6").prop("checked", false);
							value2.tipoEntrega7 ? $("#tipoEntrega7").prop("checked", true) : $("#tipoEntrega7").prop("checked", false);
							value2.tipoEntrega8 ? $("#tipoEntrega8").prop("checked", true) : $("#tipoEntrega8").prop("checked", false);
							value2.tipoEntrega9 ? $("#tipoEntrega9").prop("checked", true) : $("#tipoEntrega9").prop("checked", false);
							value2.tipoEntrega10 ? $("#tipoEntrega10").prop("checked", true) : $("#tipoEntrega10").prop("checked", false);
							value2.tipoEntrega11 ? $("#tipoEntrega11").prop("checked", true) : $("#tipoEntrega11").prop("checked", false);
							value2.tipoEntrega12 ? $("#tipoEntrega12").prop("checked", true) : $("#tipoEntrega12").prop("checked", false);
							value2.tipoEntrega13 ? $("#tipoEntrega13").prop("checked", true) : $("#tipoEntrega13").prop("checked", false);
							value2.tipoEntrega14 ? $("#tipoEntrega14").prop("checked", true) : $("#tipoEntrega14").prop("checked", false);
							value2.tipoEntrega15 ? $("#tipoEntrega15").prop("checked", true) : $("#tipoEntrega15").prop("checked", false);
							value2.tipoEntrega16 ? $("#tipoEntrega16").prop("checked", true) : $("#tipoEntrega16").prop("checked", false);
							value2.tipoEntrega17 ? $("#tipoEntrega17").prop("checked", true) : $("#tipoEntrega17").prop("checked", false);
							value2.tipoEntrega18 ? $("#tipoEntrega18").prop("checked", true) : $("#tipoEntrega18").prop("checked", false);
							value2.tipoEntrega19 ? $("#tipoEntrega19").prop("checked", true) : $("#tipoEntrega19").prop("checked", false);
							value2.tipoEntrega20 ? $("#tipoEntrega20").prop("checked", true) : $("#tipoEntrega20").prop("checked", false);
							value2.optPaletizado ? $("#optPaletizado").prop("checked", true) : $("#optPaletizado").prop("checked", false);
							value2.optFilmado ? $("#optFilmado").prop("checked", true) : $("#optFilmado").prop("checked", false);
							value2.optCargaBatida ? $("#optCargaBatida").prop("checked", true) : $("#optCargaBatida").prop("checked", false);
							value2.optDemandaAjudante ? $("#optDemandaAjudante").prop("checked", true) : $("#optDemandaAjudante").prop("checked", false);
							value2.optExigeLogReversa ? $("#optExigeLogReversa").prop("checked", true) : $("#optExigeLogReversa").prop("checked", false);
							value2.optDemandaContratEmpilh ? $("#optDemandaContratEmpilh").prop("checked", true) : $("#optDemandaContratEmpilh").prop("checked", false);

							$("#horarioRecebimento, #horarioRecebimentoOriginal").val(value2.horarioRecebimento);
							$("#mangote, #mangoteOriginal").val(value2.mangote);
							$("#tamanho, #tamanhoOriginal").val(value2.tamanho);
							$("#bomba, #bombaOriginal").val(value2.bomba);
							$("#engate, #engateOriginal").val(value2.engate);
							$("#especPolegadas, #especPolegadasOriginal").val(value2.especPolegadas);
							$("#obsParaLogistica, #obsParaLogisticaOriginal").val(value2.obsParaLogistica);
							$("#especificacaoProduto, #especificacaoProdutoOriginal").val(value2.especificacaoProduto);
							$("#envioLaudosEspecificos, #envioLaudosEspecificosOriginal").val(value2.envioLaudosEspecificos);
							$("#demandaEquip, #demandaEquipOriginal").val(value2.demandaEquip);
							$("#especificarEquip, #especificarEquipOriginal").val(value2.especificarEquip);
							$("#informacoes, #informacoesOriginal").val(value2.informacoes);
							$("#obsLicitacoes, #obsLicitacoesOriginal").val(value2.obsLicitacoes);
							$("#obsAtendimentoClientes, #obsAtendimentoClientesOriginal").val(value2.obsAtendimentoClientes);

							$("#oldFluig").val(fluig);


							verifyCheckbox();
							buscaHistorico(fluig);
						}

					} else {

						buscaHistorico(value2.numeroFluig);
						resetValues();

						FLUIGC.toast({
							title: 'Aten????o!',
							message: 'J?? existe uma solicita????o em aberto para este n??mero de pedido',
							type: 'info'
						});

						$('#UltimaSolicitacao').html('Ultima solicita????o: <a href="' + parent.WCMAPI.tenantURL + '/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + dsValues2.at(-1).solicitacao + '" target="_blank" rel="noopener noreferrer "><strong class="text-info">' + dsValues2.at(-1).solicitacao + '<strong></a>');


					}
				}

			} else if (type == "VENDAS NOVO") {

				var newVendas = DatasetFactory.getDataset(
					"ds_form_vendas_mercado_publico",
					null,
					[
						DatasetFactory.createConstraint("solicitacao", numProcess, numProcess, ConstraintType.MUST),
						DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST)
					],
					null);

				if (newVendas.values.length > 0) {

					$("#razaoSocial, #razaoSocialOriginal").val(newVendas.values[0].TXT_Cliente);
					$("#cnpj, #cnpjOriginal").val(newVendas.values[0].TXT_CNPJ);
					$("#codigoCliente, #codigoClienteOriginal").val(newVendas.values[0].TXT_CodCliente);
					$("#numeroWinner, #numeroWinnerOriginal").val(newVendas.values[0].txt_numWinner);
					$("#numEditEmp, #numEditEmpOriginal").val(newVendas.values[0].TXT_EditEmpenho);
					$("#contratoAta, #contratoAtaOriginal").val(newVendas.values[0].TXT_ContratoAta);
					$("#numPedidoContrato, #numPedidoContratoOriginal").val(newVendas.values[0].TXT_PedContr);
					$("#vigenciaContratoIni, #vigenciaContratoIniOriginal").val(newVendas.values[0].DT_ContratoDe);
					$("#vigenciaContratoFim, #vigenciaContratoFimOriginal").val(newVendas.values[0].DT_ContratoAte);
					$("#ateZerarSaldo, #ateZerarSaldoOriginal").val(newVendas.values[0].Rd_ZerarSd);
					$("#unidadeFaturamento, #unidadeFaturamentoOriginal").val(newVendas.values[0].CMB_UnidFaturam);
					$("#unidadeOrigem, #unidadeOrigemOriginal").val(newVendas.values[0].CMB_UnidOrigem);
					$("#produtoBauminas, #produtoBauminasOriginal").val(newVendas.values[0].CMB_Produto);
					$("#produtoAmbientaly, #produtoAmbientalyOriginal").val(newVendas.values[0].txt_ProdAmb);
					$("#codigoProduto, #codigoProdutoOriginal").val(newVendas.values[0].TXT_CodProd);
					$("#qtdeLicitKg, #qtdeLicitKgOriginal").val(newVendas.values[0].qtdeLicitKg);
					$("#qtdeLicitTon, #qtdeLicitTonOriginal").val(newVendas.values[0].qtdeLicitTon);
					$("#qtdeLicitLitros, #qtdeLicitLitrosOriginal").val(newVendas.values[0].qtdeLicitLitros);
					$("#qtdeLicitBaseSeca, #qtdeLicitBaseSecaOriginal").val(newVendas.values[0].qtdeLicitBaseSeca);
					$("#qtdeLicitM3, #qtdeLicitM3Original").val(newVendas.values[0].qtdeLicitM3);
					$("#qtdeTotalKg, #qtdeTotalKgOriginal").val(newVendas.values[0].qtdeTotalKg);
					$("#qtdeTotalTon, #qtdeTotalTonOriginal").val(newVendas.values[0].qtdeTotalTon);
					$("#qtdeTotalLitros, #qtdeTotalLitrosOriginal").val(newVendas.values[0].qtdeTotalLitros);
					$("#qtdeTotalBaseSeca, #qtdeTotalBaseSecaOriginal").val(newVendas.values[0].qtdeTotalBaseSeca);
					$("#qtdeTotalM3, #qtdeTotalM3Original").val(newVendas.values[0].qtdeTotalM3);
					$("#precoFinalKg, #precoFinalKgOriginal").val(newVendas.values[0].precoFinalKg);
					$("#precoFinalTon, #precoFinalTonOriginal").val(newVendas.values[0].precoFinalTon);
					$("#precoFinalLitros, #precoFinalLitrosOriginal").val(newVendas.values[0].precoFinalLitros);
					$("#precoFinalBaseSeca, #precoFinalBaseSecaOriginal").val(newVendas.values[0].precoFinalBaseSeca);
					$("#precoFinalM3, #precoFinalM3Original").val(newVendas.values[0].precoFinalM3);
					$("#condicaoPagamento, #condicaoPagamentoOriginal").val(newVendas.values[0].TXT_CondPg);
					$("#prazoEntrega, #prazoEntregaOriginal").val(newVendas.values[0].radio35);
					$("#especificarDias, #especificarDiasOriginal").val(newVendas.values[0].TXT_PrazoEntreg);
					$("#tipoFrete, #tipoFreteOriginal").val(newVendas.values[0].CMB_TipoFrete);
					$("#valorFrete, #valorFreteOriginal").val(newVendas.values[0].TXT_Valor);
					$("#seRedespacho, #seRedespachoOriginal").val(newVendas.values[0].PAR_SERED);
					$("#horarioRecebimento, #horarioRecebimentoOriginal").val(newVendas.values[0].TXT_HrReb);
					$("#mangote, #mangoteOriginal").val(newVendas.values[0].Rd_Mangote);
					$("#tamanho, #tamanhoOriginal").val(newVendas.values[0].TXT_MangMetros);
					$("#bomba, #bombaOriginal").val(newVendas.values[0].Rd_Bomba);
					$("#engate, #engateOriginal").val(newVendas.values[0].Rd_Engate);
					$("#especPolegadas, #especPolegadasOriginal").val(newVendas.values[0].TXT_Polegadas);
					$("#obsParaLogistica, #obsParaLogisticaOriginal").val(newVendas.values[0].PAR_ObsLogistic);
					$("#especificacaoProduto, #especificacaoProdutoOriginal").val(newVendas.values[0].TXT_EspProd);
					$("#envioLaudosEspecificos, #envioLaudosEspecificosOriginal").val(newVendas.values[0].TXT_LaudoEsp);
					$("#demandaEquip, #demandaEquipOriginal").val(newVendas.values[0].Rd_DemEquip);
					$("#especificarEquip, #especificarEquipOriginal").val(newVendas.values[0].TXT_EspEquip);
					$("#obsLicitacoes, #obsLicitacoesOriginal").val(newVendas.values[0].PAR_OBSAREALICT);
					$("#obsAtendimentoClientes, #obsAtendimentoClientesOriginal").val(newVendas.values[0].obsAtendimentoClientes);

					newVendas.values[0].sel_tipoEntrega0 ? $("#tipoEntrega1").prop("checked", true) : $("#tipoEntrega1").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega1 ? $("#tipoEntrega2").prop("checked", true) : $("#tipoEntrega2").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega2 ? $("#tipoEntrega3").prop("checked", true) : $("#tipoEntrega3").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega3 ? $("#tipoEntrega4").prop("checked", true) : $("#tipoEntrega4").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega4 ? $("#tipoEntrega5").prop("checked", true) : $("#tipoEntrega5").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega5 ? $("#tipoEntrega6").prop("checked", true) : $("#tipoEntrega6").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega6 ? $("#tipoEntrega7").prop("checked", true) : $("#tipoEntrega7").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega7 ? $("#tipoEntrega8").prop("checked", true) : $("#tipoEntrega8").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega8 ? $("#tipoEntrega9").prop("checked", true) : $("#tipoEntrega9").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega9 ? $("#tipoEntrega10").prop("checked", true) : $("#tipoEntrega10").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega10 ? $("#tipoEntrega11").prop("checked", true) : $("#tipoEntrega11").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega11 ? $("#tipoEntrega12").prop("checked", true) : $("#tipoEntrega12").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega12 ? $("#tipoEntrega13").prop("checked", true) : $("#tipoEntrega13").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega13 ? $("#tipoEntrega14").prop("checked", true) : $("#tipoEntrega14").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega14 ? $("#tipoEntrega15").prop("checked", true) : $("#tipoEntrega15").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega15 ? $("#tipoEntrega16").prop("checked", true) : $("#tipoEntrega16").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega16 ? $("#tipoEntrega17").prop("checked", true) : $("#tipoEntrega17").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega17 ? $("#tipoEntrega18").prop("checked", true) : $("#tipoEntrega18").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega18 ? $("#tipoEntrega19").prop("checked", true) : $("#tipoEntrega19").prop("checked", false);
					newVendas.values[0].sel_tipoEntrega19 ? $("#tipoEntrega20").prop("checked", true) : $("#tipoEntrega20").prop("checked", false);
					newVendas.values[0].checkbox41opc0 ? $("#optPaletizado").prop("checked", true) : $("#optPaletizado").prop("checked", false);
					newVendas.values[0].checkbox41opc1 ? $("#optFilmado").prop("checked", true) : $("#optFilmado").prop("checked", false);
					newVendas.values[0].checkbox41opc2 ? $("#optCargaBatida").prop("checked", true) : $("#optCargaBatida").prop("checked", false);
					newVendas.values[0].checkbox41opc3 ? $("#optDemandaAjudante").prop("checked", true) : $("#optDemandaAjudante").prop("checked", false);
					newVendas.values[0].optExigeLogReversa ? $("#optExigeLogReversa").prop("checked", true) : $("#optExigeLogReversa").prop("checked", false);
					newVendas.values[0].checkbox41opc5 ? $("#optDemandaContratEmpilh").prop("checked", true) : $("#optDemandaContratEmpilh").prop("checked", false);


					verifyCheckbox();
					buscaHistorico(numprocess);


				} else {

					resetValues();
					FLUIGC.toast({
						title: 'Aten????o!',
						message: 'Nenhum registro foi encontrado com o n??mero informado',
						type: 'warning'
					});

				}

			} else {

				var oldVendas = DatasetFactory.getDataset(
					"DSFormulariodeChecklist-VendasMercadoPublicoQuimica",
					null,
					[
						DatasetFactory.createConstraint("textbox40", numProcess, numProcess, ConstraintType.MUST),
						DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST)
					],
					null);

				if (oldVendas.values.length > 0) {

					$("#razaoSocial").val(oldVendas.values[0].TXT_Cliente);
					$("#cnpj").val(oldVendas.values[0].TXT_CNPJ);
					$("#codigoCliente").val(oldVendas.values[0].TXT_CodCliente);
					$("#numeroWinner").val(oldVendas.values[0].txt_numWinner);
					$("#numEditEmp").val(oldVendas.values[0].TXT_EditEmpenho);
					$("#contratoAta").val(oldVendas.values[0].TXT_ContratoAta);
					$("#numPedidoContrato").val(oldVendas.values[0].TXT_NumPed);
					$("#vigenciaContratoIni").val(oldVendas.values[0].DT_ContratoDe);
					$("#vigenciaContratoFim").val(oldVendas.values[0].DT_ContratoAte);
					$("#ateZerarSaldo").val(oldVendas.values[0].Rd_ZerarSd);
					$("#unidadeFaturamento").val(oldVendas.values[0].CMB_UnidFaturam);
					$("#unidadeOrigem").val(oldVendas.values[0].CMB_UnidOrigem);
					$("#produtoBauminas").val(oldVendas.values[0].CMB_Produto);
					$("#produtoAmbientaly").val(oldVendas.values[0].txt_ProdAmb);
					$("#codigoProduto").val(oldVendas.values[0].TXT_CodProd);


					var buscaPaiFilho1 = DatasetFactory.getDataset(
						"DSFormulariodeChecklist-VendasMercadoPublicoQuimica",
						null,
						[
							DatasetFactory.createConstraint("metadata#id", oldVendas.values[0]["metadata#id"], oldVendas.values[0]["metadata#id"], ConstraintType.MUST),
							DatasetFactory.createConstraint("metadata#version", oldVendas.values[0]["metadata#version"], oldVendas.values[0]["metadata#version"], ConstraintType.MUST),
							DatasetFactory.createConstraint("tablename", "tabledetailname3", "tabledetailname3", ConstraintType.MUST)
						],
						null);

					if (buscaPaiFilho1.values[0] != null && buscaPaiFilho1.values[0] != undefined && buscaPaiFilho1.values[0] != "") {

						$("#qtdeLicitKg").val(buscaPaiFilho1.values[0].column1_3);
						$("#qtdeLicitTon").val(buscaPaiFilho1.values[0].column2_3);
						$("#qtdeLicitLitros").val(buscaPaiFilho1.values[0].column3_3);
						$("#qtdeLicitBaseSeca").val(buscaPaiFilho1.values[0].column4_3);
						$("#qtdeLicitM3").val(buscaPaiFilho1.values[0].column5_3);

					} else {

						$("#qtdeLicitTon").val(oldVendas.values[0].TXT_QntLicit);

					}

					var buscaPaiFilho2 = DatasetFactory.getDataset(
						"DSFormulariodeChecklist-VendasMercadoPublicoQuimica",
						null,
						[
							DatasetFactory.createConstraint("metadata#id", oldVendas.values[0]["metadata#id"], oldVendas.values[0]["metadata#id"], ConstraintType.MUST),
							DatasetFactory.createConstraint("metadata#version", oldVendas.values[0]["metadata#version"], oldVendas.values[0]["metadata#version"], ConstraintType.MUST),
							DatasetFactory.createConstraint("tablename", "tabledetailname1", "tabledetailname1", ConstraintType.MUST)
						],
						null);

					if (buscaPaiFilho2.values[0] != null && buscaPaiFilho2.values[0] != undefined && buscaPaiFilho2.values[0] != "") {

						$("#qtdeTotalKg").val(buscaPaiFilho2.values[0].column1_1);
						$("#qtdeTotalTon").val(buscaPaiFilho2.values[0].column2_1);
						$("#qtdeTotalLitros").val(buscaPaiFilho2.values[0].column3_1);
						$("#qtdeTotalBaseSeca").val(buscaPaiFilho2.values[0].column4_1);
						$("#qtdeTotalM3").val(buscaPaiFilho2.values[0].column5_1);

					} else {

						$("#qtdeTotalKg").val(oldVendas.values[0].TXT_QTotalKg);
						$("#qtdeTotalLitros").val(oldVendas.values[0].TXT_QTotalLt);
						$("#qtdeTotalBaseSeca").val(oldVendas.values[0].TXT_QTotalBS);

					}

					var buscaPaiFilho3 = DatasetFactory.getDataset(
						"DSFormulariodeChecklist-VendasMercadoPublicoQuimica",
						null,
						[
							DatasetFactory.createConstraint("metadata#id", oldVendas.values[0]["metadata#id"], oldVendas.values[0]["metadata#id"], ConstraintType.MUST),
							DatasetFactory.createConstraint("metadata#version", oldVendas.values[0]["metadata#version"], oldVendas.values[0]["metadata#version"], ConstraintType.MUST),
							DatasetFactory.createConstraint("tablename", "tabledetailname4", "tabledetailname4", ConstraintType.MUST)
						],
						null);

					if (buscaPaiFilho3.values[0] != null && buscaPaiFilho3.values[0] != undefined && buscaPaiFilho3.values[0] != "") {

						$("#precoFinalKg").val(buscaPaiFilho3.values[0].column1_4);
						$("#precoFinalTon").val(buscaPaiFilho3.values[0].column2_4);
						$("#precoFinalLitros").val(buscaPaiFilho3.values[0].column3_4);
						$("#precoFinalBaseSeca").val(buscaPaiFilho3.values[0].column4_4);
						$("#precoFinalM3").val(buscaPaiFilho3.values[0].column5_4);

					} else {

						$("#precoFinalKg").val(oldVendas.values[0].TXT_PFKg);
						$("#precoFinalLitros").val(oldVendas.values[0].TXT_PFLt);
						$("#precoFinalBaseSeca").val(oldVendas.values[0].TXT_PFBS);

					}

					$("#condicaoPagamento").val(oldVendas.values[0].TXT_CondPg);
					$("#radio35").val(oldVendas.values[0].radio35);
					$("#especificarDias").val(oldVendas.values[0].TXT_PrazoEntreg);
					$("#tipoFrete").val(oldVendas.values[0].CMB_TipoFrete);
					$("#valorFrete").val(oldVendas.values[0].TXT_Valor);
					$("#seRedespacho").val(oldVendas.values[0].PAR_SERED);

					oldVendas.values[0].sel_tipoEntrega0 ? $("#tipoEntrega1").prop("checked", true) : $("#tipoEntrega1").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega1 ? $("#tipoEntrega2").prop("checked", true) : $("#tipoEntrega2").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega2 ? $("#tipoEntrega3").prop("checked", true) : $("#tipoEntrega3").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega3 ? $("#tipoEntrega4").prop("checked", true) : $("#tipoEntrega4").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega4 ? $("#tipoEntrega5").prop("checked", true) : $("#tipoEntrega5").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega5 ? $("#tipoEntrega6").prop("checked", true) : $("#tipoEntrega6").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega6 ? $("#tipoEntrega7").prop("checked", true) : $("#tipoEntrega7").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega7 ? $("#tipoEntrega8").prop("checked", true) : $("#tipoEntrega8").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega8 ? $("#tipoEntrega9").prop("checked", true) : $("#tipoEntrega9").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega9 ? $("#tipoEntrega10").prop("checked", true) : $("#tipoEntrega10").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega10 ? $("#tipoEntrega11").prop("checked", true) : $("#tipoEntrega11").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega11 ? $("#tipoEntrega12").prop("checked", true) : $("#tipoEntrega12").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega12 ? $("#tipoEntrega13").prop("checked", true) : $("#tipoEntrega13").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega13 ? $("#tipoEntrega14").prop("checked", true) : $("#tipoEntrega14").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega14 ? $("#tipoEntrega15").prop("checked", true) : $("#tipoEntrega15").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega15 ? $("#tipoEntrega16").prop("checked", true) : $("#tipoEntrega16").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega16 ? $("#tipoEntrega17").prop("checked", true) : $("#tipoEntrega17").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega17 ? $("#tipoEntrega18").prop("checked", true) : $("#tipoEntrega18").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega18 ? $("#tipoEntrega19").prop("checked", true) : $("#tipoEntrega19").prop("checked", false);
					oldVendas.values[0].sel_tipoEntrega19 ? $("#tipoEntrega20").prop("checked", true) : $("#tipoEntrega20").prop("checked", false);
					oldVendas.values[0].checkbox41opc0 ? $("#optPaletizado").prop("checked", true) : $("#optPaletizado").prop("checked", false);
					oldVendas.values[0].checkbox41opc1 ? $("#optFilmado").prop("checked", true) : $("#optFilmado").prop("checked", false);
					oldVendas.values[0].checkbox41opc2 ? $("#optCargaBatida").prop("checked", true) : $("#optCargaBatida").prop("checked", false);
					oldVendas.values[0].checkbox41opc3 ? $("#optDemandaAjudante").prop("checked", true) : $("#optDemandaAjudante").prop("checked", false);
					oldVendas.values[0].checkbox41opc4 ? $("#optExigeLogReversa").prop("checked", true) : $("#optExigeLogReversa").prop("checked", false);
					oldVendas.values[0].checkbox41opc5 ? $("#optDemandaContratEmpilh").prop("checked", true) : $("#optDemandaContratEmpilh").prop("checked", false);


					$("#horarioRecebimento").val(oldVendas.values[0].TXT_HrReb);
					$("#mangote").val(oldVendas.values[0].Rd_Mangote);
					$("#tamanho").val(oldVendas.values[0].TXT_MangMetros);
					$("#bomba").val(oldVendas.values[0].Rd_Bomba);
					$("#engate").val(oldVendas.values[0].Rd_Engate);
					$("#especPolegadas").val(oldVendas.values[0].TXT_Polegadas);
					$("#obsParaLogistica").val(oldVendas.values[0].PAR_ObsLogistic);
					$("#especificacaoProduto").val(oldVendas.values[0].TXT_EspProd);
					$("#envioLaudosEspecificos").val(oldVendas.values[0].TXT_LaudoEsp);
					$("#demandaEquip").val(oldVendas.values[0].Rd_DemEquip);
					$("#especificarEquip").val(oldVendas.values[0].TXT_EspEquip);
					$("#obsAtendimentoClientes").val(oldVendas.values[0].PAR_OBSATEND);
					$("#obsLicitacoes").val(oldVendas.values[0].PAR_OBSAREALICT);

					verifyCheckbox();
					buscaHistorico(numprocess);

				} else {


					$('#UltimaSolicitacao').html('');

					FLUIGC.toast({
						title: 'Aten????o',
						message: 'N??o foi poss??vel carregar os dados da solicita????o.',
						type: 'warning'
					});

				}

			}


		} else {

			FLUIGC.toast({
				title: 'Aten????o',
				message: 'N??mero de solicita????o n??o encontrado.',
				type: 'warning'
			});
		}






	});
})

function verificarAlteracao(id, texto, span) {

	if ($('#' + id + 'Original').val() != texto) {

		// $('#' + id).parent().addClass('has-warning');
		$('#' + id).addClass('corFundo');
		$('#' + id + 'Hidden').val('Mudou');

		var valorOriginal = $('#' + id + 'Original').val();
		if (valorOriginal == "" || valorOriginal == null) {
			valorOriginal = "(Vazio)";
		}

		$('#' + id).prop('title', "Valor anterior: " + valorOriginal);
		$('#' + id + 'ValSpan').html("Valor anterior: " + valorOriginal);




		if (atv == 7 || atv == 37) {
			// setTimeout(function () {
			var _valorOriginal = $('#' + id + 'Original').val();
			if (_valorOriginal == "" || _valorOriginal == null) {
				_valorOriginal = "(Vazio)";
			}

			$('#' + span + 'ValSpan').html("Valor anterior: " + _valorOriginal);
			// }, 1000);
		}
	} else {

		// $('#' + spam).parent()[0].classList.remove('has-warning')
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

const resetValues = () => {

	const fields = $("form[name='form']").find("input, select, textarea, input[type='checkbox']");

	for (let i = 0; i < fields.length; i++) {

		fields[??].id.indexOf('numeroFluig') > -1 ? fields[i].value = fields[i].value : fields[i].value = '';
		fields[i].value = ''
		fields[i].type === 'checkbox' ? fields[i].checked = false : null;
	};
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
		let idOriginal = $('#' + arr[index].id + 'valOri').val();
		idOriginal = idOriginal ? idOriginal.trim() : idOriginal;

		if (arr[index].checked.toString() != idOriginal) {


			$(id + 'Hidden').val('Mudou');
			$(id).parent().removeClass('custom-checkbox-primary').addClass('custom-checkbox-warning');
			$(id).siblings()[2].setAttribute('class', 'text-warning');



		} else {

			$(id + 'Hidden').val('');
			$(id).siblings()[2].classList.remove('text-warning');
			$(id).parent().removeClass('custom-checkbox-warning').addClass('custom-checkbox-primary');

		}
	}
}

function buscaHistorico(processId) {


	console.log(processId);

	var cn1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var cn2 = DatasetFactory.createConstraint("numeroFluig", processId, processId, ConstraintType.MUST);
	var dsHist1 = DatasetFactory.getDataset("ds_form_vendas_mercado_publico", ["dataSolicitacao"], [cn1, cn2], null);

	if (dsHist1.values.length == 0) {

		var dsHistVal = "<span>Ainda n??o existem solicita????es alterando esse n??mero de Fluig</span>";

	} else {
		// Primeira consulta para verificar a data da solicita????o de Vendas
		var numSolicOrigem = $("#numeroFluig").val();
		var solicitacao = $("#solicitacao").val();


		// Hitorico para solicita????es de altera????o
		var cs1 = DatasetFactory.createConstraint("solicitacao", processId, processId, ConstraintType.MUST);
		var cs2 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
		var vendasDs = DatasetFactory.getDataset("ds_form_vendas_mercado_publico", ["dataSolicitacao"], [cs1, cs2], null);

		if (vendasDs.values.length > 0) {

			var dsValues = new Array();
			const alteracaoNumFluig = DatasetFactory.getDataset("ds_form_vendas_mercado_publico",
				["solicitacao", "dataSolicitacao"],
				[
					DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST),
					DatasetFactory.createConstraint("numeroFluig", processId, processId, ConstraintType.MUST)
				],
				null);

			const alteracaoOldFluig = DatasetFactory.getDataset("ds_form_vendas_mercado_publico",
				["solicitacao", "dataSolicitacao"],
				[
					DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST),
					DatasetFactory.createConstraint("oldFluig", processId, processId, ConstraintType.MUST)
				],
				null);

			for (let i = 0; i < alteracaoNumFluig.values.length; i++) dsValues.push(alteracaoNumFluig.values[i]);
			for (let i = 0; i < alteracaoOldFluig.values.length; i++) dsValues.push(alteracaoOldFluig.values[i]);

			dsValues.sort(function (a, b) {
				if (a.solicitacao > b.solicitacao) {
					return 1;
				}
				if (a.solicitacao < b.solicitacao) {
					return -1;
				}
				return 0;
			});

			var dsHistVal = "<span><u><b><a target='_blank' href='https://bauminashom.fluig.com:9100/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processId + "'>Solicita????o principal " + processId + "</a></b> feita em " + dsValues[0]["dataSolicitacao"] + "</u></span><br>";

			for (var i = 0; i < dsValues.length; i++) {

				var co1 = DatasetFactory.createConstraint("processId", "AC_0008", "AC_0008", ConstraintType.MUST);
				var co2 = DatasetFactory.createConstraint("cardDocumentId", dsValues[i]["metadata#id"], dsValues[i]["metadata#id"], ConstraintType.MUST);
				var dataset = DatasetFactory.getDataset("workflowProcess", ["workflowProcessPK.processInstanceId", "cardDocumentId"], [co1, co2], null);

				var numSolici = dataset.values[0]["workflowProcessPK.processInstanceId"];
				var dataSolic = dsValues[i]["dataSolicitacao"];

				console.log(dataset);

				if (solicitacao != numSolici) {

					dsHistVal += "<span><b><a target='_blank' href='https://bauminashom.fluig.com:9100/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + numSolici + "'>Solicita????o " + numSolici + "</a></b> feita em " + dataSolic + "</span><br>";

					if (getformMode() == "VIEW") {

						$('#conteudoHistorico').html("<span><b><a target='_blank' href='https://bauminashom.fluig.com:9100/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + numSolici + "'>Solicita????o " + numSolici + "</a></b> feita em " + dataSolic + "</span><br>");
					}
				}
			}

		} else {


			var cs1 = DatasetFactory.createConstraint("solicitacao", numSolicOrigem, numSolicOrigem, ConstraintType.MUST);
			var cs2 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
			var dsVendas = DatasetFactory.getDataset("ds_form_vendas_mercado_publico", ["dataSolicitacao"], [cs1, cs2], null);

			var dsHistVal = "<span><u><b><a target='_blank' href='https://bauminashom.fluig.com:9100/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + numSolicOrigem + "'>Solicita????o principal " + numSolicOrigem + "</a></b> feita em " + dsVendas.values[0]["dataSolicitacao"] + "</u></span><br>";

			for (var i = 0; i < (dsHist1.values.length); i++) {

				var co1 = DatasetFactory.createConstraint("processId", "AC_0008", "AC_0008", ConstraintType.MUST);
				var co2 = DatasetFactory.createConstraint("cardDocumentId", dsHist1.values[i]["metadata#id"], dsHist1.values[i]["metadata#id"], ConstraintType.MUST);
				var dsHist2 = DatasetFactory.getDataset("workflowProcess", ["workflowProcessPK.processInstanceId", "cardDocumentId"], [co1, co2], null);

				var numSolici = dsHist2.values[0]["workflowProcessPK.processInstanceId"];
				var dataSolic = dsHist1.values[i]["dataSolicitacao"];

				if (solicitacao != numSolici) {

					dsHistVal += "<span><b><a target='_blank' href='https://bauminashom.fluig.com:9100/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + numSolici + "'>Solicita????o " + numSolici + "</a></b> feita em " + dataSolic + "</span><br>";

					if (getformMode() == "VIEW") {

						$('#conteudoHistorico').html("<span><b><a target='_blank' href='https://bauminashom.fluig.com:9100/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + numSolici + "'>Solicita????o " + numSolici + "</a></b> feita em " + dataSolic + "</span><br>");
					}

				}
			}
		}
	}

	$("#conteudoHistorico").html(dsHistVal);

}