var mlPrincipal = "ML001200";
var mlDocumentos = "ML001201";

function createDataset(fields, constraints, sortFields) {
	var constraintsJSON = convertConstraints(constraints);
	var ds = DatasetBuilder.newDataset();
	log.info("constraintsJSON");
	log.dir(constraintsJSON);
	// TESTES DO DATASET //
	//return consulta.Cargo("1007");
	//return consulta.Departamento("01");
	//return consulta.Documento("Api_CSV.rar");
	//return consulta.ListaDocumentos("03","1003");
	//return consulta.Responsavel("01");
	//return consulta.Situacao("1");
	
	if(constraintsJSON.TIPO == undefined || constraintsJSON.TIPO == "") return dsError("É necessário enviar a constraint Tipo para iniciar a execução!");
	
	log.info(">> constraintsJSON[\"TIPO\"] " + constraintsJSON["TIPO"] + (constraintsJSON["TIPO"] == "CARGO"))
	if(constraintsJSON["TIPO"] == "CARGO"){
		log.info(">> constraintsJSON.CARGO: " + constraintsJSON.CARGO);
		if(constraintsJSON.CARGO == undefined || constraintsJSON.CARGO == "") return dsError("Para consultar por cargo é necessário enviar a constraint Cargo!")
		return consulta.Cargo(constraintsJSON.CARGO);
	}else if(constraintsJSON["TIPO"] == "DEPARTAMENTO"){
		if(constraintsJSON.DEPARTAMENTO == undefined || constraintsJSON.DEPARTAMENTO == "") return dsError("Para consultar por departamento é necessário enviar a constraint Departamento!")
		return consulta.Departamento(constraintsJSON.DEPARTAMENTO);
	}else if(constraintsJSON["TIPO"] == "RESPONSAVEL"){
		if(constraintsJSON.RESPONSAVEL == undefined || constraintsJSON.RESPONSAVEL == "") return dsError("Para consultar por responsavel é necessário enviar a constraint Matricula!")
		return consulta.Responsavel(constraintsJSON.RESPONSAVEL);
	}else if(constraintsJSON["TIPO"] == "SITUACAO"){
		if(constraintsJSON.SITUACAO == undefined || constraintsJSON.SITUACAO == "") return dsError("Para consultar por situação é necessário enviar a constraint Situacao (0-Ativo | 1-Inativo)!")
		return consulta.Situacao(constraintsJSON.SITUACAO);
	}else if(constraintsJSON["TIPO"] == "DOCUMENTO"){
		if(constraintsJSON.DOCUMENTO == undefined || constraintsJSON.DOCUMENTO == "") return dsError("Para consultar por documento é necessário enviar a constraint Documento!")
		return consulta.Documento(constraintsJSON.DOCUMENTO);
	}else if(constraintsJSON["TIPO"] == "LISTADOCUMENTOS"){
		if((constraintsJSON.DEPARTAMENTO == undefined || constraintsJSON.DEPARTAMENTO == "") || (constraintsJSON.CARGO == undefined || constraintsJSON.CARGO == "")) return dsError("Para listar os documentos é necessário enviar as constraints Departamento e Cargo!")
		return consulta.ListaDocumentos(constraintsJSON.DEPARTAMENTO,constraintsJSON.CARGO);
	}
	
	return ds;
}


