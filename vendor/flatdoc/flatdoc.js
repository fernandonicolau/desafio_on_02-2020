!function(e){var t,n=this,s=n.Flatdoc={};s.run=function(t){e(function(){new s.runner(t).run()})},s.file=function(t){return function(n){!function t(n,s,r){0===n.length?r(null,s):e.get(n.shift()).fail(function(e){r(e,null)}).done(function(e){s.length>0&&(s+="\n\n"),t(n,s+=e,r)})}(t instanceof Array?t:[t],"",n)}},s.github=function(t,s,r){var i;return i=s?"https://api.github.com/repos/"+t+"/contents/"+s:"https://api.github.com/repos/"+t+"/readme",r&&(i+="?ref="+r),function(t){e.get(i).fail(function(e){t(e,null)}).done(function(e){var s=n.Base64.decode(e.content);t(null,s)})}},s.bitbucket=function(t,n,s){n||(n="readme.md"),s||(s="default");var r="https://bitbucket.org/api/1.0/repositories/"+t+"/src/"+s+"/"+n;return function(t){e.ajax({url:r,dataType:"jsonp",error:function(e,t,n){alert(n)},success:function(e){var n=e.data;t(null,n)}})}};var r=s.parser={};r.parse=function(s,l){t=n.marked,r.setMarkedOptions(l);var a=e("<div>"+t(s)),o=a.find("h1").eq(0).text();return i.mangle(a),{title:o,content:a,menu:i.getMenu(a)}},r.setMarkedOptions=function(e){t.setOptions({highlight:function(t,n){return n?e(t,n):t}})};var i=s.transformer={};i.mangle=function(e){this.addIDs(e),this.buttonize(e),this.smartquotes(e)},i.addIDs=function(t){var n=["","",""];t.find("h1, h2, h3").each(function(){var t=e(this),r=parseInt(this.nodeName[1]),i=t.text(),l=s.slugify(i);r>1&&(l=n[r-2]+"-"+l),n.length=r-1,n=n.concat([l,l]),t.attr("id",l)})},i.getMenu=function(t){var n={items:[],id:"",level:0},s=[n];return t.find("h1, h2, h3").each(function(){var t=e(this),r=+this.nodeName.substr(1),i=function e(t){s.length=t+1;var r=s[t];if(!r){var i=t>1?e(t-1):n;r={items:[],level:t},s=s.concat([r,r]),i.items.push(r)}return r}(r-1),l={section:t.text(),items:[],level:r,id:t.attr("id")};i.items.push(l),s[r]=l}),n},i.buttonize=function(t){t.find("a").each(function(){var t=e(this),n=t.text().match(/^(.*) >$/);n&&t.text(n[1]).addClass("button")})},i.smartquotes=function(t){for(var n=e(t).find(":not(iframe,pre,code)").andSelf().contents().filter(function(){return 3==this.nodeType&&0===e(this).closest("iframe,pre,code").length}),s=n.length,r=0;r<s;r++){var i=n[r];i.nodeValue=h(i.nodeValue)}};var l=s.highlighters={};l.js=l.javascript=function(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/("[^\"]*?")/g,'<span class="string">$1</span>').replace(/('[^\']*?')/g,'<span class="string">$1</span>').replace(/\/\/(.*)/gm,'<span class="comment">//$1</span>').replace(/\/\*(.*)\*\//gm,'<span class="comment">/*$1*/</span>').replace(/(\d+\.\d+)/gm,'<span class="number">$1</span>').replace(/(\d+)/gm,'<span class="number">$1</span>').replace(/\bnew *(\w+)/gm,'<span class="keyword">new</span> <span class="init">$1</span>').replace(/\b(function|new|throw|return|var|if|else)\b/gm,'<span class="keyword">$1</span>')},l.html=function(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/("[^\"]*?")/g,'<span class="string">$1</span>').replace(/('[^\']*?')/g,'<span class="string">$1</span>').replace(/&lt;!--(.*)--&gt;/g,'<span class="comment">&lt;!--$1--&gt;</span>').replace(/&lt;([^!][^\s&]*)/g,'&lt;<span class="keyword">$1</span>')},l.generic=function(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/("[^\"]*?")/g,'<span class="string">$1</span>').replace(/('[^\']*?')/g,'<span class="string">$1</span>').replace(/(\/\/|#)(.*)/gm,'<span class="comment">$1$2</span>').replace(/(\d+\.\d+)/gm,'<span class="number">$1</span>').replace(/(\d+)/gm,'<span class="number">$1</span>')};var a=s.menuView=function(t){var n=e("<ul>");return function t(n,s){var r=n.id||"root",i=e("<li>").attr("id",r+"-item").addClass("level-"+n.level).appendTo(s);n.section&&e("<a>").html(n.section).attr("id",r+"-link").attr("href","#"+n.id).addClass("level-"+n.level).appendTo(i);if(n.items.length>0){var l=e("<ul>").addClass("level-"+(n.level+1)).attr("id",r+"-list").appendTo(i);n.items.forEach(function(e){t(e,l)})}}(t,n),n},o=s.runner=function(e){this.initialize(e)};function h(e){return e=(e=(e=(e=(e=(e=e.replace(/(^|[\-\u2014\s(\["])'/g,"$1‘")).replace(/'/g,"’")).replace(/(^|[\-\u2014\/\[(\u2018\s])"/g,"$1“")).replace(/"/g,"”")).replace(/\.\.\./g,"…")).replace(/--/g,"—")}o.prototype.root='[role~="flatdoc"]',o.prototype.menu='[role~="flatdoc-menu"]',o.prototype.title='[role~="flatdoc-title"]',o.prototype.content='[role~="flatdoc-content"]',o.prototype.initialize=function(t){e.extend(this,t)},o.prototype.highlight=function(e,t){return(s.highlighters[t]||s.highlighters.generic)(e)},o.prototype.run=function(){var t=this;e(t.root).trigger("flatdoc:loading"),t.fetcher(function(n,r){if(n)console.error("[Flatdoc] fetching Markdown data failed.",n);else{var i=s.parser.parse(r,t.highlight);t.applyData(i,t);var l=location.hash.substr(1);if(l){var a=document.getElementById(l);a&&a.scrollIntoView(!0)}e(t.root).trigger("flatdoc:ready")}})},o.prototype.applyData=function(e){this.el("title").html(e.title),this.el("content").html(e.content.find(">*")),this.el("menu").html(a(e.menu))},o.prototype.el=function(t){return e(this[t],this.root)}}(jQuery),function(){var e={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:a,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:a,lheading:/^([^\n]+)\n *(=|-){3,} *\n*/,blockquote:/^( *>[^\n]+(\n[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:a,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};function t(t){this.tokens=[],this.tokens.links={},this.options=t||h.defaults,this.rules=e.normal,this.options.gfm&&(this.options.tables?this.rules=e.tables:this.rules=e.gfm)}e.bullet=/(?:[*+-]|\d+\.)/,e.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,e.item=l(e.item,"gm")(/bull/g,e.bullet)(),e.list=l(e.list)(/bull/g,e.bullet)("hr",/\n+(?=(?: *[-*_]){3,} *(?:\n+|$))/)(),e._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|@)\\b",e.html=l(e.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,e._tag)(),e.paragraph=l(e.paragraph)("hr",e.hr)("heading",e.heading)("lheading",e.lheading)("blockquote",e.blockquote)("tag","<"+e._tag)("def",e.def)(),e.normal=o({},e),e.gfm=o({},e.normal,{fences:/^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/}),e.gfm.paragraph=l(e.paragraph)("(?!","(?!"+e.gfm.fences.source.replace("\\1","\\2")+"|")(),e.tables=o({},e.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),t.rules=e,t.lex=function(e,n){return new t(n).lex(e)},t.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},t.prototype.token=function(t,n){var s,r,i,l,a,o,h,u,c;for(t=t.replace(/^ +$/gm,"");t;)if((i=this.rules.newline.exec(t))&&(t=t.substring(i[0].length),i[0].length>1&&this.tokens.push({type:"space"})),i=this.rules.code.exec(t))t=t.substring(i[0].length),i=i[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?i:i.replace(/\n+$/,"")});else if(i=this.rules.fences.exec(t))t=t.substring(i[0].length),this.tokens.push({type:"code",lang:i[2],text:i[3]});else if(i=this.rules.heading.exec(t))t=t.substring(i[0].length),this.tokens.push({type:"heading",depth:i[1].length,text:i[2]});else if(n&&(i=this.rules.nptable.exec(t))){for(t=t.substring(i[0].length),o={type:"table",header:i[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:i[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:i[3].replace(/\n$/,"").split("\n")},u=0;u<o.align.length;u++)/^ *-+: *$/.test(o.align[u])?o.align[u]="right":/^ *:-+: *$/.test(o.align[u])?o.align[u]="center":/^ *:-+ *$/.test(o.align[u])?o.align[u]="left":o.align[u]=null;for(u=0;u<o.cells.length;u++)o.cells[u]=o.cells[u].split(/ *\| */);this.tokens.push(o)}else if(i=this.rules.lheading.exec(t))t=t.substring(i[0].length),this.tokens.push({type:"heading",depth:"="===i[2]?1:2,text:i[1]});else if(i=this.rules.hr.exec(t))t=t.substring(i[0].length),this.tokens.push({type:"hr"});else if(i=this.rules.blockquote.exec(t))t=t.substring(i[0].length),this.tokens.push({type:"blockquote_start"}),i=i[0].replace(/^ *> ?/gm,""),this.token(i,n),this.tokens.push({type:"blockquote_end"});else if(i=this.rules.list.exec(t)){for(t=t.substring(i[0].length),l=i[2],this.tokens.push({type:"list_start",ordered:l.length>1}),s=!1,c=(i=i[0].match(this.rules.item)).length,u=0;u<c;u++)h=(o=i[u]).length,~(o=o.replace(/^ *([*+-]|\d+\.) +/,"")).indexOf("\n ")&&(h-=o.length,o=this.options.pedantic?o.replace(/^ {1,4}/gm,""):o.replace(new RegExp("^ {1,"+h+"}","gm"),"")),this.options.smartLists&&u!==c-1&&(l===(a=e.bullet.exec(i[u+1])[0])||l.length>1&&a.length>1||(t=i.slice(u+1).join("\n")+t,u=c-1)),r=s||/\n\n(?!\s*$)/.test(o),u!==c-1&&(s="\n"===o[o.length-1],r||(r=s)),this.tokens.push({type:r?"loose_item_start":"list_item_start"}),this.token(o,!1),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(i=this.rules.html.exec(t))t=t.substring(i[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:"pre"===i[1]||"script"===i[1],text:i[0]});else if(n&&(i=this.rules.def.exec(t)))t=t.substring(i[0].length),this.tokens.links[i[1].toLowerCase()]={href:i[2],title:i[3]};else if(n&&(i=this.rules.table.exec(t))){for(t=t.substring(i[0].length),o={type:"table",header:i[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:i[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:i[3].replace(/(?: *\| *)?\n$/,"").split("\n")},u=0;u<o.align.length;u++)/^ *-+: *$/.test(o.align[u])?o.align[u]="right":/^ *:-+: *$/.test(o.align[u])?o.align[u]="center":/^ *:-+ *$/.test(o.align[u])?o.align[u]="left":o.align[u]=null;for(u=0;u<o.cells.length;u++)o.cells[u]=o.cells[u].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(o)}else if(n&&(i=this.rules.paragraph.exec(t)))t=t.substring(i[0].length),this.tokens.push({type:"paragraph",text:"\n"===i[1][i[1].length-1]?i[1].slice(0,-1):i[1]});else if(i=this.rules.text.exec(t))t=t.substring(i[0].length),this.tokens.push({type:"text",text:i[0]});else if(t)throw new Error("Infinite loop on byte: "+t.charCodeAt(0));return this.tokens};var n={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:a,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:a,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};function s(e,t){if(this.options=t||h.defaults,this.links=e,this.rules=n.normal,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.options.breaks?this.rules=n.breaks:this.rules=n.gfm:this.options.pedantic&&(this.rules=n.pedantic)}function r(e){this.tokens=[],this.token=null,this.options=e||h.defaults}function i(e,t){return e.replace(t?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function l(e,t){return e=e.source,t=t||"",function n(s,r){return s?(r=(r=r.source||r).replace(/(^|[^\[])\^/g,"$1"),e=e.replace(s,r),n):new RegExp(e,t)}}function a(){}function o(e){for(var t,n,s=1;s<arguments.length;s++)for(n in t=arguments[s])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function h(e,n,s){if(s||"function"==typeof n){s||(s=n,n=null),n&&(n=o({},h.defaults,n));var l=t.lex(l,n),a=n.highlight,u=0,c=l.length,p=0;if(!a||a.length<3)return s(null,r.parse(l,n));for(var g=function(){delete n.highlight;var e=r.parse(l,n);return n.highlight=a,s(null,e)};p<c;p++)!function(e){if("code"===e.type)u++,a(e.text,e.lang,function(t,n){if(null==n||n===e.text)return--u||g();e.text=n,e.escaped=!0,--u||g()})}(l[p])}else try{return n&&(n=o({},h.defaults,n)),r.parse(t.lex(e,n),n)}catch(e){if(e.message+="\nPlease report this to https://github.com/chjj/marked.",(n||h.defaults).silent)return"<p>An error occured:</p><pre>"+i(e.message+"",!0)+"</pre>";throw e}}n._inside=/(?:\[[^\]]*\]|[^\]]|\](?=[^\[]*\]))*/,n._href=/\s*<?([^\s]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,n.link=l(n.link)("inside",n._inside)("href",n._href)(),n.reflink=l(n.reflink)("inside",n._inside)(),n.normal=o({},n),n.pedantic=o({},n.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),n.gfm=o({},n.normal,{escape:l(n.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:l(n.text)("]|","~]|")("|","|https?://|")()}),n.breaks=o({},n.gfm,{br:l(n.br)("{2,}","*")(),text:l(n.gfm.text)("{2,}","*")()}),s.rules=n,s.output=function(e,t,n){return new s(t,n).output(e)},s.prototype.output=function(e){for(var t,n,s,r,l="";e;)if(r=this.rules.escape.exec(e))e=e.substring(r[0].length),l+=r[1];else if(r=this.rules.autolink.exec(e))e=e.substring(r[0].length),"@"===r[2]?(n=":"===r[1][6]?this.mangle(r[1].substring(7)):this.mangle(r[1]),s=this.mangle("mailto:")+n):s=n=i(r[1]),l+='<a href="'+s+'">'+n+"</a>";else if(r=this.rules.url.exec(e))e=e.substring(r[0].length),l+='<a href="'+(s=n=i(r[1]))+'">'+n+"</a>";else if(r=this.rules.tag.exec(e))e=e.substring(r[0].length),l+=this.options.sanitize?i(r[0]):r[0];else if(r=this.rules.link.exec(e))e=e.substring(r[0].length),l+=this.outputLink(r,{href:r[2],title:r[3]});else if((r=this.rules.reflink.exec(e))||(r=this.rules.nolink.exec(e))){if(e=e.substring(r[0].length),t=(r[2]||r[1]).replace(/\s+/g," "),!(t=this.links[t.toLowerCase()])||!t.href){l+=r[0][0],e=r[0].substring(1)+e;continue}l+=this.outputLink(r,t)}else if(r=this.rules.strong.exec(e))e=e.substring(r[0].length),l+="<strong>"+this.output(r[2]||r[1])+"</strong>";else if(r=this.rules.em.exec(e))e=e.substring(r[0].length),l+="<em>"+this.output(r[2]||r[1])+"</em>";else if(r=this.rules.code.exec(e))e=e.substring(r[0].length),l+="<code>"+i(r[2],!0)+"</code>";else if(r=this.rules.br.exec(e))e=e.substring(r[0].length),l+="<br>";else if(r=this.rules.del.exec(e))e=e.substring(r[0].length),l+="<del>"+this.output(r[1])+"</del>";else if(r=this.rules.text.exec(e))e=e.substring(r[0].length),l+=i(r[0]);else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return l},s.prototype.outputLink=function(e,t){return"!"!==e[0][0]?'<a href="'+i(t.href)+'"'+(t.title?' title="'+i(t.title)+'"':"")+">"+this.output(e[1])+"</a>":'<img src="'+i(t.href)+'" alt="'+i(e[1])+'"'+(t.title?' title="'+i(t.title)+'"':"")+">"},s.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/--/g,"—").replace(/'([^']*)'/g,"‘$1’").replace(/"([^"]*)"/g,"“$1”").replace(/\.{3}/g,"…"):e},s.prototype.mangle=function(e){for(var t,n="",s=e.length,r=0;r<s;r++)t=e.charCodeAt(r),Math.random()>.5&&(t="x"+t.toString(16)),n+="&#"+t+";";return n},r.parse=function(e,t){return new r(t).parse(e)},r.prototype.parse=function(e){this.inline=new s(e.links,this.options),this.tokens=e.reverse();for(var t="";this.next();)t+=this.tok();return t},r.prototype.next=function(){return this.token=this.tokens.pop()},r.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},r.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},r.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return"<hr>\n";case"heading":return"<h"+this.token.depth+">"+this.inline.output(this.token.text)+"</h"+this.token.depth+">\n";case"code":if(this.options.highlight){var e=this.options.highlight(this.token.text,this.token.lang);null!=e&&e!==this.token.text&&(this.token.escaped=!0,this.token.text=e)}return this.token.escaped||(this.token.text=i(this.token.text,!0)),"<pre><code"+(this.token.lang?' class="'+this.options.langPrefix+this.token.lang+'"':"")+">"+this.token.text+"</code></pre>\n";case"table":var t,n,s,r,l,a="";for(a+="<thead>\n<tr>\n",n=0;n<this.token.header.length;n++)t=this.inline.output(this.token.header[n]),a+=this.token.align[n]?'<th align="'+this.token.align[n]+'">'+t+"</th>\n":"<th>"+t+"</th>\n";for(a+="</tr>\n</thead>\n",a+="<tbody>\n",n=0;n<this.token.cells.length;n++){for(s=this.token.cells[n],a+="<tr>\n",l=0;l<s.length;l++)r=this.inline.output(s[l]),a+=this.token.align[l]?'<td align="'+this.token.align[l]+'">'+r+"</td>\n":"<td>"+r+"</td>\n";a+="</tr>\n"}return"<table>\n"+(a+="</tbody>\n")+"</table>\n";case"blockquote_start":for(a="";"blockquote_end"!==this.next().type;)a+=this.tok();return"<blockquote>\n"+a+"</blockquote>\n";case"list_start":var o=this.token.ordered?"ol":"ul";for(a="";"list_end"!==this.next().type;)a+=this.tok();return"<"+o+">\n"+a+"</"+o+">\n";case"list_item_start":for(a="";"list_item_end"!==this.next().type;)a+="text"===this.token.type?this.parseText():this.tok();return"<li>"+a+"</li>\n";case"loose_item_start":for(a="";"list_item_end"!==this.next().type;)a+=this.tok();return"<li>"+a+"</li>\n";case"html":return this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);case"paragraph":return"<p>"+this.inline.output(this.token.text)+"</p>\n";case"text":return"<p>"+this.parseText()+"</p>\n"}},a.exec=a,h.options=h.setOptions=function(e){return o(h.defaults,e),h},h.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-"},h.Parser=r,h.parser=r.parse,h.Lexer=t,h.lexer=t.lex,h.InlineLexer=s,h.inlineLexer=s.output,h.parse=h,"object"==typeof exports?module.exports=h:"function"==typeof define&&define.amd?define(function(){return h}):this.marked=h}.call(function(){return this||("undefined"!=typeof window?window:global)}()),function(e){"use strict";if(!e.Base64){var t;"undefined"!=typeof module&&module.exports&&(t=require("buffer").Buffer);var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=function(e){for(var t={},n=0,s=e.length;n<s;n++)t[e.charAt(n)]=n;return t}(n),r=String.fromCharCode,i=function(e){if(e.length<2)return(t=e.charCodeAt(0))<128?e:t<2048?r(192|t>>>6)+r(128|63&t):r(224|t>>>12&15)+r(128|t>>>6&63)+r(128|63&t);var t=65536+1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320);return r(240|t>>>18&7)+r(128|t>>>12&63)+r(128|t>>>6&63)+r(128|63&t)},l=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,a=function(e){return e.replace(l,i)},o=function(e){var t=[0,2,1][e.length%3],s=e.charCodeAt(0)<<16|(e.length>1?e.charCodeAt(1):0)<<8|(e.length>2?e.charCodeAt(2):0);return[n.charAt(s>>>18),n.charAt(s>>>12&63),t>=2?"=":n.charAt(s>>>6&63),t>=1?"=":n.charAt(63&s)].join("")},h=e.btoa||function(e){return e.replace(/[\s\S]{1,3}/g,o)},u=t?function(e){return new t(e).toString("base64")}:function(e){return h(a(e))},c=function(e,t){return t?u(e).replace(/[+\/]/g,function(e){return"+"==e?"-":"_"}).replace(/=/g,""):u(e)},p=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),g=function(e){switch(e.length){case 4:var t=((7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3))-65536;return r(55296+(t>>>10))+r(56320+(1023&t));case 3:return r((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return r((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}},f=function(e){return e.replace(p,g)},d=function(e){var t=e.length,n=t%4,i=(t>0?s[e.charAt(0)]<<18:0)|(t>1?s[e.charAt(1)]<<12:0)|(t>2?s[e.charAt(2)]<<6:0)|(t>3?s[e.charAt(3)]:0),l=[r(i>>>16),r(i>>>8&255),r(255&i)];return l.length-=[0,0,2,1][n],l.join("")},m=e.atob||function(e){return e.replace(/[\s\S]{1,4}/g,d)},b=t?function(e){return new t(e,"base64").toString()}:function(e){return f(m(e))},k=function(e){return b(e.replace(/[-_]/g,function(e){return"-"==e?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))};if(e.Base64={VERSION:"2.1.2",atob:m,btoa:h,fromBase64:k,toBase64:c,utob:a,encode:c,encodeURI:function(e){return c(e,!0)},btou:f,decode:k},"function"==typeof Object.defineProperty){var x=function(e){return{value:e,enumerable:!1,writable:!0,configurable:!0}};e.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",x(function(){return k(this)})),Object.defineProperty(String.prototype,"toBase64",x(function(e){return c(this,e)})),Object.defineProperty(String.prototype,"toBase64URI",x(function(){return c(this,!0)}))}}}}(this),function(e){var t=new Array;t[0]={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ő":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ű":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ő":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ű":"u","ý":"y","þ":"th","ÿ":"y"},t[1]={"©":"(c)"},t[2]={"α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ά":"a","έ":"e","ί":"i","ό":"o","ύ":"y","ή":"h","ώ":"w","ς":"s","ϊ":"i","ΰ":"y","ϋ":"y","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ά":"A","Έ":"E","Ί":"I","Ό":"O","Ύ":"Y","Ή":"H","Ώ":"W","Ϊ":"I","Ϋ":"Y"},t[3]={"ş":"s","Ş":"S","ı":"i","İ":"I","ç":"c","Ç":"C","ü":"u","Ü":"U","ö":"o","Ö":"O","ğ":"g","Ğ":"G"},t[4]={"а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"yo","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ё":"Yo","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya"},t[5]={"Є":"Ye","І":"I","Ї":"Yi","Ґ":"G","є":"ye","і":"i","ї":"yi","ґ":"g"},t[6]={"č":"c","ď":"d","ě":"e","ň":"n","ř":"r","š":"s","ť":"t","ů":"u","ž":"z","Č":"C","Ď":"D","Ě":"E","Ň":"N","Ř":"R","Š":"S","Ť":"T","Ů":"U","Ž":"Z"},t[7]={"ą":"a","ć":"c","ę":"e","ł":"l","ń":"n","ó":"o","ś":"s","ź":"z","ż":"z","Ą":"A","Ć":"C","Ę":"e","Ł":"L","Ń":"N","Ó":"o","Ś":"S","Ź":"Z","Ż":"Z"},t[8]={"ā":"a","č":"c","ē":"e","ģ":"g","ī":"i","ķ":"k","ļ":"l","ņ":"n","š":"s","ū":"u","ž":"z","Ā":"A","Č":"C","Ē":"E","Ģ":"G","Ī":"i","Ķ":"k","Ļ":"L","Ņ":"N","Š":"S","Ū":"u","Ž":"Z"};var n=new Object;n.Initialize=function(){if(!n.map){for(var e in n.map={},n.chars="",t){var s=t[e];for(var r in s)n.map[r]=s[r],n.chars+=r}n.regex=new RegExp("["+n.chars+"]|[^"+n.chars+"]+","g")}},downcode=function(e){n.Initialize();var t="",s=e.match(n.regex);if(s)for(var r=0;r<s.length;r++){if(1==s[r].length){var i=n.map[s[r]];if(null!=i){t+=i;continue}}t+=s[r]}else t=e;return t},Flatdoc.slugify=function(e,t){return(e=(e=(e=(e=(e=downcode(e)).replace(/[^-\w\s]/g,"")).replace(/^\s+|\s+$/g,"")).replace(/[-\s]+/g,"-")).toLowerCase()).substring(0,t)}}();