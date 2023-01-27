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

        var query = " DISTINCT TOP 500 RA_MAT, RA_NOME, RA_RG, RA_NASC, RA_CIC, CONCAT(RA_MAT, ' - ' ,RA_NOME) AS COD_DESC FROM SRA010 SRA WHERE D_E_L_E_T_ != '*' "

        var clientService = fluigAPI.getAuthorizeClientService();

        if (cod) query += "AND (RA_MAT LIKE '%" + cod + "%' OR RA_NOME LIKE '%" + cod + "%') ";


        log.info("<<<<<<<<<<<<<<<<<<<< DS_SRA query >>>>>>>>>>>>>>>>>>>>")
        log.info(query)
        log.info("<<<<<<<<<<<<<<<<<<<< DS_SRA query >>>>>>>>>>>>>>>>>>>>")

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
            dataset.addColumn("RA_NASC");
            dataset.addColumn("RA_MAT");
            dataset.addColumn("RA_NOME");
            dataset.addColumn("RA_RG");
            dataset.addColumn("RA_CIC");
            dataset.addColumn("COD_DESC");

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