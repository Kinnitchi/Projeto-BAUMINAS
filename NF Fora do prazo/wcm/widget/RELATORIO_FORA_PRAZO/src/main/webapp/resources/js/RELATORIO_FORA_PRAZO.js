var loading = FLUIGC.loading(window);
var RELATORIO_FORA_PRAZO = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function () {
        this.callendar();
        this.search();
        this.btnClear();
        this.select2Fields();
    },

    //BIND de eventos
    bindings: {
        local: {},
        global: {}
    },

    search: function () {

        $("#btnSearch").on("click", () => {
            loading.show();
            this.clear();
            setTimeout(() => {
                document.querySelector(".showTable").classList.remove("hide");
                this.searchReturn();
                loading.hide();
            }, 1000);
        })
    },
    btnClear: function () {

        $("#btnClear").on("click", () => {

            $("#unidade").select2("val", "")
            $('#select2-unidade-container').text('')
            document.querySelector("#codUnidade").value = "";
            document.querySelector("#dtEmissaoNF").value = "";
            document.querySelector("#dtRecebimento").value = "";
            this.clear();
        })
    },
    dataset: function () {

        const dataset = DatasetFactory.getDataset(
            "ds_adiant_reemb_unidades",
            null,
            [
                DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST)
            ],
            null);

        return dataset.values
    },
    getValues: function (ds) {
        return {
            id: ds.id,
            text: ds.unidade
        }
    },
    select2Fields: async function () {

        let dados = this.dataset();
        let values = dados.map(this.getValues);

        $('#unidade').select2({
            data: values,
            placeholder: "Selecione a unidade",
            theme: "bootstrap"

        });

        $('#unidade').on('select2:select', function (e) {
            const data = e.params.data;
            document.querySelector("#codUnidade").value = data.id;
        });
    },

    callendar: async function () {
        FLUIGC.calendar("#dtEmissaoNF, #dtRecebimento", {
            language: 'pt-br',
            timeZone: 'UTC',
            pickDate: true,
            pickTime: false
        });
    },
    searchReturn: async function () {
        var that = this;

        let unidade = document.querySelector("#codUnidade").value;
        let dataEmissao = document.querySelector("#dtEmissaoNF").value;
        let dataRecebimento = document.querySelector("#dtRecebimento").value;


        var constraint = new Array();

        unidade ? constraint.push(DatasetFactory.createConstraint("COD_UNIDADE", unidade, unidade, ConstraintType.MUST)) : "";
        dataEmissao ? constraint.push(DatasetFactory.createConstraint("DATA_EMISSAO", dataEmissao, dataEmissao, ConstraintType.MUST)) : "";
        dataRecebimento ? constraint.push(DatasetFactory.createConstraint("DATA_RECEBIMENTO", dataRecebimento, dataRecebimento, ConstraintType.MUST)) : "";

        var dataset = DatasetFactory.getDataset('dsRelatorioNFForaPrazo', null, constraint, null).values;

        that.myTable = $("#tableResult").DataTable({
            data: dataset,
            columns: [{
                data: 'SOLICITACAO',
                className: 'center'
            }, {
                data: 'NF',
                className: 'left'
            }, {
                data: 'DATA_EMISSAO',
                className: 'center'
            }, {
                data: 'DATA_RECEBIMENTO',
                className: 'center'
            }, {
                data: 'UNIDADE',
                className: 'rigth'
            }, {
                data: 'NATUREZA',
                className: 'rigth'
            }],
            dom: 'Bfrtip',
            buttons: ['excel'],
            destroy: true,
            keys: true,
            info: true,
            paginate: true,
            filter: true,
            language: {
                "sEmptyTable": "Nenhum registro encontrado",
                "sInfo": "_TOTAL_ registros",
                "sInfoEmpty": "0 registros",
                "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                "sInfoPostFix": "",
                "sInfoThousands": ".",
                "sLengthMenu": "_MENU_ resultados por página",
                "sLoadingRecords": "Carregando...",
                "sProcessing": "Processando...",
                "sZeroRecords": "Nenhum registro encontrado",
                "sSearch": "Pesquisar",
                "oPaginate": {
                    "sNext": " >>",
                    "sPrevious": "<< ",
                    "sFirst": "Primeiro",
                    "sLast": "Último"
                }
            }
        }, function (err, data) {
            // DO SOMETHING (error or success)
        })


        $("#tableResult").removeAttr("style");
        $("#tableResult_wrapper").addClass("col-md-12");
        $("div.dt-buttons").appendTo("#hold-button");
        $("#tableResult_filter").appendTo("#hold-search");
        $("#tableResult_info").appendTo("#hold-info");
        $("#tableResult_paginate").appendTo("#hold-pagination");
        $("#tableResult_length, #tableResult_info").addClass("col-md-6");
        $("#tableResult_filter, #tableResult_paginate").addClass("pull-right");
        $("#tableResult_filter input").addClass("form-control");
        $("div.dt-buttons").addClass("form-group");
        $(".dt-button.buttons-excel").addClass("btn btn-success");
        $(".dt-button.buttons-excel>span").text("Exportar ");
        $(".dt-button.buttons-excel>span").append('<i class="fluigicon fluigicon-file-xlsx icon-sm" aria-hidden="true"></i>');

        $('.buttons-excel').on('click', function () {

            loading.show();
            setTimeout(() => {
                loading.hide();
            }, 4000)

        })

    },

    clear: function () {
        $("#tableResult").DataTable().destroy();
        $("#hold-button > *, #hold-search > *, #hold-info > *, #hold-pagination > *").remove();
    },
    isEmpty: function (value) {
        if (value == null || value == undefined || value == "") {
            return true;
        }
        return false;
    }


});