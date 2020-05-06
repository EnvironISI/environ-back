var template = `
   <style>
               

.invoicetemplate {
  width               : 100%;
  min-width           : 2480px;
  height              : 100vh;
  min-height          : 3508px;
  position            : relative;
  overflow            : hidden;
  margin              : 0px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color    : rgba(255, 255, 255, 1.0);
  opacity             : 1.0;
}
a {
  text-decoration     : none;
}
div {
  -webkit-text-size-adjust: none;
}
.anima-full-width-a {
  width               : 100%;
}
.anima-full-height-a {
  height              : 100%;
}
div {
  -webkit-text-size-adjust: none;
}
.invoicetemplate .group {
  background-color    : rgba(255,255,255,0.0);
  top                 : 3357px;
  height              : 123px;
  width               : 335px;
  position            : absolute;
  margin              : 0;
  left                : 1042px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .group .infinity {
  background-color    : rgba(255,255,255,0.0);
  top                 : 0px;
  height              : 123px;
  width               : 123px;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .group .gradient {
  background-color    : rgba(255,255,255,0.0);
  top                 : 38px;
  height              : 46px;
  width               : 191px;
  position            : absolute;
  margin              : 0;
  left                : 144px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .environfrontheroku {
  background-color    : rgba(255,255,255,0.0);
  top                 : 3400px;
  height              : auto;
  width               : auto;
  position            : absolute;
  margin              : 0;
  left                : 2026px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 30.0px;
  color               : rgba(80, 80, 80, 1.0);
  text-align          : left;
  letter-spacing      : -0.15px;
  line-height         : 36.0px;
}
.invoicetemplate .group7 {
  background-color    : rgba(255,255,255,0.0);
  top                 : 2962px;
  height              : 213px;
  width               : 800px;
  position            : absolute;
  margin              : 0;
  left                : 200px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .group7 .notas {
  background-color    : rgba(255,255,255,0.0);
  top                 : 0px;
  height              : auto;
  width               : auto;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 700;
  font-style          : normal;
  font-size           : 40.0px;
  color               : rgba(32, 32, 32, 1.0);
  text-align          : left;
  letter-spacing      : -0.2px;
  line-height         : 48.0px;
}
.invoicetemplate .group7 .pleasepaythetotal {
  background-color    : rgba(255,255,255,0.0);
  top                 : 75px;
  height              : auto;
  width               : 800px;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 30.0px;
  color               : rgba(80, 80, 80, 1.0);
  text-align          : left;
  letter-spacing      : -0.15px;
  line-height         : 36.0px;
}
.invoicetemplate .group7 .obrigadopelaprefer {
  background-color    : rgba(255,255,255,0.0);
  top                 : 177px;
  height              : auto;
  width               : auto;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 30.0px;
  color               : rgba(32, 32, 32, 1.0);
  text-align          : left;
  letter-spacing      : -0.15px;
  line-height         : 36.0px;
}
.invoicetemplate .rectangle {
  background-color    : rgba(255,255,255,0.0);
  top                 : -9px;
  height              : 1478px;
  width               : 2480px;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .ac342maramunicipald {
  background-color    : rgba(255,255,255,0.0);
  top                 : 1804px;
  height              : auto;
  width               : 2316px;
  position            : absolute;
  margin              : 0;
  left                : 122px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 60.0px;
  color               : rgba(47, 47, 47, 1.0);
  text-align          : center;
  letter-spacing      : -0.15px;
  line-height         : 71.0px;
}
.invoicetemplate .c342maramunicipalde {
  background-color    : rgba(255,255,255,0.0);
  top                 : 2701px;
  height              : auto;
  width               : auto;
  position            : absolute;
  margin              : 0;
  left                : 555px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 60.0px;
  color               : rgba(47, 47, 47, 1.0);
  text-align          : center;
  letter-spacing      : -0.15px;
  line-height         : 71.0px;
}
.invoicetemplate .groupcopy {
  background-color    : rgba(255,255,255,0.0);
  top                 : -450px;
  height              : 650px;
  width               : 660px;
  position            : absolute;
  margin              : 0;
  left                : 910px;
  transform           : rotate(0deg);
  opacity             : 0.2;
}
.invoicetemplate .groupcopy .combinedshape {
  background-color    : rgba(255,255,255,0.0);
  top                 : 0px;
  height              : 613px;
  width               : 576px;
  position            : absolute;
  margin              : 0;
  left                : 84px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .groupcopy .shape {
  background-color    : rgba(255,255,255,0.0);
  top                 : 48px;
  height              : 602px;
  width               : 606px;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .groupcopy2 {
  background-color    : rgba(255,255,255,0.0);
  top                 : 908px;
  height              : 650px;
  width               : 660px;
  position            : absolute;
  margin              : 0;
  left                : 1820px;
  transform           : rotate(0deg);
  opacity             : 0.2;
}
.invoicetemplate .groupcopy2 .combinedshape {
  background-color    : rgba(255,255,255,0.0);
  top                 : 0px;
  height              : 613px;
  width               : 265px;
  position            : absolute;
  margin              : 0;
  left                : 395px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .groupcopy2 .shape {
  background-color    : rgba(255,255,255,0.0);
  top                 : 48px;
  height              : 602px;
  width               : 606px;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .group3 {
  background-color    : rgba(255,255,255,0.0);
  top                 : 593px;
  height              : 137px;
  width               : 298px;
  position            : absolute;
  margin              : 0;
  left                : 200px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .group3 .data {
  background-color    : rgba(255,255,255,0.0);
  top                 : 0px;
  height              : auto;
  width               : auto;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 0.8;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 40.0px;
  color               : rgba(255, 255, 255, 1.0);
  text-align          : left;
  letter-spacing      : -0.15px;
  line-height         : 48.0px;
}
.invoicetemplate .group3 .a4thmay2017 {
  background-color    : rgba(255,255,255,0.0);
  top                 : 77px;
  height              : auto;
  width               : auto;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 50.0px;
  color               : rgba(255, 255, 255, 1.0);
  text-align          : left;
  letter-spacing      : -0.15px;
  line-height         : 60.0px;
}
.invoicetemplate .group4copy {
  background-color    : rgba(255,255,255,0.0);
  top                 : 881px;
  height              : 257px;
  width               : 895px;
  position            : absolute;
  margin              : 0;
  left                : 200px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .group4copy .centraltechnologies {
  background-color    : rgba(255,255,255,0.0);
  top                 : 77px;
  height              : auto;
  width               : auto;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 50.0px;
  color               : rgba(255, 255, 255, 1.0);
  text-align          : left;
  letter-spacing      : -0.15px;
  line-height         : 60.0px;
}
.invoicetemplate .group4copy .para {
  background-color    : rgba(255,255,255,0.0);
  top                 : 0px;
  height              : auto;
  width               : auto;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 0.8;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 40.0px;
  color               : rgba(255, 255, 255, 1.0);
  text-align          : left;
  letter-spacing      : -0.15px;
  line-height         : 48.0px;
}
.invoicetemplate .group3copy {
  background-color    : rgba(255,255,255,0.0);
  top                 : 593px;
  height              : 137px;
  width               : 243px;
  position            : absolute;
  margin              : 0;
  left                : 784px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .group3copy .eventono {
  background-color    : rgba(255,255,255,0.0);
  top                 : 0px;
  height              : auto;
  width               : auto;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 0.8;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 40.0px;
  color               : rgba(255, 255, 255, 1.0);
  text-align          : left;
  letter-spacing      : -0.15px;
  line-height         : 48.0px;
}
.invoicetemplate .group3copy .clod0001 {
  background-color    : rgba(255,255,255,0.0);
  top                 : 77px;
  height              : auto;
  width               : auto;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 50.0px;
  color               : rgba(255, 255, 255, 1.0);
  text-align          : left;
  letter-spacing      : -0.15px;
  line-height         : 60.0px;
}
.invoicetemplate .logo {
  background-color    : rgba(255,255,255,0.0);
  top                 : 143px;
  height              : 201px;
  width               : 701px;
  position            : absolute;
  margin              : 0;
  left                : 1590px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .logo .white {
  background-color    : rgba(255,255,255,0.0);
  top                 : 51px;
  height              : 90px;
  width               : 466px;
  position            : absolute;
  margin              : 0;
  left                : 235px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .logo .sign {
  background-color    : rgba(255,255,255,0.0);
  top                 : 0px;
  height              : 201px;
  width               : 201px;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .c302maramunicipalde {
  background-color    : rgba(255,255,255,0.0);
  top                 : 181px;
  height              : auto;
  width               : auto;
  position            : absolute;
  margin              : 0;
  left                : 200px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 66.0px;
  color               : rgba(255, 255, 255, 1.0);
  text-align          : left;
  letter-spacing      : -0.15px;
  line-height         : 79.0px;
}
.invoicetemplate .autoriza307303o {
  background-color    : rgba(255,255,255,0.0);
  top                 : 1558px;
  height              : auto;
  width               : auto;
  position            : absolute;
  margin              : 0;
  left                : 1000px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 700;
  font-style          : normal;
  font-size           : 80.0px;
  color               : rgba(66, 66, 66, 1.0);
  text-align          : left;
  letter-spacing      : -0.2px;
  line-height         : 95.0px;
}
/* .anima-animate-appear prefix for appear animations */
.anima-animate-appear {
  opacity             : 0;
  display             : block;
  -webkit-animation   : anima-reveal 0.3s ease-in-out 1 normal forwards;
  -moz-animation      : anima-reveal 0.3s ease-in 1 normal forwards;
  -o-animation        : anima-reveal 0.3s ease-in-out 1 normal forwards;
  animation           : anima-reveal 0.3s ease-in-out 1 normal forwards;
}
.anima-animate-disappear {
  opacity             : 1;
  display             : block;
  -webkit-animation   : anima-reveal 0.3s ease-in-out 1 reverse forwards;
  -moz-animation      : anima-reveal 0.3s ease-in 1 normal forwards;
  -o-animation        : anima-reveal 0.3s ease-in-out 1 reverse forwards;
  animation           : anima-reveal 0.3s ease-in-out 1 reverse forwards;
}
.anima-animate-nodelay {
  -webkit-animation-delay: 0;
  -moz-animation-delay: 0;
  -o-animation-delay  : 0;
  animation-delay     : 0;
}
@-webkit-keyframes anima-reveal {
  0%
   
  {
      opacity: 0;
    }
  
    
  100%
   
  {
      opacity: 1;
    }
}
@-moz-keyframes anima-reveal {
  0%
   
  {
      opacity: 0;
    }
  
    
  100%
   
  {
      opacity: 1;
    }
}
@-o-keyframes anima-reveal {
  0%
   
  {
      opacity: 0;
    }
  
    
  100%
   
  {
      opacity: 1;
    }
}
@keyframes anima-reveal {
  0%
   
  {
      opacity: 0;
    }
  
    
  100%
   
  {
      opacity: 1;
    }
}
.anima-component-wrapper,
.anima-component-wrapper * {
  pointer-events      : none;
}
.anima-component-wrapper a *,
.anima-component-wrapper a,
.anima-component-wrapper input,
.anima-component-wrapper video,
.anima-component-wrapper iframe,
.anima-listeners-active,
.anima-listeners-active * {
  pointer-events      : auto;
}
.anima-hidden,
.anima-hidden * {
  visibility          : hidden;
  pointer-events      : none;
}
.anima-smart-layers-pointers,
.anima-smart-layers-pointers * {
  pointer-events      : auto;
  visibility          : visible;
}
.anima-component-wrapper.anima-not-ready,
.anima-component-wrapper.anima-not-ready * {
  visibility          : hidden !important;
}
.anima-listeners-active-click,
.anima-listeners-active-click * {
  cursor              : pointer;
}
.anima-word-break {
  overflow-wrap       : break-word;
  word-wrap           : break-word;
  word-break          : break-all;
  word-break          : break-word;
}
    </style>
    <div class="invoicetemplate anima-word-break ">
            <div style="height: 100%; position:relative; margin:auto;">
                <div class="group">
                    <img alt="Image" anima-src="./img/invoicetemplate-infinity@2x.png" class="infinity" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                    <img alt="Image" anima-src="./img/invoicetemplate-gradient@2x.png" class="gradient" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                </div>
                <div class="environfrontheroku">
                    environ-front.herokuapp.com
                </div>
                <div class="group7">
                    <div class="notas">
                        NOTAS
                    </div>
                    <div class="pleasepaythetotal">
                        Please pay the total sum via bank transfer. All payments are due within 7 days.
                    </div>
                    <div class="obrigadopelaprefer">
                        Obrigado pela preferência :)
                    </div>
                </div>
                <img alt="Image" anima-src="./img/invoicetemplate-rectangle.png" class="rectangle" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                <div class="ac342maramunicipald">
                    A Câmara Municipal de _______ vem por este meio emitir uma declaração que valida na realização de uma ________ (tipo de evento, exemplo reflorestação) a realizar-se no dia __ de ____ de ____, na_____________ (exemplo praia de Ofir). Mais acrescentamos que este evento cumpre com todos os requisitos legais para que ocorra conforme o espectável, deste modo, as seguintes entidades competentes estarão requisitadas para o efeito: _________ (pack de entidades escolhido), é ainda de referir que a organização deste evento contou com a participação da empresa “environ.”, que se fará representar no evento ao cargo da pessoa, Francisco Barros da Cunha.<br /><br />Sem mais acrescentar, votos de muito sucesso,
                </div>
                <div class="c342maramunicipalde">
                    Câmara Municipal de _______ (local), ____ de _____ de_____
                </div>
                <div class="groupcopy">
                    <img alt="Image" anima-src="./img/invoicetemplate-combined-shape.png" class="combinedshape" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                    <img alt="Image" anima-src="./img/invoicetemplate-shape-1.png" class="shape" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                </div>
                <div class="groupcopy2">
                    <img alt="Image" anima-src="./img/invoicetemplate-combined-shape-1.png" class="combinedshape" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                    <img alt="Image" anima-src="./img/invoicetemplate-shape-1.png" class="shape" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                </div>
                <div class="group3">
                    <div class="data">
                        DATA
                    </div>
                    <div class="a4thmay2017">
                        4th May 2017
                    </div>
                </div>
                <div class="group4copy">
                    <div class="centraltechnologies">
                        Central Technologies,<br />7155 Lindsey Roads, 38 Hoeger Freeway,<br />Treutel Plains, New York
                    </div>
                    <div class="para">
                        PARA
                    </div>
                </div>
                <div class="group3copy">
                    <div class="eventono">
                        EVENTO NO.
                    </div>
                    <div class="clod0001">
                        CLOD0001
                    </div>
                </div>
                <div class="logo">
                    <img alt="Image" anima-src="./img/invoicetemplate-white.png" class="white" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                    <img alt="Image" anima-src="./img/invoicetemplate-sign@2x.png" class="sign" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                </div>
                <div class="c302maramunicipalde">
                    CÂMARA MUNICIPAL<br />DE ESPOSENDE
                </div>
                <div class="autoriza307303o">
                    AUTORIZAÇÃO
                </div>
            </div>
        </div>`;