var consulta = {
		Cargo: function (cargo){
			var txtQuery = 
				"SELECT ML.*, \
				CASE \
			        WHEN ML.CHECK_INATIVAR = '' THEN 'Ativo' \
			        WHEN ML.CHECK_INATIVAR = 'null' THEN 'Ativo' \
			        WHEN ML.CHECK_INATIVAR = 'on' THEN 'Inativo' \
		        END STATUS \
				FROM "+mlPrincipal+" ML \
				INNER JOIN (SELECT DOCUMENTID NR_DOCUMENTO, MAX(VERSION) NR_VERSAO FROM "+mlPrincipal+" GROUP BY DOCUMENTID) DOC ON ML.DOCUMENTID = DOC.NR_DOCUMENTO AND ML.VERSION = DOC.NR_VERSAO \
				INNER JOIN DOCUMENTO ON DOC.NR_DOCUMENTO = DOCUMENTO.NR_DOCUMENTO AND DOC.NR_VERSAO = DOCUMENTO.NR_VERSAO \
				WHERE ML.HDN_CARGO = '"+cargo+"' AND DOCUMENTO.VERSAO_ATIVA = 1";
			log.warn(">> txtQuery \n" + txtQuery);
			return executeQuery(txtQuery);
		},
		Departamento: function (departamento){
			var txtQuery = 
				"SELECT ML.*, \
				CASE \
			        WHEN ML.CHECK_INATIVAR = '' THEN 'Ativo' \
			        WHEN ML.CHECK_INATIVAR = 'null' THEN 'Ativo' \
			        WHEN ML.CHECK_INATIVAR = 'on' THEN 'Inativo' \
		        END STATUS \
		        FROM "+mlPrincipal+" ML \
				INNER JOIN (SELECT DOCUMENTID NR_DOCUMENTO, MAX(VERSION) NR_VERSAO FROM "+mlPrincipal+" GROUP BY DOCUMENTID) DOC ON ML.DOCUMENTID = DOC.NR_DOCUMENTO AND ML.VERSION = DOC.NR_VERSAO \
				INNER JOIN DOCUMENTO ON DOC.NR_DOCUMENTO = DOCUMENTO.NR_DOCUMENTO AND DOC.NR_VERSAO = DOCUMENTO.NR_VERSAO \
				WHERE ML.HDN_DEPARTAMENTO = '"+departamento+"' AND DOCUMENTO.VERSAO_ATIVA = 1";
			
			return executeQuery(txtQuery);
		},
		Documento: function (documento){
			var txtQuery = 
				"SELECT ML.*, \
				CASE \
			        WHEN ML.CHECK_INATIVAR = '' THEN 'Ativo' \
			        WHEN ML.CHECK_INATIVAR = 'null' THEN 'Ativo' \
			        WHEN ML.CHECK_INATIVAR = 'on' THEN 'Inativo' \
		        END STATUS \
		        FROM "+mlPrincipal+" ML \
				INNER JOIN (SELECT DOCUMENTID NR_DOCUMENTO, MAX(VERSION) NR_VERSAO FROM "+mlPrincipal+" GROUP BY DOCUMENTID) DOC ON ML.DOCUMENTID = DOC.NR_DOCUMENTO AND ML.VERSION = DOC.NR_VERSAO \
				INNER JOIN DOCUMENTO ON DOC.NR_DOCUMENTO = DOCUMENTO.NR_DOCUMENTO AND DOC.NR_VERSAO = DOCUMENTO.NR_VERSAO \
				INNER JOIN "+mlDocumentos+" mlDoc ON mlDoc.DOCUMENTID = DOC.NR_DOCUMENTO AND mlDoc.VERSION = DOC.NR_VERSAO \
				WHERE mlDoc.zoom_documentos = '"+documento+"' AND DOCUMENTO.VERSAO_ATIVA = 1";
			
			return executeQuery(txtQuery);
		},
		ListaDocumentos: function (departamento,cargo){
			var txtQuery = 
				"SELECT mlDoc.* \
				FROM "+mlPrincipal+" ML \
				INNER JOIN (SELECT DOCUMENTID NR_DOCUMENTO, MAX(VERSION) NR_VERSAO FROM "+mlPrincipal+" GROUP BY DOCUMENTID) DOC ON ML.DOCUMENTID = DOC.NR_DOCUMENTO AND ML.VERSION = DOC.NR_VERSAO \
				INNER JOIN DOCUMENTO ON DOC.NR_DOCUMENTO = DOCUMENTO.NR_DOCUMENTO AND DOC.NR_VERSAO = DOCUMENTO.NR_VERSAO \
				INNER JOIN "+mlDocumentos+" mlDoc ON mlDoc.DOCUMENTID = DOC.NR_DOCUMENTO AND mlDoc.VERSION = DOC.NR_VERSAO \
				WHERE ML.HDN_DEPARTAMENTO = '"+departamento+"' AND ML.HDN_CARGO = '"+cargo+"' AND DOCUMENTO.VERSAO_ATIVA = 1";
			
			return executeQuery(txtQuery);
		},
		Responsavel: function (matricula){
			var txtQuery = 
				"SELECT ML.*, \
				CASE \
			        WHEN ML.CHECK_INATIVAR = '' THEN 'Ativo' \
			        WHEN ML.CHECK_INATIVAR = 'null' THEN 'Ativo' \
			        WHEN ML.CHECK_INATIVAR = 'on' THEN 'Inativo' \
		        END STATUS \
		        FROM "+mlPrincipal+" ML \
				INNER JOIN (SELECT DOCUMENTID NR_DOCUMENTO, MAX(VERSION) NR_VERSAO FROM "+mlPrincipal+" GROUP BY DOCUMENTID) DOC ON ML.DOCUMENTID = DOC.NR_DOCUMENTO AND ML.VERSION = DOC.NR_VERSAO \
				INNER JOIN DOCUMENTO ON DOC.NR_DOCUMENTO = DOCUMENTO.NR_DOCUMENTO AND DOC.NR_VERSAO = DOCUMENTO.NR_VERSAO \
				WHERE ML.HDN_MATRICULA = '"+matricula+"' AND DOCUMENTO.VERSAO_ATIVA = 1";
			
			return executeQuery(txtQuery);
		},
		Situacao: function (situacao){
			var txtQuery = 
				"SELECT ML.*, \
				CASE \
			        WHEN ML.CHECK_INATIVAR = '' THEN 'Ativo' \
			        WHEN ML.CHECK_INATIVAR = 'null' THEN 'Ativo' \
			        WHEN ML.CHECK_INATIVAR = 'on' THEN 'Inativo' \
		        END STATUS \
		        FROM "+mlPrincipal+" ML \
				INNER JOIN (SELECT DOCUMENTID NR_DOCUMENTO, MAX(VERSION) NR_VERSAO FROM "+mlPrincipal+" GROUP BY DOCUMENTID) DOC ON ML.DOCUMENTID = DOC.NR_DOCUMENTO AND ML.VERSION = DOC.NR_VERSAO \
				INNER JOIN DOCUMENTO ON DOC.NR_DOCUMENTO = DOCUMENTO.NR_DOCUMENTO AND DOC.NR_VERSAO = DOCUMENTO.NR_VERSAO \
				WHERE "+(situacao == "1" ? "ML.CHECK_INATIVAR = 'on'" : "(ML.CHECK_INATIVAR = '' OR ML.CHECK_INATIVAR = 'null')")+" AND DOCUMENTO.VERSAO_ATIVA = 1";
			
			return executeQuery(txtQuery);
		}
}

