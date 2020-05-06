var template = `<!DOCTYPE html>
<html>
    <head>
        <link href="https://environ-back.herokuapp.com/pdf/authorization/img/favicon.png" rel="shortcut icon"/>
        <meta charset="utf-8"/>
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0" name="viewport"/>
       <style type="text/css">
.invoicetemplate {
  width               : 100%;
  min-width           : 793px;
  height              : 100vh;
  min-height          : 1122px;
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
  top                 : 1047px;
  height              : 51px;
  width               : 128px;
  position            : absolute;
  margin              : 0;
  left                : 333px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .group .infinity {
  background-color    : rgba(255,255,255,0.0);
  top                 : 1px;
  height              : 49px;
  width               : 45px;
  position            : absolute;
  margin              : 0;
  left                : 2px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .group .gradient {
  background-color    : rgba(255,255,255,0.0);
  top                 : 17px;
  height              : 19px;
  width               : 72px;
  position            : absolute;
  margin              : 0;
  left                : 56px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .environfrontheroku {
  background-color    : rgba(255,255,255,0.0);
  top                 : 1066px;
  height              : auto;
  width               : 255px;
  position            : absolute;
  margin              : 0;
  left                : 561px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 12.0px;
  color               : rgba(80, 80, 80, 1.0);
  text-align          : left;
  letter-spacing      : -0.15px;
  line-height         : 14.0px;
}
.invoicetemplate .rectangle {
  background-color    : rgba(255,255,255,0.0);
  top                 : 0px;
  height              : 406px;
  width               : 795px;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .c342maramunicipalde {
  background-color    : rgba(255,255,255,0.0);
  top                 : 951px;
  height              : auto;
  width               : 795px;
  position            : absolute;
  margin              : 0;
  left                : -1px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 18.0px;
  color               : rgba(47, 47, 47, 1.0);
  text-align          : center;
  letter-spacing      : -0.15px;
  line-height         : 21.0px;
}
.invoicetemplate .ac342maramunicipald {
  background-color    : rgba(255,255,255,0.0);
  top                 : 572px;
  height              : auto;
  width               : 695px;
  position            : absolute;
  margin              : 0;
  left                : 49px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 21.0px;
  color               : rgba(47, 47, 47, 1.0);
  text-align          : center;
  letter-spacing      : -0.15px;
  line-height         : 25.0px;
}
.invoicetemplate .autoriza307303o {
  background-color    : rgba(255,255,255,0.0);
  top                 : 462px;
  height              : auto;
  width               : 446px;
  position            : absolute;
  margin              : 0;
  left                : 282px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 700;
  font-style          : normal;
  font-size           : 36.0px;
  color               : rgba(66, 66, 66, 1.0);
  text-align          : left;
  letter-spacing      : -0.2px;
  line-height         : 43.0px;
}
.invoicetemplate .groupcopy {
  background-color    : rgba(255,255,255,0.0);
  top                 : -112px;
  height              : 253px;
  width               : 212px;
  position            : absolute;
  margin              : 0;
  left                : 688px;
  transform           : rotate(0deg);
  opacity             : 0.2;
}
.invoicetemplate .groupcopy .combinedshape {
  background-color    : rgba(255,255,255,0.0);
  top                 : 0px;
  height              : 239px;
  width               : 184px;
  position            : absolute;
  margin              : 0;
  left                : 27px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .groupcopy .shape {
  background-color    : rgba(255,255,255,0.0);
  top                 : 19px;
  height              : 234px;
  width               : 194px;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .groupcopy2 {
  background-color    : rgba(255,255,255,0.0);
  top                 : 209px;
  height              : 253px;
  width               : 232px;
  position            : absolute;
  margin              : 0;
  left                : -93px;
  transform           : rotate(0deg);
  opacity             : 0.2;
}
.invoicetemplate .groupcopy2 .combinedshape {
  background-color    : rgba(255,255,255,0.0);
  top                 : 0px;
  height              : 238px;
  width               : 93px;
  position            : absolute;
  margin              : 0;
  left                : 138px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .groupcopy2 .shape {
  background-color    : rgba(255,255,255,0.0);
  top                 : 20px;
  height              : 233px;
  width               : 212px;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .group3 {
  background-color    : rgba(255,255,255,0.0);
  top                 : 277px;
  height              : 59px;
  width               : 209px;
  position            : absolute;
  margin              : 0;
  left                : 306px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .group3 .a4thmay2017 {
  background-color    : rgba(255,255,255,0.0);
  top                 : 37px;
  height              : auto;
  width               : 210px;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 14.0px;
  color               : rgba(255, 255, 255, 1.0);
  text-align          : left;
  letter-spacing      : -0.15px;
  line-height         : 16.0px;
}
.invoicetemplate .group3 .data {
  background-color    : rgba(255,255,255,0.0);
  top                 : 4px;
  height              : auto;
  width               : 82px;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 0.8;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 14.0px;
  color               : rgba(255, 255, 255, 1.0);
  text-align          : left;
  letter-spacing      : -0.15px;
  line-height         : 16.0px;
}
.invoicetemplate .group4copy {
  background-color    : rgba(255,255,255,0.0);
  top                 : 162px;
  height              : 95px;
  width               : 437px;
  position            : absolute;
  margin              : 0;
  left                : 306px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .group4copy .centraltechnologies {
  background-color    : rgba(255,255,255,0.0);
  top                 : 38px;
  height              : auto;
  width               : 436px;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 14.0px;
  color               : rgba(255, 255, 255, 1.0);
  text-align          : left;
  letter-spacing      : -0.15px;
  line-height         : 16.0px;
}
.invoicetemplate .group4copy .para {
  background-color    : rgba(255,255,255,0.0);
  top                 : 4px;
  height              : auto;
  width               : 172px;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 0.8;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 14.0px;
  color               : rgba(255, 255, 255, 1.0);
  text-align          : left;
  letter-spacing      : -0.15px;
  line-height         : 16.0px;
}
.invoicetemplate .group3copy {
  background-color    : rgba(255,255,255,0.0);
  top                 : 164px;
  height              : 51px;
  width               : 376px;
  position            : absolute;
  margin              : 0;
  left                : 168px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .group3copy .clod0001 {
  background-color    : rgba(255,255,255,0.0);
  top                 : 32px;
  height              : auto;
  width               : 144px;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 14.0px;
  color               : rgba(255, 255, 255, 1.0);
  text-align          : left;
  letter-spacing      : -0.15px;
  line-height         : 16.0px;
}
.invoicetemplate .group3copy .eventono {
  background-color    : rgba(255,255,255,0.0);
  top                 : 3px;
  height              : auto;
  width               : 376px;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 0.8;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 14.0px;
  color               : rgba(255, 255, 255, 1.0);
  text-align          : left;
  letter-spacing      : -0.15px;
  line-height         : 16.0px;
}
.invoicetemplate .logo {
  background-color    : rgba(255,255,255,0.0);
  top                 : 48px;
  height              : 71px;
  width               : 224px;
  position            : absolute;
  margin              : 0;
  left                : 434px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .logo .white {
  background-color    : rgba(255,255,255,0.0);
  top                 : 17px;
  height              : 32px;
  width               : 149px;
  position            : absolute;
  margin              : 0;
  left                : 75px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .logo .sign {
  background-color    : rgba(255,255,255,0.0);
  top                 : 0px;
  height              : 71px;
  width               : 64px;
  position            : absolute;
  margin              : 0;
  left                : 0px;
  transform           : rotate(0deg);
  opacity             : 1.0;
}
.invoicetemplate .c302maramunicipalde {
  background-color    : rgba(255,255,255,0.0);
  top                 : 57px;
  height              : auto;
  width               : 341px;
  position            : absolute;
  margin              : 0;
  left                : 35px;
  transform           : rotate(0deg);
  opacity             : 1.0;
  font-family         : "-apple-system", Helvetica, Arial, serif;
  font-weight         : 400;
  font-style          : normal;
  font-size           : 21.0px;
  color               : rgba(255, 255, 255, 1.0);
  text-align          : left;
  letter-spacing      : -0.15px;
  line-height         : 25.0px;
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
        <meta content="AnimaApp.com - Design to code, Automated." name="author"/>
    </head>
    <body style="width: 1024px; height: 100%; margin: 0; background: rgba(255, 255, 255, 1.0);">
        <input id="anPageName" name="page" type="hidden" value="invoicetemplate"/>
        <div class="invoicetemplate anima-word-break ">
            <div style="width: 793px; height: 100%; position:relative; margin:auto;">
                <div class="group">
                    <img alt="OLA" src="https://environ-back.herokuapp.com/pdf/authorization/img/invoicetemplate-infinity@2x.png" class="infinity"/>
                    <img alt="Image" anima-src="https://environ-back.herokuapp.com/pdf/authorization/img/invoicetemplate-gradient@2x.png" class="gradient" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                </div>
                <div class="environfrontheroku">
                    environ-front.herokuapp.com
                </div>
                <img alt="Image" anima-src="https://environ-back.herokuapp.com/pdf/authorization/img/invoicetemplate-rectangle.png" class="rectangle" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                <div class="c342maramunicipalde">
                    Câmara Municipal de {{data.name}} (local), ____ de _____ de_____
                </div>
                <div class="ac342maramunicipald">
                    A Câmara Municipal de _______ vem por este meio emitir uma declaração que valida na realização de uma ________ (tipo de evento, exemplo reflorestação) a realizar-se no dia __ de ____ de ____, na_____________ (exemplo praia de Ofir). Mais acrescentamos que este evento cumpre com todos os requisitos legais para que ocorra conforme o espectável, deste modo, as seguintes entidades competentes estarão requisitadas para o efeito: _________ (pack de entidades escolhido), é ainda de referir que a organização deste evento contou com a participação da empresa “environ.”, que se fará representar no evento ao cargo da pessoa, Francisco Barros da Cunha.<br /><br />Sem mais acrescentar, votos de muito sucesso,
                </div>
                <div class="autoriza307303o">
                    AUTORIZAÇÃO
                </div>
                <div class="groupcopy">
                    <img alt="Image" anima-src="https://environ-back.herokuapp.com/pdf/authorization/img/invoicetemplate-combined-shape@2x.png" class="combinedshape" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                    <img alt="Image" anima-src="https://environ-back.herokuapp.com/pdf/authorization/img/invoicetemplate-shape@2x.png" class="shape" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                </div>
                <div class="groupcopy2">
                    <img alt="Image" anima-src="https://environ-back.herokuapp.com/pdf/authorization/img/invoicetemplate-combined-shape-1@2x.png" class="combinedshape" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                    <img alt="Image" anima-src="https://environ-back.herokuapp.com/pdf/authorization/img/invoicetemplate-shape-1@2x.png" class="shape" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                </div>
                <div class="group3">
                    <div class="a4thmay2017">
                        4th May 2017
                    </div>
                    <div class="data">
                        DATA
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
                    <div class="clod0001">
                        CLOD0001
                    </div>
                    <div class="eventono">
                        EVENTO NO.
                    </div>
                </div>
                <div class="logo">
                    <img alt="Image" anima-src="https://environ-back.herokuapp.com/pdf/authorization/img/invoicetemplate-white@2x.png" class="white" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                    <img alt="Image" anima-src="https://environ-back.herokuapp.com/pdf/authorization/img/invoicetemplate-sign@2x.png" class="sign" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                </div>
                <div class="c302maramunicipalde">
                    CÂMARA MUNICIPAL<br />DE ESPOSENDE
                </div>
            </div>
        </div>
        <!-- Scripts -->
        <script>
            anima_isHidden = function(e) {
                if (!(e instanceof HTMLElement)) return !1;
                if (getComputedStyle(e).display == "none") return !0; else if (e.parentNode && anima_isHidden(e.parentNode)) return !0;
                return !1;
            };
            anima_loadAsyncSrcForTag = function(tag) {
                var elements = document.getElementsByTagName(tag);
                var toLoad = [];
                for (var i = 0; i < elements.length; i++) {
                    var e = elements[i];
                    var src = e.getAttribute("src");
                    var loaded = (src != undefined && src.length > 0 && src != 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
                    if (loaded) continue;
                    var asyncSrc = e.getAttribute("anima-src");
                    if (asyncSrc == undefined || asyncSrc.length == 0) continue;
                    if (anima_isHidden(e)) continue;
                    toLoad.push(e);
                }
                toLoad.sort(function(a, b) {
                    return anima_getTop(a) - anima_getTop(b);
                });
                for (var i = 0; i < toLoad.length; i++) {
                    var e = toLoad[i];
                    var asyncSrc = e.getAttribute("anima-src");
                    e.setAttribute("src", asyncSrc);
                }
            };
            anima_pauseHiddenVideos = function(tag) {
                var elements = document.getElementsByTagName("video");
                for (var i = 0; i < elements.length; i++) {
                    var e = elements[i];
                    var isPlaying = !!(e.currentTime > 0 && !e.paused && !e.ended && e.readyState > 2);
                    var isHidden = anima_isHidden(e);
                    if (!isPlaying && !isHidden && e.getAttribute("autoplay") == "autoplay") {
                        e.play();
                    } else if (isPlaying && isHidden) {
                        e.pause();
                    }
                }
            };
            anima_loadAsyncSrc = function(tag) {
                anima_loadAsyncSrcForTag("img");
                anima_loadAsyncSrcForTag("iframe");
                anima_loadAsyncSrcForTag("video");
                anima_pauseHiddenVideos();
            };
            var anima_getTop = function(e) {
                var top = 0;
                do {
                    top += e.offsetTop || 0;
                    e = e.offsetParent;
                } while (e);
                return top;
            };
            anima_loadAsyncSrc();
            anima_old_onResize = window.onresize;
            anima_new_onResize = undefined;
            anima_updateOnResize = function() {
                if (anima_new_onResize == undefined || window.onresize != anima_new_onResize) {
                    anima_new_onResize = function(x) {
                        if (anima_old_onResize != undefined) anima_old_onResize(x);
                        anima_loadAsyncSrc();
                    };
                    window.onresize = anima_new_onResize;
                    setTimeout(function() {
                        anima_updateOnResize();
                    }, 3000);
                }
            };
            anima_updateOnResize();
            setTimeout(function() {
                anima_loadAsyncSrc();
            }, 200);
        </script>
        <!-- End of Scripts -->
    </body>
</html>`

var templateDataObject = {
  data: {
    name: 'BRAGAGAGGAAGAGA'
  }
};


var template = {
    templateStructure: template,
    templateData: templateDataObject
  };
  
module.exports = template;