function servicetask37(attempt, message) {
	try {
		var tipoTexto = '';
		var server = "https://bauminashom.fluig.com:9100/";
    	var empresa = getValue("WKCompany");
    	
    	var msg  = "<div style='text-align: justify; font-weight: bold;'>" +
    					"Foi solicitada a entrada de NF após a data de corte para a Unidade de que você faz parte. <br><br>" + 
    					"Lembrando que devemos considerar estas solicitações como exceções ou para matérias primas que chegaram na Unidade após a data de corte.<br><br>" + 
    					"Agradecemos o apoio.<br><br>" + 
    				"</div>"
    				
		//Monta mapa com parâmetros do template
        var parametros = new java.util.HashMap();
        parametros.put("msg", msg);
        
        //pegar imagem do servidor do fluig
    	parametros.put("SERVER_URL", server);
        //numero da empresa
        parametros.put("TENANT_ID", empresa);

        //Este parâmetro é obrigatório e representa o assunto do e-mail
        parametros.put("subject", "Processo NF Após Data de Corte - Atualização");
        
        //Monta lista de destinatários
        var destinatarios = new java.util.ArrayList();

		var indexes = hAPI.getChildrenIndexes("tblGestor");
		for(var i = 0; i < indexes.length; i++){
			var dest = hAPI.getCardValue("usuarioGestor___" + indexes[i]);	
			destinatarios.add(dest);
		}
        notifier.notify("admin_fluig", "tpl_mail_custom", parametros, destinatarios, "text/html");
	}
	catch (ex) {
		log.error(">>> Erro enviar e-mail parecer final: " + ex);
	    throw ex;
	}
}