gitbook.require(["gitbook","lodash","jQuery"],function(e,t,o){function n(e){v=lunr(function(){this.ref("url"),this.field("title",{boost:10}),this.field("body")}),e.map(function(e){v.add({url:e[0],title:e[1],body:e[2]})})}function r(){return o.getJSON(e.state.basePath+"/search_index.json").then(n)}function a(e){if(v){var n=t.chain(v.search(e)).map(function(e){var t=e.ref.split("#");return{path:t[0],hash:t[1]}}).value();return k=0===n.length?[]:o(".page-inner").unhighlight(m).highlight(e,m).find("span.search-highlight"),i(0),n}}function i(e){var t=k.length,o=(b=b===undefined?0:b+e)<0;if(0!==e&&(o||b>=t)){var n=s(),r=y.length;if(0===r)return;for(var a=o?0:r;(o&&a<r||!o&&a>=0)&&y.eq(a).data("path")!==n;a+=o?1:-1);(a+=o?-1:1)<0&&(a=r-1),a>=r&&(a=0);var i=y.eq(a).find('a[href$=".html"]');i.length&&i[0].click()}else if(0!==t){var l=k.eq(b);l[0].scrollIntoView(),k.css("background-color",""),l.css("background-color","orange"),setTimeout(function(){l.css("background-color","")},2e3)}}function s(){var e=window.location.pathname;return""===(e=e.substr(e.lastIndexOf("/")+1))?"index.html":e}function l(t){p&&p.remove(),g&&g.remove(),d&&d.remove(),p=o("<div>",{"class":"book-search",role:"search"}),g=o("<label>",{"for":"search-box","aria-hidden":"false",hidden:""}),d=o("<input>",{id:"search-box",type:"search","class":"form-control",val:t,placeholder:"Type to search (Enter for navigation)",title:"Use Enter or the <Down> key to navigate to the next match, or the <Up> key to the previous match"}),g.append("Type to search"),g.appendTo(p),d.appendTo(p),p.prependTo(e.state.$book.find(".book-summary"))}function h(){return e.state.$book.hasClass("with-search")}function c(t){h()!==t&&d&&(e.state.$book.toggleClass("with-search",t),h()?(e.sidebar.toggle(!0),d.focus()):(d.blur(),d.val(""),e.storage.remove("keyword"),e.sidebar.filter(null),o(".page-inner").unhighlight(m)))}function u(n){e.sidebar.filter(t.pluck(n,"path")),y=o("ul.summary").find("li:visible")}function f(){var t=e.storage.get("keyword","");l(t),t.length>0&&(h()||c(!0),u(a(t)))}var d,g,p,b,v=null,k=[],m={className:"search-highlight"},y=[];e.events.bind("start",function(t,n){!1!==n.search&&(!n.toc||"section"===n.toc.collapse||"subsection"===n.toc.collapse,r().then(f),o(document).on("keyup",".book-search input",function(e){var t=e.keyCode?e.keyCode:e.which;27==t?(e.preventDefault(),c(!1)):38==t?i(-1):40!=t&&13!=t||i(1)}).on("input",".book-search input",function(){var t=o(this).val().trim();0===t.length?(e.sidebar.filter(null),e.storage.remove("keyword"),o(".page-inner").unhighlight(m)):(u(a(t)),e.storage.set("keyword",t))}),e.toolbar.createButton({icon:"fa fa-search",label:"Search",position:"left",onClick:c}),e.keyboard.bind(["f"],c))})});