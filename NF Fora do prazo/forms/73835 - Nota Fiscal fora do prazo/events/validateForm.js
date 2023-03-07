function validateForm(form){

    var atividade = getValue("WKNumState");

    /*
    if(atividade == 0 || atividade == 4 || atividade == 5){
        var indexes = form.getChildrenIndexes("tblGestor");
        if(indexes.length == 0){
            throw "É preciso incluir pelo menos um gestor!"
        }
    }
    */

    if(form.getValue("cpDecisaoAprovador") == "REPROVADO" && form.getValue("justificativa") == "") {
        throw "VOCÊ DEVE PREENCHER O CAMPO DE JUSTIFICATIVA DE REPROVAÇÃO DA NOTA."
    }

}