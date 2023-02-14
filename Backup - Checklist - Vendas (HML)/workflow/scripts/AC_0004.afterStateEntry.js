function afterStateEntry(sequenceId){
	
	if(sequenceId == 21){ //Notifica Inteligencia de Mercado
		
		hAPI.setCardValue("cmb_enviarAtividadeParaValida","");
		hAPI.setCardValue("obs_enviarAtividadeParaValida","");
		
	}
	else if(sequenceId == 23){ //Fim
		
		hAPI.setCardValue("cmb_enviarAtividadePara","");
		hAPI.setCardValue("obs_enviarAtividadePara","");
		
	}
}