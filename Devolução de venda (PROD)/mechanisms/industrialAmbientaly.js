function resolve(process, colleague) {

	var userList = new java.util.ArrayList();

	var codigoEstabelecimento = hAPI.getCardValue("codigoEstabelecimento");
	var codigoUnidade = hAPI.getCardValue("codigoUnidade");
	log.info(">>> codigoEstabelecimento: " + codigoEstabelecimento + "\n codigoUnidade: " + codigoUnidade + "\n " + (codigoEstabelecimento || codigoUnidade));
	var codigoConstraint = 0;

	if (codigoEstabelecimento != "" && codigoEstabelecimento != null && codigoEstabelecimento != undefined) {
		codigoConstraint = codigoEstabelecimento;
	} else {
		codigoConstraint = codigoUnidade;
	}

	log.info("---------- Valor de Código Constraint -------- ? igual a: " + codigoConstraint);

	var dataset = DatasetFactory.getDataset(
		"DScadastroUnidades",
		null,
		[
			DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST),
			DatasetFactory.createConstraint("codigo", codigoConstraint, codigoConstraint, ConstraintType.MUST)
		],
		null);

	log.dir(dataset);

	userList.add('Pool:Group:' + dataset.getValue(0, "tipoIndustria"));

	return userList;

}