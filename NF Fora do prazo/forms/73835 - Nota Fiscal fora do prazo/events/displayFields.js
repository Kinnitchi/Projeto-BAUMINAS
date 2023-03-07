function displayFields(form,customHTML){
	var atividade = getValue("WKNumState");
	form.setValue("atividade", atividade);	
	
	form.setShowDisabledFields(true);
	
	if(atividade < 5){
		form.setValue("solicitante", fluigAPI.getUserService().getCurrent().getFullName());
		form.setValue("dataInclusao", new java.text.SimpleDateFormat("dd/MM/yyyy").format(new java.util.Date()));
	}else{
		form.setHideDeleteButton(true);
	}
	
	customHTML.append("<script>var atividade="+atividade+";</script>")
}