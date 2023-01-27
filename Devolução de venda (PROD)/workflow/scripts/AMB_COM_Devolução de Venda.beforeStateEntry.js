function beforeStateEntry(sequenceId) {
	/**var estabelecimento = hAPI.getCardValue("codigoUnidade")

	var link = "https://bauminashom.fluig.com:9100/"
	sequenceId += ''

	log.info(' -- beforestateentry: sequenceId : ' + sequenceId)
	if (sequenceId == '69') {
		var gestores = getDataset('AMB_COM_gestores_unidades',
			null,
			[
				{ field: 'codUnidade', value: estabelecimento },
			],
			false);
		var destinatarios = []
		gestores.filter(function (elem) {
			destinatarios.push(elem.emailGestor)
		})
		destinatarios = destinatarios.join(';')


		var nftrans = hAPI.getCardValue("nfTransitou");
		var seraRefa = hAPI.getCardValue("seraRefaturada");
		var tipoDeovo = hAPI.getCardValue("tipoDevolucao");
		var informacaoFiscal = "" //hAPI.getCardValue("informacaoFiscal");
		var informFisica = hAPI.getCardValue("informacaoFisica");
	}
**/

}
var handleForm = {
	informacaoFisica: function (value) {
		log.info('value >> ' + value)
		if (value.indexOf("total") > -1)
			return "Devolução Total"
		if (value.indexOf("parcial") > -1)
			return "Devolução Parcial"
		return "--"
	},
	informacaoFiscal: function (value) {
		if (value.indexOf("emitida") > -1)
			return "Nota Fiscal emitida pelo cliente"
		if (value.indexOf("recusa") > -1)
			return "Recusa na Nota Fiscal de venda"
		return "--"
	},
	tipoDevolucao: function (value) {
		if (value.indexOf("fisica") > -1)
			return "Física"
		if (value.indexOf("contabil") > -1)
			return "Contábil"
		return "--"
	},
	tipoSolicitacao: function (value) {
		value += "";

		if (value.indexOf("1") > -1)
			return "Devolução de Venda com Recusa"
		if (value.indexOf("2") > -1)
			return "Devolução de Venda C/ NF Emitida pelo Cliente"
		return "--"

	}, seraRefatorada: function (value) {
		if (value.indexOf("S") > -1)
			return "Sim"
		if (value.indexOf("N") > -1)
			return "Não"
		return "--";
	}, nfTransitou: function (value) {
		if (value.indexOf("S") > -1)
			return "Sim"
		if (value.indexOf("N") > -1)
			return "Não"
		return "--";
	}
}

function sendMailCustom(solicitacao, requisitante, tipoSolicitacao, numeroNF,
	emissao, cliente, unidadeEmissao, nfTransitou, refatorado, tipoDevolucao,
	informacaoFiscal, informacaoFisica, motivo, observacao, linkAcesso, destMails) {
	try {
		solicitacao = solicitacao + ""
		log.info(">> " + " ## " + solicitacao);
		//Monta mapa com parâmetros do template
		var parametros = new java.util.HashMap();
		parametros.put("requisitante", requisitante);
		parametros.put("tipoSolicitacao", tipoSolicitacao);
		parametros.put("numeroNF", numeroNF);
		parametros.put("emissao", emissao);
		parametros.put("cliente", cliente);
		parametros.put("unidadeEmissao", unidadeEmissao);
		parametros.put("nfTransitou", nfTransitou);
		parametros.put("refatorado", refatorado);
		parametros.put("tipoDevolucao", tipoDevolucao);
		parametros.put("informacaoFisica", informacaoFisica);
		parametros.put("informacaoFiscal", informacaoFiscal);
		parametros.put("motivo", motivo);
		parametros.put("observacao", observacao);

		parametros.put("linkAcesso", linkAcesso);
		parametros.put("solicitacao", solicitacao);

		log.info("requisitante" + requisitante);
		log.info("tipoSolicitacao" + tipoSolicitacao);
		log.info("numeroNF" + numeroNF);
		log.info("emissao" + emissao);
		log.info("cliente" + cliente);
		log.info("unidadeEmissao" + unidadeEmissao);
		log.info("nfTransitou" + nfTransitou);
		log.info("refatorado" + refatorado);
		log.info("tipoDevolucao" + tipoDevolucao);
		log.info("informacaoFisica" + informacaoFisica);
		log.info("informacaoFiscal" + informacaoFiscal);
		log.info("motivo" + motivo);
		log.info("observacao" + observacao);
		log.info("linkAcesso" + linkAcesso);
		log.info("solicitacao" + solicitacao);

		//Este parâmetro é obrigatório e representa o assunto do e-mail
		parametros.put("subject", "## " + solicitacao + " Devolução de Venda Iniciada! ");

		//Monta lista de destinatários
		var destinatarios = new java.util.ArrayList();
		destMails = destMails.split(";")
		log.info(">> Dest")
		log.dir(destMails)
		for (var dest = 0; dest < destMails.length; dest++)
			destinatarios.add("" + destMails[dest]);

		//Envia e-mail
		notifier.notify(getValue("WKUser"), "TPL_AMB_COM_devVendas_followUp", parametros, destinatarios, "text/html");

	} catch (e) {
		log.info(e);
	}
}

