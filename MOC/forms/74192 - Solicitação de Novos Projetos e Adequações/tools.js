var tools = {
	adicionaConsultado: async function () {
		var docId = $("#docId").val();
		if (docId != "") {
			var idx = wdkAddChild("tableConsultados");
			setTimeout(() => {
				reloadZoomFilterValues("consultado_usuario___" + idx, "tipoEnvolvimento,C,documentId," + docId);
			}, 700)

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
			}, 700)

		} else {
			FLUIGC.toast({
				title: 'ERRO: ',
				message: 'É necessário selecionar um evento antes de incluir um consultado',
				type: 'DANGER'
			});
		}
	},
	replicateTable: async function () {

		const consultados = document.querySelectorAll("[name^='consultado_usuario']").length;

		var arr = new Array();

		for (let i = 1; i < consultados; i++) {

			wdkAddChild('tableConsultados');

			let user = document.querySelector("#consultado_usuario___" + i).value;
			let codUser = document.querySelector("#consultado_codusuario___" + i).value;

			document.querySelector('#_userCode___' + i).value = codUser;
			document.querySelector('#_usuario___' + i).value = user;

			if (user != null && codUser != null) {
				arr.push(codUser, user)
			}

		}

		console.log(arr)
	},
	adicionaResponsavel: async function () {

		var conteudo = `
		<div class="row form-group">
			<div class="col-sm-6">
				  <label>Usuario:</label>
				  <span>${parent.WCMAPI.user}</span>
			</div>
			<div class="col-sm-6">
				 <span>${new Date().toLocaleString()}</span>
			</div>
	  	</div>
		<div class="row form-group">
			<div class="col-sm-6">
				<select class="form-control" id="aprovacao" name="aprovacao">
					<option value=""></option>
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
				'autoClose': true
			}]
		}, function (err, data) {

			if (err) {

				console.log("ERRO: ", err);

			} else {

				console.log("DATA: ", data);

			}

		});


	}
}