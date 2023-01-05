function afterTaskComplete(colleagueId,nextSequenceId,userList){
	log.info("Teste123");
	log.info("colleagueId: " + colleagueId);
	log.info("nextSequenceId: " + nextSequenceId);
	log.info("Lista de usuários da próxima atividade: ***");
	log.dir(userList);
	log.info("*****");
	log.info(userList);
	log.info("Fim da lista de usuários da próxima atividade");
}