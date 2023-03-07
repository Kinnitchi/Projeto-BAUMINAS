function resolve(process, colleague) {

	var userList = new java.util.ArrayList();
	var ds = DatasetFactory.getDataset("dsMOCrequisitantes", null, null, null);

	for (var i = 0; i < ds.rowsCount; i++) {

		userList.add(ds.getValue(i, "colleagueId"));

	}

	return userList;

}