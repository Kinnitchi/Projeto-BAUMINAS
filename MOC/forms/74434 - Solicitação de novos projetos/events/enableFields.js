function enableFields(form) {
   disableAllFields(form);
   var enableFields = [];
   var WKNumState = getValue("WKNumState");


   if (WKNumState == 0 || WKNumState == 1) {

      enableFields.push("evento", "docId", "requisicao_detalhe", "notifica_autoridades", "reqUser", "reqDate");
      // table
      enableFields.push("autoridade_usuario", "autoridade_codusuario", "consultado_usuario", "consultado_codusuario", "informado_usuario", "informado_codusuario");
   }
   enableFieldsList(form, enableFields);
}



function disableAllFields(form) {
   var fields = form.getCardData();
   var keys = fields.keySet().toArray();
   for (var i in keys) form.setEnabled(keys[i], false);
}

function enableFieldsList(form, fields) {
   for (var i in fields) {
      form.setEnabled(fields[i], true);
   }
}