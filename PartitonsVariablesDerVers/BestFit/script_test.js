/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license https://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */(function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var r={};for(var i in e)e.hasOwnProperty(i)&&(r[i]=t.util.clone(e[i]));return r;case"Array":return e.slice()}return e}},languages:{extend:function(e,n){var r=t.util.clone(t.languages[e]);for(var i in n)r[i]=n[i];return r},insertBefore:function(e,n,r,i){i=i||t.languages;var s=i[e],o={};for(var u in s)if(s.hasOwnProperty(u)){if(u==n)for(var a in r)r.hasOwnProperty(a)&&(o[a]=r[a]);o[u]=s[u]}return i[e]=o},DFS:function(e,n){for(var r in e){n.call(e,r,e[r]);t.util.type(e)==="Object"&&t.languages.DFS(e[r],n)}}},highlightAll:function(e,n){var r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');for(var i=0,s;s=r[i++];)t.highlightElement(s,e===!0,n)},highlightElement:function(r,i,s){var o,u,a=r;while(a&&!e.test(a.className))a=a.parentNode;if(a){o=(a.className.match(e)||[,""])[1];u=t.languages[o]}if(!u)return;r.className=r.className.replace(e,"").replace(/\s+/g," ")+" language-"+o;a=r.parentNode;/pre/i.test(a.nodeName)&&(a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+o);var f=r.textContent;if(!f)return;f=f.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ");var l={element:r,language:o,grammar:u,code:f};t.hooks.run("before-highlight",l);if(i&&self.Worker){var c=new Worker(t.filename);c.onmessage=function(e){l.highlightedCode=n.stringify(JSON.parse(e.data),o);t.hooks.run("before-insert",l);l.element.innerHTML=l.highlightedCode;s&&s.call(l.element);t.hooks.run("after-highlight",l)};c.postMessage(JSON.stringify({language:l.language,code:l.code}))}else{l.highlightedCode=t.highlight(l.code,l.grammar,l.language);t.hooks.run("before-insert",l);l.element.innerHTML=l.highlightedCode;s&&s.call(r);t.hooks.run("after-highlight",l)}},highlight:function(e,r,i){return n.stringify(t.tokenize(e,r),i)},tokenize:function(e,n,r){var i=t.Token,s=[e],o=n.rest;if(o){for(var u in o)n[u]=o[u];delete n.rest}e:for(var u in n){if(!n.hasOwnProperty(u)||!n[u])continue;var a=n[u],f=a.inside,l=!!a.lookbehind,c=0;a=a.pattern||a;for(var h=0;h<s.length;h++){var p=s[h];if(s.length>e.length)break e;if(p instanceof i)continue;a.lastIndex=0;var d=a.exec(p);if(d){l&&(c=d[1].length);var v=d.index-1+c,d=d[0].slice(c),m=d.length,g=v+m,y=p.slice(0,v+1),b=p.slice(g+1),w=[h,1];y&&w.push(y);var E=new i(u,f?t.tokenize(d,f):d);w.push(E);b&&w.push(b);Array.prototype.splice.apply(s,w)}}}return s},hooks:{all:{},add:function(e,n){var r=t.hooks.all;r[e]=r[e]||[];r[e].push(n)},run:function(e,n){var r=t.hooks.all[e];if(!r||!r.length)return;for(var i=0,s;s=r[i++];)s(n)}}},n=t.Token=function(e,t){this.type=e;this.content=t};n.stringify=function(e,r,i){if(typeof e=="string")return e;if(Object.prototype.toString.call(e)=="[object Array]")return e.map(function(t){return n.stringify(t,r,e)}).join("");var s={type:e.type,content:n.stringify(e.content,r,i),tag:"span",classes:["token",e.type],attributes:{},language:r,parent:i};s.type=="comment"&&(s.attributes.spellcheck="true");t.hooks.run("wrap",s);var o="";for(var u in s.attributes)o+=u+'="'+(s.attributes[u]||"")+'"';return"<"+s.tag+' class="'+s.classes.join(" ")+'" '+o+">"+s.content+"</"+s.tag+">"};if(!self.document){self.addEventListener("message",function(e){var n=JSON.parse(e.data),r=n.language,i=n.code;self.postMessage(JSON.stringify(t.tokenize(i,t.languages[r])));self.close()},!1);return}var r=document.getElementsByTagName("script");r=r[r.length-1];if(r){t.filename=r.src;document.addEventListener&&!r.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)}})();;
Prism.languages.markup={comment:/&lt;!--[\w\W]*?-->/g,prolog:/&lt;\?.+?\?>/,doctype:/&lt;!DOCTYPE.+?>/,cdata:/&lt;!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/&lt;\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?>/gi,inside:{tag:{pattern:/^&lt;\/?[\w:-]+/i,inside:{punctuation:/^&lt;\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside:{punctuation:/=|>|"/g}},punctuation:/\/?>/g,"attr-name":{pattern:/[\w:-]+/g,inside:{namespace:/^[\w-]+?:/}}}},entity:/&amp;#?[\da-z]{1,8};/gi};Prism.hooks.add("wrap",function(e){e.type==="entity"&&(e.attributes.title=e.content.replace(/&amp;/,"&"))});;
Prism.languages.css={comment:/\/\*[\w\W]*?\*\//g,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*{))/gi,inside:{punctuation:/[;:]/g}},url:/url\((["']?).*?\1\)/gi,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/g,property:/(\b|\B)[\w-]+(?=\s*:)/ig,string:/("|')(\\?.)*?\1/g,important:/\B!important\b/gi,ignore:/&(lt|gt|amp);/gi,punctuation:/[\{\};:]/g};Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{style:{pattern:/(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/ig,inside:{tag:{pattern:/(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/ig,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css}}});;
Prism.languages.clike={comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,lookbehind:!0},string:/("|')(\\?.)*?\1/g,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/ig,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,"boolean":/\b(true|false)\b/g,"function":{pattern:/[a-z0-9_]+\(/ig,inside:{punctuation:/\(/}}, number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator:/[-+]{1,2}|!|&lt;=?|>=?|={1,3}|(&amp;){1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g};
;
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|throw|catch|finally|null|break|continue)\b/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g});Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0}});Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/ig,inside:{tag:{pattern:/(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/ig,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript}}});
;
Prism.hooks.add("after-highlight",function(e){var t=e.element.parentNode;if(!t||!/pre/i.test(t.nodeName)||t.className.indexOf("line-numbers")===-1){return}var n=1+e.code.split("\n").length;var r;lines=new Array(n);lines=lines.join("<span></span>");r=document.createElement("span");r.className="line-numbers-rows";r.innerHTML=lines;if(t.hasAttribute("data-start")){t.style.counterReset="linenumber "+(parseInt(t.getAttribute("data-start"),10)-1)}e.element.appendChild(r)})
;
function Process(size, time) {
	this.size = size;
	this.timeLeft = time;
	this.allocatedBlock = null;
	this.id = processID;
	this.traiter = false;

	processID += 1;

	this.isAllocated = function() {
		return this.allocatedBlock != null;
	};

	this.tick = function() {
		this.timeLeft -=1;
	};
};

