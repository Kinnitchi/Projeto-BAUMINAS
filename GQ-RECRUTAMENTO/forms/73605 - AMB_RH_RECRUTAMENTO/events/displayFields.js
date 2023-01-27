function displayFields(form,customHTML){ 
	
	var atividadeAtual = getValue("WKNumState");

	form.setValue("atividade", atividadeAtual);
	
	if (form.getFormMode() == "VIEW" || form.getFormMode() == "MOD") {
		form.setShowDisabledFields(true);
		
	}
	
	if (atividadeAtual == "0" || atividadeAtual == "1") {
		form.setValue("txt_solicitanteNome", fluigAPI.getUserService().getCurrent().getFullName());
		
	}
}