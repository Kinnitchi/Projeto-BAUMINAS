var isButtonClickedSolicitante = false //Variável que controla a inserção de apenas um registro por etapa da solicitação 
var isButtonClickedArea = false //Variável que controla a inserção de apenas um registro por etapa da solicitação

$(function () {
	carregarCalendar();
	carregarDivsRetorno();

	//window.parent.$("ul li a[data-save]").hide();
	historyProcess($('#textbox40').val());

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
								produtoCopia: record.produto,
								tipoCopia: record.tipo
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
						}, {
							'title': 'Tipo',
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
										/* ||
										el.clienteCopia.toUpperCase().indexOf(res.toUpperCase()) >= 0 ||
										el.contratoCopia.toUpperCase().indexOf(res.toUpperCase()) >= 0 ||
										el.cnpjCopia.toUpperCase().indexOf(res.toUpperCase()) >= 0 ||
										el.produtoCopia.toUpperCase().indexOf(res.toUpperCase()) >= 0 ||
										);*/
										el.tipoCopia.toUpperCase().indexOf(res.toUpperCase()) >= 0)
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
				var tipo = "";

				$("input[id^='ckbSelecionar']").each(function (i, el) {
					if ($(this).is(':checked')) {
						idSolic = $(this).attr('id').split('_')[1];
						tipo = $(this).closest('tr').find('td:last-child').text().trim();
					}
				});

				console.log("idSolic: " + idSolic);
				console.log("tipo: " + tipo);

				if (tipo == "OLD_VENDAS") {

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

						FLUIGC.toast({
							title: 'Atenção',
							message: 'Não foi possível carregar os dados da solicitação.',
							type: 'warning'
						});

					}


				} else if (tipo == "NEW_VENDAS") {

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

					} else {

						FLUIGC.toast({
							title: 'Atenção',
							message: 'Não foi possível carregar as informações da solicitação!',
							type: 'warning'
						});

					}

				} else {

					var dsAlteracao = DatasetFactory.getDataset(
						"ds_form_vendas_mercado_publico",
						null,
						[
							DatasetFactory.createConstraint("solicitacao", idSolic, idSolic, ConstraintType.MUST),
							DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST)
						],
						null);


					const values = dsAlteracao.values[0];

					if (dsAlteracao.values.length > 0) {

						if (values.oldFluig == null || values.oldFluig == undefined || values.oldFluig == "") {
							fluig = values.numeroFluig;
							console.log("NUMERO FLUIG: " + values.numeroFluig + " - FLUIG: " + fluig + " - OLD FLUIG: " + values.oldFluig);
						} else {
							fluig = values.oldFluig;
							console.log("OLDFLUIG: " + values.oldFluig + " - NUMEROFLUIG: " + values.numeroFluig + " - FLUIG: " + fluig);
						}

						values.codigoCliente ? $("#TXT_CodigoCliente").val(values.codigoCliente) : $("#TXT_CodigoCliente").val("");
						values.cnpj ? $("#TXT_CNPJ").val(values.cnpj) : $("#TXT_CNPJ").val("");
						values.razaoSocial ? $("#TXT_Cliente").val(values.razaoSocial) : $("#TXT_Cliente").val("");
						values.contratoAta ? $("#TXT_ContratoAta").val(values.contratoAta) : $("#TXT_ContratoAta").val("");
						values.numEditEmp ? $("#TXT_NumEditEmp").val(values.numEditEmp) : $("#TXT_NumEditEmp").val("");
						values.numPedidoContrato ? $("#TXT_PedContr").val(values.numPedidoContrato) : $("#TXT_PedContr").val("");
						values.ateZerarSaldo ? $("#Rd_ZerarSd").val(values.ateZerarSaldo) : $("#Rd_ZerarSd").val("");
						values.vigenciaContratoIni ? $("#DT_ContratoDe").val(values.vigenciaContratoIni) : $("#DT_ContratoDe").val("");
						values.vigenciaContratoFim ? $("#DT_ContratoAte").val(values.vigenciaContratoFim) : $("#DT_ContratoAte").val("");
						values.unidadeFaturamento ? $("#CMB_UnidFaturam").val(values.unidadeFaturamento) : $("#CMB_UnidFaturam").val("");
						values.unidadeOrigem ? $("#CMB_UnidOrigem").val(values.unidadeOrigem) : $("#CMB_UnidOrigem").val("");
						values.produtoBauminas ? $("#CMB_Produto").val(values.produtoBauminas) : $("#CMB_Produto").val("");
						values.produtoBauminas ? $("#CMB_Produto").val(values.produtoBauminas) : $("#CMB_Produto").val("");
						values.produtoAmbientaly ? $("#txt_ProdAmb").val(values.produtoAmbientaly) : $("#txt_ProdAmb").val("");
						values.codigoProduto ? $("#TXT_CodProd").val(values.codigoProduto) : $("#TXT_CodProd").val("");
						values.qtdeLicitKg ? $("#qtdeLicitKg").val(values.qtdeLicitKg) : $("#qtdeLicitKg").val("");
						values.qtdeLicitTon ? $("#qtdeLicitTon").val(values.qtdeLicitTon) : $("#qtdeLicitTon").val("");
						values.qtdeLicitLitros ? $("#qtdeLicitLitros").val(values.qtdeLicitLitros) : $("#qtdeLicitLitros").val("");
						values.qtdeLicitBaseSeca ? $("#qtdeLicitBaseSeca").val(values.qtdeLicitBaseSeca) : $("#qtdeLicitBaseSeca").val("");
						values.qtdeLicitM3 ? $("#qtdeLicitM3").val(values.qtdeLicitM3) : $("#qtdeLicitM3").val("");
						values.qtdeTotalKg ? $("#qtdeTotalKg").val(values.qtdeTotalKg) : $("#qtdeTotalKg").val("");
						values.qtdeTotalTon ? $("#qtdeTotalTon").val(values.qtdeTotalTon) : $("#qtdeTotalTon").val("");
						values.qtdeTotalLitros ? $("#qtdeTotalLitros").val(values.qtdeTotalLitros) : $("#qtdeTotalLitros").val("");
						values.qtdeTotalBaseSeca ? $("#qtdeTotalBaseSeca").val(values.qtdeTotalBaseSeca) : $("#qtdeTotalBaseSeca").val("");
						values.qtdeTotalM3 ? $("#qtdeTotalM3").val(values.qtdeTotalM3) : $("#qtdeTotalM3").val("");
						values.qtdeFinalKg ? $("#precoFinalKg").val(values.precoFinalKg) : $("#precoFinalKg").val("");
						values.qtdeFinalTon ? $("#precoFinalTon").val(values.precoFinalTon) : $("#precoFinalTon").val("");
						values.qtdeFinalLitros ? $("#precoFinalLitros").val(values.precoFinalLitros) : $("#precoFinalLitros").val("");
						values.precoFinalBaseSeca ? $("#precoFinalBaseSeca").val(values.precoFinalBaseSeca) : $("#precoFinalBaseSeca").val("");
						values.precoFinalM3 ? $("#precoFinalM3").val(values.precoFinalM3) : $("#precoFinalM3").val("");
						values.condicaoPagamento ? $("#TXT_CondPg").val(values.condicaoPagamento) : $("#TXT_CondPg").val("");
						values.prazoEntrega ? $("#radio35").val(values.prazoEntrega) : $("#radio35").val("");
						values.especificarDias ? $("#TXT_PrazoEntreg").val(values.prazoEntrega) : $("#TXT_PrazoEntreg").val("");
						values.tipoFrete ? $("#CMB_TipoFrete").val(values.tipoFrete) : $("#CMB_TipoFrete").val("");
						values.valorFrete ? $("#TXT_Valor").val(values.valorFrete) : $("#TXT_Valor").val("");
						values.seRedespacho ? $("#PAR_SERED").val(values.seRedespacho) : $("#PAR_SERED").val("");
						values.tipoEntrega1 ? $("#sel_tipoEntrega0").prop("checked", true) : $("#sel_tipoEntrega0").prop("checked", false);
						values.tipoEntrega2 ? $("#sel_tipoEntrega1").prop("checked", true) : $("#sel_tipoEntrega1").prop("checked", false);
						values.tipoEntrega3 ? $("#sel_tipoEntrega2").prop("checked", true) : $("#sel_tipoEntrega2").prop("checked", false);
						values.tipoEntrega4 ? $("#sel_tipoEntrega3").prop("checked", true) : $("#sel_tipoEntrega3").prop("checked", false);
						values.tipoEntrega5 ? $("#sel_tipoEntrega4").prop("checked", true) : $("#sel_tipoEntrega4").prop("checked", false);
						values.tipoEntrega6 ? $("#sel_tipoEntrega5").prop("checked", true) : $("#sel_tipoEntrega5").prop("checked", false);
						values.tipoEntrega7 ? $("#sel_tipoEntrega6").prop("checked", true) : $("#sel_tipoEntrega6").prop("checked", false);
						values.tipoEntrega8 ? $("#sel_tipoEntrega7").prop("checked", true) : $("#sel_tipoEntrega7").prop("checked", false);
						values.tipoEntrega9 ? $("#sel_tipoEntrega8").prop("checked", true) : $("#sel_tipoEntrega8").prop("checked", false);
						values.tipoEntrega10 ? $("#sel_tipoEntrega9").prop("checked", true) : $("#sel_tipoEntrega9").prop("checked", false);
						values.tipoEntrega11 ? $("#sel_tipoEntrega10").prop("checked", true) : $("#sel_tipoEntrega10").prop("checked", false);
						values.tipoEntrega12 ? $("#sel_tipoEntrega11").prop("checked", true) : $("#sel_tipoEntrega11").prop("checked", false);
						values.tipoEntrega13 ? $("#sel_tipoEntrega12").prop("checked", true) : $("#sel_tipoEntrega12").prop("checked", false);
						values.tipoEntrega14 ? $("#sel_tipoEntrega13").prop("checked", true) : $("#sel_tipoEntrega13").prop("checked", false);
						values.tipoEntrega15 ? $("#sel_tipoEntrega14").prop("checked", true) : $("#sel_tipoEntrega14").prop("checked", false);
						values.tipoEntrega16 ? $("#sel_tipoEntrega15").prop("checked", true) : $("#sel_tipoEntrega15").prop("checked", false);
						values.tipoEntrega17 ? $("#sel_tipoEntrega16").prop("checked", true) : $("#sel_tipoEntrega16").prop("checked", false);
						values.tipoEntrega18 ? $("#sel_tipoEntrega17").prop("checked", true) : $("#sel_tipoEntrega17").prop("checked", false);
						values.tipoEntrega19 ? $("#sel_tipoEntrega18").prop("checked", true) : $("#sel_tipoEntrega18").prop("checked", false);
						values.tipoEntrega20 ? $("#sel_tipoEntrega19").prop("checked", true) : $("#sel_tipoEntrega19").prop("checked", false);
						values.horarioRecebimento ? $("#TXT_HrReb").val(values.horarioRecebimento) : $("#TXT_HrReb").val("");
						values.optPaletizado ? $("#checkbox41opc0").prop("checked", true) : $("#checkbox41opc0").prop("checked", false);
						values.optFilmado ? $("#checkbox41opc1").prop("checked", true) : $("#checkbox41opc1").prop("checked", false);
						values.optCargaBatida ? $("#checkbox41opc2").prop("checked", true) : $("#checkbox41opc2").prop("checked", false);
						values.optDemandaAjudante ? $("#checkbox41opc3").prop("checked", true) : $("#checkbox41opc3").prop("checked", false);
						values.optExigeLogReversa ? $("#checkbox41opc4").prop("checked", true) : $("#checkbox41opc4").prop("checked", false);
						values.optDemandaContratEmpilh ? $("#checkbox41opc5").prop("checked", true) : $("#checkbox41opc5").prop("checked", false);
						values.mangote ? $("#Rd_Mangote").val(values.mangote) : $("#Rd_Mangote").val("");
						values.tamanho ? $("#TXT_MangMetros").val(values.tamanho) : $("#TXT_MangMetros").val("");
						values.bomba ? $("#Rd_Bomba").val(values.bomba) : $("#Rd_Bomba").val("");
						values.engate ? $("#Rd_Engate").val(values.engate) : $("#Rd_Engate").val("");
						values.especPolegadas ? $("#TXT_Polegadas").val(values.especPolegadas) : $("#TXT_Polegadas").val("");
						values.obsParaLogistica ? $("#PAR_ObsLogistic").val(values.obsParaLogistica) : $("#PAR_ObsLogistic").val("");
						values.especificacaoProduto ? $("#TXT_EspProd").val(values.especificacaoProduto) : $("#TXT_EspProd").val("");
						values.envioLaudosEspecificos ? $("#TXT_LaudoEsp").val(values.envioLaudosEspecificos) : $("#TXT_LaudoEsp").val("");
						values.demandaEquip ? $("#Rd_DemEquip").val(values.demandaEquip) : $("#Rd_DemEquip").val("");
						values.especificarEquip ? $("#TXT_EspEquip").val(values.especificarEquip) : $("#TXT_EspEquip").val("");
						values.obsLicitacoes ? $("#PAR_OBSAREALICT").val(values.obsLicitacoes) : $("#PAR_OBSAREALICT").val("");
						values.obsAtendimentoClientes ? $("#obsAtendimentoClientes").val(values.obsAtendimentoClientes) : $("#obsAtendimentoClientes").val("");

						historyProcess(fluig);


					} else {

						FLUIGC.toast({
							title: 'Atenção',
							message: 'Não foi possível carregar as informações da solicitação!',
							type: 'warning'
						});

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


const historyProcess = (processId) => {

	var dataset = new Array();
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

	for (let i = 0; i < alteracaoNumFluig.values.length; i++) dataset.push(alteracaoNumFluig.values[i]);

	for (let i = 0; i < alteracaoOldFluig.values.length; i++) {
		if (dataset[i].solicitacao.indexOf(alteracaoOldFluig.values[i].solicitacao) == -1) {
			dataset.push(alteracaoOldFluig.values[i]);
		}
	}
	let text = "";

	console.log('ARRAY COM OS DADOS', dataset);



	if (dataset.length > 0) {

		for (var i = 0; i < dataset.length; i++) {


			var co1 = DatasetFactory.createConstraint("processId", "AC_0008", "AC_0008", ConstraintType.MUST);
			var co2 = DatasetFactory.createConstraint("cardDocumentId", dataset[i]["metadata#id"], dataset[i]["metadata#id"], ConstraintType.MUST);
			var processInstanceId = DatasetFactory.getDataset("workflowProcess", ["workflowProcessPK.processInstanceId", "cardDocumentId"], [co1, co2], null);

			var numprocessInstanceId = processInstanceId.values[0]["workflowProcessPK.processInstanceId"];
			var dataSolic = dataset[i]["dataSolicitacao"];

			console.log(numprocessInstanceId, " - ", dataSolic);

			var link = parent.WCMAPI.tenantURL + '/' + parent.WCMAPI.pageCode + '?app_ecm_workflowview_detailsProcessInstanceID=' + numprocessInstanceId;
			var href = '<a target="_blank" href="' + link + '">Solicitação <b>' + numprocessInstanceId + '</b>' + ' feita em ' + dataSolic + '</a>';

			text += '<ul class="fs-no-margin">';
			text += '	<li>' + href + '</li>';
			text += '</ul>';


			// if (FORM_MODE == "VIEW") {

			// 	text += '<ul class="fs-no-margin">';
			// 	text += '<li>' + href + '</li>'
			// 	text += '</ul>';

			// }

		}

	} else {
		text += "<ul>";
		text += "<li><b>Não há histórico de solicitações</b></li>";
		text += "</ul>";
	}

	$("#historyContent").html(text);

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