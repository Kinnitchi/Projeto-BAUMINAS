function afterStateEntry(sequenceId){
	
	if(sequenceId == 15){ //Notifica Inteligencia de Mercado
		
		hAPI.setCardValue("cmb_enviarAtividadeParaValida","");
		hAPI.setCardValue("obs_enviarAtividadeParaValida","");
		
	}
	else if(sequenceId == 17 || (sequenceId == 39 && hAPI.getCardValue("cmb_enviarAtividadeParaValida") != "1")){
		
		hAPI.setCardValue("cmb_enviarAtividadePara","");
		hAPI.setCardValue("obs_enviarAtividadePara","");
		
	}
}