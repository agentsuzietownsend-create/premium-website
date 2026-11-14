
document.documentElement.classList.add('js-motion');
document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.querySelector('.menu-button'),mobile=document.querySelector('.mobile-nav');
 if(menu&&mobile){menu.addEventListener('click',()=>{const isOpen=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(isOpen));menu.setAttribute('aria-label',isOpen?'Close navigation':'Open navigation');document.body.classList.toggle('nav-open',isOpen)});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');menu.setAttribute('aria-expanded','false');document.body.classList.remove('nav-open')}))}
 const groups=[...document.querySelectorAll('.nav-group')];function closeGroups(){groups.forEach(g=>{g.classList.remove('is-open');g.querySelector('.nav-trigger')?.setAttribute('aria-expanded','false')})}
 groups.forEach(g=>g.querySelector('.nav-trigger')?.addEventListener('click',e=>{e.stopPropagation();const next=!g.classList.contains('is-open');closeGroups();if(next){g.classList.add('is-open');g.querySelector('.nav-trigger').setAttribute('aria-expanded','true')}}));
 document.addEventListener('click',e=>{if(!e.target.closest('.nav-group'))closeGroups()});document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeGroups();if(mobile?.classList.contains('open'))menu.click()}});
 const watcher=window.IntersectionObserver?new IntersectionObserver(items=>items.forEach(i=>{if(i.isIntersecting){i.target.classList.add('is-visible');watcher.unobserve(i.target)}}),{threshold:.09}):null;document.querySelectorAll('.reveal').forEach(el=>watcher?watcher.observe(el):el.classList.add('is-visible'));
 const f=document.getElementById('enquiry-form');if(f){const p=new URLSearchParams(location.search),select=f.querySelector('#service');
 if(p.has('service')){let option=[...select.options].find(o=>o.dataset.service===p.get('service'));if(option)select.value=option.value}
 if(p.get('type')==='business')f.querySelector('input[value="Business"]').checked=true;
 f.addEventListener('submit',e=>{e.preventDefault();if(!f.reportValidity())return;
 const entries=[...new FormData(f).entries()].map(([k,v])=>k.toUpperCase()+': '+String(v).trim()).join('\n');
 const msg='Hello Haspol, I would like to enquire about your services.\n\n'+entries+'\n\nPlease let me know the next steps.';
 const url='https://wa.me/2348063955271?text='+encodeURIComponent(msg);
 const s=f.querySelector('.form-status');s.innerHTML='WhatsApp is opening with your enquiry. <strong>You must press Send in WhatsApp</strong> to complete your request. <a href="'+url+'" target="_blank" rel="noopener" style="text-decoration:underline">Open WhatsApp manually</a>.';s.classList.add('is-visible');const w=window.open(url,'_blank','noopener,noreferrer');if(!w)location.href=url;
 })}
});
