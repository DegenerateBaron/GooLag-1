var CrawlerCount = 2; // Number must be 1 or an even number

var keywordsURI = "https://raw.githubusercontent.com/CodefagoCbrgLyIyM/Alphabet/master/keywords";
var googleURI = "https://www.google.com/search?hl=en&site=webhp&source=hp&q=";
var dummyTabs = [];
var swatch = 1;
var keywords = [];
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}
async function Crawl(tabCount){
		var i = 0
		var m = keywords.length / tabCount;
		dummyTabs = [];
		for(var i = 0; i < tabCount; i++){
				dummyTabs.push(window.open("http://google.com",'newwindow' + i,'width=200, height=200', "_blank"));
		}
    while (i < m) {
        dummyTabs[swatch].location = googleURI + keywords[(swatch * m + i)];
        dummyTabs[swatch].focus();
        swatch++;
        if(swatch == tabCount){
        	swatch = 0;
          i++;
        }
        await sleep(10000);
    }
  	for(var i = 0; i < tabCount; i++){
				dummyTabs[i].close();
		}
		Init();
}
function Init()
{
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var a = xmlhttp.responseText.split(/\n/);
          	shuffle(a);
            keywords = a;
						Crawl(CrawlerCount);
        }
    }
    xmlhttp.open("GET", keywordsURI, false);
    xmlhttp.send();    
}

var button = document.querySelector('#run');
button.onclick = function(){ Init(); }
//Init();
