function resolve(process, colleague) {

	var userList = new java.util.ArrayList();

	var table = hAPI.getChildrenIndexes('tableConsultados')

	for (var i = 0; i < table.length; i++) {

		var line = table[i];
		log.info('KINNITCHI --> for :' + line);

		var consultados = hAPI.getCardValue("consultado_codusuario___" + line);

		if (consultados != "") {

			userList.add(consultados);

		}

	}

	return userList;

}