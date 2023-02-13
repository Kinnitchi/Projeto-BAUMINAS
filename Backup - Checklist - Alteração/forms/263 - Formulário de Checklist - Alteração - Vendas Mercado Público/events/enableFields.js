function enableFields(form) {
	var atividade = getValue("WKNumState");

	if (atividade == 37) { // Validar fluxo
		setEnable(form, false);

		form.setEnabled("codigoProduto", true);
		form.setEnabled("obsAtendimentoClientes", true);
		form.setEnabled("cmb_enviarAtividadeParaValida", true);
		form.setEnabled("obs_enviarAtividadeParaValida", true);
	} else if (atividade == 7) {
		setEnable(form, false);

		form.setEnabled("codigoCliente", true);
		form.setEnabled("numPedidoContrato", true);
		form.setEnabled("codigoProduto", true);
		form.setEnabled("obsAtendimentoClientes", true);
	} else if (atividade == 15) { // Notificação Inteligencia de Mercado
		setEnable(form, false);

		form.setEnabled("obs_enviarAtividadePara", true);
	} else if (atividade == 5) {
		form.setEnabled("obs_enviarAtividadeParaValida", false);
		form.setEnabled("cmb_enviarAtividadePara", false);
		form.setEnabled("obs_enviarAtividadePara", false);
	} else {
		form.setEnabled("obs_enviarAtividadeParaValida", false);
		form.setEnabled("cmb_enviarAtividadePara", false);
		form.setEnabled("obs_enviarAtividadePara", false);
	}
}