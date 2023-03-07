log.info('KINNITCHI --> INICIO Do tools:');

var tools = {

	validaParecer: function () {

		log.info('KINNITCHI --> INICIO DA FUNCAO tools.validaParecer :');

		var table = hAPI.getChildrenIndexes("tableAprovacoes");
		var seqParecer = hAPI.getCardValue("seqParecer")

		for (var i = 0; i < table.length; i++) {

			var line = table[i];
			var controleParecer = hAPI.getCardValue("controleParecere___" + line);
			var aprovou = hAPI.getCardValue("valorAprovacao___" + line);

			log.info('KINNITCHI --> SEQPARECER  :' + seqParecer + ' CONTROLEPARECER === ' + controleParecer + ' APROVOU :' + aprovou);

			if (seqParecer == controleParecer && aprovou != "Sim") {

				log.info('KINNITCHI --> SEQPARECER  :' + aprovou);


				return false;
			}
		}

		log.info('KINNITCHI --> RETURN TRUE :');
		return true;

	}
}