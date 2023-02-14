function displayFields(form, customHTML) {


	form.setShowDisabledFields(true);

	var atividade = getValue("WKNumState");
	form.setValue("atividade", atividade);
	var formMode = form.getFormMode();

	if (atividade == 0 || atividade == 4) {
		form.setValue("dataSolicitacao", new java.text.SimpleDateFormat("dd/MM/yyyy").format(new java.util.Date()));
	}

	customHTML.append("<script> function getformMode(){ return '" + formMode + "'; } </script>");
	customHTML.append("<script> var atv = " + atividade + "  </script>");
}