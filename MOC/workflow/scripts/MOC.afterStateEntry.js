function afterStateEntry(sequenceId) {
   log.info('KINNITCHI --> AFTER STATE ENTRY MOC: ' + sequenceId);

   if (sequenceId == 6) {

      var seqParecer = hAPI.getCardValue('seqParecer');

      if (seqParecer == "") {

         seqParecer = 1;
         hAPI.setCardValue('seqParecer', seqParecer);

      } else {

         seqParecer = parseInt(seqParecer) + 1;
         hAPI.setCardValue('seqParecer', seqParecer);


      }

      var table = hAPI.getChildrenIndexes('tableConsultados');

      for (var i = 0; i < table.length; i++) {

         var childrens = new java.util.HashMap();
         var index = table[i];
         var user = hAPI.getCardValue('consultado_usuario___' + index);
         var matricula = hAPI.getCardValue('consultado_codusuario___' + index);

         childrens.put('usuario', user.toString());
         childrens.put('userCod', matricula.toString());
         childrens.put('controleParecere', seqParecer.toString());

         hAPI.addCardChild("tableAprovacoes", childrens);
      }

   }
}