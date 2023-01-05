function beforeTaskSave(colleagueId, nextSequenceId, userList) {

    var atividade = getValue("WKNumState");

    var anexos = hAPI.listAttachments();
    var temAnexo = false;

    if (atividade == 0 || atividade == 1) {

        if (anexos.size() > 0) {
            temAnexo = true;
        }
        if (!temAnexo) {
            throw "É preciso anexar a Nota Fiscal nessa atividade!";
        }

    }

}