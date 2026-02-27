/* ========== NAV + DROPDOWN ========== */
export function initNav(){
  const burger=document.querySelector('.burger');
  const links=document.getElementById('navLinks')||document.querySelector('.nav-links');
  if(burger&&links){
    burger.addEventListener('click',()=>{
      burger.classList.toggle('open');
      links.classList.toggle('open');
      document.body.style.overflow=links.classList.contains('open')?'hidden':'';
    });
    links.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click',()=>{
        burger.classList.remove('open');
        links.classList.remove('open');
        document.body.style.overflow='';
      });
    });
  }
  const moreBtn=document.querySelector('.nav-more-btn');
  if(moreBtn){
    moreBtn.addEventListener('click',(e)=>{
      e.stopPropagation();
      const expanded=moreBtn.getAttribute('aria-expanded')==='true';
      moreBtn.setAttribute('aria-expanded',!expanded);
    });
    document.addEventListener('click',()=>{
      moreBtn.setAttribute('aria-expanded','false');
    });
  }
  const path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a, .nav-dropdown a').forEach(a=>{
    if(a.getAttribute('href')===path) a.classList.add('active');
  });
}
