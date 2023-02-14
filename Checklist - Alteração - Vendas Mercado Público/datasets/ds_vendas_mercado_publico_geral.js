function createDataset(fields, constraints, sortFields) {

    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("numeroSolicitacao");
    dataset.addColumn("cliente");
    dataset.addColumn("contrato");
    dataset.addColumn("cnpj");
    dataset.addColumn("produto");
    dataset.addColumn("tipo");

    var numeroSolicitacao = findConstraint("numeroSolicitacao", constraints);
    var cliente = findConstraint("cliente", constraints);
    var contrato = findConstraint("contrato", constraints);
    var cnpj = findConstraint("cnpj", constraints);
    var produto = findConstraint("produto", constraints);

    var tipo = ["VENDAS ANTIGO", "VENDAS NOVO", "ALTERACAO"]

    var arrConstr = []
    if (numeroSolicitacao) {
        arrConstr.push(DatasetFactory.createConstraint("textbox40", numeroSolicitacao, numeroSolicitacao, ConstraintType.MUST));
    } else {
        arrConstr.push(DatasetFactory.createConstraint("textbox40", "", "", ConstraintType.MUST_NOT));
        arrConstr.push(DatasetFactory.createConstraint("textbox40", null, null, ConstraintType.MUST_NOT));
        arrConstr.push(DatasetFactory.createConstraint("textbox40", "0", "0", ConstraintType.MUST_NOT));
    }

    if (cliente) arrConstr.push(DatasetFactory.createConstraint("TXT_Cliente", cliente, cliente, ConstraintType.MUST));
    if (contrato) arrConstr.push(DatasetFactory.createConstraint("TXT_ContratoAta", contrato, contrato, ConstraintType.MUST));
    if (cnpj) arrConstr.push(DatasetFactory.createConstraint("TXT_CNPJ", cnpj, cnpj, ConstraintType.MUST));
    if (produto) arrConstr.push(DatasetFactory.createConstraint("CMB_Produto", produto, produto, ConstraintType.MUST));

    arrConstr.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));

    var ds1 = DatasetFactory.getDataset("DSFormulariodeChecklist-VendasMercadoPublicoQuimica", null, arrConstr, null);

    for (var i = 0; i < ds1.rowsCount; i++) {

        dataset.addRow([
            ds1.getValue(i, "textbox40"),
            ds1.getValue(i, "TXT_Cliente"),
            ds1.getValue(i, "TXT_ContratoAta"),
            ds1.getValue(i, "TXT_CNPJ"),
            ds1.getValue(i, "CMB_Produto"),
            tipo[0]
        ]);

    }

    var arrConstra = []
    if (numeroSolicitacao) {
        arrConstra.push(DatasetFactory.createConstraint("solicitacao", numeroSolicitacao, numeroSolicitacao, ConstraintType.MUST));
    } else {
        arrConstra.push(DatasetFactory.createConstraint("solicitacao", "", "", ConstraintType.MUST_NOT));
        arrConstra.push(DatasetFactory.createConstraint("solicitacao", null, null, ConstraintType.MUST_NOT));
        arrConstra.push(DatasetFactory.createConstraint("solicitacao", "0", "0", ConstraintType.MUST_NOT));
    }

    if (cliente) arrConstra.push(DatasetFactory.createConstraint("TXT_Cliente", cliente, cliente, ConstraintType.MUST));
    if (contrato) arrConstra.push(DatasetFactory.createConstraint("TXT_ContratoAta", contrato, contrato, ConstraintType.MUST));
    if (cnpj) arrConstra.push(DatasetFactory.createConstraint("TXT_CNPJ", cnpj, cnpj, ConstraintType.MUST));
    if (produto) arrConstra.push(DatasetFactory.createConstraint("CMB_Produto", produto, produto, ConstraintType.MUST));

    arrConstra.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));

    var ds2 = DatasetFactory.getDataset("ds_form_vendas_mercado_publico", null, arrConstra, null);

    for (var j = 0; j < ds2.rowsCount; j++) {

        dataset.addRow([
            ds2.getValue(j, "solicitacao"),
            ds2.getValue(j, "TXT_Cliente"),
            ds2.getValue(j, "TXT_ContratoAta"),
            ds2.getValue(j, "TXT_CNPJ"),
            ds2.getValue(j, "CMB_Produto"),
            tipo[1]
        ]);

    }




    // IGAO
    var solic = findConstraint("solicitacao", constraints);
    var client = findConstraint("codigoCliente", constraints);
    var contract = findConstraint("contratoAta", constraints);
    var cnpj3 = findConstraint("cnpj", constraints);
    var product = findConstraint("produto", constraints);

    var arrConstrai = []
    if (solic) {
        arrConstrai.push(DatasetFactory.createConstraint("solicitacao", solic, solic, ConstraintType.MUST));
    } else {
        arrConstrai.push(DatasetFactory.createConstraint("solicitacao", "", "", ConstraintType.MUST_NOT));
        arrConstrai.push(DatasetFactory.createConstraint("solicitacao", null, null, ConstraintType.MUST_NOT));
        arrConstrai.push(DatasetFactory.createConstraint("solicitacao", "0", "0", ConstraintType.MUST_NOT));
    }

    if (client) arrConstrai.push(DatasetFactory.createConstraint("codigoCliente", client, client, ConstraintType.MUST));
    if (contract) arrConstrai.push(DatasetFactory.createConstraint("contratoAta", contract, contract, ConstraintType.MUST));
    if (cnpj3) arrConstrai.push(DatasetFactory.createConstraint("cnpj", cnpj3, cnpj3, ConstraintType.MUST));
    if (product) arrConstrai.push(DatasetFactory.createConstraint("produtoBauminas", product, produto, ConstraintType.MUST));

    arrConstrai.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));

    var ds3 = DatasetFactory.getDataset("DSFormulariodeChecklist-Alteracao-VendasMercadoPublico", null, arrConstrai, null);

    for (var j = 0; j < ds3.rowsCount; j++) {

        dataset.addRow([
            ds3.getValue(j, "solicitacao"),
            ds3.getValue(j, "codigoCliente"),
            ds3.getValue(j, "contratoAta"),
            ds3.getValue(j, "cnpj"),
            ds3.getValue(j, "produtoBauminas"),
            tipo[2]
        ]);

    }


    var arrConstrai = []
    if (solic) {
        arrConstrai.push(DatasetFactory.createConstraint("solicitacao", solic, solic, ConstraintType.MUST));
    } else {
        arrConstrai.push(DatasetFactory.createConstraint("solicitacao", "", "", ConstraintType.MUST_NOT));
        arrConstrai.push(DatasetFactory.createConstraint("solicitacao", null, null, ConstraintType.MUST_NOT));
        arrConstrai.push(DatasetFactory.createConstraint("solicitacao", "0", "0", ConstraintType.MUST_NOT));
    }

    if (client) arrConstrai.push(DatasetFactory.createConstraint("codigoCliente", client, client, ConstraintType.MUST));
    if (contract) arrConstrai.push(DatasetFactory.createConstraint("contratoAta", contract, contract, ConstraintType.MUST));
    if (cnpj3) arrConstrai.push(DatasetFactory.createConstraint("cnpj", cnpj3, cnpj3, ConstraintType.MUST));
    if (product) arrConstrai.push(DatasetFactory.createConstraint("produtoBauminas", product, produto, ConstraintType.MUST));

    arrConstrai.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));

    var ds4 = DatasetFactory.getDataset("dsChecklistAlteracaoVendasMercadoPublico", null, arrConstrai, null);

    for (var k = 0; k < ds4.rowsCount; k++) {

        dataset.addRow([
            ds4.getValue(k, "solicitacao"),
            ds4.getValue(k, "codigoCliente"),
            ds4.getValue(k, "contratoAta"),
            ds4.getValue(k, "cnpj"),
            ds4.getValue(k, "produtoBauminas"),
            tipo[2]
        ]);

    }


    return dataset;
}

function findConstraint(fieldName, constraints, defaultValue) {

    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            log.info('-----: ' + constraints[i].fieldName)
            if (constraints[i].fieldName == fieldName) {
                log.info('-----: ' + constraints[i].initialValue)
                return constraints[i].initialValue;
            }
        }
    }
    return null;
}