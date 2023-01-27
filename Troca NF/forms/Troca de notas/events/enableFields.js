function enableFields(form) {

    var atividadeAtual = getValue("WKNumState");

    setEnable(form, false);

    if (atividadeAtual == 0 || atividadeAtual == "" || atividadeAtual == 1) {
        form.setEnabled("log_unidadeEntradaNF", true);
        form.setEnabled("A2_COD", true);
        form.setEnabled("A2_NOME", true);
        form.setEnabled("log_fornecedor", true);
        form.setEnabled("B1_COD", true);
        form.setEnabled("B1_DESC", true);
        form.setEnabled("log_produto", true);
        form.setEnabled("A4_COD", true);
        form.setEnabled("A4_NOME", true);
        form.setEnabled("A4_EMAIL", true);
        form.setEnabled("log_transportador", true);
        form.setEnabled("log_placa", true);
        form.setEnabled("log_numNFcompra", true);
        form.setEnabled("log_peso", true);
        form.setEnabled("log_cliente", true);
        form.setEnabled("log_numCargaVenda", true);
        form.setEnabled("log_numPedidoVenda", true);
        form.setEnabled("log_dataEntrega", true);
        form.setEnabled("log_transferencia", true);
        form.setEnabled("log_unidadeDestino", true);
        form.setEnabled("log_numCargaTransferencia", true);
        form.setEnabled("log_numPedidoTransferencia", true);

    } else if (atividadeAtual == 2) {
        form.setEnabled("bal1_nfLancada", true);
        form.setEnabled("bal1_obs", true);

    } else if (atividadeAtual == 3) {
        form.setEnabled("fis_nfClassificada", true);
        form.setEnabled("fis_obs", true);

    } else if (atividadeAtual == 4) {
        form.setEnabled("lab_liberadoLote", true);
        form.setEnabled("lab_precisaReporteIndustrial", true);
        form.setEnabled("lab_obs", true);

    } else if (atividadeAtual == 5) {
        form.setEnabled("ind_reporteRealizado", true);
        form.setEnabled("ind_obs", true);

    } else if (atividadeAtual == 6) {
        form.setEnabled("transf_numNF", true);
        form.setEnabled("transf_obs", true);
        form.setEnabled("venda_numNF", true);
        form.setEnabled("venda_obs", true);

    } else if (atividadeAtual == 72) {
        form.setEnabled("bal2_nfLancada", true);
        form.setEnabled("bal2_obs", true);

    } else if (atividadeAtual == 73) {
        form.setEnabled("fis2_nfClassificada", true);
        form.setEnabled("fis2_obs", true);

    } else if (atividadeAtual == 74) {
        form.setEnabled("lab2_liberadoLote", true);
        form.setEnabled("lab2_precisaReporteIndustrial", true);
        form.setEnabled("lab2_obs", true);

    } else if (atividadeAtual == 75) {
        form.setEnabled("ind2_reporteRealizado", true);
        form.setEnabled("ind2_obs", true);

    } else if (atividadeAtual == 76) {
        form.setEnabled("venda2_numNF", true);
        form.setEnabled("venda2_obs", true);

    }

}