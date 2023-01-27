function displayFields(form, customHTML) {

    var atividadeAtual = getValue("WKNumState");

    form.setValue("atividade", atividadeAtual);

    form.setShowDisabledFields(true);

    if (atividadeAtual == 0) {
        form.setValue("log_data", returnDate());
    }
}

function returnDate() {
    newDate = (new java.text.SimpleDateFormat("dd/MM/yyyy")).format(new Date());

    return newDate;
}

function padLeft(valor, incrementa, casas) {
    var newValue = incrementa + valor;
    return newValue.substring(newValue.length - casas);
}