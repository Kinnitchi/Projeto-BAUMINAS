//=================================================
function defineStructure() {}

function onSync(lastSyncDate) {}

function onMobileSync(user) {}
//=================================================

function createDataset(fields, constraints, sortFields) {
	logTexto("INICIANDO DATASET")

	var dataAtual = new Date();
	var dataset = DatasetBuilder.newDataset();

	if (fields == null) {
		dataset.addColumn("INFO");
		dataset.addRow(["INFORME UMA QUERY NO PARAMETRO FIELDS!!!"]);
		logTexto("INFORME UMA QUERY NO PARAMETRO FIELDS!!!");
		return dataset;
	}

	var query = fields[0];
	logTexto("QUERY: " + query);

	var dataSource = "/jdbc/AppDS";

	var conn = null;
	var stmt = null;
	var rs = null;
	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);
	var created = false;

	try {
		conn = ds.getConnection();
		stmt = conn.createStatement();
		rs = stmt.executeQuery(query);
		var columnCount = rs.getMetaData().getColumnCount();
		while (rs.next()) {
			if (!created) {
				for (var i = 1; i <= columnCount; i++) {
					dataset.addColumn(rs.getMetaData().getColumnName(i));
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
			dataset.addRow(Arr);
		}
	} catch (e) {
		logTexto("FALHA: " + e.toString());
	} finally {
		try {
			if (rs != null) rs.close();
			if (stmt != null) stmt.close();
			if (conn != null) conn.close();
		} catch (err) {
			logTexto("FALHA AO FECHAR AS CONEXOES: " + err.toString());
		}
	}

	var dataApos = new Date();
	var timeLapse = (dataApos - dataAtual) / 1000;
	logTexto("FIM: " + timeLapse + "seg.");
	return dataset;
}

//================================================================================================================
function logTexto(mensagem) {
	mensagem = new String(mensagem);
	mensagem = "-=||=-=||=-=|| (KITKAT) >>> " + mensagem;

	if (true) {
		log.info(mensagem);
	}

	return mensagem;
}