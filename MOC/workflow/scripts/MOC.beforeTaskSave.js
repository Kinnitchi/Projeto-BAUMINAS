function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	if(getValue("WKNumState") == 6){
		var comment = getValue("WKUserComment");
		
		if(comment == ""){
			throw "É necessário inserir um comentário antes de prosseguir!"
		}
	}
}