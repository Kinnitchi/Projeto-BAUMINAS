function enableFields(form){ 

    var atividadeAtual = getValue("WKNumState");

    setEnable(form,false);
    
    if(atividadeAtual==0 || atividadeAtual=="" || atividadeAtual==1){
        form.setEnabled("rad_estabelecimento",true);
        form.setEnabled("cmb_solicitanteSetor",true);
        form.setEnabled("txt_colaboradorNome",true);
        form.setEnabled("txt_colaboradorCentroCusto",true);
        form.setEnabled("txt_colaboradorMatricula",true);
        form.setEnabled("dt_dataInicialGozo",true);
        form.setEnabled("dt_dataFinalGozo",true);
        form.setEnabled("txt_periodoAquisitivoInicial",true);
        form.setEnabled("txt_periodoAquisitivoFinal",true);
        form.setEnabled("rad_abonoPecuniario",true);
        form.setEnabled("txt_periodoAbonoDe",true);
        form.setEnabled("txt_periodoAbonoAte",true);
        form.setEnabled("rad_adiantamento13",true);
        form.setEnabled("txtarea_feriasObs",true);
        form.setEnabled("txt_substFeriasApartir",true);
        form.setEnabled("txt_substFeriasCentroCusti",true);
        form.setEnabled("txt_colaboradorSubstituto",true);
        form.setEnabled("txtarea_substFeriasObs",true);
        
    }else if(atividadeAtual==2){
        form.setEnabled("rad_gerenteDeAcordo",true);
        form.setEnabled("txtarea_gerenteObs",true);
    }else if(atividadeAtual==3){
        form.setEnabled("rad_rhDeAcordo",true);
        form.setEnabled("txtarea_rhObs",true);
    }else if(atividadeAtual==4){
        form.setEnabled("rad_dpDeAcordo",true);
        form.setEnabled("txtarea_dpObs",true);
    }else if(atividadeAtual==5){
        form.setEnabled("rad_tiDeAcordo",true);
        form.setEnabled("txtarea_tiObs",true);
    }

}