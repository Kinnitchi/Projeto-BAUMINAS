function onNotify(subject, receivers, template, params) {

	log.info("### -- Número atividade: " + getValue("WKNumState"));
	
	if(!(getValue("WKNumState") == "5")){

		log.info("### -- ENTROU NO IF");
		
		receivers.add("paulo.souza@2beconsulting.com.br");
	
		log.info("### -- Notify: Template")
		log.info("### -- Template: " + template)
		log.info("### -- Assunto: " + subject)
		log.info("### -- receivers: " + receivers)
		log.info("### -- params : " + params)
	
		notifier.notify(getValue("WKUser"), template, params, receivers, "text/html");
		
	}else{
		log.info("### -- ENTROU NO ELSE");
	}
	
}

function getReceivers(estabelecimento) {

	var gestores = getDataset('AMB_COM_gestores_unidades',
		null,
		[
			{ field: 'codUnidade', value: estabelecimento },
		],
		false);
	var destinatarios = [];

	gestores.filter(function (elem) {
		destinatarios.push(elem.emailGestor)
	})

	destinatarios = destinatarios.join(';')
	destinatarios = destinatarios.split(';')

	return destinatarios;
}

function getDataset(name, campos, filtros, internal) {

	var constraints = [];

	if (internal) {
		constraints.push(DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST));
	}

	if (filtros) {
		filtros.forEach(function (filtro) {
			constraints.push(DatasetFactory.createConstraint(filtro.field, filtro.value, filtro.value, filtro.type || ConstraintType.MUST));
		});
	}

	var dataset = DatasetFactory.getDataset(name, null, constraints, null);
	var result = [];

	if (dataset.rowsCount > 0) {
		var _loop = function _loop() {
			var o = {};

			if (!campos) {
				campos = dataset.getColumnsName();
			}

			campos.forEach(function (campo) {
				o[campo] = dataset.getValue(i, campo);
			});

			result.push(o);
		};

		for (var i = 0; i < dataset.rowsCount; i++) {
			_loop();
		}
	}

	return result;
}
