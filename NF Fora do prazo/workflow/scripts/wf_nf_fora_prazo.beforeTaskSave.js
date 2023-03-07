function beforeTaskSave(colleagueId,nextSequenceId,userList){
	var anexos   = hAPI.listAttachments();
    var temAnexo = false;

    if (anexos.size() > 0) {
        temAnexo = true;
    }

    if (!temAnexo) {
        throw "É preciso anexar a NF/CTE";
    }
    
    
    /*
    var indexes = hAPI.getChildrenIndexes("tblGestor");
    var temGestor = false;
    
    if(indexes.length > 0){
        temGestor = true;
    }
    
    if(!temGestor){
    	throw "É preciso incluir pelo menos um gestor!"
    }
    */
    
    
}