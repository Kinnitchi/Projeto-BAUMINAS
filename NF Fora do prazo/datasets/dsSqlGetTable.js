//=================================================
function defineStructure() {}

function onSync(lastSyncDate) {}

function onMobileSync(user) {}
//=================================================

function createDataset(fields, constraints, sortFields) {
	logTexto("INICIANDO DATASET")

	try {

		var codEmpresa = "1";
		var nomeDataset = "DSNotaFiscalforadoprazo";
		var tabelaItens = "tblNF";

		if (constraints != null) {
			for (var i = 0; i < constraints.length; i++) {
				if (constraints[i].fieldName.toUpperCase() == "COD_EMPRESA") {
					codEmpresa = constraints[i].initialValue;
				}

				if (constraints[i].fieldName.toUpperCase() == "NOME_DATASET") {
					nomeDataset = constraints[i].initialValue;
				}

				if (constraints[i].fieldName.toUpperCase() == "TABELA_ITENS") {
					tabelaItens = constraints[i].initialValue;
				}
			}
		}

		if (!codEmpresa || !nomeDataset || !tabelaItens) {
			var dataset = DatasetBuilder.newDataset();
			dataset.addColumn("INFO");
			dataset.addRow(["INFORME O CODIGO DA EMPRESA (COD_EMPRESA) E NOME DO DATASET (NOME_DATASET)!!!"]);
			logTexto("INFORME O CODIGO DA EMPRESA (COD_EMPRESA), O NOME DO DATASET (NOME_DATASET) E O NOME DA TABELA ITEM (TABELA_ITENS)!!!");
			return dataset;
		}

		var query = "";
		query += " SELECT ";
		query += "   CONCAT( ";
		query += "     'ML00', ";
		query += "     EMP, ";
		query += "     TAB ";
		query += "   ) AS TABELA ";
		query += " FROM ( ";
		query += " 		SELECT DISTINCT ";
		query += " 			d.NUM_DOCTO_PROPRIED,";
		query += " 			REPLICATE('0', 3 - LEN(TRIM(CAST(d.COD_EMPRESA AS CHAR)))) + TRIM(CAST(d.COD_EMPRESA AS CHAR)) AS EMP, ";
		query += "      CASE ";
		query += "        WHEN LEN(TRIM(CAST(l.COD_LISTA_FILHO AS CHAR))) < 3 THEN REPLICATE('0', 3 - LEN(TRIM(CAST(l.COD_LISTA_FILHO AS CHAR)))) + TRIM(CAST(l.COD_LISTA_FILHO AS CHAR)) ";
		query += "        ELSE TRIM(CAST(l.COD_LISTA_FILHO AS CHAR))";
		query += "      END AS TAB ";
		query += " 		FROM DOCUMENTO d";
		query += " 		LEFT JOIN SERV_DATASET ds ";
		query += " 			ON ds.COD_DATASET = d.NM_DATASET";
		query += " 		LEFT JOIN META_LISTA_REL l ";
		query += " 			ON l.COD_LISTA_PAI = d.COD_LISTA";
		query += " 		WHERE d.VERSAO_ATIVA = 1";
		query += " 		AND ds.COD_DATASET = '" + nomeDataset + "'";
		query += " 		AND l.COD_TABELA = '" + tabelaItens + "'";
		query += " 		AND d.COD_EMPRESA = '" + codEmpresa + "'";
		query += "  ) TST ";

		logTexto("QUERY: " + query);

		return DatasetFactory.getDataset("dsSqlConsulta", new Array(query), null, null);
	} catch (e) {
		var dataset = DatasetBuilder.newDataset();
		dataset.addColumn("INFO");
		dataset.addRow(["FALHA AO EXECUTAR A QUERY: (" + e.lineNumber + ") " + e.toString()]);
		logTexto("FALHA AO EXECUTAR A QUERY: (" + e.lineNumber + ") " + e.toString());
		return dataset;
	}

}

//=====================================================================================================================
function logTexto(mensagem) {
	mensagem = new String(mensagem);
	mensagem = "-=||=-=||=-=|| (ds_EZ4_SQL_GET_TABELA_ITEM) (SQL SERVER) >>> " + mensagem;

	if (true) {
		log.info(mensagem);
	}

	return mensagem;
}