function validateForm(form){
	var atividade = getValue("WKNumState");
	var proxAtividade = getValue("WKNextState");

	var msg = "";
	
	if(form.getValue("razaoSocial") == ""){
		msg += "É necessário preencher a Razão Social. \n";
	}
	/*
	if(form.getValue("numeroFluig") == ""){
		msg += "É necessário preencher o N° Fluig. \n";
	}
	*/
	if(form.getValue("contratoAta") == ""){
		msg += "É necessário preencher o Contrato / Ata. \n";
	}

	if(atividade == 15){
		if((proxAtividade == 56 || proxAtividade == 59 || proxAtividade == 62) && form.getValue("obs_enviarAtividadePara") == ""){
			msg += "\n\nÉ necessário preencher o campo Observações.";
		}
	}
	else if(atividade == 37){
		if(form.getValue("cmb_enviarAtividadeParaValida") == ""){
			msg += "\n\n É necessário preencher o Enviar Atividade Para.";
		}
		else if(form.getValue("cmb_enviarAtividadeParaValida") != "1"){
			if(form.getValue("obs_enviarAtividadeParaValida") == ""){
				msg += "\n\n É necessário preencher o campo Observações.";
			}
		}
	}
	
	if(msg != ""){
		throw msg;	
	}
}