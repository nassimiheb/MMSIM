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

	processID += 1;

	this.isAllocated = function() {
		return this.allocatedBlock != null;
	};

	this.tick = function() {
		this.timeLeft -=1;
	};
};

function MemControlBlock(size) {
	this.size = size;
	this.process = null;
	this.available = true;
	this.next = null;
	this.prev = null;
	this.fromPartition = false; // Used to determine whether height of a MemControlBlock needs to be added

	this.setSize = function (size) { this.size=size;}

	this.setProcess = function(process) {
		if (process == null) {
			this.process = null;
			this.available = true;
		} else {
			this.process = process;
			this.available = false;
		};
	};
};

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
     	/*document.getElementById("loading").style.display="block";
		var instructions=document.getElementById("ins");
		instructions.innerHTML="Chercher dans MC le premier bloc dont la taille est la puissance de 2 sup ou égale à "+ process.size +" Ko";	
		await sleep(3000);*/
	this.requestAllocation = async function(process) {
		
		block = this.head;
            while ((block.size < process.size) || (!block.available)) {
			block = block.next;
			if (block== null) 
			{
				enCours = false;
				return false
			}; // Means we couldn't even find an initial valid block
		};

		block1 = block;
            // instructions.innerHTML="Subdivision du block trouvé en 2 jusqu'à obtenir le bloc ayant la taille correspondante";
            //await sleep(2000);
	    	while (((block1.size/2) >= process.size) && (block1.available)) {
	    	
			block1.setSize(block1.size/2);
			newBlock = new MemControlBlock(block1.size);
			
			nextBlock= block1.next;
			if (nextBlock != null) {
                nextBlock.prev = newBlock;
				newBlock.next = nextBlock;
			};
			block1.next=newBlock;
			newBlock.prev=block1; 
			if (block1.prev==null) this.head=block1;
			this.repaint();
			await sleep(2000);
			// Means we couldn't even find an initial valid block*/
		};
	        
		if (process.size <= block1.size ) 
		{
			block1.setProcess(process);
		    process.allocatedBlock = block1;
		    enCours = false;
		    return true;
		}
	    
	};

	this.deallocateProcess = function(process) {
		process.allocatedBlock.setProcess(null);
		process.allocatedBlock = null;
	};

	this.add = function(block) {
		if (this.head == null) {
			this.head = block;
		} else {
			block.next = this.head;
			this.head.prev = block;
			this.head = block;
		};

		this.size += block.size;
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


	this.fusionner = function() {
		Adr=-1;
        block=this.head;
        Cumule=0;
        Bsize=0;
        Nextsize=0;
        Newsize=0;
        	while (block !=null)
		{

			if (block.available)
			{
				Bsize=block.size;
				Cumule=Cumule+Bsize;
				Adr=Adr+Bsize;
				Nextblock=block.next;
				if ((Nextblock!=null) &&(Nextblock.available))
				{
					Nextsize=Nextblock.size;
					if (Bsize==Nextsize)
					{
						Adr=Adr+Nextsize;
						Newsize=2*Bsize;
						if (((Cumule+Bsize-1) == Adr)&&((Adr+1)%Newsize==0))
						{
							Cumule=Cumule+Bsize;
							NewBlock=new MemControlBlock(Newsize);
							NewBlock.next=Nextblock.next;
							NewBlock.prev=block.prev;

							if ((block.prev)!=null)
							{
								block.prev.next=NewBlock;
							}else this.head=NewBlock;

							if ((Nextblock.next)!=null)
							{
								Nextblock.next.prev=NewBlock;
							}
							console.log("ici");
							block=block.next.next;
						}else
						{
							Adr=Adr-Nextsize;
							block=block.next;
						}
					}else 
					{
						block=block.next;
					}
				}else
				{
					if (block.next!=null)
					{
						//block=block.next;
					    Adr=Adr+block.next.size;
					    block=block.next; 
					}else 
					block=block.next;
						
				}
			}else 
			{
				Cumule=Cumule+block.size;
				Adr=Adr+block.size;
				block=block.next;
			}
		}
        
	}


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
};

// Handle front-end process submission
document.getElementById("processForm").onsubmit = function () {
	/*******************************************************   la boucle if  **********************************************************************************/	
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
	return false;
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

//int cpt=0,newSize=0;
heap = new Heap();
var repeatt=0;
blockSizes = [1024];

for (i=0; i<blockSizes.length; i++) {
	heap.add(new MemControlBlock(blockSizes[i]));
};

// Draw initial heap
heap.repaint();

// Start clock
// Loop through all processes and allocate those that require allocation. Deallocate those that have <0 time remaining
var clock = setInterval(async function() {
	if (!enCours)
	{
		for (i=0; i<processes.length; i++) {
			process = processes[i];

			if (!process.isAllocated()) {
				enCours = true;
				heap.requestAllocation(process);
			} else {
				heap.fusionner();
				process.tick();
				
				//repeatt=repeatt+repeat;
				if (process.timeLeft < 1) {
					repeat=(1024/(4*process.allocatedBlock.size)+1);
					
					// Deallocate process from heap
					heap.deallocateProcess(process);
					// Remove process from processes array
					index = processes.indexOf(process);
					if (index > -1) {
						processes.splice(index, 1);
					};
					// Remove process from table
					removeProcessFromTable(process);
					
                   while (repeat>0)
				{
					console.log(repeat)
                   heap.fusionner();
                   heap.repaint();
                   repeat--;
				}
				};
			};
		};
		/*var inst=document.getElementById("ins");
		 inst.innerHTML="Exécution et Fin";
	    inst.innerHTML="Instructions";*/
		refreshTable();
		//document.getElementById("loading").style.display="none";
		heap.repaint();	
	}
   
}, 1000);
