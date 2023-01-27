function validateForm(form) {

    var atividadeAtual = getValue("WKNumState");
    var txtErro = "";

    if (atividadeAtual == 0 || atividadeAtual == 1 || atividadeAtual == "") {
        txtErro += (form.getValue("rad_estabelecimento") == null || form.getValue("rad_estabelecimento") == "" ? "<br>Estabelecimento" : "");
        txtErro += (form.getValue("cmb_solicitanteSetor") == null || form.getValue("cmb_solicitanteSetor") == "" ? "<br>Setor" : "");
        txtErro += (form.getValue("txt_colaboradorNome") == null || form.getValue("txt_colaboradorNome") == "" ? "<br>Colaborador" : "");
        txtErro += (form.getValue("txt_colaboradorCentroCusto") == null || form.getValue("txt_colaboradorCentroCusto") == "" ? "<br>Centro de custo (Identificação)" : "");
        txtErro += (form.getValue("txt_colaboradorMatricula") == null || form.getValue("txt_colaboradorMatricula") == "" ? "<br>Matrícula" : "");
        txtErro += (form.getValue("dt_dataInicialGozo") == null || form.getValue("dt_dataInicialGozo") == "" ? "<br>Data inicial do gozo" : "");
        txtErro += (form.getValue("dt_dataFinalGozo") == null || form.getValue("dt_dataFinalGozo") == "" ? "<br>Data final do gozo" : "");
        txtErro += (form.getValue("txt_periodoAquisitivoInicial") == null || form.getValue("txt_periodoAquisitivoInicial") == "" ? "<br>Período aquisitivo inicial" : "");
        txtErro += (form.getValue("txt_periodoAquisitivoFinal") == null || form.getValue("txt_periodoAquisitivoFinal") == "" ? "<br>Período aquisitivo final" : "");
        txtErro += (form.getValue("rad_abonoPecuniario") == null || form.getValue("rad_abonoPecuniario") == "" ? "<br>Abono pecuniário" : "");

        if (form.getValue("rad_abonoPecuniario") == "Sim") {
            txtErro += (form.getValue("txt_periodoAbonoDe") == null || form.getValue("txt_periodoAbonoDe") == "" ? "<br>Período do abono (De)" : "");
            txtErro += (form.getValue("txt_periodoAbonoAte") == null || form.getValue("txt_periodoAbonoAte") == "" ? "<br>Período do abono (Até)" : "");
        }

        txtErro += (form.getValue("rad_adiantamento13") == null || form.getValue("rad_adiantamento13") == "" ? "<br>Adiantamento 13º" : "");

    } else if (atividadeAtual == 2) {

        txtErro += (form.getValue("rad_gerenteDeAcordo") == null || form.getValue("rad_gerenteDeAcordo") == "" ? "<br>Aprovado" : "");

        if (form.getValue("rad_gerenteDeAcordo") == "Nao" || form.getValue("rad_gerenteDeAcordo") == "Ajustar") {
            txtErro += (form.getValue("txtarea_gerenteObs") == null || form.getValue("txtarea_gerenteObs") == "" ? "<br>Observação" : "");
        }

    } else if (atividadeAtual == 3) {

        txtErro += (form.getValue("rad_rhDeAcordo") == null || form.getValue("rad_rhDeAcordo") == "" ? "<br>Aprovado" : "");

        if (form.getValue("rad_rhDeAcordo") == "Nao" || form.getValue("rad_rhDeAcordo") == "AjustarSolicitante" || form.getValue("rad_rhDeAcordo") == "AjustarGerente") {
            txtErro += (form.getValue("txtarea_rhObs") == null || form.getValue("txtarea_rhObs") == "" ? "<br>Observação" : "");
        }

    } else if (atividadeAtual == 54) {

        txtErro += (form.getValue("rad_diretoriaNao") == null || form.getValue("rad_diretoriaNao") == "" ? "<br>Aprovado" : "");

        if (form.getValue("rad_diretoriaNao") == "Nao" || form.getValue("rad_diretoriaNao") == "Ajustar") {
            txtErro += (form.getValue("txtarea_diretoriaObs") == null || form.getValue("txtarea_diretoriaObs") == "" ? "<br>Observação" : "");
        }
    } else if (atividadeAtual == 4) {

        txtErro += (form.getValue("rad_dpDeAcordo") == null || form.getValue("rad_dpDeAcordo") == "" ? "<br>Aprovado" : "");

        if (form.getValue("rad_dpDeAcordo") == "Nao" || form.getValue("rad_dpDeAcordo") == "AjustarSolicitante" || form.getValue("rad_dpDeAcordo") == "AjustarRH") {
            txtErro += (form.getValue("txtarea_dpObs") == null || form.getValue("txtarea_dpObs") == "" ? "<br>Observação" : "");
        }

    } else if (atividadeAtual == 5) {

        txtErro += (form.getValue("rad_tiDeAcordo") == null || form.getValue("rad_tiDeAcordo") == "" ? "<br>Senhas alteradas" : "");

        if (form.getValue("rad_tiDeAcordo") == "Nao" || form.getValue("rad_tiDeAcordo") == "AjustarSolicitante" || form.getValue("rad_tiDeAcordo") == "AjustarDP") {
            txtErro += (form.getValue("txtarea_tiObs") == null || form.getValue("txtarea_tiObs") == "" ? "<br>Observação" : "");
        }

    }

    if (txtErro != "") {
        throw ("<br>Os seguintes campos não foram preenchidos: " + txtErro);
    }

}