function MemControlBlock(size) 
{
	this.size = size;
	this.process = null;
	this.available = true;
	this.next = null;
	this.prev = null;
	this.fromPartition = false; 
	this.setProcess = function(process) 
	{
		if (process == null) 
		{
			this.process = null;
			this.available = true;
		} 
		else 
		{
			this.process = process;
			this.available = false;
		}
	}
}

/***************************************************************************************************************************************************/
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/***************************************************************************************************************************************************/

// Simulates memory
function Heap() {
	this.head = null;
	this.size = 0;

	// Allocate process to memory.
	// Use best-fit method: from the list of holes, choose the smallest hole
/***************************************************************************************************************************************************/
	this.requestAllocation = async function(process) 
	{
		var instructions=document.getElementById("ins");
		blockBestFit = this.head;
		// Make sure our initial best block is valid
		while ((blockBestFit.size < process.size) || (!blockBestFit.available)) {
			blockBestFit = blockBestFit.next;
			if (blockBestFit == null) 
				{
					if (!process.traiter)
					{
						process.traiter = true;
						document.getElementById("loading").style.display="block";
						instructions.innerHTML="Chercher dans MC un block avec une taille la plus proche de "+process.size+" Ko";	
						await sleep(5000);
						instructions.innerHTML="Aucun bloque n'est disponble avec une taille proche de "+process.size+" Ko";
						document.getElementById("memory").style.border="solid rgb(255, 0, 0) 4px";
						await sleep(4000);
						document.getElementById("memory").style.border="solid #2C3E50 4px";
						instructions.innerHTML="Fin";
						await sleep(1000);
						instructions.innerHTML="Instructions";
						document.getElementById("loading").style.display="none";
					}
					enCours = false;
					return false;
				};
		};
		// See if there's an even better block
		document.getElementById("loading").style.display="block";
		instructions.innerHTML="Chercher dans MC un block avec une taille la plus proche de "+process.size+" Ko";	
		await sleep(4000);
		block = blockBestFit.next;
		while (block != null) {
			if ((block.size >= process.size) && (block.available) && (block.size < blockBestFit.size)) {
				blockBestFit = block;
			};
			block = block.next;
		};
		instructions.innerHTML="Il existe un block avec une taille >= la plus proche de "+process.size+" Ko";
		this.repaint1(blockBestFit);
		await sleep(4000);
		this.repaint();
		spaceLeftover = blockBestFit.size - (process.size + memControlBlockSize);
		instructions.innerHTML="Allocation du bloc pour le processus et creation d'un nouveau bloc de taille  ( "+ blockBestFit.size +" - "+process.size+" ) Ko";
		await sleep(4500);
		// Partition block if needed
		if (spaceLeftover > 0) {
			newBlock = new MemControlBlock(spaceLeftover);
			nextBlock = blockBestFit.next;
			if (nextBlock != null) {
				nextBlock.prev = newBlock;
				newBlock.next = nextBlock;
			};
			blockBestFit.next = newBlock;
			newBlock.prev = blockBestFit;
			blockBestFit.size = process.size;
			newBlock.fromPartition = true;
		};
		blockBestFit.setProcess(process);
		process.allocatedBlock = blockBestFit;
		instructions.innerHTML="Fin";
		await sleep(1000);
		instructions.innerHTML="Instructions";
		document.getElementById("loading").style.display="none";
		enCours = false;
		return true;
	}
/***************************************************************************************************************************************************/

	this.deallocateProcess = function(process) {
		process.allocatedBlock.setProcess(null);
		process.allocatedBlock = null;
	}

	this.add = function(block) 
	{
		if (this.head == null) 
		{
			this.head = block;
		} 
		else 
		{
			block.next = this.head;
			this.head.prev = block;
			this.head = block;
		}
		this.size += block.size;
	}

    this.fusionner = function() {
		block=this.head;
		while (block !=null)
		{
			cpt=0;
			newSize=0;
			stop=false;
			if (block.available)
			{
				prec=block.prev;
				while ((block!=null) && (!stop))
				{
					if (block.available)
					{
						cpt++;
						newSize=newSize+block.size;
						block=block.next;
					}
					else stop=true;
				}
				if (cpt>1)
				{
					newBlock = new MemControlBlock(newSize);
					if (prec !=null)
					{
						prec.next=newBlock;
					}
					else this.head=newBlock;
					newBlock.prev=prec;
					newBlock.next=block;
					if (block!=null)
					{
						block.prev=newBlock;
					}
				}
			}
			else block=block.next;
		}
	}

	this.toString = function() {
		string = "[|";
		block = this.head;

		prefix = "";
		suffix = "</span> |";
		while (block != null) {
			if (block.available) {prefix = "<span style='color: #01DF01;'> "} else {prefix = "<span style='color: #FF0000;'> "};
			string += (prefix + block.size + suffix);
			block = block.next;
		};

		string += "]"
		return string;
	};

	this.repaint = function() {
		block = this.head;
		memoryDiv.innerHTML = "";

		while (block != null) 
		{
			height = ((block.size/heap.size)*100);
			if (block.fromPartition) height += (memControlBlockSize/heap.size)*100;

			divBlock = document.createElement("div");
			divBlock.style.height = (height + "%");
			divBlock.setAttribute("id", "block");
			if (block.available) {divBlock.className = "available"} else {divBlock.className = "unavailable"};
			memoryDiv.appendChild(divBlock);

			blockLabel = document.createElement("div");
			blockLabel.setAttribute("id", "blockLabel");
			blockLabel.style.height = "50%";
			blockLabel.innerHTML = block.size + "Ko";
			divBlock.appendChild(blockLabel);
			miniBlock = document.createElement("div");
			miniBlock.setAttribute("id", "miniBlock");
			miniBlock.style.height = "50%";
			divBlock.appendChild(miniBlock);
			if (block.process!=null) miniBlock.innerHTML = "ID: "+block.process.id;
			if ((block.size < 80) && (block.size > 39))
			{
				blockLabel.style.display = "none";
				miniBlock.className = "plus";
				if (block.process!=null) miniBlock.innerHTML = block.size + "Ko" + " (ID: "+block.process.id+")";
				else miniBlock.innerHTML = block.size + "Ko";
			}
			if ((block.size < 40) && (block.size > 23))
			{
				blockLabel.style.display = "none";
				miniBlock.style.display = "none";
				miniBlock1 = document.createElement("div");
				miniBlock1.className = "plus1";
				if (block.process!=null) miniBlock1.innerHTML = block.size + "Ko" + " (ID: "+block.process.id+")";
				else miniBlock1.innerHTML = block.size + "Ko";
				divBlock.appendChild(miniBlock1);
			}
			if (block.size < 24)
			{
				blockLabel.style.display = "none";
				miniBlock.style.display = "none";	
			}
			block = block.next;
		}
	}

	this.repaint1 = function(partition) {
		block = this.head;
		memoryDiv.innerHTML = "";

		while (block != null) 
		{
			height = ((block.size/heap.size)*100);
			if (block.fromPartition) height += (memControlBlockSize/heap.size)*100;

			divBlock = document.createElement("div");
			divBlock.style.height = (height + "%");
			divBlock.setAttribute("id", "block");
			if (block.available) {divBlock.className = "available"} else {divBlock.className = "unavailable"};
			if (block==partition) divBlock.className = "available1";
			memoryDiv.appendChild(divBlock);

			blockLabel = document.createElement("div");
			blockLabel.setAttribute("id", "blockLabel");
			blockLabel.style.height = "50%";
			blockLabel.innerHTML = block.size + "Ko";
			divBlock.appendChild(blockLabel);
			miniBlock = document.createElement("div");
			miniBlock.setAttribute("id", "miniBlock");
			miniBlock.style.height = "50%";
			divBlock.appendChild(miniBlock);
			if (block.process!=null) miniBlock.innerHTML = "ID: "+block.process.id;
			if ((block.size < 80) && (block.size > 39))
			{
				blockLabel.style.display = "none";
				miniBlock.className = "plus";
				if (block.process!=null) miniBlock.innerHTML = block.size + "Ko" + " (ID: "+block.process.id+")";
				else miniBlock.innerHTML = block.size + "Ko";
			}
			if ((block.size < 40) && (block.size > 23))
			{
				blockLabel.style.display = "none";
				miniBlock.style.display = "none";
				miniBlock1 = document.createElement("div");
				miniBlock1.className = "plus1";
				if (block.process!=null) miniBlock1.innerHTML = block.size + "Ko" + " (ID: "+block.process.id+")";
				else miniBlock1.innerHTML = block.size + "Ko";
				divBlock.appendChild(miniBlock1);
			}
			if (block.size < 24)
			{
				blockLabel.style.display = "none";
				miniBlock.style.display = "none";	
			}
			block = block.next;
		}
	}
}

