function enableFields(form) {

    var atividadeAtual = getValue("WKNumState");

    setEnable(form, false);

    if (atividadeAtual == 0 || atividadeAtual == "" || atividadeAtual == 1) {
        form.setEnabled("rad_estabelecimento", true);
        form.setEnabled("cmb_solicitanteSetor", true);
        form.setEnabled("txt_solicitanteCentroCusto", true);
        form.setEnabled("chk_efetivoDataAdmissao", true);
        form.setEnabled("txt_efetivoDataAdmissao", true);
        form.setEnabled("txt_centroCusto", true);
        form.setEnabled("chk_aumentoQuadro", true);
        form.setEnabled("chk_estagiario", true);
        form.setEnabled("chk_substituicao", true);
        form.setEnabled("txt_substituicao", true);
        form.setEnabled("transferencia", true);
        form.setEnabled("terceirizado", true);
        form.setEnabled("setorAtuacao", true);
        form.setEnabled("dataTermino", true);
        form.setEnabled("dt_prazoContratacaoAte", true);
        form.setEnabled("hr_admissaoHorario", true);
        form.setEnabled("txt_admissaoCargo", true);
        form.setEnabled("chk_recTI_computador", true);
        form.setEnabled("chk_recTI_notebook", true);
        form.setEnabled("chk_recTI_celular", true);
        form.setEnabled("chk_recTI_internetMovel", true);
        form.setEnabled("txtarea_recursosFisicos", true);

        form.setEnabled("email", true);
        form.setEnabled("dominio", true);
        form.setEnabled("internet", true);
        form.setEnabled("obsAcessoPasta", true);


        form.setEnabled("chk_recTI_desktopComp", true);
        form.setEnabled("chk_recTI_notebookInd", true);
        form.setEnabled("chk_recTI_mouse", true);
        form.setEnabled("chk_recTI_supNotebook", true);
        form.setEnabled("userCompNote", true);
        form.setEnabled("userCompNDesk", true);
        form.setEnabled("linha", true);




        form.setEnabled("winner", true);
        form.setEnabled("protheus", true);
        form.setEnabled("goodData", true);
        form.setEnabled("fluig", true);
        form.setEnabled("BILogix", true);
        form.setEnabled("nenhum", true);
        form.setEnabled("ticketPEsagem", true);


    } else if (atividadeAtual == 2) {
        form.setEnabled("rad_gerenteDeAcordo", true);
        form.setEnabled("txtarea_gerenteObs", true);

    } else if (atividadeAtual == 3) {
        form.setEnabled("txt_rhCargo", true);
        form.setEnabled("txt_rhNome", true);
        form.setEnabled("dt_rhDataAdmissao", true);
        form.setEnabled("txt_rhSalario", true);
        form.setEnabled("rad_rhDeAcordo", true);
        form.setEnabled("txtarea_rhObs", true);

    } else if (atividadeAtual == 4) {
        form.setEnabled("rad_tiDeAcordo", true);
        form.setEnabled("txtarea_tiObs", true);
        form.setEnabled("userEspelhoProtheus", true);
        form.setEnabled("userEspelhoWinner", true);
        form.setEnabled("userEspelhoGoodData", true);
        form.setEnabled("userEspelhoFluig", true);
        form.setEnabled("userEspelhoBILogix", true);
    } else if (atividadeAtual == 5) {

        form.setEnabled("rad_dpDeAcordo", true);
        form.setEnabled("txtarea_dpObs", true);
        form.setEnabled("txt_matricula", true);
        form.setEnabled("RA_RG", true);
        form.setEnabled("RA_CIC", true);
        form.setEnabled("RA_NASC", true);

    }

}