function executeQuery(myQuery) {
    var newDataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/AppDS";
    log.warn(myQuery);
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;

    try {
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        log.dir(rs);
        var columnCount = rs.getMetaData().getColumnCount();
        while (rs.next()) {
            if (!created) {
                for (var i = 1; i <= columnCount; i++) {
                    newDataset.addColumn(rs.getMetaData().getColumnName(i));
                }
                created = true;
            }
            var Arr = new Array();
            for (var i = 1; i <= columnCount; i++) {
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                if (null != obj) {
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                } else {
                    Arr[i - 1] = "null";
                }
            }
            newDataset.addRow(Arr);
        }
    } catch (e) {
        log.error("ERRO==============> " + e.message);
    } finally {
        if (rs != null) {
            rs.close();
        }
        if (stmt != null) {
            stmt.close();
        }
        if (conn != null) {
            conn.close();
        }
        log.warn("finally");
    }
    
    return newDataset;
}

function convertConstraints(constraints){
	var obj = {};
	if(constraints != null){
		constraints.forEach(function(el){
			obj[el.fieldName.toUpperCase()] = el.initialValue.toUpperCase();
		})
	}
	return obj;
}

function dsError(txtErro){
	var ds = DatasetBuilder.newDataset();
	ds.addColumn("ERROR");
	ds.addRow([txtErro]);
	return ds;
}