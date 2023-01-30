var isButtonClickedSolicitante = false //Variável que controla a inserção de apenas um registro por etapa da solicitação 
var isButtonClickedArea = false //Variável que controla a inserção de apenas um registro por etapa da solicitação

$(function () {
	carregarCalendar();
	carregarDivsRetorno();

	//window.parent.$("ul li a[data-save]").hide();

	if (FORM_MODE == 'VIEW') {
		$('#div_botaoSolic').hide();
	}
})

function openModal() {
	var loading = FLUIGC.loading(window);
	loading.show();
	var dataInit = null;

	var callback = {
		success: function (dataset) {
			var myModal = FLUIGC.modal({
				title: 'Copiar Solicitação',
				content: '<div id="dvCopiarSolicitacao"></div>',
				id: 'fluig-modal-copia',
				size: 'full',
				actions: [{
					'label': 'Selecionar',
					'bind': 'data-open-modal',
				}, {
					'label': 'Fechar',
					'autoClose': true
				}]
			}, function (err, data) {
				if (err) {
					// do error handling
				} else {
					var that = this;
					dsSol = dataset;

					if (dsSol != null && dsSol.values != null && dsSol.values.length > 0) {
						var records = dsSol.values;
						that.mydata = [];
						for (var index in records) {
							var record = records[index];

							// if(record.solicitacao == "" || record.solicitacao == null || record.solicitacao == undefined){
							// 	var valNumSolic = record.textbox40;
							// }else{
							// 	var valNumSolic = record.solicitacao;
							// }

							that.mydata.push({
								numSolic: record.numeroSolicitacao,
								clienteCopia: record.cliente,
								contratoCopia: record.contrato,
								cnpjCopia: record.cnpj,
								produtoCopia: record.produto
							});
						}
					}

					that.myTable = FLUIGC.datatable('#dvCopiarSolicitacao', {
						dataRequest: that.mydata,
						renderContent: '.template_copia',
						header: [{
							'title': 'Selecione',
							'size': 'col-md-1'
						}, {
							'title': 'Solicitação',
							'standard': true,
							'size': 'col-md-1'
						}, {
							'title': 'Cliente',
							'standard': true,
							'size': 'col-md-3'
						}, {
							'title': 'Contrato',
							'standard': true,
							'size': 'col-md-2'
						}, {
							'title': 'CNPJ',
							'standard': true,
							'size': 'col-md-2'
						}, {
							'title': 'Produto',
							'standard': true,
							'size': 'col-md-3'
						}],
						/*search: {
							enabled: true,
							onlyEnterkey: true
						},*/

						search: {
							enabled: true,
							onlyEnterkey: true,
							onSearch: function (res) {
								if (!res) {
									that.myTable.reload(dataInit);
								}
								var dataAll = that.myTable.getData();
								var search = dataAll.filter(function (el) {
									return (el.numSolic.toUpperCase().indexOf(res.toUpperCase()) >= 0 ||
										el.clienteCopia.toUpperCase().indexOf(res.toUpperCase()) >= 0 ||
										el.contratoCopia.toUpperCase().indexOf(res.toUpperCase()) >= 0 ||
										el.cnpjCopia.toUpperCase().indexOf(res.toUpperCase()) >= 0 ||
										el.produtoCopia.toUpperCase().indexOf(res.toUpperCase()) >= 0
									);
								});
								if (search && search.length) {
									that.myTable.reload(search);
								} else {
									FLUIGC.toast({
										title: 'Atenção: ',
										message: 'Nenhum resultado encontrado',
										type: 'warning'
									});
								}
							}
						},
						scroll: {
							target: "#dvCopiarSolicitacao",
							enabled: true
						},
						actions: {
							enabled: true,
						},
						navButtons: {
							enabled: false,
						},
						draggable: {
							enabled: false
						},
					}, function (err, data) {
						if (data) {
							dataInit = data;
						} else if (err) {
							FLUIGC.toast({
								message: err,
								type: 'danger'
							});
						}
					});

					that.myTable.on('fluig.datatable.loadcomplete', function () {
						if (!that.tableData) {
							that.tableData = that.myTable.getData();
						}
					});
				}
			});

			$("button[data-open-modal]").click(function (event) {
				event.stopPropagation();
				var loading = FLUIGC.loading(window);
				loading.show();
				var idSolic = 0;

				$("input[id^='ckbSelecionar']").each(function (i, el) {
					if ($(this).is(':checked')) {
						idSolic = $(this).attr('id').split('_')[1];
					}
				});

				var c1 = DatasetFactory.createConstraint("textbox40", idSolic, idSolic, ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
				var dsSolCopia = DatasetFactory.getDataset("DSFormulariodeChecklist-VendasMercadoPublicoQuimica", null, [c1, c2], null);

				if (dsSolCopia.values.length > 0) {

					$("#txt_numWinner").val(dsSolCopia.values[0].txt_numWinner);
					$("#TXT_CodCliente").val(dsSolCopia.values[0].TXT_CodCliente);
					$("#TXT_CNPJ").val(dsSolCopia.values[0].TXT_CNPJ);
					$("#TXT_Cliente").val(dsSolCopia.values[0].TXT_Cliente);
					$("#TXT_ContratoAta").val(dsSolCopia.values[0].TXT_ContratoAta);
					$("#TXT_EditEmpenho").val(dsSolCopia.values[0].TXT_EditEmpenho);
					$("#DT_ContratoDe").val(dsSolCopia.values[0].DT_ContratoDe);
					$("#DT_ContratoAte").val(dsSolCopia.values[0].DT_ContratoAte);

					$("#Rd_ZerarSd").val(dsSolCopia.values[0].Rd_ZerarSd);
					$("#CMB_UnidFaturam").val(dsSolCopia.values[0].CMB_UnidFaturam);
					$("#CMB_UnidOrigem").val(dsSolCopia.values[0].CMB_UnidOrigem);

					if (dsSolCopia.values[0].CMB_Produto == "Selecione") {
						$("#CMB_Produto").val("");
					} else {
						$("#CMB_Produto").val(dsSolCopia.values[0].CMB_Produto);
					}

					$("#txt_ProdAmb").val(dsSolCopia.values[0].txt_ProdAmb);
					$("#TXT_CodProd").val(dsSolCopia.values[0].TXT_CodProd);

					var buscaPaiFilho1 = DatasetFactory.getDataset(
						"DSFormulariodeChecklist-VendasMercadoPublicoQuimica",
						null,
						[
							DatasetFactory.createConstraint("metadata#id", dsSolCopia.values[0]["metadata#id"], dsSolCopia.values[0]["metadata#id"], ConstraintType.MUST),
							DatasetFactory.createConstraint("metadata#version", dsSolCopia.values[0]["metadata#version"], dsSolCopia.values[0]["metadata#version"], ConstraintType.MUST),
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

						$("#qtdeLicitTon").val(dsSolCopia.values[0].TXT_QntLicit);

					}

					var buscaPaiFilho2 = DatasetFactory.getDataset(
						"DSFormulariodeChecklist-VendasMercadoPublicoQuimica",
						null,
						[
							DatasetFactory.createConstraint("metadata#id", dsSolCopia.values[0]["metadata#id"], dsSolCopia.values[0]["metadata#id"], ConstraintType.MUST),
							DatasetFactory.createConstraint("metadata#version", dsSolCopia.values[0]["metadata#version"], dsSolCopia.values[0]["metadata#version"], ConstraintType.MUST),
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

						$("#qtdeTotalKg").val(dsSolCopia.values[0].TXT_QTotalKg);
						$("#qtdeTotalLitros").val(dsSolCopia.values[0].TXT_QTotalLt);
						$("#qtdeTotalBaseSeca").val(dsSolCopia.values[0].TXT_QTotalBS);

					}

					var buscaPaiFilho3 = DatasetFactory.getDataset(
						"DSFormulariodeChecklist-VendasMercadoPublicoQuimica",
						null,
						[
							DatasetFactory.createConstraint("metadata#id", dsSolCopia.values[0]["metadata#id"], dsSolCopia.values[0]["metadata#id"], ConstraintType.MUST),
							DatasetFactory.createConstraint("metadata#version", dsSolCopia.values[0]["metadata#version"], dsSolCopia.values[0]["metadata#version"], ConstraintType.MUST),
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

						$("#precoFinalKg").val(dsSolCopia.values[0].TXT_PFKg);
						$("#precoFinalLitros").val(dsSolCopia.values[0].TXT_PFLt);
						$("#precoFinalBaseSeca").val(dsSolCopia.values[0].TXT_PFBS);

					}

					$("#TXT_CondPg").val(dsSolCopia.values[0].TXT_CondPg);
					$("#radio35").val(dsSolCopia.values[0].radio35);
					$("#TXT_PrazoEntreg").val(dsSolCopia.values[0].TXT_PrazoEntreg);
					$("#CMB_TipoFrete").val(dsSolCopia.values[0].CMB_TipoFrete);
					$("#TXT_Valor").val(dsSolCopia.values[0].TXT_Valor);
					$("#PAR_SERED").val(dsSolCopia.values[0].PAR_SERED);
					$("#TXT_HrReb").val(dsSolCopia.values[0].TXT_HrReb);
					$("#Rd_Mangote").val(dsSolCopia.values[0].Rd_Mangote);
					$("#TXT_MangMetros").val(dsSolCopia.values[0].TXT_MangMetros);
					$("#Rd_Bomba").val(dsSolCopia.values[0].Rd_Bomba);
					$("#Rd_Engate").val(dsSolCopia.values[0].Rd_Engate);
					$("#TXT_Polegadas").val(dsSolCopia.values[0].TXT_Polegadas);
					$("#PAR_ObsLogistic").val(dsSolCopia.values[0].PAR_ObsLogistic);
					$("#TXT_EspProd").val(dsSolCopia.values[0].TXT_EspProd);
					$("#TXT_LaudoEsp").val(dsSolCopia.values[0].TXT_LaudoEsp);
					$("#Rd_DemEquip").val(dsSolCopia.values[0].Rd_DemEquip);
					$("#TXT_EspEquip").val(dsSolCopia.values[0].TXT_EspEquip);
					$("#PAR_OBSAREALICT").val(dsSolCopia.values[0].PAR_OBSAREALICT);

					dsSolCopia.values[0].sel_tipoEntrega0 ? $("#sel_tipoEntrega0").prop("checked", true) : $("#sel_tipoEntrega0").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega1 ? $("#sel_tipoEntrega1").prop("checked", true) : $("#sel_tipoEntrega1").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega2 ? $("#sel_tipoEntrega2").prop("checked", true) : $("#sel_tipoEntrega2").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega3 ? $("#sel_tipoEntrega3").prop("checked", true) : $("#sel_tipoEntrega3").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega4 ? $("#sel_tipoEntrega4").prop("checked", true) : $("#sel_tipoEntrega4").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega5 ? $("#sel_tipoEntrega5").prop("checked", true) : $("#sel_tipoEntrega5").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega6 ? $("#sel_tipoEntrega6").prop("checked", true) : $("#sel_tipoEntrega6").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega7 ? $("#sel_tipoEntrega7").prop("checked", true) : $("#sel_tipoEntrega7").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega8 ? $("#sel_tipoEntrega8").prop("checked", true) : $("#sel_tipoEntrega8").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega9 ? $("#sel_tipoEntrega9").prop("checked", true) : $("#sel_tipoEntrega9").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega10 ? $("#sel_tipoEntrega10").prop("checked", true) : $("#sel_tipoEntrega10").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega11 ? $("#sel_tipoEntrega11").prop("checked", true) : $("#sel_tipoEntrega11").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega12 ? $("#sel_tipoEntrega12").prop("checked", true) : $("#sel_tipoEntrega12").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega13 ? $("#sel_tipoEntrega13").prop("checked", true) : $("#sel_tipoEntrega13").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega14 ? $("#sel_tipoEntrega14").prop("checked", true) : $("#sel_tipoEntrega14").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega15 ? $("#sel_tipoEntrega15").prop("checked", true) : $("#sel_tipoEntrega15").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega16 ? $("#sel_tipoEntrega16").prop("checked", true) : $("#sel_tipoEntrega16").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega17 ? $("#sel_tipoEntrega17").prop("checked", true) : $("#sel_tipoEntrega17").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega18 ? $("#sel_tipoEntrega18").prop("checked", true) : $("#sel_tipoEntrega18").prop("checked", false);
					dsSolCopia.values[0].sel_tipoEntrega19 ? $("#sel_tipoEntrega19").prop("checked", true) : $("#sel_tipoEntrega19").prop("checked", false);
					dsSolCopia.values[0].checkbox41opc0 ? $("#checkbox41opc0").prop("checked", true) : $("#checkbox41opc0").prop("checked", false);
					dsSolCopia.values[0].checkbox41opc1 ? $("#checkbox41opc1").prop("checked", true) : $("#checkbox41opc1").prop("checked", false);
					dsSolCopia.values[0].checkbox41opc2 ? $("#checkbox41opc2").prop("checked", true) : $("#checkbox41opc2").prop("checked", false);
					dsSolCopia.values[0].checkbox41opc3 ? $("#checkbox41opc3").prop("checked", true) : $("#checkbox41opc3").prop("checked", false);
					dsSolCopia.values[0].checkbox41opc4 ? $("#checkbox41opc4").prop("checked", true) : $("#optExigeLogReversa").prop("checked", false);
					dsSolCopia.values[0].checkbox41opc5 ? $("#checkbox41opc5").prop("checked", true) : $("#checkbox41opc5").prop("checked", false);

				} else {

					var c1 = DatasetFactory.createConstraint("solicitacao", idSolic, idSolic, ConstraintType.MUST);
					var c2 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
					var dsSolCopia = DatasetFactory.getDataset("ds_form_vendas_mercado_publico", null, [c1, c2], null);

					if (dsSolCopia.values.length > 0) {

						$("#txt_numWinner").val(dsSolCopia.values[0].txt_numWinner);
						$("#TXT_CodCliente").val(dsSolCopia.values[0].TXT_CodCliente);
						$("#TXT_CNPJ").val(dsSolCopia.values[0].TXT_CNPJ);
						$("#TXT_Cliente").val(dsSolCopia.values[0].TXT_Cliente);
						$("#TXT_ContratoAta").val(dsSolCopia.values[0].TXT_ContratoAta);
						$("#TXT_EditEmpenho").val(dsSolCopia.values[0].TXT_EditEmpenho);
						$("#DT_ContratoDe").val(dsSolCopia.values[0].DT_ContratoDe);
						$("#DT_ContratoAte").val(dsSolCopia.values[0].DT_ContratoAte);
						$("#Rd_ZerarSd").val(dsSolCopia.values[0].Rd_ZerarSd);
						$("#CMB_UnidFaturam").val(dsSolCopia.values[0].CMB_UnidFaturam);
						$("#CMB_UnidOrigem").val(dsSolCopia.values[0].CMB_UnidOrigem);

						if (dsSolCopia.values[0].CMB_Produto == "Selecione") {
							$("#CMB_Produto").val("");
						} else {
							$("#CMB_Produto").val(dsSolCopia.values[0].CMB_Produto);
						}

						$("#txt_ProdAmb").val(dsSolCopia.values[0].txt_ProdAmb);
						$("#TXT_CodProd").val(dsSolCopia.values[0].TXT_CodProd);
						$("#qtdeLicitKg").val(dsSolCopia.values[0].qtdeLicitKg);
						$("#qtdeLicitTon").val(dsSolCopia.values[0].qtdeLicitTon);
						$("#qtdeLicitLitros").val(dsSolCopia.values[0].qtdeLicitLitros);
						$("#qtdeLicitBaseSeca").val(dsSolCopia.values[0].qtdeLicitBaseSeca);
						$("#qtdeLicitM3").val(dsSolCopia.values[0].qtdeLicitM3);
						$("#qtdeTotalKg").val(dsSolCopia.values[0].qtdeTotalKg);
						$("#qtdeTotalTon").val(dsSolCopia.values[0].qtdeTotalTon);
						$("#qtdeTotalLitros").val(dsSolCopia.values[0].qtdeTotalLitros);
						$("#qtdeTotalBaseSeca").val(dsSolCopia.values[0].qtdeTotalBaseSeca);
						$("#qtdeTotalM3").val(dsSolCopia.values[0].qtdeTotalM3);
						$("#precoFinalKg").val(dsSolCopia.values[0].precoFinalKg);
						$("#precoFinalTon").val(dsSolCopia.values[0].precoFinalTon);
						$("#precoFinalLitros").val(dsSolCopia.values[0].precoFinalLitros);
						$("#precoFinalBaseSeca").val(dsSolCopia.values[0].precoFinalBaseSeca);
						$("#precoFinalM3").val(dsSolCopia.values[0].precoFinalM3);
						$("#TXT_CondPg").val(dsSolCopia.values[0].TXT_CondPg);
						$("#radio35").val(dsSolCopia.values[0].radio35);
						$("#TXT_PrazoEntreg").val(dsSolCopia.values[0].TXT_PrazoEntreg);
						$("#CMB_TipoFrete").val(dsSolCopia.values[0].CMB_TipoFrete);
						$("#TXT_Valor").val(dsSolCopia.values[0].TXT_Valor);
						$("#PAR_SERED").val(dsSolCopia.values[0].PAR_SERED);
						$("#TXT_HrReb").val(dsSolCopia.values[0].TXT_HrReb);
						$("#Rd_Mangote").val(dsSolCopia.values[0].Rd_Mangote);
						$("#TXT_MangMetros").val(dsSolCopia.values[0].TXT_MangMetros);
						$("#Rd_Bomba").val(dsSolCopia.values[0].Rd_Bomba);
						$("#Rd_Engate").val(dsSolCopia.values[0].Rd_Engate);
						$("#TXT_Polegadas").val(dsSolCopia.values[0].TXT_Polegadas);
						$("#PAR_ObsLogistic").val(dsSolCopia.values[0].PAR_ObsLogistic);
						$("#TXT_EspProd").val(dsSolCopia.values[0].TXT_EspProd);
						$("#TXT_LaudoEsp").val(dsSolCopia.values[0].TXT_LaudoEsp);
						$("#Rd_DemEquip").val(dsSolCopia.values[0].Rd_DemEquip);
						$("#TXT_EspEquip").val(dsSolCopia.values[0].TXT_EspEquip);
						$("#PAR_OBSAREALICT").val(dsSolCopia.values[0].PAR_OBSAREALICT);

						dsSolCopia.values[0].sel_tipoEntrega0 ? $("#sel_tipoEntrega0").prop("checked", true) : $("#sel_tipoEntrega0").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega1 ? $("#sel_tipoEntrega1").prop("checked", true) : $("#sel_tipoEntrega1").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega2 ? $("#sel_tipoEntrega2").prop("checked", true) : $("#sel_tipoEntrega2").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega3 ? $("#sel_tipoEntrega3").prop("checked", true) : $("#sel_tipoEntrega3").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega4 ? $("#sel_tipoEntrega4").prop("checked", true) : $("#sel_tipoEntrega4").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega5 ? $("#sel_tipoEntrega5").prop("checked", true) : $("#sel_tipoEntrega5").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega6 ? $("#sel_tipoEntrega6").prop("checked", true) : $("#sel_tipoEntrega6").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega7 ? $("#sel_tipoEntrega7").prop("checked", true) : $("#sel_tipoEntrega7").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega8 ? $("#sel_tipoEntrega8").prop("checked", true) : $("#sel_tipoEntrega8").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega9 ? $("#sel_tipoEntrega9").prop("checked", true) : $("#sel_tipoEntrega9").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega10 ? $("#sel_tipoEntrega10").prop("checked", true) : $("#sel_tipoEntrega10").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega11 ? $("#sel_tipoEntrega11").prop("checked", true) : $("#sel_tipoEntrega11").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega12 ? $("#sel_tipoEntrega12").prop("checked", true) : $("#sel_tipoEntrega12").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega13 ? $("#sel_tipoEntrega13").prop("checked", true) : $("#sel_tipoEntrega13").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega14 ? $("#sel_tipoEntrega14").prop("checked", true) : $("#sel_tipoEntrega14").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega15 ? $("#sel_tipoEntrega15").prop("checked", true) : $("#sel_tipoEntrega15").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega16 ? $("#sel_tipoEntrega16").prop("checked", true) : $("#sel_tipoEntrega16").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega17 ? $("#sel_tipoEntrega17").prop("checked", true) : $("#sel_tipoEntrega17").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega18 ? $("#sel_tipoEntrega18").prop("checked", true) : $("#sel_tipoEntrega18").prop("checked", false);
						dsSolCopia.values[0].sel_tipoEntrega19 ? $("#sel_tipoEntrega19").prop("checked", true) : $("#sel_tipoEntrega19").prop("checked", false);

						dsSolCopia.values[0].checkbox41opc0 ? $("#checkbox41opc0").prop("checked", true) : $("#checkbox41opc0").prop("checked", false);
						dsSolCopia.values[0].checkbox41opc1 ? $("#checkbox41opc1").prop("checked", true) : $("#checkbox41opc1").prop("checked", false);
						dsSolCopia.values[0].checkbox41opc2 ? $("#checkbox41opc2").prop("checked", true) : $("#checkbox41opc2").prop("checked", false);
						dsSolCopia.values[0].checkbox41opc3 ? $("#checkbox41opc3").prop("checked", true) : $("#checkbox41opc3").prop("checked", false);
						dsSolCopia.values[0].checkbox41opc4 ? $("#checkbox41opc4").prop("checked", true) : $("#optExigeLogReversa").prop("checked", false);
						dsSolCopia.values[0].checkbox41opc5 ? $("#checkbox41opc5").prop("checked", true) : $("#checkbox41opc5").prop("checked", false);

					}

				}

				if (myModal.isOpen()) {
					myModal.remove();
				}

				FLUIGC.toast({
					title: 'Sucesso: ',
					message: 'Dados copiados com sucesso.',
					type: 'success'
				});

				loading.hide();
			});

			loading.hide();
		}
	}

	// CÓDIGO QUE COLOCA OS VALORES NO DATATABLE DO MODAL
	DatasetFactory.getDataset("ds_vendas_mercado_publico_geral", null, null, null, callback);

}

function carregarCalendar() {
	var inicioContrato = FLUIGC.calendar('#dvInicioContrato', {
		pickDate: true,
		pickTime: false,
		showToday: true,
		language: 'pt-br'
	});

	var fimContrato = FLUIGC.calendar('#dvFimContrato', {
		pickDate: true,
		pickTime: false,
		showToday: true,
		language: 'pt-br'
	});
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
		case "21":
			$("#div_enviarAtivPara").show();
			if (FORM_MODE != 'VIEW') {
				setTimeout(() => $("#obs_enviarAtividadePara").focus(), 500);
			}
			break;
		case "53":
			$("#div_enviarAtivParaValida").show();
			if (FORM_MODE != 'VIEW') {
				setTimeout(() => $("#cmb_enviarAtividadeParaValida").focus(), 500);
			}
			break;
	}

}