// Handle front-end process submission
document.getElementById("processForm").onsubmit = function () {
/*******************************************************   la boucle if  ******************************************************************************/	
	if (!enCours)
	{
		elements = this.elements;
		inProcessSize = elements.namedItem("processSize");
		inProcessTime = elements.namedItem("processTime");

		process = new Process(parseInt(inProcessSize.value), parseInt(inProcessTime.value));
		processes.push(process);
		addProcessToTable(process);

		// Debug log
		log("Requesting: " + process.size);
		log(heap.toString() + "<br>");

		// Clear form
		inProcessSize.value = "";
		inProcessTime.value = "";
	}
	return false; /****************************************** faire sortir "return false;" de la boucle if *****************************************************/
/***************************************************************************************************************************************************/	
};

function log(string) {
	logBox.innerHTML += (string + "<br />");
}

function addProcessToTable(process) {
	row = document.createElement("tr");
	row.setAttribute("id", "process" + process.id);

	colName = document.createElement("td");
	colName.innerHTML = process.id;

	colSize = document.createElement("td");
	colSize.innerHTML = process.size;

	colTime = document.createElement("td");
	colTime.setAttribute("id", "process" + process.id + "timeLeft");
	colTime.innerHTML = process.timeLeft;

	row.appendChild(colName);
	row.appendChild(colSize);
	row.appendChild(colTime);

	processTable.appendChild(row);
};

