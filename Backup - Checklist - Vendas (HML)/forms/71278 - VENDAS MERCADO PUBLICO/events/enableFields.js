function enableFields(form){ 
	var atividade = getValue("WKNumState");
	
	if(atividade == 53){ 
		setEnable(form,false);
		
		form.setEnabled("TXT_CodCliente", true);
		form.setEnabled("TXT_CodProd", true);
		form.setEnabled("obsAtendimentoClientes", true);
		form.setEnabled("cmb_enviarAtividadeParaValida",true);
		form.setEnabled("obs_enviarAtividadeParaValida",true);
	}
	else if(atividade == 3){
		setEnable(form,false);
		
		form.setEnabled("TXT_PedContr", true);
		form.setEnabled("TXT_CodCliente", true);
		form.setEnabled("TXT_CodProd", true);
		form.setEnabled("obsAtendimentoClientes", true);
	}
	else if(atividade == 21){ // Notificação Inteligencia de Mercado
		setEnable(form,false);
		
		form.setEnabled("cmb_enviarAtividadePara",true);
		form.setEnabled("obs_enviarAtividadePara",true);
	}
	else if(atividade == 14){
		setEnable(form,true);
		form.setEnabled("cmb_enviarAtividadeParaValida",false);
		form.setEnabled("obs_enviarAtividadeParaValida",false);
		form.setEnabled("obs_enviarAtividadePara",false);
	}
	else {
		form.setEnabled("cmb_enviarAtividadeParaValida",false);
		form.setEnabled("obs_enviarAtividadeParaValida",false);
		form.setEnabled("obs_enviarAtividadePara",false);
	}
}