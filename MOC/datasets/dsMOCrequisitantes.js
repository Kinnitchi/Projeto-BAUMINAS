function defineStructure() {
	addColumn("colleagueId");

	setKey(["colleagueId"]);
	addIndex(["colleagueId"]);
}

function onSync(lastSyncDate) {
	var ds = DatasetBuilder.newDataset();

	var dsPai = DatasetFactory.getDataset(
		"DSCadastrodaMatrizRACI",
		null,
		[
			DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST)
		],
		null)


	var arr = new Array();


	for (var i = 0; i < dsPai.rowsCount; i++) {

		var dsResponsaveis = DatasetFactory.getDataset(
			"DSCadastrodaMatrizRACI",
			null,
			[
				DatasetFactory.createConstraint("metadata#id", dsPai.getValue(i, "metadata#id"), dsPai.getValue(i, "metadata#id"), ConstraintType.MUST),
				DatasetFactory.createConstraint("metadata#version", dsPai.getValue(i, "metadata#version"), dsPai.getValue(i, "metadata#version"), ConstraintType.MUST),
				DatasetFactory.createConstraint("tablename", "tableResponsaveis", "tableResponsaveis", ConstraintType.MUST)
			],
			null)

		// if ([dsResponsaveis.getValue(i, "dado_responsavel")] != null || [dsResponsaveis.getValue(i, "dado_responsavel")] != undefined || [dsResponsaveis.getValue(i, "dado_responsavel")] != "") {

		for (var j = 0; j < dsResponsaveis.rowsCount; j++) {


			log.info('KINNITCHI --> ARRAY MOC :' + arr);
			log.dir(arr);

			var matricula = dsResponsaveis.getValue(j, "dado_responsavel") + '';


			if (arr.indexOf(matricula) == -1) {

				log.info('KINNITCHI --> ARR INDEXOF :' + arr.indexOf(matricula) === -1);
				log.dir(arr);

				arr.push(matricula);

				ds.addOrUpdateRow([matricula]);


			}


		}
		// }


		/* 	
		for (var j = 0; j < dsResponsaveis.rowsCount; j++) {

			if (dsResponsaveis.getValue(j, "tipo_responsavel") == "user") {
					ds.addOrUpdateRow([dsResponsaveis.getValue(j, "dado_responsavel")]);
				} else if (dsResponsaveis.getValue(j, "tipo_responsavel") == "group") {
					var dsColleagueGroup = DatasetFactory.getDataset(
						"colleagueGroup",
						null,
						[
							DatasetFactory.createConstraint("colleagueGroupPK.groupId", dsResponsaveis.getValue(j, "dado_responsavel"), dsResponsaveis.getValue(j, "dado_responsavel"), ConstraintType.MUST)
						],
						null
					)

					for (var k = 0; k < dsColleagueGroup.rowsCount; k++) {
						ds.addOrUpdateRow([dsColleagueGroup.getValue(k, "colleagueGroupPK.colleagueId")]);
					}
				} else if (dsResponsaveis.getValue(j, "tipo_responsavel") == "role") {
					var dsColleagueRole = DatasetFactory.getDataset(
						"workflowColleagueRole",
						null,
						[
							DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", dsResponsaveis.getValue(j, "dado_responsavel"), dsResponsaveis.getValue(j, "dado_responsavel"), ConstraintType.MUST)
						],
						null
					)

					for (var k = 0; k < dsColleagueGroup.rowsCount; k++) {
						ds.addOrUpdateRow([dsColleagueGroup.getValue(k, "workflowColleagueRolePK.colleagueId")]);
					}
				}
			}
			*/
	}

	return ds;
}