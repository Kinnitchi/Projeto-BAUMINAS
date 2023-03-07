function displayFields(form, customHTML) {

	var activity = parseInt(getValue("WKNumState"));

	if (activity == 1 || activity == 0) {
		form.setValue("nomeSolicitante", fluigAPI.getUserService().getCurrent().getFullName());
		form.setValue("dataSolicitante", getActualDate());
	}


	form.setVisibleById("div_setor", false);

	form.setVisibleById("div_dadosRNC", false);

	form.setVisibleById("div_cfop", false);
	form.setVisibleById("div_codigoItem", false);

	form.setVisibleById("div_dadosTransporte", false);

	form.setVisibleById("divAbaIndustrial", false);
	form.setVisibleById("divAbaCustos1", false);
	form.setVisibleById("divAbaLogistica", false);
	form.setVisibleById("divAbaFiscal", false);
	form.setVisibleById("divAbaFaturamento", false);
	form.setVisibleById("divAbaFinanceiro", false);
	form.setVisibleById("divAbaCustos", false);

	if (form.getValue("tipoSolicitacao") == "1") {
		form.setVisibleById("divAbaCustos1", true);
		form.setVisibleById("divAbaIndustrial", true);
		form.setVisibleById("divAbaLogistica", true);
		form.setVisibleById("divAbaFiscal", true);
		form.setVisibleById("divAbaFaturamento", true);
		form.setVisibleById("divAbaFinanceiro", true);
		form.setVisibleById("divAbaCustos", true);
	} else if (form.getValue("tipoSolicitacao") == "2") {
		form.setVisibleById("divAbaCustos1", true);
		form.setVisibleById("divAbaIndustrial", true);
		form.setVisibleById("divAbaLogistica", true);
		form.setVisibleById("divAbaFaturamento", true);
		form.setVisibleById("divAbaFinanceiro", true);
		form.setVisibleById("divAbaCustos", true);
	}

}

function getActualDate() {
	var dt = new Date();
	return padLeft(dt.getDate().toString(), "0", 2) + "/" + padLeft((dt.getMonth() + 1).toString(), "0", 2) + "/" + dt.getFullYear();
}

function padLeft(valor, incrementa, casas) {
	var newValue = incrementa + valor;
	return newValue.substring(newValue.length - casas);
}