function validateForm(form) {

    var atividadeAtual = getValue("WKNumState");
    var txtErro = "";

    if (atividadeAtual == 0 || atividadeAtual == 1 || atividadeAtual == "") {
        //txtErro += (form.getValue("") == null || form.getValue("") == "" ? "<br>" : "");
        txtErro += (form.getValue("log_transferencia") == null || form.getValue("log_transferencia") == "" ? "<br>Transferência" : "");
        txtErro += (form.getValue("A4_EMAIL") == null || form.getValue("A4_EMAIL") == "" ? "<br>E-mail" : "");

    } else if (atividadeAtual == 2) {

        txtErro += (form.getValue("bal1_nfLancada") == null || form.getValue("bal1_nfLancada") == "" ? "<br>NF Lançada" : "");

        if (form.getValue("bal1_nfLancada") == "N") {
            txtErro += (form.getValue("bal1_obs") == null || form.getValue("bal1_obs") == "" ? "<br>OBS" : "");
        }

    } else if (atividadeAtual == 3) {

        txtErro += (form.getValue("fis_nfClassificada") == null || form.getValue("fis_nfClassificada") == "" ? "<br>NF Classificada" : "");

    } else if (atividadeAtual == 4) {

        txtErro += (form.getValue("lab_liberadoLote") == null || form.getValue("lab_liberadoLote") == "" ? "<br>Liberado Lote" : "");
        if (form.getValue("lab_liberadoLote") != "N") {
            txtErro += (form.getValue("lab_precisaReporteIndustrial") == null || form.getValue("lab_precisaReporteIndustrial") == "" ? "<br>Precisa de Reporte Industrial" : "");
        }

    } else if (atividadeAtual == 5) {

        txtErro += (form.getValue("ind_reporteRealizado") == null || form.getValue("ind_reporteRealizado") == "" ? "<br>Reporte Realizado" : "");

        if (form.getValue("ind_reporteRealizado") == "N") {
            txtErro += (form.getValue("ind_obs") == null || form.getValue("ind_obs") == "" ? "<br>OBS" : "");
        }

    } else if (atividadeAtual == 72) {

        txtErro += (form.getValue("bal2_nfLancada") == null || form.getValue("bal2_nfLancada") == "" ? "<br>NF Lançada" : "");

        if (form.getValue("bal2_nfLancada") == "N") {
            txtErro += (form.getValue("bal2_obs") == null || form.getValue("bal2_obs") == "" ? "<br>OBS" : "");
        }

    } else if (atividadeAtual == 73) {

        txtErro += (form.getValue("fis2_nfClassificada") == null || form.getValue("fis2_nfClassificada") == "" ? "<br>NF Classificada" : "");

        if (form.getValue("fis2_nfClassificada") == "N") {
            txtErro += (form.getValue("fis2_obs") == null || form.getValue("fis2_obs") == "" ? "<br>OBS" : "");
        }

    } else if (atividadeAtual == 74) {

        txtErro += (form.getValue("lab2_liberadoLote") == null || form.getValue("lab2_liberadoLote") == "" ? "<br>Liberado Lote" : "");

        if (form.getValue("lab2_liberadoLote") != "N") {
            txtErro += (form.getValue("lab2_precisaReporteIndustrial") == null || form.getValue("lab2_precisaReporteIndustrial") == "" ? "<br>Precisa de Reporte Industrial" : "");
        }

    } else if (atividadeAtual == 75) {

        txtErro += (form.getValue("ind2_reporteRealizado") == null || form.getValue("ind2_reporteRealizado") == "" ? "<br>Reporte Realizado" : "");

        if (form.getValue("ind2_reporteRealizado") == "N") {
            txtErro += (form.getValue("ind2_obs") == null || form.getValue("ind2_obs") == "" ? "<br>OBS" : "");
        }

    }

    if (txtErro != "") {

        throw "<br>Os seguintes campos não foram preenchidos: " + txtErro;
    }

}