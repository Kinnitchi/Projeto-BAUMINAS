<div id="RELATORIO_FORA_PRAZO_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
   data-params="RELATORIO_FORA_PRAZO.instance()">

   <script type="text/javascript" src="/webdesk/vcXMLRPC.js" charset="utf-8"></script>

   <form name="form" role="form">
      <div class="panel panel-default">
         <div class="panel-heading">
            <legend class="panel-title text-center">Relatório de NF Fora do Prazo</legend>
         </div>
         <div class="panel-body">
            <div class="row form-group">
               <div class="col-sm-6">
                  <label for="unidade">Unidade</label>
                  <input type="hidden" name="codUnidade" id="codUnidade" class="form-control">
                  <input type="text" name="unidade" id="unidade" class="form-control">
               </div>
               <div class="col-sm-3">
                  <label for="dtEmissaoNF">Data Emissão da NF/CTE</label>
                  <div class="input-group date pickDate">
                     <input type="text" class="form-control" name="dtEmissaoNF" id="dtEmissaoNF" mask="00/00/0000"
                        placeholder="Data Emissão da NF/CTE">
                     <span class="input-group-addon">
                        <span class="fluigicon fluigicon-calendar"></span>
                     </span>
                  </div>
               </div>
               <div class="col-sm-3">
                  <label for="dtRecebimento">Data Recebimento</label>
                  <div class="input-group date pickDate">
                     <input type="text" class="form-control" name="dtRecebimento" id="dtRecebimento" mask="00/00/0000"
                        placeholder="Data Recebimento">
                     <span class="input-group-addon">
                        <span class="fluigicon fluigicon-calendar"></span>
                     </span>
                  </div>
               </div>
            </div>
            <div class="row form-group">
               <div class="col-sm-12 text-right">
                  <div class="clearfix"></div>
                  <button type="button" class="btn btn-danger fs-width-100" id="btnClear">
                     Limpar
                     <i class="flaticon flaticon-trash"></i></button>
                  <button type="button" class="btn btn-default fs-width-200" id="btnSearch">
                     Buscar
                     <i class="flaticon flaticon-search"></i>
                  </button>
               </div>
               <br>
               <br>
               <br>
            </div>
            <div class="showTable hide">
               <div class="row form-group">
                  <div class="col-sm-12">
                     <div class="col-md-6" id="hold-button"></div>
                     <div class="col-md-6" id="hold-search"></div>
                     <table class="table table-striped" tablename="tableResult" id="tableResult" name="tableResult"
                        noaddbutton="true" nodeletebutton="true">
                        <thead>
                           <tr>
                              <th class="col-sm-1 text-center">Solicitação</th>
                              <th class="col-sm-2 text-center">Número NF/CTE</th>
                              <th class="col-sm-2 text-center">Data Emissão da NF/CTE</th>
                              <th class="col-sm-2 text-center">Data recebimento</th>
                              <th class="col-sm-3 text-center">Unidade</th>
                              <th class="col-sm-2 text-center">Natureza</th>
                           </tr>
                        </thead>
                     </table>
                     <div class="col-md-6" id="hold-info"></div>
                     <div class="col-md-6 text-right" id="hold-pagination"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </form>
</div>