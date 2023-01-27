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

        var query = " DISTINCT TOP 500 Q3_FILIAL, Q3_DESCSUM, Q3_CC, CONCAT(Q3_FILIAL, ' - ' ,Q3_DESCSUM) AS COD_DESC FROM SQ3010 SQ3 WHERE D_E_L_E_T_ != '*' "

        var clientService = fluigAPI.getAuthorizeClientService();

        if (cod) query += "AND (Q3_FILIAL LIKE '%" + cod + "%' OR Q3_DESCSUM LIKE '%" + cod + "%') ";


        log.info("<<<<<<<<<<<<<<<<<<<< DS_SG1 query >>>>>>>>>>>>>>>>>>>>")
        log.info(query)
        log.info("<<<<<<<<<<<<<<<<<<<< DS_SG1 query >>>>>>>>>>>>>>>>>>>>")

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
            dataset.addColumn("Q3_FILIAL");
            dataset.addColumn("Q3_DESCSUM");
            dataset.addColumn("COD_DESC");
            dataset.addColumn("Q3_CC");

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