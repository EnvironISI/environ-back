
var template = `
<!DOCTYPE html>
<html>
    <head>
        <link href="https://environ-back.herokuapp.com/pdf/img/favicon.png" rel="shortcut icon"/>
        <meta charset="utf-8"/>
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0" name="viewport"/>
        <link href="https://environ-back.herokuapp.com/pdf/css/auth.css" rel="stylesheet" type="text/css"/>
        <meta content="AnimaApp.com - Design to code, Automated." name="author"/>
    </head>
    <body style="margin: 0;
 background: rgba(255, 255, 255, 1.0);">
        <input id="anPageName" name="page" type="hidden" value="invoicetemplate"/>
        <div class="invoicetemplate anima-word-break ">
            <div style="width: 610px; height: 100%; position:relative; margin:auto;">
                <div class="group">
                    <img alt="Image" anima-src="https://environ-back.herokuapp.com/pdf/img/invoicetemplate-infinity@2x.png" class="infinity" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                    <img alt="Image" anima-src="https://environ-back.herokuapp.com/pdf/img/invoicetemplate-gradient@2x.png" class="gradient" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                </div>
                <div class="environfrontheroku">
                    environ-front.herokuapp.com
                </div>
                <div class="c342maramunicipalde">
                    Câmara Municipal de {{data.name}} (local), ____ de _____ de_____
                </div>
                <div class="ac342maramunicipald">
                    A Câmara Municipal de _______ vem por este meio emitir uma declaração que valida na realização de uma ________ (tipo de evento, exemplo reflorestação) a realizar-se no dia __ de ____ de ____, na_____________ (exemplo praia de Ofir). Mais acrescentamos que este evento cumpre com todos os requisitos legais para que ocorra conforme o espectável, deste modo, as seguintes entidades competentes estarão requisitadas para o efeito: _________ (pack de entidades escolhido), é ainda de referir que a organização deste evento contou com a participação da empresa “environ.”, que se fará representar no evento ao cargo da pessoa, Francisco Barros da Cunha.<br /><br />Sem mais acrescentar, votos de muito sucesso,
                </div>
                <div class="autoriza307303o">
                    AUTORIZAÇÃO
                </div>
                <img alt="Image" anima-src="https://environ-back.herokuapp.com/pdf/img/invoicetemplate-rectangle.png" class="rectangle" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                <div class="groupcopy">
                    <img alt="Image" anima-src="https://environ-back.herokuapp.com/pdf/img/invoicetemplate-combined-shape@2x.png" class="combinedshape" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                    <img alt="Image" anima-src="https://environ-back.herokuapp.com/pdf/img/invoicetemplate-shape@2x.png" class="shape" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                </div>
                <div class="groupcopy2">
                    <img alt="Image" anima-src="https://environ-back.herokuapp.com/pdf/img/invoicetemplate-combined-shape-1@2x.png" class="combinedshape" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                    <img alt="Image" anima-src="https://environ-back.herokuapp.com/pdf/img/invoicetemplate-shape-1@2x.png" class="shape" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
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
                    <div class="eventono">
                        EVENTO NO.
                    </div>
                    <div class="clod0001">
                        {{data.nrEvent}}
                    </div>
                </div>
                <div class="logo">
                    <img alt="Image" anima-src="https://environ-back.herokuapp.com/pdf/img/invoicetemplate-white@2x.png" class="white" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                    <img alt="Image" anima-src="https://environ-back.herokuapp.com/pdf/img/invoicetemplate-sign@2x.png" class="sign" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
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
</html>
`


var template = {
    templateStructure: template,
  };
  
  module.exports = template;