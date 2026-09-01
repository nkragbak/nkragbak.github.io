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
  {
    title:'Parcelhushaven som verdens natur (1 af 4)',
    url:'https://drive.proton.me/urls/4VG8RPSRBW#UAOAVzoE9xxy'
  },
  {
    title:'Ekstraktiv kapitalisme i parcelhushaven (2 af 4)',
    url:'https://drive.proton.me/urls/V3S61M0G28#x5oJnGGKicz2'
  },
  {
    title:'Post-vækst i parcelhushaven (3 af 4)',
    url:'https://drive.proton.me/urls/01P4N4SDVR#LKuAoHipwMXB'
  },
  {
    title:'Eftertekst: Tanker om skifte og barrierer mlm. vækst og post-vækst (4 af 4)',
    url:'https://drive.proton.me/urls/VNGNFNHV3C#hEPxQO8xirYN'
  }
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