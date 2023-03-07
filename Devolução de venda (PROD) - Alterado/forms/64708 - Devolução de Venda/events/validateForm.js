function validateForm(form) {

    var atividadeAtual = getValue("WKNumState");

    var txtErro = "";

    if (atividadeAtual == 0 || atividadeAtual == 1 || atividadeAtual == "") {


        //txtErro += (form.getValue("setor") == null || form.getValue("setor") == "" ? "<br>Setor" : "");
        //txtErro += (form.getValue("numRNC") == null || form.getValue("numRNC") == "" ? "<br>Nº RNC" : "");
        txtErro += (form.getValue("numNF") == null || form.getValue("numNF") == "" ? "<br>Nº da NF" : "");
        txtErro += (form.getValue("dataEmissao") == null || form.getValue("dataEmissao") == "" ? "<br>Data da Emissão" : "");
        txtErro += (form.getValue("estabelecimento") == null || form.getValue("estabelecimento") == "" ? "<br>Unidade de Emissão da NF" : "");

        txtErro += (form.getValue("cliente") == null || form.getValue("cliente") == "" ? "<br>Cliente" : "");
        txtErro += (form.getValue("nfTransitou") == null || form.getValue("nfTransitou") == "" ? "<br>NF Transitou?" : "");
        txtErro += (form.getValue("seraRefaturada") == null || form.getValue("seraRefaturada") == "" ? "<br>Será Refaturada?" : "");

        //txtErro += (form.getValue("cfop") == null || form.getValue("cfop") == "" ? "<br>CFOP" : "");

        //txtErro += (form.getValue("codigoItem") == null || form.getValue("codigoItem") == "" ? "<br>Código do Item" : "");
        txtErro += (form.getValue("motivo") == null || form.getValue("motivo") == "" ? "<br>Motivo" : "");
        //txtErro += (form.getValue("nomeTransportadora") == null || form.getValue("nomeTransportadora") == "" ? "<br>Nome da Transportadora" : "");
        //txtErro += (form.getValue("placaVeiculo") == null || form.getValue("placaVeiculo") == "" ? "<br>Placa do Veículo" : "");
        //txtErro += (form.getValue("frete") == null || form.getValue("frete") == "" ? "<br>Frete" : "");
        txtErro += (form.getValue("tipoDevolucao") == null || form.getValue("tipoDevolucao") == "" ? "<br>Tipo de Devolução" : "");
        txtErro += (form.getValue("informacaoFisica") == null || form.getValue("informacaoFisica") == "" ? "<br>Informação Física" : "");
        txtErro += (form.getValue("tipoSolicitacao") == null || form.getValue("tipoSolicitacao") == "" ? "<br>Informação Fiscal" : "");
        //txtErro += (form.getValue("informacaoFiscal") == null || form.getValue("informacaoFiscal") == "" ? "<br>Informação Fiscal" : "");


    } else if (atividadeAtual == 104) { // CUSTOS
        txtErro += (form.getValue("custos1Aprovado") == null || form.getValue("custos1Aprovado") == "" ? "<br>Aprovado" : "");

        if (form.getValue("custos1Aprovado") == "N" || form.getValue("custos1Aprovado") == "solicitante") {
            txtErro += (form.getValue("obsCustos1") == null || form.getValue("obsCustos1") == "" ? "<br>Observação" : "");
        }

    } else if (atividadeAtual == 69) { // LOGÍSTICA
        txtErro += (form.getValue("logisticaAprovado") == null || form.getValue("logisticaAprovado") == "" ? "<br>Aprovado" : "");

        if (form.getValue("logisticaAprovado") == "N" || form.getValue("logisticaAprovado") == "solicitante" || form.getValue("logisticaAprovado") == "anterior") {
            txtErro += (form.getValue("obsLogistica") == null || form.getValue("obsLogistica") == "" ? "<br>Observação" : "");
        }

    } else if (atividadeAtual == 3) { // FISCAL
        txtErro += (form.getValue("fiscalAprovado") == null || form.getValue("fiscalAprovado") == "" ? "<br>Aprovado" : "");

        if (form.getValue("fiscalAprovado") == "N" || form.getValue("fiscalAprovado") == "solicitante" || form.getValue("fiscalAprovado") == "anterior") {
            txtErro += (form.getValue("obsFiscal") == null || form.getValue("obsFiscal") == "" ? "<br>Observação" : "");
        } else {
            txtErro += (form.getValue("naturezaOperacao") == null || form.getValue("naturezaOperacao") == "" ? "<br>Natureza da Operação" : "");
            txtErro += (form.getValue("nfDevolucaoConforme") == null || form.getValue("nfDevolucaoConforme") == "" ? "<br>NF de Devolução está Conforme?" : "");

        }



    } else if (atividadeAtual == 4) { // FATURAMENTO
        txtErro += (form.getValue("faturamentoAprovado") == null || form.getValue("faturamentoAprovado") == "" ? "<br>Aprovado" : "");

        if (form.getValue("faturamentoAprovado") == "N" || form.getValue("faturamentoAprovado") == "solicitante" || form.getValue("faturamentoAprovado") == "anterior") {

            txtErro += (form.getValue("obsFaturamento") == null || form.getValue("obsFaturamento") == "" ? "<br>Observação" : "");
        } else {
            txtErro += (form.getValue("numTicketPesagem") == null || form.getValue("numTicketPesagem") == "" ? "<br>Nº Ticket de Pesagem" : "");

        }


    } else if (atividadeAtual == 5) { // FINANCEIRO
        txtErro += (form.getValue("financeiroAprovado") == null || form.getValue("financeiroAprovado") == "" ? "<br>Aprovado" : "");

        if (form.getValue("financeiroAprovado") == "N" || form.getValue("financeiroAprovado") == "solicitante" || form.getValue("financeiroAprovado") == "anterior") {

            txtErro += (form.getValue("obsFinanceiro") == null || form.getValue("obsFinanceiro") == "" ? "<br>Observação" : "");
        } else {
            txtErro += (form.getValue("cobrancaBaixada") == null || form.getValue("cobrancaBaixada") == "" ? "<br>Cobrança Baixada?" : "");

        }


    } else if (atividadeAtual == 70) { // CUSTOS
        txtErro += (form.getValue("custosAprovado") == null || form.getValue("custosAprovado") == "" ? "<br>Aprovado" : "");

        if (form.getValue("custosAprovado") == "N" || form.getValue("custosAprovado") == "solicitante" || form.getValue("custosAprovado") == "anterior" || form.getValue("custosAprovado") == "faturamento") {
            txtErro += (form.getValue("obsCustos") == null || form.getValue("obsCustos") == "" ? "<br>Observação" : "");
        }

    } else if (atividadeAtual == 118) {

        txtErro += (form.getValue("industriaApprove") == null || form.getValue("industriaApprove") == "" ? "<br>Aprovado" : "");

        if (form.getValue("industriaApprove") == "solicitante") {
            txtErro += (form.getValue("obsIndustria") == null || form.getValue("obsIndustria") == "" ? "<br>Observação" : "");
        }
    }

    if (txtErro != "") {
        throw ("<br>Os seguintes campos não foram preenchidos: " + txtErro);
    }


}