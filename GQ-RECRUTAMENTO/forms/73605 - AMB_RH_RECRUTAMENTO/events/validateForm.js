function validateForm(form) {

    var atividadeAtual = getValue("WKNumState");
    var txtErro = "";

    if (atividadeAtual == 0 || atividadeAtual == 1 || atividadeAtual == "") {
        txtErro += (form.getValue("rad_estabelecimento") == null || form.getValue("rad_estabelecimento") == "" ? "<br>Estabelecimento" : "");
        txtErro += (form.getValue("cmb_solicitanteSetor") == null || form.getValue("cmb_solicitanteSetor") == "" ? "<br>Setor" : "");
        if (form.getValue("chk_efetivoDataAdmissao") == "Sim") {
            txtErro += (form.getValue("txt_efetivoDataAdmissao") == null || form.getValue("txt_efetivoDataAdmissao") == "" ? "<br>Efetivo - Data de admissão" : "");
        }
        txtErro += (form.getValue("txt_centroCusto") == null || form.getValue("txt_centroCusto") == "" ? "<br>Centro de Custo" : "");
        if (form.getValue("chk_substituicao") == "Sim") {
            txtErro += (form.getValue("txt_substituicao") == null || form.getValue("txt_substituicao") == "" ? "<br>Substituição a" : "");
        }
        txtErro += (form.getValue("dt_prazoContratacaoAte") == null || form.getValue("dt_prazoContratacaoAte") == "" ? "<br>Prazo para contratação - até" : "");
        txtErro += (form.getValue("dt_prazoContratacaoAte") == null || form.getValue("dt_prazoContratacaoAte") == "" ? "<br>Prazo para contratação - até" : "");
        txtErro += (form.getValue("dt_prazoContratacaoAte") == null || form.getValue("dt_prazoContratacaoAte") == "" ? "<br>Prazo para contratação - até" : "");
        txtErro += (form.getValue("hr_admissaoHorario") == null || form.getValue("hr_admissaoHorario") == "" ? "<br>Horário" : "");
        txtErro += (form.getValue("txt_admissaoCargo") == null || form.getValue("txt_admissaoCargo") == "" ? "<br>Cargo" : "");
        txtErro += (form.getValue("txtarea_recursosFisicos") == null || form.getValue("txtarea_recursosFisicos") == "" ? "<br>Recursos físicos" : "");


        txtErro += (form.getValue("setorAtuacao") == null || form.getValue("setorAtuacao") == "" ? "<br>Setor de Atuação" : "");
        txtErro += (form.getValue("dataTermino") == null || form.getValue("dataTermino") == "" ? "<br>Data de Término" : "");



        if (form.getValue("transferencia") == "Transferencia" || form.getValue("terceirizado") == "Terceirizado") {

            txtErro += ('Transferência ou Terceirizado não pode ser selecionado ao mesmo tempo');
        }

        txtErro += (form.getValue("obsAcessoPasta") == null || form.getValue("obsAcessoPasta") == "" ? "<br>Acesso as Pastas de Rede" : "");

        if (form.getValue("transferencia") == "" || form.getValue("transferencia") == undefined || form.getValue("transferencia") == null &&
            form.getValue("terceirizado") == "" || form.getValue("terceirizado") == undefined || form.getValue("terceirizado") == null) {

            txtErro += ("<br>Transferência ou Terceirizado");

        }

        if (form.getValue("chk_recTI_notebook") == "Sim") {
            txtErro += (form.getValue("userCompNote") == null || form.getValue("userCompNote") == "" ? "<br>Usuário de compartilhamento" : "");
        }
        if (form.getValue("chk_recTI_desktopComp") == "Sim") {
            txtErro += (form.getValue("userCompNDesk") == null || form.getValue("userCompNDesk") == "" ? "<br>Usuário de compartilhamento" : "");
        }
        if (form.getValue("chk_recTI_celular") == "Sim") {
            txtErro += (form.getValue("linha") == null || form.getValue("linha") == "" ? "<br>Usuário de compartilhamento" : "");
        }




    } else if (atividadeAtual == 2) {

        txtErro += (form.getValue("rad_gerenteDeAcordo") == null || form.getValue("rad_gerenteDeAcordo") == "" ? "<br>Autorização" : "");

        if (form.getValue("rad_gerenteDeAcordo") == "Nao" || form.getValue("rad_gerenteDeAcordo") == "Ajustar") {
            txtErro += (form.getValue("txtarea_gerenteObs") == null || form.getValue("txtarea_gerenteObs") == "" ? "<br>Observação" : "");
        }

    } else if (atividadeAtual == 3) {

        txtErro += (form.getValue("rad_rhDeAcordo") == null || form.getValue("rad_rhDeAcordo") == "" ? "<br>De acordo" : "");

        if (form.getValue("rad_rhDeAcordo") == "Nao" || form.getValue("rad_rhDeAcordo") == "AjustarSolicitante" || form.getValue("rad_rhDeAcordo") == "AjustarGerente") {
            txtErro += (form.getValue("txtarea_rhObs") == null || form.getValue("txtarea_rhObs") == "" ? "<br>Observação" : "");
        } else {
            txtErro += (form.getValue("txt_rhCargo") == null || form.getValue("txt_rhCargo") == "" ? "<br>Cargo" : "");
            txtErro += (form.getValue("txt_rhNome") == null || form.getValue("txt_rhNome") == "" ? "<br>Nome" : "");
            txtErro += (form.getValue("dt_rhDataAdmissao") == null || form.getValue("dt_rhDataAdmissao") == "" ? "<br>Data admissão" : "");
            txtErro += (form.getValue("txt_rhSalario") == null || form.getValue("txt_rhSalario") == "" ? "<br>Salário" : "");
        }

    } else if (atividadeAtual == 4) {

        txtErro += (form.getValue("rad_tiDeAcordo") == null || form.getValue("rad_tiDeAcordo") == "" ? "<br>Validação de equipamentos solicitados" : "");

        if (form.getValue("rad_tiDeAcordo") == "Nao" || form.getValue("rad_tiDeAcordo") == "AjustarSolicitante" || form.getValue("rad_tiDeAcordo") == "AjustarRH") {
            txtErro += (form.getValue("txtarea_tiObs") == null || form.getValue("txtarea_tiObs") == "" ? "<br>Observação" : "");
        }
        if (form.getValue("winner") == "Sim") {
            txtErro += (form.getValue("userEspelhoWinner") == null || form.getValue("userEspelhoWinner") == "" ? "<br>Winner" : "");
        }
        if (form.getValue("protheus") == "Sim") {
            txtErro += (form.getValue("userEspelhoProtheus") == null || form.getValue("userEspelhoProtheus") == "" ? "<br>Protheys" : "");
        }
        if (form.getValue("goodData") == "Sim") {
            txtErro += (form.getValue("userEspelhoGoddData") == null || form.getValue("userEspelhoGoddData") == "" ? "<br>GoodData" : "");
        }
        if (form.getValue("fluig") == "Sim") {
            txtErro += (form.getValue("userEspelhoFluig") == null || form.getValue("userEspelhoFluig") == "" ? "<br>Fluig" : "");
        }
        if (form.getValue("BILogix") == "Sim") {
            txtErro += (form.getValue("userEspelhoBILogix") == null || form.getValue("userEspelhoBILogix") == "" ? "<br>BI - Logix" : "");
        }


    } else if (atividadeAtual == 5) {

        txtErro += (form.getValue("rad_dpDeAcordo") == null || form.getValue("rad_dpDeAcordo") == "" ? "<br>Documentação" : "");

        if (form.getValue("rad_dpDeAcordo") == "Nao" || form.getValue("rad_dpDeAcordo") == "AjustarSolicitante" || form.getValue("rad_dpDeAcordo") == "AjustarTI") {
            txtErro += (form.getValue("txtarea_dpObs") == null || form.getValue("txtarea_dpObs") == "" ? "<br>Observação" : "");
        }

    }

    if (txtErro != "") {
        throw ("<br>Os seguintes campos não foram preenchidos: " + txtErro);
    }

}