/* TAPWA – Offline TA Logger (PWA) */
const ROLES = ["کودک","بالغ","والد"];
const CHILD_SUBROLES = ["کودک طبیعی","کودک انطباق‌یافته مطیع","کودک انطباق‌یافته سرکش"];
const PARENT_SUBROLES = ["والد انتقادگر مثبت","والد انتقادگر منفی","والد حمایتگر مثبت","والد حمایتگر منفی"];

const EMOTIONS_GROUPED = [
  ["خشم","غم","ترس"],
  ["شادی","عشق","گناه"],
  ["شرم","هیجان","آرامش"]
];
const EMOTIONS_FLAT = EMOTIONS_GROUPED.flat();

const NEED_INFO = {
  "بقا 🛡️":"امنیت، سلامت، پول، سرپناه، نظم — وقتی شرایط ناپایدار/خطرناک حس می‌شود.",
  "عشق و تعلق 💞":"ارتباط، صمیمیت، پذیرفته‌شدن — نیاز به دیده‌شدن و پیوند با دیگران.",
  "قدرت و ارزشمندی 💪":"موثر بودن، احترام، موفقیت، کنترل — می‌خواهم مفید و باارزش باشم.",
  "آزادی 🕊️":"استقلال، حق انتخاب، آزادی بیان/تصمیم — از محدود شدن بدم می‌آید.",
  "تفریح و لذت 🎨":"سرگرمی، خلاقیت، خنده، یادگیری لذت‌بخش — از مسیر، کیف کنم."
};
const NEEDS = Object.keys(NEED_INFO);

const NEED_STRATEGIES = {
  "بقا 🛡️":[
    "اطمینان از امنیت/مرزبندی فوری","کاهش ریسک/توقف موقعیت","جمع‌آوری اطلاعات/شفاف‌سازی",
    "کنترل/مدیریت منابع","درخواست کمک/حمایت عملی",
  ],
  "عشق و تعلق 💞":[
    "درخواست توجه/شنیده‌شدن","جستجوی حمایت/همدلی","نزدیکی/برقراری تماس",
    "همکاری/شراکت","مرزبندی محترمانه برای حفظ رابطه",
  ],
  "قدرت و ارزشمندی 💪":[
    "بیان نظر قاطع/ایستادن پای موضع","تعیین معیار/استاندارد","دفاع از شایستگی/ارزش",
    "هدایت گفتگو/تصمیم‌گیری","بازخورد مشخص به عملکرد",
  ],
  "آزادی 🕊️":[
    "نه گفتن/مرزبندی","پیشنهاد گزینهٔ جایگزین","تغییر موضوع/مسیر","درخواست زمان/فرصت","خودمختاری در انجام کار",
  ],
  "تفریح و لذت 🎨":[
    "شوخ‌طبعی/لطیفه","بازی/خلاقیت","سبک‌کردن فضا","دعوت به فعالیت لذت‌بخش","یادگیری/کاوش کنجکاوانه",
  ],
};
const STRATEGY_INFO = {
  "اطمینان از امنیت/مرزبندی فوری":"مکث/توقف گفتگو، فاصله گرفتن، گفتن «بعداً ادامه می‌دیم».",
  "کاهش ریسک/توقف موقعیت":"کم‌کردن احتمال آسیب: خروج کوتاه، تعویق تصمیم، کم‌کردن شدت بحث.",
  "جمع‌آوری اطلاعات/شفاف‌سازی":"سؤال دقیق، درخواست مثال/جزئیات، واقعیت‌سنجی قبل از واکنش.",
  "کنترل/مدیریت منابع":"تنظیم زمان/پول/امکانات برای امن و منظم ماندن.",
  "درخواست کمک/حمایت عملی":"صریح کمک می‌خوام: «می‌تونی فلان کار رو انجام بدی؟».",
  "درخواست توجه/شنیده‌شدن":"خواهش می‌کنم تا آخر بدون قطع‌کردن گوش بده.",
  "جستجوی حمایت/همدلی":"می‌گم الان همدلی می‌خوام، نه راهکار.",
  "نزدیکی/برقراری تماس":"در آغوش/پیام دوستانه/تماس برای حس پیوند.",
  "همکاری/شراکت":"دعوت به انجام مشترک کار: «با هم برنامه بچینیم».",
  "مرزبندی محترمانه برای حفظ رابطه":"نهِ محترمانه برای جلوگیری از دلخوری‌های بعدی.",
  "بیان نظر قاطع/ایستادن پای موضع":"روشن و محترمانه موضعم رو می‌گم و می‌ایستم.",
  "تعیین معیار/استاندارد":"تعریف شفاف کیفیت/زمان: «تعریفِ آماده این‌هاست».",
  "دفاع از شایستگی/ارزش":"مثال/شواهد از توانمندی‌هام؛ پاسخ به تضعیف ارزش.",
  "هدایت گفتگو/تصمیم‌گیری":"تسهیل جلسه، جمع‌بندی، تعیین مسئولیت‌ها.",
  "بازخورد مشخص به عملکرد":"رفتار مشخص + اثرش + انتظار اصلاح، بدون برچسب شخصی.",
  "نه گفتن/مرزبندی":"رد محترمانه فشار/درخواست: «الان نمی‌پذیرم».",
  "پیشنهاد گزینهٔ جایگزین":"به‌جای نهِ مطلق، راه‌حل جایگزین می‌دهم.",
  "تغییر موضوع/مسیر":"گفتگو/کار را به مسیر مفیدتر می‌برم.",
  "درخواست زمان/فرصت":"مهلت می‌گیرم تا تصمیم/کیفیت بهتر شود.",
  "خودمختاری در انجام کار":"شیوهٔ اجرا/ابزار/زمان‌بندی را خودم انتخاب می‌کنم.",
  "شوخ‌طبعی/لطیفه":"طنز ملایم برای کاهش تنش (بدون تمسخر).",
  "بازی/خلاقیت":"رویکرد بازی‌گونه/خلاقانه برای حل مسئله.",
  "سبک‌کردن فضا":"تنفس کوتاه/استراحت/موسیقی برای نرم کردن فضا.",
  "دعوت به فعالیت لذت‌بخش":"پیشنهاد قهوه/پیاده‌روی/کارِ باحالِ مشترک.",
  "یادگیری/کاوش کنجکاوانه":"امتحان ایدهٔ جدید/پرسش کنجکاوانه برای لذت.",
};

