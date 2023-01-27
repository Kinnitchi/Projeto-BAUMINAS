function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();

    try {

        var cod = null
        if (constraints != null) {
            for (var i = 0; i < constraints.length; i++) {
                log.info('-----: ' + constraints[i].fieldName)
                if (constraints[i].fieldName == "COD_DESC") {
                    cod = constraints[i].initialValue;
                }
            }
        }

        var query = " DISTINCT TOP 500 A4_COD, A4_NOME, A4_NREDUZ, A4_CGC, A4_EMAIL, CONCAT(A4_COD, ' - ' ,A4_NOME) AS COD_DESC FROM SA4010 SA4 WHERE D_E_L_E_T_ != '*' "

        var clientService = fluigAPI.getAuthorizeClientService();

        if (cod) query += "AND (A4_COD LIKE '%" + cod + "%' OR A4_NOME LIKE '%" + cod + "%') ";


        log.info("<<<<<<<<<<<<<<<<<<<< DS_SA4 query >>>>>>>>>>>>>>>>>>>>")
        log.info(query)
        log.info("<<<<<<<<<<<<<<<<<<<< DS_SA4 query >>>>>>>>>>>>>>>>>>>>")

        var data = {
            companyId: getValue("WKCompany") + '',
            serviceCode: 'Integracao_Protheus',
            endpoint: '/rest_hom_fluig/INTERFACEREST/consulta/CONSULTA_PADRAO',
            method: 'put',
            // Conteúdo do JSON que será enviado no POST
            params: {
                "select": query
            },
            // Aqui você pode incluir algum Header se necessário
            headers: {
                'Content-Type': 'application/json',
                "JKey": "Sk9OQVRIQU5PTElWRUlSQUNBTkFWSUVJUkE="
            }
        }

        var result = clientService.invoke(new org.json.JSONObject(data).toString());


        if (result.getResult() == null || result.getResult().isEmpty()) {} else {
            dataset.addColumn("A4_NREDUZ");
            dataset.addColumn("A4_CGC");
            dataset.addColumn("A4_COD");
            dataset.addColumn("A4_NOME");
            dataset.addColumn("COD_DESC");
            dataset.addColumn("A4_EMAIL");

            var retApi = JSON.parse(result.getResult());

            for (indice in retApi) {
                var conteudo = [];
                var row = retApi[indice];
                for (coluna in row) conteudo.push(row[coluna])
                if (conteudo.length) dataset.addRow(conteudo);
            }
        }
    } catch (exception) {
        dataset.addColumn("MENSAGEM");
        dataset.addColumn("LINHA");
        dataset.addRow([exception.toString(), exception.lineNumber]);
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
    return defaultValue;
}