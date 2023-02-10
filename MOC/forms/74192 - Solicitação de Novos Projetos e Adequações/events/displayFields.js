function displayFields(form, customHTML) {

	var WKNumState = getValue("WKNumState");
	var formMode = form.getFormMode();


	customHTML.append("<script>function getFormMode() { return" + formMode + " }</script>");

	if (formMode == "VIEW") {

		form.setVisibleById('divBtnConsultados', false);
		form.setVisibleById('divBtnInformado', false);
	}

	if (WKNumState == 0 || WKNumState == 1) {

		form.setValue("requisicao_usuario", tools.getUser().name);
		form.setValue("requisicao_data", tools.formatDate(new Date()).date);

	} else if (WKNumState == 6) {

	}
}