function displayFields(form, customHTML) {


	form.setShowDisabledFields(true);

	var solicitacao = getValue("WKNumProces");
	form.setValue("solicitacao", solicitacao);
	var atividade = getValue("WKNumState");
	form.setValue("atividade", atividade);
	var formMode = form.getFormMode();

	if (atividade == 0 || atividade == 4) {
		form.setValue("dataSolicitacao", new java.text.SimpleDateFormat("dd/MM/yyyy").format(new java.util.Date()));
	}

	customHTML.append("<script> function getformMode(){ return '" + formMode + "'; } </script>");

	// Exibir o campo Observações caso ele não esteja vazio
	/*
	if(form.getValue("") != ""){
		
	}
	if(form.getValue("") != ""){

	}
	*/
}