const GAMES = [
  "چرا نمی‌کنی—آره، ولی…","بزن منو","حالا گرفتمت…!","اگر تو نبودی…",
  "لکه پیدا کن","ببین منو مجبور کردی","هیاهو","بذار این و اون بجنگن",
];
const GAME_INFO = {
  "چرا نمی‌کنی—آره، ولی…":{desc:"پیشنهاد می‌گیری و هرکدام را با «ولی…» خنثی می‌کنی.",anti:"پیشنهاد نده؛ قرارداد مسئولیت ببند."},
  "بزن منو":{desc:"دعوت به انتقاد تا نقش قربانی تثبیت شود.",anti:"مرزبندی + بازخورد بالغِ رفتاری."},
  "حالا گرفتمت…!":{desc:"کمین برای خطای کوچک و انفجار سرزنش.",anti:"شفاف‌سازی معیارها و تمرکز بر ترمیم."},
  "اگر تو نبودی…":{desc:"دیگری بهانهٔ نرفتن به سمت اختیار/هدف می‌شود.",anti:"تمرکز بر اختیار و تعریف یک گام مستقل."},
  "لکه پیدا کن":{desc:"همیشه عیبی پیدا می‌شود تا «تو ناکافی».",anti:"معیارهای روشن + قدردانی واقعی."},
  "ببین منو مجبور کردی":{desc:"فرافکنی مسئولیت پیامدها.",anti:"بازگرداندن مسئولیت انتخاب."},
  "هیاهو":{desc:"بالا بردن تنش تا اصل موضوع گم شود.",anti:"کند کردن سرعت و گفت‌وگوی بالغ–بالغ."},
  "بذار این و اون بجنگن":{desc:"تحریک دیگران به درگیری.",anti:"امتناع از واسطه‌گری مخرب."},
};
const GAME_SWITCH_GUIDE = {
  "چرا نمی‌کنی—آره، ولی…":{
    cues:["ردِ پشت‌سرهمِ پیشنهادها با «ولی…»","درخواست کمک بدون مسئولیت‌پذیری"],
    examples:["بعد از سومین «ولی…» نقش‌ها چرخید.","با پرسش «راه‌حل خودت چیه؟» تنش بالا رفت و نقش‌ها چرخید."]
  },
  "بزن منو":{
    cues:["خودتحقیری/دعوت به انتقاد","چیدمان موقعیت ایرادگیری"],
    examples:["با طعنهٔ کوچک من سوئیچ شد.","انتقاد تند → او قربانی شد."]
  },
  "حالا گرفتمت…!":{
    cues:["کمین برای خطای کوچک","معیار ناگهان صفر-یکی می‌شود"],
    examples:["اشتباه ریز → او آزارگر/من قربانی.","«دیدی بلد نیستی؟» → سوئیچ."]
  },
  "اگر تو نبودی…":{
    cues:["نسبت‌دادن مانع به دیگری","واکنش سرزنش‌گرانه به مرزبندی"],
    examples:["«تو همیشه منو محدود می‌کنی» → سوئیچ.","پیشنهاد گام مستقل → چرخش نقش‌ها."]
  },
  "لکه پیدا کن":{
    cues:["جستجوی عیب دائمی","تغییر معیار لحظه‌ای"],
    examples:["تحویل کار → عیب تازه → سوئیچ.","عوض‌کردن معیار در لحظه."]
  },
  "ببین منو مجبور کردی":{
    cues:["«تو باعث شدی…»","انکار نقش شخصی"],
    examples:["«تو باعث شدی عصبانی بشم» → سوئیچ.","مسئولیت از بین رفت."]
  },
  "هیاهو":{
    cues:["بالا رفتن صدا/سرعت","هجوم مثال‌های قدیمی"],
    examples:["موضوع عوض شد → سوئیچ.","رفتن به گذشتهٔ بی‌ربط."]
  },
  "بذار این و اون بجنگن":{
    cues:["تحریک دو نفر دیگر","کنارکشیدن از مسئولیت"],
    examples:["به جان هم انداختن دیگران → سوئیچ.","«تو به فلانی بگو…» مسیر بازی شد."]
  },
};

