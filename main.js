// TechGuruBharath Academy – Bharath Nelapatla

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if(hamburger && mobileMenu){
  hamburger.addEventListener('click',()=>{
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}

// Sticky nav shadow
window.addEventListener('scroll',()=>{
  const nav = document.getElementById('mainNav');
  if(nav) nav.style.boxShadow = window.scrollY>10?'0 2px 20px rgba(0,0,0,.5)':'none';
});

// XP bar animation
window.addEventListener('load',()=>{
  const fill = document.querySelector('.xp-fill');
  if(fill){fill.style.width='0';setTimeout(()=>fill.style.width='85%',400);}
});

// Quest answer handler
window.answerQuest = function(idx, correct, expl){
  const btns = document.querySelectorAll('.choice-btn');
  const fb = document.getElementById('quest-feedback');
  btns.forEach((b,i)=>{
    b.classList.add('disabled');
    if(i===correct) b.classList.add('correct');
    else if(i===idx && idx!==correct) b.classList.add('wrong');
  });
  if(fb){
    fb.style.display='block';
    if(idx===correct){
      fb.className='feedback-box correct';
      fb.innerHTML='✅ <strong>Correct!</strong><br>'+(expl?.correct||'');
      const nb = document.getElementById('next-quest-btn');
      if(nb) nb.style.display='inline-flex';
    } else {
      fb.className='feedback-box wrong';
      fb.innerHTML='❌ <strong>Not quite.</strong> '+(expl?.wrong||'Review and try the next quest!');
    }
    fb.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
};

// Trainer action buttons
window.trainerAction = function(btn, msg){
  btn.textContent=msg;btn.disabled=true;btn.style.opacity='.7';
};

// Scroll reveal
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity='1';
      e.target.style.transform='translateY(0)';
      observer.unobserve(e.target);
    }
  });
},{threshold:0.1});
document.querySelectorAll('.how-card,.course-card,.testi-card,.price-card,.ach-card').forEach(el=>{
  el.style.opacity='0';
  el.style.transform='translateY(20px)';
  el.style.transition='opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

// Contact form
const cf = document.getElementById('contactForm');
if(cf){
  cf.addEventListener('submit',e=>{
    e.preventDefault();
    const btn = cf.querySelector('button[type=submit]');
    btn.textContent='✅ Message sent! Bharath will reply within 24 hours.';
    btn.disabled=true;
    btn.style.background='rgba(16,185,129,.2)';
    btn.style.borderColor='rgba(16,185,129,.4)';
    btn.style.color='#10b981';
  });
}

// Thank you page — read course from URL param
window.addEventListener('DOMContentLoaded',()=>{
  const cn = document.getElementById('ty-course-name');
  if(cn){
    const params = new URLSearchParams(window.location.search);
    const course = params.get('course')||'Your Course';
    cn.textContent = decodeURIComponent(course);
  }
});

// FAQ toggle
window.toggleFaq = function(el){
  const item = el.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f=>f.classList.remove('open'));
  if(!wasOpen) item.classList.add('open');
};

// Billing toggle (pricing page)
window.toggleBilling = function(){
  const t = document.getElementById('billingToggle');
  const isYearly = t.classList.toggle('on');
  document.getElementById('pro-price').innerHTML = isYearly
    ? '₹149<span style="font-size:14px;color:var(--text2)">/mo</span>'
    : '₹199<span style="font-size:14px;color:var(--text2)">/course</span>';
  document.getElementById('bill-m').style.color = isYearly?'var(--text3)':'var(--accent)';
  document.getElementById('bill-y').style.color = isYearly?'var(--accent)':'var(--text3)';
};

// Arena tabs
window.switchTab = function(group, tab, btn){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(group+'-weekly').classList.remove('active');
  document.getElementById(group+'-alltime').classList.remove('active');
  document.getElementById(group+'-'+tab).classList.add('active');
};

// Arena timer
window.startTimer = function(n, seconds){
  const el = document.getElementById('timer'+n+'-val');
  const wrap = document.getElementById('timer'+n);
  if(!el) return;
  const iv = setInterval(()=>{
    const m=Math.floor(seconds/60), s=seconds%60;
    el.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
    if(seconds<=30) wrap.classList.add('urgent');
    if(seconds--<=0) clearInterval(iv);
  },1000);
};

// Filter paths
window.filterPaths = function(cat, btn){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('[data-cat]').forEach(card=>{
    card.style.display=(cat==='all'||card.dataset.cat===cat)?'flex':'none';
  });
};
