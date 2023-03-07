function createDataset(fields, constraints, sortFields) {
   try {
      var UNIDADE = getConstraint(constraints, "codUnidade", "");
      var STATUS = getConstraint(constraints, "STATUS", ""); //(0-Em Andamento/2-Finalizada)
      var EMISSAONF = getConstraint(constraints, "dtEmissaoNF", "");
      var RECEBIMENTO = getConstraint(constraints, "dtRecebimento", "");


      var query = "SELECT ";
      query += "  PW.NUM_PROCES, ML.*, NF_ITENS.* ";
      query += "  FROM PROCES_WORKFLOW PW ";
      query += "     INNER JOIN DOCUMENTO DOC ON DOC.NR_DOCUMENTO = PW.NR_DOCUMENTO_CARD AND DOC.VERSAO_ATIVA = 1 ";
      query += "     INNER JOIN ML001341 ML ON ML.DOCUMENTID = DOC.NR_DOCUMENTO AND ML.VERSION = DOC.NR_VERSAO ";
      query += "     INNER JOIN ML001342 NF_ITENS ON NF_ITENS.DOCUMENTID = ML.DOCUMENTID AND NF_ITENS.VERSION = ML.VERSION ";
      query += "WHERE PW.COD_DEF_PROCES = 'wf_nf_fora_prazo' ";

      return executeQuery(query);

   } catch (e) {

      throw "ERRO==============> " + e.lineNumber + e.message;

   }
}

function getConstraint(constraints, fieldName, defaultValue) {
   if (constraints != null) {
      for (var i = 0; i < constraints.length; i++) {
         if (constraints[i].fieldName.toUpperCase() == fieldName.toUpperCase())
            return constraints[i].initialValue;
      }
   }

   return defaultValue;
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
      newDataset.addColumn("ERRO");
      newDataset.addRow(new Array(e.message));
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
   log.dir(newDataset)
   return newDataset;
}