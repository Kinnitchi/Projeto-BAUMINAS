function servicetask106(attempt, message) {
	//Enviar e-mail confirmação de abertura de chamado
	try {
		var tipoTexto = '';
		var server 		= "https://bauminashom.fluig.com:9100/";
    	var empresa 	= getValue("WKCompany");
    	var numeroSAC 	= getValue("WKNumProces");
    	var email 		= hAPI.getCardValue("email");
		
		if(email != ""){
			var consumidor = "";

	    	var msg  = "<div style='text-align: left;'>Prezado(a) " + consumidor + ", <br><br>" +
	    				hAPI.getCardValue("natureza")+" registrado(a) pela nossa Central de Atendimento ao Cliente. O número do seu protocolo é " + numeroSAC + ".<br><br>" +
	    	
						"A seguir mais detalhes de sua ocorrência: <br>" +
						"• Descrição: " + hAPI.getCardValue("descricaoOcorrencia") + " <br>" +
						"• Produto Acabado: " + hAPI.getCardValue("produtoAcabado") + " <br>" +
						"• Unidade Medida: " + hAPI.getCardValue("unidadeMedida") + " <br>" +
						"• Nota Fiscal: " + hAPI.getCardValue("notaFiscal") + " <br>" +
						"• Quantidade: " + hAPI.getCardValue("quantidade") + " <br>" +
						"• Lote: " + hAPI.getCardValue("lote") + " <br>" +
						"• Data de Fabricação: " + hAPI.getCardValue("dataFabricacao") + " <br>" + 
						"• Data de Validade: " + hAPI.getCardValue("dataValidade") + "  <br><br>" +

						"A Bauminas Hidroazul agradece o seu contato e informamos que nossa equipe retornará o mais breve possível. <br><br>" +					
						"Clique no link a seguir para avaliar a sua experiência com a nossa Central de Atendimento: <a href='https://docs.google.com/forms/d/e/1FAIpQLSdY3rF9XoA-BTpGz9SqZJkt3tR0ifmd3yPu8JCzpB_RV6rZ-A/viewform' target='_blank'>Avaliação do Atendimento </a> <br><br>" +					
						"Esta é uma mensagem automática e serve como registro de sua reclamação. Não responda este e-mail.</div>";
						
	    	
			var natureza = hAPI.getCardValue("natureza");
			var categoria = hAPI.getCardValue("categoria");
			
			//Monta mapa com parâmetros do template
	        var parametros = new java.util.HashMap();
	        parametros.put("msg", msg);
	        
	        //pegar imagem do servidor do fluig
	    	parametros.put("SERVER_URL", server);
	        //numero da empresa
	        parametros.put("TENANT_ID", empresa);

	        //Este parâmetro é obrigatório e representa o assunto do e-mail
	        parametros.put("subject", "Fluig - Troca de Notas -  " + hAPI.getCardValue("log_unidadeEntradaNF"));
	        
	        //Monta lista de destinatários
	        var destinatarios = new java.util.ArrayList();
	        destinatarios.add(email);
	        
	        notifier.notify("SAC.Hidroazul", "tpl_mail_custom", parametros, destinatarios, "text/html");
		}
		
	}
	catch (ex) {
		log.error(">>> Erro enviar e-mail abertura chamado: " + ex);
	    throw ex;
	}
}