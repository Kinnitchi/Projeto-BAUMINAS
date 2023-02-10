function resolve(process, colleague) {

	var userList = new java.util.ArrayList();

	var table = hAPI.getChildrenIndexes('tableInformados');

	log.info('KINNITCHI --> MEC :' + table.length);


	for (var i = 0; i < table.length; i++) {

		var line = table[i];
		log.info('KINNITCHI --> for :' + line);

		var tableInformado = hAPI.getCardValue("informado_codusuario___" + line);

		log.dir(tableInformado);

		if (tableInformado != "") {

			userList.add(tableInformado);

		}

	}

	return userList;

}