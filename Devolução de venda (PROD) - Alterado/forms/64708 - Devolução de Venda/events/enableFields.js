function enableFields(form) {

    var atividadeAtual = getValue("WKNumState");

    setEnable(form, false);

    if (atividadeAtual == 0 || atividadeAtual == "" || atividadeAtual == 1) {


        //form.setEnabled("codigoSetor",true);
        //form.setEnabled("setor",true);
        //form.setEnabled("numRNC",true);
        form.setEnabled("estabelecimento", true);
        form.setEnabled("numNF", true);
        form.setEnabled("dataEmissao", true);
        form.setEnabled("codigoUnidade", true);
        form.setEnabled("unidadeEmissaoNF", true);
        /*form.setEnabled("codigoCliente",true);
        form.setEnabled("nomeCliente",true);*/
        form.setEnabled("cliente", true);
        form.setEnabled("nfTransitou", true);
        form.setEnabled("seraRefaturada", true);

        form.setEnabled("cfop", true);

        form.setEnabled("codigoItem", true);
        form.setEnabled("motivo", true);
        form.setEnabled("nomeTransportadora", true);
        form.setEnabled("placaVeiculo", true);
        form.setEnabled("frete", true);
        form.setEnabled("tipoDevolucao", true);
        form.setEnabled("informacaoFisica", true);
        //form.setEnabled("informacaoFiscal", true);
        form.setEnabled("tipoSolicitacao", true);
        form.setEnabled("codSolicitacao", true);
        form.setEnabled("obsSolicitante", true);

    } else if (atividadeAtual == 104) { // LOGÍSTICA
        form.setEnabled("codigoUnidade", true);
        form.setEnabled("custos1Aprovado", true);
        form.setEnabled("obsCustos1", true);
    } else if (atividadeAtual == 69) { // LOGÍSTICA
        form.setEnabled("codigoUnidade", true);
        form.setEnabled("logisticaAprovado", true);
        form.setEnabled("obsLogistica", true);
    } else if (atividadeAtual == 3) { // FISCAL
        form.setEnabled("codigoUnidade", true);
        form.setEnabled("fiscalAprovado", true);
        form.setEnabled("naturezaOperacao", true);
        form.setEnabled("nfDevolucaoConforme", true);
        form.setEnabled("obsFiscal", true);
    } else if (atividadeAtual == 4) { // FATURAMENTO
        form.setEnabled("faturamentoAprovado", true);
        form.setEnabled("numNFrecusa", true);
        form.setEnabled("numTicketPesagem", true);
        form.setEnabled("obsFaturamento", true);
    } else if (atividadeAtual == 5) { // FINANCEIRO
        form.setEnabled("codigoUnidade", true);
        form.setEnabled("financeiroAprovado", true);
        form.setEnabled("cobrancaBaixada", true);
        form.setEnabled("obsFinanceiro", true);
    } else if (atividadeAtual == 70) { // CUSTOS
        form.setEnabled("custosAprovado", true);
        form.setEnabled("obsCustos", true);
    } else if (atividadeAtual == 118) {
        form.setEnabled("industriaApprove", true);
        form.setEnabled("obsIndustria", true);
    }

}