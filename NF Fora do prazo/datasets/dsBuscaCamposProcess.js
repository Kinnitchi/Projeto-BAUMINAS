function defineStructure() {

}

function createDataset(fields, constraints, sortFields) {
  var dataset = DatasetBuilder.newDataset();

  log.info("INICIANDO FUNCAO (createDataset)");

  try {
    var codEmpresa = '1';
    var tabela = getTabelaItemDataset('dsMatrizTreinamento', codEmpresa, 'tableDocuments');
    var tabelaCab = getTabelaDataset('dsMatrizTreinamento', codEmpresa);
    var solicitacao = '';

    if (constraints != null) {
      for (var i = 0; i < constraints.length; i++) {
        if (constraints[i].fieldName.toUpperCase() == "NUMSOLIC") {
          solicitacao = JSON.parse(constraints[i].initialValue);
        }
      }
    }

    /* if (!solicitacao) solicitacao = "" */

    var ctsBacklog = '(';
    for (d = 0; d < solicitacao.length; d++) {
      if (d > 0) {
        ctsBacklog = ctsBacklog + ",";
      }
      ctsBacklog = ctsBacklog + "'" + solicitacao[d] + "'";
    }
    ctsBacklog = ctsBacklog + ')';

    var query = "";
    query += " SELECT ";
    query += " 	 TAB.*, ";
    query += " 	 TAB_CAB.documentid as idCab, ";
    query += " 	 TAB_CAB.*";
    query += " FROM ";
    query += "   PROCES_WORKFLOW WORKFLOW ";
    query += " INNER JOIN DOCUMENTO ";
    query += " 	ON DOCUMENTO.VERSAO_ATIVA = 1 ";
    query += " 	AND DOCUMENTO.LOG_DELETE = 0 ";
    query += " 	AND DOCUMENTO.COD_EMPRESA = WORKFLOW.COD_EMPRESA ";
    query += " 	AND DOCUMENTO.NR_DOCUMENTO = WORKFLOW.NR_DOCUMENTO_CARD ";
    query += "   LEFT JOIN " + tabela + " TAB ";
    query += "     ON WORKFLOW.NR_DOCUMENTO_CARD = TAB.documentid ";
    query += "     AND TAB.version = DOCUMENTO.NR_VERSAO ";
    query += "   INNER JOIN " + tabelaCab + " TAB_CAB ";
    query += "     ON WORKFLOW.NR_DOCUMENTO_CARD = TAB_CAB.documentid ";
    query += "     AND TAB_CAB.version = DOCUMENTO.NR_VERSAO ";
    if ((' ' + solicitacao).trim() !== '') {
      query += "     AND TAB_CAB.documentid IN " + ctsBacklog;
    }
    query += "ORDER BY TAB_CAB.documentid DESC";

    var teste = DatasetFactory.getDataset("dsSqlConsulta", new Array(query), null, null);

    log.dir(teste)

    return teste
  } catch (e) {
    dataset.addRow(["ERRO", e.toString(), e.lineNumber]);
    return dataset;
  }
}

function onMobileSync(user) {

}

function getTabelaItemDataset(nomeDataset, codEmpresa, tabelaItem) {
  logTexto("INICIANDO FUNCAO (getTabelaItemDataset)");
  logTexto("PARAMETRO (nomeDataset): " + nomeDataset);
  logTexto("PARAMETRO (codEmpresa): " + codEmpresa);
  logTexto("PARAMETRO (tabelaItem): " + tabelaItem);

  var tabela = null;
  try {
    var constraints = [];
    constraints.push(DatasetFactory.createConstraint('COD_EMPRESA', codEmpresa, codEmpresa, ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint('NOME_DATASET', nomeDataset, nomeDataset, ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint('TABELA_ITENS', tabelaItem, tabelaItem, ConstraintType.MUST));
    var consultaEZ4 = DatasetFactory.getDataset("dsSqlGetTable", null, constraints, null);

    if (consultaEZ4.rowsCount > 0) {
      tabela = consultaEZ4.getValue(0, "TABELA");
    }

  } catch (e) {
    logTexto("FINALIZANDO FUNCAO (getTabelaItemDataset) | FALHA: (" + e.lineNumber + ")" + e.toString());
    throw e;
  }

  logTexto("FINALIZANDO FUNCAO (getTabelaItemDataset): " + tabela);
  return tabela;
}

function getTabelaDataset(nomeDataset, codEmpresa) {
  logTexto("INICIANDO FUNCAO (getTabelaDataset)");
  logTexto("PARAMETRO (nomeDataset): " + nomeDataset);
  logTexto("PARAMETRO (codEmpresa): " + codEmpresa);

  var tabela = null;
  try {
    var constraints = [];
    constraints.push(DatasetFactory.createConstraint('COD_EMPRESA', codEmpresa, codEmpresa, ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint('NOME_DATASET', nomeDataset, nomeDataset, ConstraintType.MUST));
    var consultaEZ4 = DatasetFactory.getDataset("dsConsultaMatrizTreinamento", null, constraints, null);

    if (consultaEZ4.rowsCount > 0) {
      tabela = consultaEZ4.getValue(0, "TABELA");
    }

  } catch (e) {
    logTexto("FINALIZANDO FUNCAO (getTabelaDataset) | FALHA: (" + e.lineNumber + ")" + e.toString());
    throw e;
  }

  logTexto("FINALIZANDO FUNCAO (getTabelaDataset): " + tabela);
  return tabela;
}

function logTexto(mensagem) {
  mensagem = new String(mensagem);
  mensagem = "-=||=-=||=-=|| (DTS_MV_GRAFICO_PRD) >>> " + mensagem;

  if (true) {
    log.info(mensagem);
  }

  return mensagem;
}