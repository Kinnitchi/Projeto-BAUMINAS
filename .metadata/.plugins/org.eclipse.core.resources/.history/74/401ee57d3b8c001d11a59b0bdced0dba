function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
		dataset.addColumn("B1_DESC");	
		dataset.addColumn("B1_COD");
		dataset.addColumn("COD_DESC");
	var cod = findConstraint('COD_DESC', constraints);
	if(!cod) cod = ""
		
	try{
				
        var clientService = fluigAPI.getAuthorizeClientService();
        var cQryWhr = "D_E_L_E_T_ = ' ' AND (SUBSTRING(B1_COD, 1, 2) IN ('30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45') )  AND B1_MSBLQL <> '1' ";
        
        if(cod) cQryWhr += "AND (B1_COD LIKE '%" + cod + "%' OR B1_DESC LIKE '%" + cod + "%') ";
                    
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'Integracao_Protheus',
            endpoint : '/rest_hom_fluig/INTERFACEREST/consulta/PADRAO_PRODUTOS',
            method : 'put',
            // Conteúdo do JSON que será enviado no POST
            params :{
                "select": "TOP 500 B1_COD,B1_DESC, CONCAT(B1_COD, ' - ', B1_DESC) COD_DESC ",
                "where": cQryWhr,
                "order": "B1_COD DESC"
            },
            // Aqui você pode incluir algum Header se necessário
            headers: {
                'Content-Type': 'application/json',
                "JKey": "Sk9OQVRIQU5PTElWRUlSQUNBTkFWSUVJUkE="
            }
        }

        var result = clientService.invoke(new org.json.JSONObject(data).toString());
    
        if (result.getResult()== null || result.getResult().isEmpty()){}
        else{
            var retApi = JSON.parse(result.getResult());
            //Monta o Corpo
            for(indice in retApi){
                var conteudo = [];
                var row = retApi[indice];
                for (coluna in row) conteudo.push(row[coluna].trim())
                if (conteudo.length) dataset.addRow(conteudo);	
            }
		}
	}
	catch(exception){
		dataset.addColumn("MENSAGEM");
		dataset.addColumn("LINHA");
		dataset.addRow([exception.toString(), exception.lineNumber]);
	}

	return dataset;
}

function findConstraint(fieldName, constraints, defaultValue) {
	
	if (constraints != null) {
		for (var i=0; i<constraints.length; i++){
			log.info('-----: '+constraints[i].fieldName)
			if (constraints[i].fieldName == fieldName){
				log.info('-----: '+constraints[i].initialValue)
				return constraints[i].initialValue;
			}
		}
	}
	return defaultValue;
}