var templateDataObject = {
    data: {
        total: '454545',
        total_quantity: '454545',
        freight_charge: '454545',
        discount: '454545',
        sub_total: '454545',
        invoice_name: 'COMMERCIAL INVOICE',
        imgsrc: 'sample1_l.jpg',
        invoice_no: '10597_B001',
        shipto: {
            name: 'ship  sfdfdf',
            address: 'sadasdasd asd as das d dasd asd as das  dasd asd as das  dasd asd as das  dasd asd as das  as dasdd'
        },
        exporter: {
            name: 'expodfdfdf ',
            address: 'sadasdasd asd as das d dasd asd as das  dasd asd as das  dasd asd as das  dasd asd as das  as dasdd'
        },
        importer: {
            name: 'impo sdfgdfgfg',
            address: 'sadasdasd asd as dasfsdfd dsdfgfg '
        },
        table_data: [{
            po_no: 'r',
            sku: 124,
            upc: 21323,
            asin: '232321312vfdg fgfg dfdfgf dfgdfgfgfdgfdgfdg3213213',
            title: 213,
            qty: 213,
            coo: 123,
            knit: 213,
            fabrication: 213,
            hts_no: 213,
            mfr_id: 213,
            cost: 213,
            total: 213
        }, {
            po_no: 'sds',
            sku: 124,
            upc: 21323,
            asin: 2323213123213213,
            title: 213,
            qty: 213,
            coo: 123,
            knit: 213,
            fabrication: 213,
            hts_no: 213,
            mfr_id: 213,
            cost: 213,
            total: 213
        }, {
            po_no: 'dfdf',
            sku: 124,
            upc: 21323,
            asin: 2323213123213213,
            title: 213,
            qty: 213,
            coo: 123,
            knit: 213,
            fabrication: 213,
            hts_no: 213,
            mfr_id: 213,
            cost: 213,
            total: 213
        }],
        organisation_name: 'ALLTIMER',
        currency: '$'
    },
    styles: {
        imageclass: 'image-class',
        page: {
            // css_string: ` .text-header-provided { font-size:14px; color: red;}
            // .text-data-provided { font-size:15px; color: orange;}
            // .table-header-provided { font-size:13px; color: green;}
            // .table-data-provided { font-size:10px; color: cyan;}
            // .table-data-provided  td:nth-child(3) { font-size:12px; color: red; background: green;}
            // `,
            font_size: '8px',
            font_color: '',
            text_header_class: 'text-header-provided',
            text_data_class: 'text-data-provided',
            section_class: 'section-provided',
            container_class: 'container-provided'
        },
        table: {
            table_class: 'table-provided',
            header_class: 'table-header-provided',
            data_class: 'table-data-provided'
        }
    }
};

var template = {
    templateStructure: template,
    templateData: templateDataObject
};

module.exports = template;