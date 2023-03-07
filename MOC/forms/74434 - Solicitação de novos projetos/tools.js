 var tools = {
 	adicionaConsultado: async function () {
 		var docId = $("#docId").val();
 		if (docId != "") {
 			var idx = wdkAddChild("tableConsultados");
 			setTimeout(() => {
 				reloadZoomFilterValues("consultado_usuario___" + idx, "tipoEnvolvimento,C,documentId," + docId);
 			}, 300);

 		} else {
 			FLUIGC.toast({
 				title: 'ERRO: ',
 				message: 'É necessário selecionar um evento antes de incluir um consultado',
 				type: 'DANGER'
 			});
 		}
 	},
 	adicionaInformado: async function () {
 		var docId = $("#docId").val();
 		if (docId != "") {
 			var idx = wdkAddChild("tableInformados");
 			setTimeout(() => {
 				reloadZoomFilterValues("informado_usuario___" + idx, "tipoEnvolvimento,C,documentId," + docId);
 			}, 300);

 		} else {
 			FLUIGC.toast({
 				title: 'ERRO: ',
 				message: 'É necessário selecionar um evento antes de incluir um consultado',
 				type: 'DANGER'
 			});
 		}
 	},

 	pareceresResponsavel: async function () {

 		const colleagueId = DatasetFactory.getDataset(
 			"colleague",
 			null,
 			[
 				DatasetFactory.createConstraint("colleaguePK.colleagueId", wkUser, wkUser, ConstraintType.MUST)
 			],
 			null).values[0].colleagueName;

 		var dateApproved = new Date().toLocaleString();

 		var conteudo = `
		<div class="row form-group">
			<div class="col-sm-6">
				  <label>Usuario:</label>
				  <span id="loggedUser">${colleagueId}</span>
			</div>
			<div class="col-sm-6">
				 <span id="dateApproved">${dateApproved}</span>
			</div>
	  	</div>
		<div class="row form-group">
			<div class="col-sm-6">
				<select class="form-control" id="aprovacao" name="aprovacao">
					<option value="" selected></option>
					<option value="Sim">Sim</option>
					<option value="Nao">Não</option>
				</select>
			</div>	
		</div>
 		<div class="row form-group">
			<div class="col-sm-12">
				<textarea class="form-control fs-no-resize" rows="3" id="comment" name="comment"></textarea>
			</div>
		</div>`

 		FLUIGC.modal({
 			title: 'Aprovação',
 			content: conteudo,
 			id: 'validate',
 			size: 'large',
 			actions: [{
 				'label': 'Salvar',
 				'bind': 'data-open-modal',
 				'classType': 'btn-primary',
 				'buttonType': 'submit',
 				'autoClose': true
 			}]

 		}, function (err, data) {

 			var idx;
 			const parecer = document.querySelector("#seqParecer").value;
 			document.querySelectorAll("[name^='_userCod___'][value='" + wkUser + "']").forEach(element => {

 				let line = element.id.replace("_userCod___", "");
 				let control = $("#_controleParecere___" + line).val();
 				let user = $("#_userCod___" + line).val();

 				if (control == parecer && user == wkUser) {
 					$("#_valorAprovacao___" + line).val($("#aprovacao").val());
 					$("#_dataAprovacao___" + line).val($("#dateApproved").text());
 					$("#_comentarios___" + line).val($("#comment").val());

 					idx = line;
 				}

 			});


 			// var idx = document.querySelectorAll("[name^='userCod___'][value='" + wkUser + "']")[0].id.replace("userCod___", "");
 			/* 	idx ? document.querySelectorAll("[name^='_userCod___'][value='" + wkUser + "']") && document.querySelectorAll("[name^='_controleParecere___'][value='" + parecer + "']").id.replace("_userCod___", "") : null; */
 			$("#aprovacao").val(document.querySelector("#valorAprovacao___" + idx + ", #_valorAprovacao___" + idx).value);
 			$("#comment").val(document.querySelector("#comentarios___" + idx + ", #_comentarios___" + idx).value);

 			$("[data-open-modal]").on("click", function () {

 				let controleParecer = document.querySelector("#controleParecere___" + idx).value;
 				let parecer = document.querySelector("#seqParecer").value;

 				if (parecer == controleParecer) {

 					$("#valorAprovacao___" + idx + ",#_valorAprovacao___" + idx).val(document.querySelector("#aprovacao").value);
 					$("#dataAprovacao___" + idx + ", #_dataAprovacao___" + idx).val(document.querySelector("#dateApproved").textContent);
 					$("#comentarios___" + idx + ", #_comentarios___" + idx).val(document.querySelector("#comment").value);

 				}
 			})
 		});
 	},

 	showAprovacao: async function () {

 		WKNumState == 1 || WKNumState == 6 ? document.querySelector("[role='tablist']").children[4].style = "display: block;" : document.querySelector("[role='tablist']").children[4].style = "display: none;"
 	},
 	tableHide: async function () {


 		const parecer = document.querySelector("#seqParecer").value;

 		document.querySelectorAll("[name^='_userCod___'][value='" + wkUser + "']").forEach(element => {

 			if (WKNumState == 6) {

 				let line = element.id.replace("_userCod___", "");
 				let control = $("#_controleParecere___" + line).val();
 				if (control == parecer) element.closest('.divHistory').classList.remove('hide');

 			}

 		});
 		// TABELA APARECE TODOS OS PARECERES DA SEQUEUNCIA
 		document.querySelectorAll("[name^='_userCod___']").forEach(index => {

 			if (WKNumState == 1) {

 				let line = index.id.replace("_userCod___", "");
 				let control = $("#_controleParecere___" + line).val();
 				if (control === parecer) index.closest('.divHistory').classList.remove('hide');

 			}

 		});

 	},
 	showHisotry: async function () {

 		let button = document.querySelector('#btnHistory').textContent.trim();
 		const parecer = document.querySelector("#seqParecer").value;
 		if (button === 'Histórico') {
 			document.querySelectorAll("[name^='_userCod___']").forEach(element => {
 				let line = element.id.replace("_userCod___", "");
 				let control = document.querySelector("#_valorAprovacao___" + line).value;

 				if (control) {
 					element.closest('.divHistory').classList.remove('hide');
 					document.querySelector('#btnHistory').innerHTML = 'Ocultar';
 				}
 			});
 		} else {

 			document.querySelectorAll("[name^='_userCod___']").forEach(element => {

 				let line = element.id.replace("_userCod___", "");
 				let user = document.querySelector("#_userCod___" + line).value;
 				let control = document.querySelector("#_controleParecere___" + line).value;

 				if (control != parecer && user == wkUser || user != wkUser) {
 					element.closest('.divHistory').classList.add('hide');
 					document.querySelector('#btnHistory').innerHTML = 'Histórico'
 				}
 			});

 		}
 	}

 }