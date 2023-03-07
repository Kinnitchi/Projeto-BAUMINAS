function enableFields(form){ 
	var atividade = getValue("WKNumState");
	
	if(atividade >= 5){
		form.setEnabled("unidade", false);
		
		var indexes = form.getChildrenIndexes("tblNF");
		for (var j = 0; j < indexes.length; j++) {
	       form.setEnabled("nfCTE___" + indexes[j], false);
	       form.setEnabled("dataEmissao___" + indexes[j] , false);
	       form.setEnabled("dataRecebimento___" + indexes[j] , false);
	       form.setEnabled("natureza___" + indexes[j] , false);
	       form.setEnabled("valor___" + indexes[j] , false);
	    }
		
		
	}
	
	if(atividade == 35){
		
		var indexes2 = form.getChildrenIndexes("tblGestor");
		for (var i = 0; i < indexes2.length; i++) {
	       form.setEnabled("zoom_gestor___" + indexes2[i], false);
	       form.setEnabled("usuarioGestor___" + indexes2[i] , false);
	    }
		
	}
}