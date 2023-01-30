function validateForm(form){
	var atividade = getValue("WKNumState");
	var proxAtividade = getValue("WKNextState");
	
	var msg = "";
	
	if (((atividade == 0 || atividade == 1) && proxAtividade != 40) || atividade == 40){
		
		if(form.getValue("TXT_CNPJ") == ""){
			msg += "\nÉ necessário preencher o CNPJ. ";
		}
		
		if(form.getValue("TXT_Cliente") == ""){
			msg += "\nÉ necessário preencher o Cliente. ";
		}

		if(form.getValue("TXT_ContratoAta") == ""){
			msg += "\nÉ necessário preencher o Contrato / Ata. ";
		}
		
		if(form.getValue("TXT_EditEmpenho") == ""){
			msg += "\nÉ necessário preencher o Nº do Edital / Empenho. ";
		}
		
		if(form.getValue("DT_ContratoDe") == ""){
			msg += "\nÉ necessário preencher o Início do Contrato. ";
		}
		
		if(form.getValue("DT_ContratoAte") == ""){
			msg += "\nÉ necessário preencher o Fim do Contrato. ";
		}

		if(form.getValue("Rd_ZerarSd") == ""){
			msg += "\nÉ necessário preencher o Até Zerar Saldo. ";
		}
		
		if(form.getValue("CMB_UnidFaturam") == ""){
			msg += "\nÉ necessário preencher a Unidade de Faturamento. ";
		}
		
		if(form.getValue("CMB_UnidOrigem") == ""){
			msg += "\nÉ necessário preencher a Unidade de Origem. ";
		}
		
		if(form.getValue("TXT_CondPg") == ""){
			msg += "\nÉ necessário preencher a Condição de Pagamento. ";
		}
		
		if(form.getValue("radio35") == ""){
			msg += "\nÉ necessário preencher o Prazo de Entrega. ";
		}
		
		if(form.getValue("CMB_TipoFrete") == ""){
			msg += "\nÉ necessário preencher o Tipo de Frete. ";
		}
		
		if(form.getValue("TXT_Valor") == ""){
			msg += "\nÉ necessário preencher o Valor do Frete (R$/Ton). ";
		}
		
		if(form.getValue("Rd_Mangote") == ""){
			msg += "\nÉ necessário preencher o Mangote. ";
		}
		
		if(form.getValue("Rd_Bomba") == ""){
			msg += "\nÉ necessário preencher a Bomba. ";
		}
		
		if(form.getValue("Rd_Engate") == ""){
			msg += "\nÉ necessário preencher o Engate. ";
		}
		
		if(form.getValue("TXT_EspProd") == ""){
			msg += "\nÉ necessário preencher a Especificação do Produto. ";
		}
		
		if(form.getValue("Rd_DemEquip") == ""){
			msg += "\nÉ necessário preencher a Demanda Equipamento. ";
		}
	}
	else if(atividade == 21){
		
		if((proxAtividade == 66 || proxAtividade == 69 || proxAtividade == 72) && form.getValue("obs_enviarAtividadePara") == ""){
			msg += "\n\nÉ necessário preencher o campo Observações.";
		}
	}
	else if(atividade == 53){
		
		if(form.getValue("cmb_enviarAtividadeParaValida") == ""){

			msg += "\n\nÉ necessário preencher o campo Enviar Atividade Para";

		}else if(form.getValue("cmb_enviarAtividadeParaValida") != "1"){

			if(form.getValue("obs_enviarAtividadeParaValida") == ""){

				msg += "\n\nÉ necessário preencher o campo Observações.";

			}
		}
	}
	else if(atividade == 3){
		if(form.getValue("TXT_PedContr") == ""){
			msg += "\n\nÉ necessário preencher o campo No. do Pedido/ Contrato.";
		}
	}
	
	if(msg != ""){
		throw "\n" + msg;	
	}
}