const VALENCE_POS = "➕ ارضا/دستیابی";
const VALENCE_NEG = "➖ دفاع/پرهیز";
const OUTCOME_OK = "✅ برآورده شد";
const OUTCOME_PARTIAL = "◼️ تا حدی";
const OUTCOME_NO = "❌ برآورده نشد";

const stage = document.getElementById('stage');
const btnBack = document.getElementById('btn-back');
const btnNext = document.getElementById('btn-next');
const btnReset = document.getElementById('btn-reset');
const btnExport = document.getElementById('btn-export');
const btnClear = document.getElementById('btn-clear');

let screen = 'your_name';   // وضعیت «صفحه»
let detailCtx = null;       // {target:'your'|'other', index:0, step:'intensity'|'valence'|'strategy'|'outcome'}

function newState(){
  return {
    your_name:"", other_name:"", summary:"",
    your_role:"", other_role:"",
    emotions:[],
    your_needs:[], your_need_details:{},
    other_needs:[], other_need_details:{},
    game_flag:null, game_names:[], game_switch_note:"",
    created_at:null
  };
}
let st = newState();

function saveRecord(){
  const all = JSON.parse(localStorage.getItem('tapwa_records')||'[]');
  st.created_at = new Date().toISOString();
  all.push({...st});
  localStorage.setItem('tapwa_records', JSON.stringify(all));
}

