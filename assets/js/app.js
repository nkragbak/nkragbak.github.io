document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.site-nav');
if(menuButton&&nav){
  menuButton.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded',String(open));
  });
}

const search=document.querySelector('#politics-search');
const sections=[...document.querySelectorAll('.topic-section')];
const noResults=document.querySelector('#no-results');
if(search&&sections.length){
  search.addEventListener('input',()=>{
    const query=search.value.trim().toLocaleLowerCase('da');
    let matches=0;
    sections.forEach(section=>{
      const haystack=(section.dataset.search+' '+section.textContent).toLocaleLowerCase('da');
      const visible=!query||haystack.includes(query);
      section.hidden=!visible;
      if(visible)matches+=1;
    });
    if(noResults)noResults.hidden=matches!==0;
  });
}

const protonTexts=[
  {title:'Parcelhushaven som verdens natur (1 af 4)',url:'https://drive.proton.me/urls/4VG8RPSRBW#UAOAVzoE9xxy'},
  {title:'Ekstraktiv kapitalisme i parcelhushaven (2 af 4)',url:'https://drive.proton.me/urls/V3S61M0G28#x5oJnGGKicz2'},
  {title:'Post-vækst i parcelhushaven (3 af 4)',url:'https://drive.proton.me/urls/01P4N4SDVR#LKuAoHipwMXB'},
  {title:'Eftertekst: Tanker om skifte og barrierer mlm. vækst og post-vækst (4 af 4)',url:'https://drive.proton.me/urls/VNGNFNHV3C#hEPxQO8xirYN'}
];

const mediaSection=document.querySelector('#tekster-medier');
if(mediaSection){
  const entries=[...mediaSection.querySelectorAll('details')];
  protonTexts.forEach((text,index)=>{
    const entry=entries[index];
    if(!entry)return;
    const summary=entry.querySelector('summary');
    if(summary)summary.textContent=text.title;
    const content=entry.querySelector('.detail-content');
    if(content){
      content.querySelectorAll('.proton-link').forEach(link=>link.remove());
      const p=document.createElement('p');
      p.className='proton-link';
      const a=document.createElement('a');
      a.href=text.url;
      a.target='_blank';
      a.rel='noopener noreferrer';
      a.textContent='Læs den seneste version i Proton Drive →';
      p.appendChild(a);
      content.appendChild(p);
    }
  });
}

const climateSection=document.querySelector('#klima-natur');
if(climateSection && !document.querySelector('#precaution-detail')){
  const detail=document.createElement('details');
  detail.id='precaution-detail';
  detail.innerHTML='<summary>Usikkerhed er ikke et argument for at vente</summary><div class="detail-content"><p>Når konsekvenserne kan være irreversible og meget store, mener jeg, at usikkerhed om præcis hvornår et tipping point indtræffer bør tale for tidligere handling, ikke senere. Vi behøver ikke kende det nøjagtige kollapstidspunkt for et økosystem eller en klimamekanisme, før risikoen bliver politisk relevant. Jo større den mulige skade er, desto stærkere bør forsigtighedsprincippet veje.</p></div>';
  climateSection.insertBefore(detail, climateSection.querySelector('details:nth-of-type(3)') || null);
}

const docs=document.querySelector('#dokumentation');
if(docs && !document.querySelector('#source-library')){
  const sourceBlock=document.createElement('details');
  sourceBlock.id='source-library';
  sourceBlock.open=true;
  sourceBlock.innerHTML=`
    <summary>Udvalgte kilder bag mine overvejelser</summary>
    <div class="detail-content">
      <p>Dette er ikke en udtømmende litteraturliste, men nogle af de kilder, jeg bruger til at efterprøve de faktuelle dele af mine argumenter. Mine politiske konklusioner er mine egne.</p>
      <ul>
        <li><a href="https://www.wwf.org.uk/our-reports/living-planet-report-2024" target="_blank" rel="noopener noreferrer">WWF – Living Planet Report 2024</a>: gennemsnitsstørrelsen af overvågede bestande af vilde hvirveldyr faldt 73 % fra 1970 til 2020; 95 % i Latinamerika og Caribien.</li>
        <li><a href="https://www.unep.org/resources/emissions-gap-report-2025" target="_blank" rel="noopener noreferrer">UNEP – Emissions Gap Report 2025</a>: fuld gennemførelse af de indmeldte klimamål peger mod ca. 2,3–2,5 °C opvarmning i dette århundrede; nuværende politikker mod ca. 2,8 °C.</li>
        <li><a href="https://www.planetaryhealthcheck.org/" target="_blank" rel="noopener noreferrer">Planetary Health Check 2025</a>: syv af ni planetære grænser vurderes nu overskredet, herunder havforsuring.</li>
        <li><a href="https://www.stockholmresilience.org/research/planetary-boundaries.html" target="_blank" rel="noopener noreferrer">Stockholm Resilience Centre – Planetary Boundaries</a>: baggrund og løbende opdatering af rammeværket for planetære grænser.</li>
        <li><a href="https://www.nature.com/articles/s41586-021-03629-6" target="_blank" rel="noopener noreferrer">Nature – Amazonia as a carbon source linked to deforestation and climate change</a>: især det sydøstlige Amazonas er blevet netto-kulstofkilde.</li>
        <li><a href="https://ourworldindata.org/ghg-emissions-by-sector" target="_blank" rel="noopener noreferrer">Our World in Data – drivhusgasudledninger fordelt på sektorer</a>: grundlag for at se, hvor de største globale reduktionsmuligheder findes.</li>
        <li><a href="https://www.materialflows.net/decoupling-material-use-and-economic-performance/" target="_blank" rel="noopener noreferrer">MaterialFlows – Decoupling material use and economic performance</a>: skelner mellem relativ og absolut afkobling og viser, hvor vigtig materialefodaftryk og international handel er for vurderingen.</li>
        <li><a href="https://www.cph.dk/om-cph/presse/nyheder/2026/01/rekord%C3%A5r%20for%20k%C3%B8benhavns%20lufthavn" target="_blank" rel="noopener noreferrer">Københavns Lufthavn – rekordår 2025</a>: 32,4 mio. passagerer, det højeste antal nogensinde.</li>
        <li><a href="https://prod-01-asg-www-climate.woc.noaa.gov/news-features/understanding-climate/global-warming-frequently-asked-questions" target="_blank" rel="noopener noreferrer">NOAA – havets rolle i klimasystemet</a>: havet har optaget mere end 90 % af den ekstra varme i klimasystemet og omtrent 20–30 % af menneskeskabte CO₂-udledninger siden 1980'erne.</li>
        <li><a href="https://www.fisheries.noaa.gov/corals" target="_blank" rel="noopener noreferrer">NOAA Fisheries – koralrev</a>: koralrev dækker under 1 % af havbunden, men understøtter omkring 25 % af marine arter.</li>
      </ul>
      <p><strong>Præcisionsnote:</strong> Jeg bruger bevidst formuleringen “gennemsnitsstørrelsen af overvågede bestande er faldet 73 %” frem for “73 % af alle vilde dyr er forsvundet”. Det første er, hvad Living Planet Index faktisk måler.</p>
    </div>`;
  docs.appendChild(sourceBlock);
}