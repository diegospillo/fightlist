const puppeteer = require('puppeteer');

async function start(word){

  const browser = await puppeteer.launch({
    headless: "new"
  });

  const page = await browser.newPage();

  await page.goto(`https://fightlist.info/it/${word}`);
  
  // Attendi che il selettore del bottone sia visibile sulla pagina
  await page.waitForSelector('#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay.qc-cmp2-footer-scrolled > div > button.css-67oxnu');

  // Esegui il clic sul bottone
  await page.click('#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay.qc-cmp2-footer-scrolled > div > button.css-67oxnu');



  const data = await page.$$eval('body > div.top-header-block > div.container > div.content > div.words', elements => {
    const spansAndBreaks = [];

  elements.forEach(element => {
    const childNodes = element.childNodes;

    childNodes.forEach(node => {
      if (node.nodeName === 'SPAN') {
        spansAndBreaks.push(node.textContent);
      } else if (node.nodeName === 'BR') {
        spansAndBreaks.push(node.outerHTML);
      }
    });
  });

  return spansAndBreaks;
  });

  if(data.length==0){
    await browser.close();
    return {
      jsn:"Nessun Risultato 😞",
      stato:false
    };
  }

  var list = new Array;
  var N=0;
  for(let i=0;i<data.length;i++){
    if(data[i]=="<br>")N++;
    else list[N] = "";
  }
  N=0;
  for(let i=0;i<data.length;i++){
    if(data[i]=="<br>")N++;
    else list[N] += data[i];
  }

  var lista = list.map(function(item) {
    return "- " + item;
  }).join("\n");
  
  await browser.close();
  return {
    jsn:lista,
    stato:true
  };
};

module.exports = start;