function exportCSV(){
  const rows = JSON.parse(localStorage.getItem('tapwa_records')||'[]');
  if(!rows.length){ alert('داده‌ای برای خروجی نیست.'); return; }
  const header = [
    "your_name","other_name","summary","your_role","other_role","emotions",
    "your_needs","your_need_details","other_needs","other_need_details",
    "game_flag","game_names","game_switch_note","created_at"
  ];
  const csv = [
    header.join(","),
    ...rows.map(r => header.map(k=>{
      let v = r[k];
      if(typeof v === 'object') v = JSON.stringify(v);
      if(typeof v === 'string') v = v.replace(/"/g,'""');
      return `"${v??""}"`;
    }).join(","))
  ].join("\n");
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'tapwa_records.csv'; a.click();
  URL.revokeObjectURL(url);
}

btnExport.onclick = exportCSV;
btnClear.onclick = ()=>{
  if(confirm('همه‌ی رکوردهای ذخیره‌شده پاک شود؟')) localStorage.removeItem('tapwa_records');
};

btnReset.onclick = ()=>{
  if(confirm('شروع از اول؟')){ st = newState(); screen='your_name'; detailCtx=null; render(); }
};
btnBack.onclick = ()=> goBack();
btnNext.onclick = ()=> goNext();

function goBack(){
  // منطق بازگشت با توجه به صفحه/ویراست جزئیات
  if(detailCtx){
    const order = ["intensity","valence","strategy","outcome"];
    const i = order.indexOf(detailCtx.step);
    if(i>0){ detailCtx.step = order[i-1]; render(); return; }
    // برگشت از جزئیات این نیاز
    const list = detailCtx.target==='your'? st.your_needs : st.other_needs;
    if(detailCtx.index>0){
      detailCtx.index--; detailCtx.step='outcome'; render(); return;
    }
    // خروج از حالت جزئیات
    detailCtx=null;
    screen = (list===st.your_needs)? 'your_needs' : 'other_needs';
    render(); return;
  }
  const order = [
    'your_name','other_name','summary',
    'your_role','other_role','emotions',
    'your_needs','your_need_details',
    'other_needs','other_need_details',
    'game_check','game_names','game_switch','final'
  ];
  const i = order.indexOf(screen);
  if(i>0){ screen = order[i-1]; render(); }
}

function goNext(){
  // مسیر پیشروی
  if(detailCtx){
    const order = ["intensity","valence","strategy","outcome"];
    const i = order.indexOf(detailCtx.step);
    if(i<order.length-1){ detailCtx.step = order[i+1]; render(); return; }
    // بعد از outcome، نیاز بعدی/یا خروج
    const list = detailCtx.target==='your'? st.your_needs : st.other_needs;
    if(detailCtx.index < list.length-1){ detailCtx.index++; detailCtx.step='intensity'; render(); return; }
    detailCtx=null;
    screen = (list===st.your_needs)? 'other_needs' : 'game_check';
    render(); return;
  }

  if(screen==='your_name'){ if(!st.your_name) return; screen='other_name'; render(); return; }
  if(screen==='other_name'){ if(!st.other_name) return; screen='summary'; render(); return; }
  if(screen==='summary'){ if(!st.summary) return; screen='your_role'; render(); return; }
  if(screen==='your_role'){ if(!st.your_role) return; screen='other_role'; render(); return; }
  if(screen==='other_role'){ if(!st.other_role) return; screen='emotions'; render(); return; }
  if(screen==='emotions'){ screen='your_needs'; render(); return; }
  if(screen==='your_needs'){
    if(!st.your_needs.length) return;
    detailCtx = {target:'your', index:0, step:'intensity'}; screen='your_need_details'; render(); return;
  }
  if(screen==='your_need_details'){ /* handled above */ return; }
  if(screen==='other_needs'){
    if(!st.other_needs.length){ screen='game_check'; render(); return; }
    detailCtx = {target:'other', index:0, step:'intensity'}; screen='other_need_details'; render(); return;
  }
  if(screen==='other_need_details'){ /* handled above */ return; }
  if(screen==='game_check'){
    if(st.game_flag===null) return;
    screen = (st.game_flag? 'game_names':'final'); render(); return;
  }
  if(screen==='game_names'){
    if(!st.game_names.length) return;
    screen='game_switch'; render(); return;
  }
  if(screen==='game_switch'){
    screen='final'; render(); return;
  }
  if(screen==='final'){
    saveRecord();
    alert('✅ ذخیره شد. برای رکورد جدید، «شروع از اول» را بزن.');
  }
}

function chipButtons(opts, selected, multi=true){
  const wrap = document.createElement('div'); wrap.className='kb';
  opts.forEach(v=>{
    const b = document.createElement('button');
    b.type='button'; b.textContent=v;
    if(selected?.includes(v)) b.classList.add('active');
    b.onclick=()=>{
      if(multi){
        if(selected.includes(v)) selected.splice(selected.indexOf(v),1);
        else selected.push(v);
        b.classList.toggle('active');
      }else{
        selected.splice(0,selected.length,v);
        [...wrap.children].forEach(c=>c.classList.remove('active'));
        b.classList.add('active');
      }
    };
    wrap.appendChild(b);
  });
  return wrap;
}

function radioButtons(opts, valueRef, key){
  const wrap = document.createElement('div'); wrap.className='kb';
  opts.forEach(v=>{
    const b = document.createElement('button');
    b.type='button'; b.textContent=v;
    if(valueRef[key]===v) b.classList.add('active');
    b.onclick=()=>{
      valueRef[key]=v;
      [...wrap.children].forEach(c=>c.classList.remove('active'));
      b.classList.add('active');
    };
    wrap.appendChild(b);
  });
  return wrap;
}

function helpBox(html){
  const d = document.createElement('div'); d.className='help'; d.innerHTML = html; return d;
}
function card(title, lead){
  const d = document.createElement('div'); d.className='card';
  d.innerHTML = `<h2>${title}</h2>${lead?`<p class="lead">${lead}</p>`:''}`;
  return d;
}

function render(){
  stage.innerHTML='';
  btnNext.disabled=false; btnBack.disabled=false;

  if(screen==='your_name'){
    const c = card('اسم خودت رو وارد کن:');
    const i = document.createElement('input'); i.type='text'; i.value=st.your_name||''; i.placeholder='مثلاً: حسین';
    i.oninput=()=>st.your_name=i.value.trim();
    c.appendChild(i); stage.appendChild(c);
    btnBack.disabled=true;
  }

  if(screen==='other_name'){
    const c = card('اسم طرف مقابل رو وارد کن:');
    const i = document.createElement('input'); i.type='text'; i.value=st.other_name||''; i.placeholder='مثلاً: علی';
    i.oninput=()=>st.other_name=i.value.trim();
    c.appendChild(i); stage.appendChild(c);
  }

  if(screen==='summary'){
    const c = card('خلاصهٔ کوتاهِ موقعیت (۱–۳ جمله):');
    const t = document.createElement('textarea'); t.value=st.summary||'';
    t.placeholder='چی شد؟ کجا؟ با چه حسی تمام شد؟';
    t.oninput=()=>st.summary=t.value.trim();
    c.appendChild(t); stage.appendChild(c);
  }

  if(screen==='your_role'){
    const c = card('نقش خودت را انتخاب کن:');
    c.appendChild(helpBox("کودک 👶 (خودانگیختگی/احساس)<br>بالغ 🧠 (منطقی/واقع‌نگر)<br>والد 👨‍🏫 (قواعد/حمایت یا انتقاد)"));
    const selected=[st.your_role.split(' (')[0]].filter(Boolean);
    c.appendChild(chipButtons(ROLES, selected, false));
    // زیرنقش‌ها
    const subWrap = document.createElement('div'); subWrap.className='field';
    const subSel=[]; 
    const updateSubs=()=>{
      subWrap.innerHTML='';
      const role = selected[0];
      if(!role){ st.your_role=''; return; }
      if(role==='کودک'){
        subWrap.appendChild(chipButtons(CHILD_SUBROLES, subSel, false));
      }else if(role==='والد'){
        subWrap.appendChild(chipButtons(PARENT_SUBROLES, subSel, false));
      }
    };
    updateSubs();
    c.appendChild(subWrap);
    const save = ()=>{ 
      const role = selected[0]||''; const sub=subSel[0]?` (${subSel[0]})`:''; 
      st.your_role = role+sub;
    };
    c.addEventListener('click', save); c.addEventListener('input', save);
    stage.appendChild(c);
  }

  if(screen==='other_role'){
    const c = card('نقش طرف مقابل را انتخاب کن:');
    c.appendChild(helpBox("کودک 👶 / بالغ 🧠 / والد 👨‍🏫 — زیرنقش‌ها را در صورت لزوم مشخص کن."));
    const selected=[st.other_role.split(' (')[0]].filter(Boolean);
    c.appendChild(chipButtons(ROLES, selected, false));
    const subWrap = document.createElement('div'); subWrap.className='field';
    const subSel=[];
    const updateSubs=()=>{
      subWrap.innerHTML='';
      const role = selected[0];
      if(!role){ st.other_role=''; return; }
      if(role==='کودک') subWrap.appendChild(chipButtons(CHILD_SUBROLES, subSel, false));
      else if(role==='والد') subWrap.appendChild(chipButtons(PARENT_SUBROLES, subSel, false));
    };
    updateSubs();
    c.appendChild(subWrap);
    const save = ()=>{ 
      const role = selected[0]||''; const sub=subSel[0]?` (${subSel[0]})`:''; 
      st.other_role = role+sub;
    };
    c.addEventListener('click', save); c.addEventListener('input', save);
    stage.appendChild(c);
  }

  if(screen==='emotions'){
    const c = card('در پایان این موقعیت چه احساس/احساس‌هایی داشتی؟');
    c.appendChild(helpBox("می‌تونی چند مورد انتخاب کنی؛ اگر چیزی نیست، تایپ کن و دکمهٔ «افزودن» را بزن."));
    const group = document.createElement('div'); group.className='grid cols-3';
    EMOTIONS_GROUPED.forEach(row=>{
      const box = document.createElement('div'); box.className='kb';
      row.forEach(e=>{
        const b = document.createElement('button'); b.type='button'; b.textContent=e;
        if(st.emotions.includes(e)) b.classList.add('active');
        b.onclick=()=>{ 
          const i=st.emotions.indexOf(e); 
          if(i>=0) st.emotions.splice(i,1); else st.emotions.push(e);
          b.classList.toggle('active');
        };
        box.appendChild(b);
      });
      group.appendChild(box);
    });
    c.appendChild(group);
    const row = document.createElement('div'); row.className='field';
    const i = document.createElement('input'); i.type='text'; i.placeholder='مثلاً: ناامیدی';
    const add = document.createElement('button'); add.textContent='افزودن'; add.className='secondary';
    add.onclick=()=>{ const v=i.value.trim(); if(v){ st.emotions.push(v); i.value=''; render(); } };
    row.appendChild(i); row.appendChild(add); c.appendChild(row);
    stage.appendChild(c);
  }

  if(screen==='your_needs'){
    const c = card('نیازهای خودت را انتخاب کن (چندتایی):');
    const kb = document.createElement('div'); kb.className='grid cols-2';
    NEEDS.forEach(n=>{
      const b = document.createElement('button'); b.type='button'; b.textContent=n;
      if(st.your_needs.includes(n)) b.classList.add('active');
      b.onclick=()=>{ 
        const i=st.your_needs.indexOf(n);
        if(i>=0) st.your_needs.splice(i,1); else st.your_needs.push(n);
        b.classList.toggle('active');
      };
      const wrap = document.createElement('div'); wrap.className='kb';
      wrap.appendChild(b);
      wrap.appendChild(helpBox(NEED_INFO[n]));
      kb.appendChild(wrap);
    });
    c.appendChild(kb);
    stage.appendChild(c);
  }

  if(screen==='your_need_details' && detailCtx){
    renderNeedDetail(detailCtx);
  }

  if(screen==='other_needs'){
    const c = card('به نظرت نیازهای طرف مقابل چه بوده؟ (چندتایی)');
    const kb = document.createElement('div'); kb.className='grid cols-2';
    NEEDS.forEach(n=>{
      const b = document.createElement('button'); b.type='button'; b.textContent=n;
      if(st.other_needs.includes(n)) b.classList.add('active');
      b.onclick=()=>{ 
        const i=st.other_needs.indexOf(n);
        if(i>=0) st.other_needs.splice(i,1); else st.other_needs.push(n);
        b.classList.toggle('active');
      };
      const wrap = document.createElement('div'); wrap.className='kb';
      wrap.appendChild(b);
      wrap.appendChild(helpBox(NEED_INFO[n]));
      kb.appendChild(wrap);
    });
    c.appendChild(kb);
    stage.appendChild(c);
  }

  if(screen==='other_need_details' && detailCtx){
    renderNeedDetail(detailCtx);
  }

  if(screen==='game_check'){
    const c = card('آیا این موقعیت «بوی بازی» می‌داد؟');
    c.appendChild(helpBox(
      "«بازی» الگوی تکراریِ تعامل است که با چرخش نقش‌ها و حس بدِ آشنا تمام می‌شود.<br>"+
      "نشانه‌ها: ردِ کمک با «ولی…»، کمین برای خطا، تنشِ رو به بالا، پایان بدون حل‌مسئله."
    ));
    const val={ans: st.game_flag===null? null : (st.game_flag? 'بله':'خیر')};
    c.appendChild(radioButtons(['بله','خیر'], val, 'ans'));
    c.addEventListener('click', ()=>{ 
      st.game_flag = (val.ans==='بله')? true : (val.ans==='خیر'? false : null);
    });
    stage.appendChild(c);
  }

  if(screen==='game_names'){
    const c = card('اگر بله: نام بازی/ها را انتخاب کن (چندتایی)');
    const kb = document.createElement('div'); kb.className='grid cols-2';
    GAMES.forEach(n=>{
      const wrap = document.createElement('div'); wrap.className='kb';
      const b = document.createElement('button'); b.type='button'; b.textContent=n;
      if(st.game_names.includes(n)) b.classList.add('active');
      b.onclick=()=>{ 
        const i=st.game_names.indexOf(n);
        if(i>=0) st.game_names.splice(i,1); else st.game_names.push(n);
        b.classList.toggle('active');
        // نمایش راهنمای سوئیچ مختصر
        guide.innerHTML = switchGuide(st.game_names);
      };
      wrap.appendChild(b);
      wrap.appendChild(helpBox(`<b>چیست؟</b> ${GAME_INFO[n].desc}<br><b>آنتی‌تز:</b> ${GAME_INFO[n].anti}`));
      kb.appendChild(wrap);
    });
    c.appendChild(kb);
    const guide = document.createElement('div'); guide.className='help';
    guide.innerHTML = switchGuide(st.game_names);
    c.appendChild(guide);
    stage.appendChild(c);
  }

  if(screen==='game_switch'){
    const c = card('«لحظهٔ سوئیچ» را کوتاه بنویس:');
    c.appendChild(helpBox("مثال: «وقتی گفت: تو اصلاً نمی‌فهمی… من از بالغ→والد انتقادگر رفتم و او قربانی شد»"));
    const t = document.createElement('textarea'); t.value=st.game_switch_note||'';
    t.oninput=()=>st.game_switch_note=t.value.trim();
    c.appendChild(t);
    // خلاصه آنتی‌تز
    const anti = st.game_names.map(n=>`• ${n}: ${GAME_INFO[n].anti}`).join('\n') || '—';
    const pre = document.createElement('pre'); pre.textContent = `آنتی‌تزهای پیشنهادی:\n${anti}`;
    c.appendChild(pre);
    stage.appendChild(c);
  }

  if(screen==='final'){
    const c = card('خلاصه و ذخیره');
    const you = formatNeedDetails(st.your_need_details);
    const other = formatNeedDetails(st.other_need_details);
    const pre = document.createElement('pre');
    pre.textContent =
`👤 شما: ${st.your_name}
👥 طرف مقابل: ${st.other_name}
📝 خلاصه: ${st.summary}

🎭 نقش شما: ${st.your_role||'—'}
🎭 نقش طرف مقابل: ${st.other_role||'—'}

💬 احساس(ها): ${st.emotions.join('، ')||'—'}

🌱 نیازهای شما: ${st.your_needs.join('، ')||'—'}
📊 جزییات شما:
${you||'—'}

🌱 نیازهای طرف مقابل: ${st.other_needs.join('، ')||'—'}
📊 جزییات طرف مقابل:
${other||'—'}

🎲 بازی؟ ${st.game_flag===null?'—':(st.game_flag?'بله':'خیر')}
🎲 نام بازی/ها: ${st.game_names.join('، ')||'—'}
🧩 لحظهٔ سوئیچ: ${st.game_switch_note||'—'}
`;
    const info = document.createElement('div'); info.className='summary';
    info.appendChild(pre);
    info.appendChild(document.createElement('hr'));
    const ok = document.createElement('button'); ok.className='primary'; ok.textContent='ذخیره در دستگاه (آفلاین)';
    ok.onclick=()=>{ saveRecord(); ok.disabled=true; ok.textContent='✅ ذخیره شد'; };
    info.appendChild(ok);
    const small = document.createElement('div'); small.innerHTML='<small class="note">برای خروجی CSV از بالا استفاده کن.</small>';
    info.appendChild(small);
    c.appendChild(info);
    stage.appendChild(c);
    btnNext.textContent='پایان';
  } else {
    btnNext.textContent='ادامه ➡️';
  }
}

function renderNeedDetail(ctx){
  const list = ctx.target==='your'? st.your_needs : st.other_needs;
  const store = ctx.target==='your'? st.your_need_details : st.other_need_details;
  const need = list[ctx.index];
  store[need] = store[need] || {};
  const info = store[need];

  const c = card(`جزئیات نیاز «${need}» (${ctx.index+1}/${list.length})`);
  if(ctx.step==='intensity'){
    c.appendChild(helpBox(
      "🌡️ شدت یعنی این نیاز چقدر حضور داشت:\n"+
      "1 خیلی کم — 2 کم — 3 متوسط — 4 زیاد — 5 خیلی زیاد"
      .replace(/\n/g,'<br>')
    ));
    const row = document.createElement('div'); row.className='kb';
    [1,2,3,4,5].forEach(n=>{
      const b=document.createElement('button'); b.textContent=String(n);
      if(info.intensity===n) b.classList.add('active');
      b.onclick=()=>{info.intensity=n; render();}
      row.appendChild(b);
    });
    c.appendChild(row);
  }
  if(ctx.step==='valence'){
    c.appendChild(helpBox(
      `<b>${VALENCE_POS}</b>: برای رسیدن/تجربه‌کردنِ این نیاز اقدام شد (مثال: برای «آزادی» زمان بیشتری خواستم).<br>`+
      `<b>${VALENCE_NEG}</b>: برای حفاظت/پرهیز از تهدیدِ این نیاز اقدام شد (مثال: برای «بقا» بحث را متوقف کردم).`
    ));
    const valRef={v:info.valence||null};
    const kb = radioButtons([VALENCE_POS,VALENCE_NEG], valRef, 'v');
    kb.addEventListener('click', ()=>{ info.valence = valRef.v; });
    c.appendChild(kb);
  }
  if(ctx.step==='strategy'){
    c.appendChild(helpBox("یکی را انتخاب کن یا در کادر پایین، خودت بنویس."));
    const kb = document.createElement('div'); kb.className='grid cols-2';
    (NEED_STRATEGIES[need]||[]).forEach(s=>{
      const wrap = document.createElement('div'); wrap.className='kb';
      const b = document.createElement('button'); b.type='button'; b.textContent=s;
      if(info.strategy===s) b.classList.add('active');
      b.onclick=()=>{ info.strategy=s; render(); };
      wrap.appendChild(b);
      wrap.appendChild(helpBox(STRATEGY_INFO[s]||'')); kb.appendChild(wrap);
    });
    c.appendChild(kb);
    const custom = document.createElement('input'); custom.type='text'; custom.placeholder='اگر چیزی مدنظرته بنویس';
    custom.onchange=()=>{ if(custom.value.trim()) { info.strategy = custom.value.trim(); render(); } };
    c.appendChild(custom);
  }
  if(ctx.step==='outcome'){
    c.appendChild(helpBox(
      `<b>${OUTCOME_OK}</b>: نیاز تأمین شد و آرامش/پیشرفت حس شد.<br>`+
      `<b>${OUTCOME_PARTIAL}</b>: تا حدی تأمین شد یا موقت بود.<br>`+
      `<b>${OUTCOME_NO}</b>: تأمین نشد یا بدتر شد.`
    ));
    const valRef={v:info.outcome||null};
    const kb = radioButtons([OUTCOME_OK,OUTCOME_PARTIAL,OUTCOME_NO], valRef, 'v');
    kb.addEventListener('click', ()=>{ info.outcome = valRef.v; });
    c.appendChild(kb);
  }
  stage.appendChild(c);
}

function switchGuide(selected){
  if(!selected || !selected.length) return '—';
  let s = "🧭 راهنمای «لحظهٔ سوئیچ» برای بازی‌های انتخاب‌شده:\n";
  selected.forEach(name=>{
    const g = GAME_SWITCH_GUIDE[name];
    if(!g) return;
    s += `\n— ${name}\n  نشانه‌ها:\n`;
    g.cues.forEach(c=> s+=`  • ${c}\n`);
    s += `  نمونهٔ سوئیچ:\n`;
    g.examples.forEach(ex=> s+=`  • ${ex}\n`);
  });
  s += "\n✍️ بنویس: «محرک سوئیچ چه بود و نقش‌ها چگونه چرخیدند؟»";
  return s;
}

function formatNeedDetails(d){
  if(!d || !Object.keys(d).length) return '';
  return Object.entries(d).map(([need,info])=>{
    return `• ${need} — شدت:${info.intensity??'؟'} | جهت:${info.valence??'؟'} | راهبرد:${info.strategy??'—'} | نتیجه:${info.outcome??'—'}`;
  }).join('\n');
}

// شروع
render();
