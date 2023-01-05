function afterTaskSave(colleagueId, nextSequenceId, userList) {

   log.info("------------------------------------------------------------");
   log.info(
      "*** EXECUTANDO SERVIÇO DE ENVIO DE E-MAIL"
   );
   log.info("------------------------------------------------------------");
   var SOLICITACAO = getValue("WKNumProces");
   var template = 'Unidade Destino: ${UNIDADE_DESTINO}<br>\
                      Nº Carga de Transferência: ${CARGA_TRANSFERENCIA}<br>\
                      Nº Pedido de Transferência: ${PEDIDO_TRANSFERENCIA}<br>'


   var URLSOLIC = "https://bauminashom.fluig.com:9100/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + SOLICITACAO + ''


   //Monta mapa com parâmetros do template
   var parametros = new java.util.HashMap();
   parametros.put("LINK_SOLIC", URLSOLIC);
   parametros.put("NUM_SOLIC", SOLICITACAO);
   parametros.put("DATA_ABERTURA", hAPI.getCardValue("log_data"));
   parametros.put("UNI_ENTRADA_NF", hAPI.getCardValue("log_unidadeEntradaNF"));
   parametros.put("FORNECEDOR", hAPI.getCardValue("log_fornecedor"));
   parametros.put("PRODUTO", hAPI.getCardValue("log_produto"));
   parametros.put("TRANSPORTADOR", hAPI.getCardValue("log_transportador"));
   parametros.put("PLACA", hAPI.getCardValue("log_placa"));
   parametros.put("NF_COMPRA", getValue("log_numNFcompra"));
   parametros.put("PESO", hAPI.getCardValue("log_peso"));
   parametros.put("CLIENTE", hAPI.getCardValue("log_cliente"));
   parametros.put("CARGA_VENDA", hAPI.getCardValue("log_numCargaVenda"));
   parametros.put("PEDIDO_VENDA", hAPI.getCardValue("log_numPedidoVenda"));
   parametros.put("DT_ENTREGA", hAPI.getCardValue("log_dataEntrega"));
   parametros.put("TRANSFERENCIA", hAPI.getCardValue("log_transferencia"));

   if (hAPI.getCardValue("log_transferencia") == "S") {

      parametros.put("TRANSFERENCIA_SIM", template);
      parametros.put("UNIDADE_DESTINO", hAPI.getCardValue("log_unidadeDestino"));
      parametros.put("CARGA_TRANSFERENCIA", hAPI.getCardValue("log_numCargaTransferencia"));
      parametros.put("PEDIDO_TRANSFERENCIA", hAPI.getCardValue("log_numPedidoTransferencia"));

   }


   var anexos = hAPI.listAttachments();
   log.info('KINNITCHI --> ANEXOS :');

   for (var i = 0; i < anexos.size(); i++) {
      var attachment = anexos.get(i);

      var anexosHTML = '<a href="${LINK}" target="_blank">${NOME_ANEXO}</a><br>'

      // ! https://bauminashom.fluig.com:9100/
      // ! /2.0/documents/getDownloadURL/attachment.getDocumentId()

      /* 
      73b26572-54aa-4dc5-83fe-3cbec9db8654 TOKEN ACCESS
      3060753f-d42b-487f-9c72-53b38151b1bc021838f2-101e-4da5-82f1-e3ccf603252e TOKEN SECRET
      01 CUSTOMER KEY
      b04c6bd8002ec7855709ebd5458b5b28 CONSUMER SECRET
      */

      parametros.put("NOME_ANEXO", attachment.getDocumentDescription());
      parametros.put("NOME_ANEXO", attachment.getDocumentDescription());
   }



   //Este parâmetro é obrigatório e representa o assunto do e-mail
   parametros.put("subject", "teste de envio de email");

   //Monta lista de destinatários
   var destinatarios = new java.util.ArrayList();

   destinatarios.add("igor.oliveira@2beconsulting.com.br");

   log.info("*** antes do envio do email:" + parametros);
   log.info("------------------------------------------------------------");
   //Envia e-mail
   try {
      notifier.notify(
         "Tiago.Zeuli_2be",
         "email_NF",
         parametros,
         destinatarios,
         "text/html"
      );
      return true;
   } catch (err) {

      log.info("*** erro ao enviar email:" + parametros);
      log.info("------------------------------------------------------------");
      throw "*** erro ao enviar email:" + parametros;
   }
}