function displayFields(form, customHTML) {

	var WKNumState = getValue("WKNumState")
	var formMode = form.getFormMode();
	var WKReplacement = getValue('WKReplacement');
	form.setEnhancedSecurityHiddenInputs(true);

	log.info('KINNITCHI --> MOC DISPLAY FIELD  WKNumState:' + WKNumState);
	log.dir(WKNumState);


	customHTML.append("<script>function getFormMode() { return" + formMode + " }</script>");
	customHTML.append("<script>var wkUser ='" + getValue("WKUser") + "';</script>");
	customHTML.append("<script>var WKNumState ='" + getValue("WKNumState") + "';</script>");

	if (formMode == "VIEW") {

		form.setHideDeleteButton(true);
		form.setShowDisabledFields(true);
		form.setVisibleById('divBtnConsultados', false);
		form.setVisibleById('divBtnConsultados', false);
		form.setVisibleById('btnAprovacao', false);
		form.setVisibleById('divHistory', false);
	}

	if (WKNumState > 1) {

		form.setHideDeleteButton(true);

		form.setVisibleById('divBtnConsultados', false);
		form.setVisibleById('divBtnInformado', false);

	}

	if (WKNumState == 0 || WKNumState == 1 || WKNumState == 29) {
		form.setVisibleById('btnAprovacao', false);

	}

	var user = fluigAPI.getUserService().getCurrent().getFullName();
	if (WKNumState == 0 || WKNumState == 1) {
		form.setValue("reqUser", user);
		form.setValue("reqDate", retornaDataAtual());
		form.setVisibleById('divHistory', true);

	}
}

function retornaDataAtual() {
	dataAtual = (new java.text.SimpleDateFormat("dd/MM/yyyy")).format(new Date());

	return dataAtual;
}