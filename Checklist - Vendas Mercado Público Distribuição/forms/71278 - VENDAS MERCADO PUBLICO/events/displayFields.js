function displayFields(form, customHTML) {

	var FORM_MODE = form.getFormMode();
	form.setShowDisabledFields(true);

	var atividade = getValue("WKNumState");
	form.setValue("atividade", atividade);


	customHTML.append("<script> var FORM_MODE =" + form.getFormMode() + "</script>");



	if (atividade <= 1) {
		form.setValue("dataSolicitacao", new java.text.SimpleDateFormat("dd/MM/yyyy").format(new java.util.Date()));
	}


	if (form.getValue("") != "") {

	}
	if (form.getValue("") != "") {

	}
}