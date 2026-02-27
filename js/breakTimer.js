/* ========== BREAK TIMER (exercises page) ========== */
(function(){
  const display=document.getElementById('timerDisplay');
  const startBtn=document.getElementById('timerStart');
  const resetBtn=document.getElementById('timerReset');
  if(!display||!startBtn)return;

  let total=45*60,remaining=total,interval=null,isBreak=false;

  function fmt(s){const m=Math.floor(s/60);const sec=s%60;return String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0')}
  function render(){display.textContent=fmt(remaining);display.style.color=isBreak?'var(--clr-accent)':'var(--clr-primary)'}

  function tick(){
    remaining--;
    if(remaining<=0){
      clearInterval(interval);interval=null;
      if(!isBreak){isBreak=true;remaining=5*60;startBtn.textContent='\u041f\u0435\u0440\u0435\u0440\u044b\u0432';render();interval=setInterval(tick,1000);}
      else{isBreak=false;remaining=total;startBtn.textContent='\u0421\u0442\u0430\u0440\u0442';render();}
    }else{render();}
  }

  startBtn.addEventListener('click',()=>{
    if(interval){clearInterval(interval);interval=null;startBtn.textContent='\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c';}
    else{interval=setInterval(tick,1000);startBtn.textContent='\u041f\u0430\u0443\u0437\u0430';}
  });
  if(resetBtn) resetBtn.addEventListener('click',()=>{
    clearInterval(interval);interval=null;isBreak=false;remaining=total;startBtn.textContent='\u0421\u0442\u0430\u0440\u0442';render();
  });
  render();
})();
