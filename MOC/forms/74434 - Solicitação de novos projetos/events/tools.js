var tools = {
   numAtividade: function () {
      return getValue("WKNumState");
   },
   formatDate: function (date) {

      var dia = date.getDate();
      var mes = date.getMonth() + 1;
      var ano = date.getFullYear();
      var h = date.getHours();
      var m = date.getMinutes();

      if (dia < 10) {
         dia = "0" + dia;
      }
      if (mes < 10) {
         mes = "0" + mes;
      }

      return {
         datetime: dia + "/" + mes + "/" + ano + " " + h + ":" + m,
         date: dia + "/" + mes + "/" + ano
      }

   },

   getUser: function () {
      var dsUser = DatasetFactory.getDataset(
         "colleague",
         null,
         [DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST)],
         null
      );

      return {
         login: dsUser.getValue(0, "login"),
         name: dsUser.getValue(0, "colleagueName")
      }
   }
}