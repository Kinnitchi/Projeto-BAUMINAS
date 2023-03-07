function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    var attachments = hAPI.listAttachments();
    var anexoNF = false;

    if (attachments.size() > 0) {
        anexoNF = true;
    }

    if (!anexoNF) {
        throw "<br><br>É necessário anexar a Nota Fiscal!";
    }
}