function removeProcessFromTable(process) {
	processTable.removeChild(document.getElementById("process" + process.id));
};

// TODO: Update 'time left' for each row in table 
function refreshTable() {
	for (i=0; i<processes.length; i++) {
		process = processes[i];
		document.getElementById("process" + process.id + "timeLeft").innerHTML = process.timeLeft;
	};
};

var logBox = document.getElementById("logBox");
var memoryDiv = document.getElementById("memory");
var processTable = document.getElementById("processTable");

var memControlBlockSize = 0;
var processID = 0;
var processes = [];
var enCours = false;/***********************************************************************************************************************************/


heap = new Heap();
blockSizes = [1024];

for (i=0; i<blockSizes.length; i++) 
{
	heap.add(new MemControlBlock(blockSizes[i]));
}

// Draw initial heap
heap.repaint();

// Start clock
// Loop through all processes and allocate those that require allocation. Deallocate those that have <0 time remaining
var clock = setInterval(async function() {
/************************************************ la coucle if et le mot async  *****************************************************************************/	
	if (!enCours)
	{
		for (i=0; i<processes.length; i++) 
		{
			process = processes[i];
			if (!process.isAllocated()) 
			{
				enCours = true;
				heap.requestAllocation(process);
			} 
			else 
			{
				process.tick();
				if (process.timeLeft < 1) 
				{
					// Deallocate process from heap
					heap.deallocateProcess(process);
					// Remove process from processes array
					index = processes.indexOf(process);
					if (index > -1) {
						processes.splice(index, 1);
					}
					// Remove process from table
					enCours = true;
					removeProcessFromTable(process);
					heap.fusionner();
					var instructions=document.getElementById("ins");
					document.getElementById("loading").style.display="block";
					instructions.innerHTML="Fussionnement du block libéré par le processus "+process.id;
		            await sleep(5000);
					document.getElementById("loading").style.display="none";
					instructions.innerHTML="Instructions";
					enCours = false;
				}
			}
		}
		refreshTable();
		heap.repaint();
	}
/***************************************************************************************************************************************************/	
},1000);