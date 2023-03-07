function defineStructure() {
	addColumn("colleagueId");
	addColumn("colleagueName");
	addColumn("tipoEnvolvimento");
	addColumn("evento");
	addColumn("documentId");

	setKey(["colleagueId", "tipoEnvolvimento", "documentId"]);
	addIndex(["colleagueId", "tipoEnvolvimento"]);
}

function onSync(lastSyncDate) {
	var ds = DatasetBuilder.newDataset();

	var ds1 = getDatasetPreCadastro("DSCadastrodaMatrizRACI");
	log.info("ds1");
	log.dir(ds1);

	ds1.forEach(function (el) {
		ds.addOrUpdateRow([
			el.colleagueId,
			el.colleagueName,
			el.tipoEnvolvimento,
			el.evento,
			el.documentId.toString()
		]);
	})
	log.info("DATASET KINNITCHI")
	log.dir(ds)
	var ds2 = DatasetFactory.getDataset("dsMOC_MatrizRACI", null, null, null);
	log.info("ds2");
	log.dir(ds2);
	var deletar = normalizarDeletados(ds1, ds2);
	log.info("deletar");
	log.dir(deletar);

	deletar.forEach(function (el) {
		ds.deleteRow([
			el.colleagueId,
			el.colleagueName,
			el.tipoEnvolvimento,
			el.evento,
			el.documentId.toString()
		]);
	})

	return ds;
}

function datasetToJson(dataset) {
	var retorno = [];
	if (dataset != null) {
		for (var i = 0; i < dataset.rowsCount; i++) {
			var obj = {};
			for (var c = 0; c < dataset.columnsName.length; c++) {
				obj[dataset.columnsName[c].toString()] = (dataset.getValue(i, dataset.columnsName[c]) != null ? dataset.getValue(i, dataset.columnsName[c]) : "").toString();
			}
			retorno.push(obj);
		}
	}

	log.info('KINNITCHI -->  datasetToJson:');
	log.dir(retorno);

	return retorno;
}

function getDatasetPreCadastro(datasetName) {
	var retorno = [];
	log.info('KINNITCHI --> DATASET :');


	var dsPai = DatasetFactory.getDataset(
		datasetName,
		null,
		[
			DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST)
		],
		null
	)
	log.dir(dsPai);
	log.info('KINNITCHI --> DSMOCTables :');

	for (var i = 0; i < dsPai.rowsCount; i++) {
		var dsResponsaveis = DatasetFactory.getDataset(
			datasetName,
			null,
			[
				DatasetFactory.createConstraint("metadata#id", dsPai.getValue(i, "metadata#id"), dsPai.getValue(i, "metadata#id"), ConstraintType.MUST),
				DatasetFactory.createConstraint("metadata#version", dsPai.getValue(i, "metadata#version"), dsPai.getValue(i, "metadata#version"), ConstraintType.MUST),
				DatasetFactory.createConstraint("tablename", "tableResponsaveis", "tableResponsaveis", ConstraintType.MUST)
			],
			null
		)
		for (var j = 0; j < dsResponsaveis.rowsCount; j++) {

			retorno.push({
				colleagueId: dsResponsaveis.getValue(j, "dado_responsavel"),
				colleagueName: dsResponsaveis.getValue(j, "responsavel_usuario"),
				tipoEnvolvimento: "R",
				evento: dsPai.getValue(i, "evento"),
				documentId: dsPai.getValue(i, "documentId")
			})

		}
		log.dir(dsResponsaveis);


		var dsAutoridades = DatasetFactory.getDataset(
			datasetName,
			null,
			[
				DatasetFactory.createConstraint("metadata#id", dsPai.getValue(i, "metadata#id"), dsPai.getValue(i, "metadata#id"), ConstraintType.MUST),
				DatasetFactory.createConstraint("metadata#version", dsPai.getValue(i, "metadata#version"), dsPai.getValue(i, "metadata#version"), ConstraintType.MUST),
				DatasetFactory.createConstraint("tablename", "tableAutoridades", "tableAutoridades", ConstraintType.MUST)
			],
			null
		)

		for (var j = 0; j < dsAutoridades.rowsCount; j++) {
			var obj = {};

			retorno.push({
				colleagueId: dsAutoridades.getValue(j, "dado_autoridade"),
				colleagueName: dsAutoridades.getValue(j, "autoridade_usuario"),
				tipoEnvolvimento: "A",
				evento: dsPai.getValue(i, "evento"),
				documentId: dsPai.getValue(i, "documentId")
			})

		}


		log.info('KINNITCHI --> CONSULTADOS :');

		var dsConsultados = DatasetFactory.getDataset(
			datasetName,
			null,
			[
				DatasetFactory.createConstraint("metadata#id", dsPai.getValue(i, "metadata#id"), dsPai.getValue(i, "metadata#id"), ConstraintType.MUST),
				DatasetFactory.createConstraint("metadata#version", dsPai.getValue(i, "metadata#version"), dsPai.getValue(i, "metadata#version"), ConstraintType.MUST),
				DatasetFactory.createConstraint("tablename", "tableConsultados", "tableConsultados", ConstraintType.MUST)
			],
			null
		)

		for (var j = 0; j < dsConsultados.rowsCount; j++) {
			retorno.push({
				colleagueId: dsConsultados.getValue(j, "dado_consultado"),
				colleagueName: dsConsultados.getValue(j, "consultado_usuario"),
				tipoEnvolvimento: "C",
				evento: dsPai.getValue(i, "evento"),
				documentId: dsPai.getValue(i, "documentId")
			})
		}
		log.dir(dsConsultados);

		log.info('KINNITCHI --> INFORMADOS :');

		var dsInformados = DatasetFactory.getDataset(
			datasetName,
			null,
			[
				DatasetFactory.createConstraint("metadata#id", dsPai.getValue(i, "metadata#id"), dsPai.getValue(i, "metadata#id"), ConstraintType.MUST),
				DatasetFactory.createConstraint("metadata#version", dsPai.getValue(i, "metadata#version"), dsPai.getValue(i, "metadata#version"), ConstraintType.MUST),
				DatasetFactory.createConstraint("tablename", "tableInformados", "tableInformados", ConstraintType.MUST)
			],
			null
		)

		for (var j = 0; j < dsInformados.rowsCount; j++) {
			var obj = {};

			retorno.push({
				colleagueId: dsInformados.getValue(j, "dado_informado"),
				colleagueName: dsInformados.getValue(j, "informado_usuario"),
				tipoEnvolvimento: "I",
				evento: dsPai.getValue(i, "evento"),
				documentId: dsPai.getValue(i, "documentId")
			})

		}
		log.dir(dsInformados);

	}

	return retorno;
}

function normalizarDeletados(ds1, ds2) {
	var retorno = [];
	log.info('KINNITCHI -->  normalizarDeletados:');
	log.dir(ds1);
	log.dir(ds2);

	datasetToJson(ds2).forEach(function (el) {
		if (ds1.filter(function (it) {
				return it.colleagueId == el.colleagueId && it.tipoEnvolvimento == el.tipoEnvolvimento && it.evento == el.evento
			}).length < 1) {
			retorno.push({
				colleagueId: el.colleagueId,
				colleagueName: el.colleagueName,
				tipoEnvolvimento: el.tipoEnvolvimento,
				evento: el.evento,
				documentId: el.documentId
			})
		}
	})
	log.dir(retorno);
	return retorno;
}