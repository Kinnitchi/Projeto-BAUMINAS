function beforeTaskSave(colleagueId, nextSequenceId, userList) {

    var atividade = getValue("WKNumState");

    var anexos = hAPI.listAttachments();
    var temAnexo = false;

    if (atividade == 0 || atividade == 1) {

        if (anexos.size() > 0) {

            for (var i = 0; i < anexos.size(); i++) {

                var attachment = anexos.get(i);

                if (attachment.getDocumentDescription().indexOf("Nota Fiscal") > -1) {

                    temAnexo = true;
                }

            }

        }
        if (!temAnexo) {

            throw "\n <strong>É preciso anexar a Nota Fiscal nessa atividade!</strong>";
        }

    }

    if (atividade == 6 || atividade == 76) {

        if (anexos.size() > 0) {

            for (var i = 0; i < anexos.size(); i++) {

                var attachment = anexos.get(i);

                if (hAPI.getCardValue("log_transferencia") == "N") {

                    if (attachment.getDocumentDescription().indexOf("Nota Fiscal Venda Balança") > -1 &&
                        attachment.getDocumentDescription().indexOf("XML Venda Balança") > -1) {

                        temAnexo = true;
                    }
                }

            }

        }
        if (!temAnexo) {

            throw "\n <strong>É preciso anexar a Nota Fiscal e o XML nessa atividade!</strong>";
        }

    }

    if (atividade == 67 || atividade == 97) {
        sendEmail();
    }

}

function sendEmail(attempt, message) {
    //Enviar e-mail confirmação de abertura de chamado
    log.info("*** EXECUTANDO SERVIÇO DE ENVIO DE E-MAIL");

    var SOLICITACAO = getValue("WKNumProces");
    var URLSOLIC = "https://bauminashom.fluig.com:9100/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + SOLICITACAO + ''


    //Monta mapa com parâmetros do template
    var parametros = new java.util.HashMap();
    parametros.put("LINK_SOLIC", URLSOLIC);
    parametros.put("NUM_SOLIC", parseInt(SOLICITACAO));
    parametros.put("DATA_ABERTURA", hAPI.getCardValue("log_data"));
    parametros.put("UNI_ENTRADA_NF", hAPI.getCardValue("log_unidadeEntradaNF"));
    parametros.put("FORNECEDOR", hAPI.getCardValue("A2_NOME"));
    parametros.put("PRODUTO", hAPI.getCardValue("B1_DESC"));
    parametros.put("TRANSPORTADOR", hAPI.getCardValue("A4_NOME"));
    parametros.put("PLACA", hAPI.getCardValue("log_placa"));
    parametros.put("NF_COMPRA", getValue("log_numNFcompra"));
    parametros.put("PESO", hAPI.getCardValue("log_peso"));
    parametros.put("CLIENTE", hAPI.getCardValue("log_cliente"));
    parametros.put("CARGA_VENDA", hAPI.getCardValue("log_numCargaVenda"));
    parametros.put("PEDIDO_VENDA", hAPI.getCardValue("log_numPedidoVenda"));
    parametros.put("DT_ENTREGA", hAPI.getCardValue("log_dataEntrega"));

    var transferenciaFormatada = hAPI.getCardValue("log_transferencia") == "S" ? "Sim" : "Não";
    parametros.put("TRANSFERENCIA", transferenciaFormatada);

    if (hAPI.getCardValue("log_transferencia") == "S") {

        var template = '<tr><td>Unidade Destino:' + hAPI.getCardValue("log_unidadeDestino") + '</td><tr>\
							<tr><td>Nº Carga de Transferência:' + hAPI.getCardValue("log_numCargaTransferencia") + '<tr><td>\
							<tr><td>Nº Pedido de Transferência:' + hAPI.getCardValue("log_numPedidoTransferencia") + '<tr><td>'

        parametros.put("TRANSFERENCIA_SIM", template);

    } else {

        parametros.put("TRANSFERENCIA_SIM", "");
    }

    var anexos = hAPI.listAttachments();

    for (var i = 0; i < anexos.size(); i++) {
        var attachment = anexos.get(i);
        var nomeAnexo = attachment.getDocumentDescription().split(".")[0];

        var linkAnexo = '<a href="http://" target="_blank" rel="noopener noreferrer">' + nomeAnexo + '</a>';

        parametros.put("ANEXOS", linkAnexo);
        // parametros.put("LINK", attachment);
    }

    //Este parâmetro é obrigatório e representa o assunto do e-mail
    parametros.put("subject", "Fluig - Troca de Notas" + hAPI.getCardValue("log_unidadeEntradaNF") + '');

    //Monta lista de destinatários
    var destinatarios = new java.util.ArrayList();

    hAPI.getCardValue('A4_EMAIL') == '' ? destinatarios.add("igor.oliveira@2beconsulting.com.br") : destinatarios.add(hAPI.getCardValue('A4_EMAIL'));

    log.info("*** antes do envio do email:" + parametros);
    log.info("------------------------------------------------------------");
    //Envia e-mail
    try {
        notifier.notify("admin_fluig", "email_NF", parametros, destinatarios, "text/html");

        return true;

    } catch (err) {

        log.info("*** erro ao enviar email:" + parametros);
        throw "*** erro ao enviar email:" + parametros;

    }

}