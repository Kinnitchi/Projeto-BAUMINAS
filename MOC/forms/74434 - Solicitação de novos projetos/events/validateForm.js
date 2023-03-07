// function validateForm(form) {

//    var msg = "";
//    var WKNumState = getValue("WKNumState");
//    var WKUser = getValue("WKUser");
//    var WKCompletTask = getValue("WKCompletTask");


//    if (WKNumState == 0 || WKNumState == 1) {
//       var evento = form.getValue("evento");
//       evento == '' ? msg += "O <b>Evento</b> é obrigatório.\n" : "";



//       var tableConsultados = form.getChildrenIndexes("tableConsultados");
//       if (tableConsultados.length > 0) {

//          for (var i = 0; i < tableConsultados.length; i++) {
//             var line = tableConsultados[i];
//             var codConsultado = form.getValue("consultado_codusuario___" + line);
//             var consultado = form.getValue("consultado_usuario___" + line);

//             if (consultado == null || consultado == "") {
//                msg += "<li>Linha " + (i + 1) + ": Nenhum consultado foi selecionado<li>";
//             }

//          }

//       } else {

//          msg += "<li>Não há linhas na tabela de consultados<li>";
//       }

//       var tableInformados = form.getChildrenIndexes("tableInformados");
//       if (tableInformados.length > 0) {

//          for (var i = 0; i < tableInformados.length; i++) {
//             var line = tableInformados[i];
//             var codInformado = form.getValue("informado_codusuario___" + line);
//             var informado = form.getValue("informado_usuario___" + line);

//             if (informado == null || informado == "") {
//                msg += "<li>Linha " + (i + 1) + ": Nenhum informado foi selecionado<li>";
//             }

//          }

//       } else {

//          msg += "<li>Não há linhas na tabela de informados<li>";
//       }

//    }


//    if (WKNumState == 6) {

//       var table = form.getChildrenIndexes("tableAprovacoes");

//       for (var i = 0; i < table.length; i++) {

//          var line = table[i];

//          var valorAprovacao = form.getValue("valorAprovacao___" + line);
//          var user = form.getValue("userCod___" + line);

//          if (WKUser == user) {

//             if (valorAprovacao == "") {

//                msg += "A <b>Aprovação</b> é obrigatório.\n";

//             }
//          }

//       }

//    }
//    if (WKCompletTask == "true") {

//       if (msg != "") {
//          msgErro = "<div>" + "<ul>" + msg + "</ul>";
//          exibirMensagem(form, "Favor preencher os campos <b>obrigatórios:</b><br/>" + msgErro);
//       }
//    }
// }

// function exibirMensagem(form, mensagem) {
//    var mobile = form.getMobile() != null && form.getMobile();
//    if (mobile) {
//       throw mensagem;
//    } else {
//       throw "<br><strong>Atenção:</strong> " + mensagem + "</div>";
//    }
// }