/* ====== داده‌ها ====== */

const ROLES = ["کودک","بالغ","والد"];
const CHILD_SUBROLES = ["کودک طبیعی","کودک انطباق‌یافته مطیع","کودک انطباق‌یافته سرکش"];
const PARENT_SUBROLES = ["والد انتقادگر مثبت","والد انتقادگر منفی","والد حمایتگر مثبت","والد حمایتگر منفی"];

const EMOTIONS = ["خشم","غم","ترس","شادی","عشق","گناه","شرم","هیجان","آرامش"];

const NEED_INFO = {
  "بقا 🛡️":"امنیت، سلامت، پول، نظم.",
  "عشق و تعلق 💞":"ارتباط، صمیمیت، پذیرفته‌شدن.",
  "قدرت و ارزشمندی 💪":"موثر بودن، احترام، موفقیت.",
  "آزادی 🕊️":"استقلال، حق انتخاب، آزادی بیان.",
  "تفریح و لذت 🎨":"سرگرمی، خلاقیت، یادگیری لذت‌بخش.",
};
const NEEDS = Object.keys(NEED_INFO);

const VALENCE_POS = "➕ ارضا/دستیابی";
const VALENCE_NEG = "➖ دفاع/پرهیز";
const OUTCOME_OK = "✅ برآورده شد";
const OUTCOME_PARTIAL = "◼️ تا حدی";
const OUTCOME_NO = "❌ برآورده نشد";

const NEED_STRATEGIES = {
  "بقا 🛡️":[
    "اطمینان از امنیت/مرزبندی فوری","کاهش ریسک/توقف موقعیت","جمع‌آوری اطلاعات/شفاف‌سازی",
    "کنترل/مدیریت منابع","درخواست کمک/حمایت عملی"
  ],
  "عشق و تعلق 💞":[
    "درخواست توجه/شنیده‌شدن","جستجوی حمایت/همدلی","نزدیکی/برقراری تماس",
    "همکاری/شراکت","مرزبندی محترمانه برای حفظ رابطه"
  ],
  "قدرت و ارزشمندی 💪":[
    "بیان نظر قاطع/ایستادن پای موضع","تعیین معیار/استاندارد","دفاع از شایستگی/ارزش",
    "هدایت گفتگو/تصمیم‌گیری","بازخورد مشخص به عملکرد"
  ],
  "آزادی 🕊️":[
    "نه گفتن/مرزبندی","پیشنهاد گزینهٔ جایگزین","تغییر موضوع/مسیر",
    "درخواست زمان/فرصت","خودمختاری در انجام کار"
  ],
  "تفریح و لذت 🎨":[
    "شوخ‌طبعی/لطیفه","بازی/خلاقیت","سبک‌کردن فضا",
    "دعوت به فعالیت لذت‌بخش","یادگیری/کاوش کنجکاوانه"
  ],
};

const STRATEGY_INFO = {
  "اطمینان از امنیت/مرزبندی فوری":"مکث، فاصله گرفتن، انتقال گفتگو.",
  "کاهش ریسک/توقف موقعیت":"تعویق تصمیم، کاهش تنش.",
  "جمع‌آوری اطلاعات/شفاف‌سازی":"سؤال دقیق و مثال قبل از واکنش.",
  "کنترل/مدیریت منابع":"تنظیم زمان/پول/ابزار.",
  "درخواست کمک/حمایت عملی":"صریح کمک خواستن.",
  "درخواست توجه/شنیده‌شدن":"خواهش برای گوش دادن کامل.",
  "جستجوی حمایت/همدلی":"می‌گویم همدلی می‌خواهم نه راهکار.",
  "نزدیکی/برقراری تماس":"در آغوش/تماس/پیام.",
  "همکاری/شراکت":"دعوت به انجام مشترک کار.",
  "مرزبندی محترمانه برای حفظ رابطه":"نهِ محترمانه.",
  "بیان نظر قاطع/ایستادن پای موضع":"موضع روشن و محترمانه.",
  "تعیین معیار/استاندارد":"تعریف کیفیت/موعد.",
  "دفاع از شایستگی/ارزش":"مثال از توانمندی‌ها.",
  "هدایت گفتگو/تصمیم‌گیری":"تسهیل جلسه و جمع‌بندی.",
  "بازخورد مشخص به عملکرد":"رفتار + اثر + انتظار.",
  "نه گفتن/مرزبندی":"رد محترمانه فشار.",
  "پیشنهاد گزینهٔ جایگزین":"راه‌حل جایگزین بجای نه مطلق.",
  "تغییر موضوع/مسیر":"بردن گفتگو به مسیر مفید.",
  "درخواست زمان/فرصت":"مهلت برای تصمیم بهتر.",
  "خودمختاری در انجام کار":"انتخاب روش/ابزار.",
  "شوخ‌طبعی/لطیفه":"طنز ملایم بدون تمسخر.",
  "بازی/خلاقیت":"رویکرد بازی‌گونه.",
  "سبک‌کردن فضا":"تنفس/استراحت/موسیقی.",
  "دعوت به فعالیت لذت‌بخش":"قهوه/پیاده‌روی.",
  "یادگیری/کاوش کنجکاوانه":"پرسش/آزمون ایده.",
};

const GAMES = [
  "چرا نمی‌کنی—آره، ولی…","بزن منو","حالا گرفتمت…!","اگر تو نبودی…",
  "لکه پیدا کن","ببین منو مجبور کردی","هیاهو","بذار این و اون بجنگن"
];
const GAME_INFO = {
  "چرا نمی‌کنی—آره، ولی…": {
    desc:"پیشنهادها گرفته می‌شود اما هرکدام با «ولی…» خنثی می‌شود.",
    anti:"پیشنهاد نده؛ قرارداد مسئولیت: «دقیقاً چه کمکی می‌خوای؟ راه‌حل خودت چیه؟»",
    cues:["رد پشت‌سرهم پیشنهادها با «ولی…»","درخواست کمک بدون مسئولیت‌پذیری"]
  },
  "بزن منو": {
    desc:"زمینهٔ انتقاد فراهم می‌شود تا نقش قربانی/بد تأیید شود.",
    anti:"مرزبندی + بازخورد بالغِ رفتاری؛ نه تنبیه/طعنه.",
    cues:["خودتحقیری برای دعوت به انتقاد","چیدمان موقعیت پرایراد"]
  },
  "حالا گرفتمت…!": {
    desc:"کمین برای خطای کوچک و بزرگنمایی آن.",
    anti:"شفاف‌سازی معیارها و تمرکز بر ترمیم نه مجازات.",
    cues:["کمین برای خطا","صفر-یکی شدن ناگهانی معیار"]
  },
  "اگر تو نبودی…": {
    desc:"دیگری بهانهٔ نرفتن به سمت آزادی/هدف می‌شود.",
    anti:"تمرکز بر اختیار: یک گام مستقل تعریف کن.",
    cues:["نسبت دادن مانع آزادی به دیگری","واکنش تدافعی به مرزبندی"]
  },
  "لکه پیدا کن": {
    desc:"در هر نتیجه عیبی پیدا می‌شود تا «تو ناکافی» ثابت شود.",
    anti:"معیار روشن + قدردانی واقعی از بخش خوب.",
    cues:["جستجوی عیب دائمی","تغییر معیار در لحظه"]
  },
  "ببین منو مجبور کردی": {
    desc:"مسئولیت پیامدها به دیگری فرافکنی می‌شود.",
    anti:"بازگرداندن مسئولیت: «انتخاب بعدی تو چیه؟»",
    cues:["«تو باعث شدی…»","انکار نقش شخصی"]
  },
  "هیاهو": {
    desc:"بالا بردن تنش تا اصل موضوع گم شود.",
    anti:"کند کردن سرعت، زمان‌بندی، گفت‌وگوی بالغ–بالغ.",
    cues:["افزایش صدا/شتاب","هجوم مثال‌های قدیمی"]
  },
  "بذار این و اون بجنگن": {
    desc:"تحریک دو نفر دیگر برای دور ماندن از مسئولیت.",
    anti:"امتناع از واسطه‌گریِ مخرب؛ هدایت به گفت‌وگوی مستقیم.",
    cues:["تحریک دو نفر دیگر","کناره‌گیری از مسئولیت"]
  },
};

/* ====== وضعیت ====== */
const state = {
  your_name:"", other_name:"", summary:"",
  your_role:"", your_subrole:"", other_role:"", other_subrole:"",
  emotions:[],
  your_needs:[], other_needs:[],
  your_need_details:{}, other_need_details:{},
  game_flag:"خیر", game_names:[], game_switch_note:""
};

const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

/* ====== نمایش/ناوبری ====== */
function show(screen){
  $$('.screen').forEach(sc=>sc.classList.add('hidden'));
  $(`.screen[data-screen="${screen}"]`).classList.remove('hidden');
}
function resetAll(){
  Object.assign(state,{
    your_name:"", other_name:"", summary:"",
    your_role:"", your_subrole:"", other_role:"", other_subrole:"",
    emotions:[], your_needs:[], other_needs:[],
    your_need_details:{}, other_need_details:{},
    game_flag:"خیر", game_names:[], game_switch_note:""
  });
  // پاک کردن ورودی‌ها
  $('#your_name').value="";
  $('#other_name').value="";
  $('#summary').value="";
  $('#emotionInput').value="";
  $('#gameSwitchNote').value="";
  renderRoles();
  renderEmotions();
  renderNeeds('you');
  renderNeeds('other');
  $('#gamePanel').classList.add('hidden');
  $('#gameInfo').innerHTML="";
  $('#antiSummary').innerHTML="";
  show('intro');
}

/* ====== رندر نقش‌ها (با زیرنقش فوری) ====== */
function roleBlock(targetId, target){
  const host = document.getElementById(targetId);
  host.innerHTML = `
    <div class="role-title">نقش را انتخاب کن:</div>
    <div class="row">
      ${ROLES.map(r=>`<button class="chip" data-role="${target}" data-val="${r}">${r}</button>`).join('')}
    </div>
    <div class="subroles" id="${target}-sub"></div>
  `;
  host.querySelectorAll('[data-role]').forEach(b=>{
    b.addEventListener('click', e=>{
      host.querySelectorAll('[data-role]').forEach(x=>x.classList.remove('on'));
      e.currentTarget.classList.add('on');
      const val = e.currentTarget.dataset.val;
      state[target+'_role']=val;
      // نمایش فوری زیرنقش درجا
      const sub = document.getElementById(`${target}-sub`);
      let arr=[];
      if(val==="کودک") arr = CHILD_SUBROLES;
      else if(val==="والد") arr = PARENT_SUBROLES;
      if(arr.length){
        sub.classList.add('show');
        sub.innerHTML = arr.map(s=>`<button class="pill" data-sub="${target}" data-val="${s}">${s}</button>`).join('');
        sub.querySelectorAll('[data-sub]').forEach(p=>{
          p.addEventListener('click', ev=>{
            sub.querySelectorAll('[data-sub]').forEach(x=>x.classList.remove('on'));
            ev.currentTarget.classList.add('on');
            state[target+'_subrole']=ev.currentTarget.dataset.val;
          });
        });
      }else{
        sub.classList.remove('show');
        sub.innerHTML="";
        state[target+'_subrole']="";
      }
    });
  });
}
function renderRoles(){
  roleBlock('yourRole','your');
  roleBlock('otherRole','other');
}

/* ====== رندر احساس‌ها ====== */
function renderEmotions(){
  const box = $('#emotionChips');
  box.innerHTML = EMOTIONS.map(e=>`<button class="chip ${state.emotions.includes(e)?'on':''}" data-em="${e}">${e}</button>`).join('');
  box.querySelectorAll('[data-em]').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const val = e.currentTarget.dataset.em;
      toggleIn(state.emotions,val);
      renderEmotions();
      renderSelected('#emotionSelected', state.emotions);
    });
  });
  renderSelected('#emotionSelected', state.emotions);
}
$('#emotionAdd').addEventListener('click', ()=>{
  const t = $('#emotionInput').value.trim();
  if(!t) return;
  if(!EMOTIONS.includes(t)) EMOTIONS.push(t);
  if(!state.emotions.includes(t)) state.emotions.push(t);
  $('#emotionInput').value="";
  renderEmotions();
});
function renderSelected(sel, arr){
  $(sel).textContent = arr.length? 'انتخاب‌ها: ' + arr.join('، ') : '— هنوز چیزی انتخاب نشده.';
}
function toggleIn(arr,val){
  const i = arr.indexOf(val);
  if(i>-1) arr.splice(i,1); else arr.push(val);
}

/* ====== رندر نیازها + راهنما ====== */
function renderNeeds(which){
  const box = (which==='you') ? $('#needChipsYou') : $('#needChipsOther');
  const hints = (which==='you') ? $('#needHintsYou') : $('#needHintsOther');
  const selected = (which==='you') ? state.your_needs : state.other_needs;
  box.innerHTML = NEEDS.map(n=>`<button class="chip ${selected.includes(n)?'on':''}" data-need="${which}" data-val="${n}">${n}</button>`).join('');
  box.querySelectorAll('[data-need]').forEach(b=>{
    b.addEventListener('click', e=>{
      const val = e.currentTarget.dataset.val;
      toggleIn(selected, val);
      renderNeeds(which);
    });
  });
  // راهنمای کوتاه خوانا (نه شلوغ)
  hints.innerHTML = NEEDS.map(n=>`<div>• <b>${n}</b>: ${NEED_INFO[n]}</div>`).join('');
}

/* ====== ویزارد جزئیات نیاز ====== */
function intensityHelp(need){
  return [
    `🌡️ شدت درگیری «${need}» (۱ تا ۵)`,
    "۱ = خیلی کم | ۲ = کم | ۳ = متوسط | ۴ = زیاد | ۵ = خیلی زیاد",
    "شدت یعنی این نیاز چقدر در فکر/احساس/رفتار لحظه حاضر بود."
  ].join('\n');
}
function valenceHelp(need){
  return [
    `↕️ جهت درگیری «${need}»`,
    `${VALENCE_POS}: اقدامی برای رسیدن/تجربهٔ نیاز (مثلاً برای «آزادی»، زمان بیشتری خواستم).`,
    `${VALENCE_NEG}: اقدامی برای حفاظت/پرهیز (مثلاً برای «بقا»، بحث را متوقف کردم).`
  ].join('\n');
}
function strategyHelp(need){
  const items = NEED_STRATEGIES[need]||[];
  return [
    `🛠️ راهبرد برای «${need}» (یکی را انتخاب یا بنویس)`,
    ...items.map(it=>`• ${it} — ${STRATEGY_INFO[it]||''}`)
  ].join('\n');
}
function outcomeHelp(need){
  return [
    `🎯 نتیجهٔ نهایی برای «${need}»`,
    `${OUTCOME_OK}: تأمین شد و آرامش/پیشرفت ایجاد شد.`,
    `${OUTCOME_PARTIAL}: بخشی تأمین شد یا موقت بود.`,
    `${OUTCOME_NO}: تأمین نشد یا بدتر شد.`
  ].join('\n');
}

function detailWizard(which){
  const needs = (which==='you')? state.your_needs : state.other_needs;
  const details = (which==='you')? state.your_need_details : state.other_need_details;
  let idx = 0, step = 'intensity';
  const host = (which==='you')? $('#ndyBody'):$('#ndoBody');
  const title = (which==='you')? $('#ndyTitle'):$('#ndoTitle');
  title.textContent = (which==='you')? '۵) جزئیات نیاز — شما' : '۷) جزئیات نیاز — طرف مقابل';

  function render(){
    host.innerHTML = "";
    if(!needs.length){
      host.innerHTML = `<div class="helper">نیازی انتخاب نشده.</div>`;
      return;
    }
    const need = needs[idx];
    const info = details[need] || (details[need]={});
    let html="";
    if(step==='intensity'){
      html += `<div class="q">شدت</div><div class="helper">${intensityHelp(need)}</div>
      <div class="pills">${[1,2,3,4,5].map(n=>`<button class="pill ${info.intensity===n?'on':''}" data-s="intensity" data-v="${n}">${n}</button>`).join('')}</div>`;
    }else if(step==='valence'){
      html += `<div class="q">جهت</div><div class="helper">${valenceHelp(need)}</div>
      <div class="pills">
        <button class="pill ${info.valence===VALENCE_POS?'on':''}" data-s="valence" data-v="${VALENCE_POS}">${VALENCE_POS}</button>
        <button class="pill ${info.valence===VALENCE_NEG?'on':''}" data-s="valence" data-v="${VALENCE_NEG}">${VALENCE_NEG}</button>
      </div>`;
    }else if(step==='strategy'){
      const items = NEED_STRATEGIES[need]||[];
      html += `<div class="q">راهبرد</div><div class="helper" style="white-space:pre-line">${strategyHelp(need)}</div>
      <div class="pills">${items.map(it=>`<button class="pill ${info.strategy===it?'on':''}" data-s="strategy" data-v="${it}">${it}</button>`).join('')}</div>
      <div class="inline-add"><input id="customStrategy" placeholder="راهبرد دلخواه..."><button id="addStrategy" class="btn">ثبت</button></div>`;
    }else if(step==='outcome'){
      html += `<div class="q">نتیجه</div><div class="helper">${outcomeHelp(need)}</div>
      <div class="pills">
        ${[OUTCOME_OK,OUTCOME_PARTIAL,OUTCOME_NO].map(o=>`<button class="pill ${info.outcome===o?'on':''}" data-s="outcome" data-v="${o}">${o}</button>`).join('')}
      </div>`;
    }
    html += `<div class="helper">نیاز جاری: ${need} — مورد ${idx+1} از ${needs.length}</div>`;
    host.innerHTML = html;

    host.querySelectorAll('.pill[data-s]').forEach(p=>{
      p.addEventListener('click', ev=>{
        const s = ev.currentTarget.dataset.s, v = ev.currentTarget.dataset.v;
        if(s==='intensity') info.intensity = parseInt(v,10);
        else info[s]=v;
        render();
      });
    });
    const addBtn = $('#addStrategy');
    if(addBtn){
      addBtn.addEventListener('click', ()=>{
        const t = $('#customStrategy').value.trim();
        if(!t) return;
        info.strategy = t;
        render();
      });
    }
  }

  render();

  const nextBtn = (which==='you')? $('#ndyNext'):$('#toGameCheck');
  if(which==='you'){
    nextBtn.onclick = ()=>{
      // پیشروی
      const need = needs[idx], info = details[need] || {};
      if(step==='intensity') step='valence';
      else if(step==='valence') step='strategy';
      else if(step==='strategy') step='outcome';
      else{
        // تمام این نیاز
        if(idx < needs.length-1){ idx++; step='intensity'; }
        else { show('needs-other'); return; }
      }
      render();
    };
  }else{
    // در صفحهٔ other روی دکمهٔ ادامه کلی صفحه "toGameCheck" تنظیم شده است
    $('#toGameCheck').onclick = ()=>{
      // اگر هنوز نیاز جاری کامل نشده، ادامه بده
      const need = needs[idx], info = details[need]||{};
      if(step!=='outcome'){
        if(step==='intensity') step='valence';
        else if(step==='valence') step='strategy';
        else if(step==='strategy') step='outcome';
        render();
        return;
      }
      if(idx < needs.length-1){ idx++; step='intensity'; render(); return; }
      // همه تمام → صفحهٔ بازی‌ها
      show('games');
    };
  }
}

/* ====== بازی‌ها ====== */
function renderGames(){
  const box = $('#gameChips');
  box.innerHTML = GAMES.map(g=>`<button class="chip ${state.game_names.includes(g)?'on':''}" data-game="${g}">${g}</button>`).join('');
  box.querySelectorAll('[data-game]').forEach(b=>{
    b.addEventListener('click', e=>{
      const val = e.currentTarget.dataset.game;
      toggleIn(state.game_names, val);
      renderGames();
      renderGameInfo();
      renderAntiSummary();
    });
  });
}
function renderGameInfo(){
  const infoHost = $('#gameInfo');
  if(!state.game_names.length){ infoHost.innerHTML=""; return; }
  infoHost.innerHTML = state.game_names.map(name=>{
    const g = GAME_INFO[name];
    const cues = (g.cues||[]).map(c=>`<li>${c}</li>`).join('');
    return `
      <div class="card">
        <b>${name}</b>
        <div class="helper">چیست؟ ${g.desc}</div>
        <div class="helper">آنتی‌تز: ${g.anti}</div>
        <details><summary>نشانه‌های سوئیچ</summary><ul class="helper">${cues}</ul></details>
      </div>
    `;
  }).join('');
}
function renderAntiSummary(){
  const host = $('#antiSummary');
  if(!state.game_names.length){ host.innerHTML=""; return; }
  const lines = state.game_names.map(n=>`• ${n}: ${GAME_INFO[n]?.anti||''}`).join('\n');
  host.textContent = `🧭 آنتی‌تزهای پیشنهادی:\n${lines}`;
}

/* ====== خلاصه ====== */
function buildSummary(){
  const youBlock = formatNeedBlock(state.your_need_details);
  const otherBlock = formatNeedBlock(state.other_need_details);
  const t = new Date();
  const ts = t.toISOString().replace('T',' ').split('.')[0] + " UTC";
  return [
    `👤 نام شما: ${state.your_name||'—'}`,
    `👥 طرف مقابل: ${state.other_name||'—'}`,
    `📝 خلاصه:\n${state.summary||'—'}`,
    ``,
    `🎭 نقش شما: ${state.your_role||'—'}${state.your_subrole?` (${state.your_subrole})`:''}`,
    `🎭 نقش طرف مقابل: ${state.other_role||'—'}${state.other_subrole?` (${state.other_subrole})`:''}`,
    `💬 احساس(ها): ${state.emotions.length?state.emotions.join('، '):'—'}`,
    ``,
    `🌱 نیازهای شما: ${state.your_needs.length?state.your_needs.join('، '):'—'}`,
    `📊 جزئیات نیازهای شما:\n${youBlock||'—'}`,
    ``,
    `🌱 نیازهای طرف مقابل: ${state.other_needs.length?state.other_needs.join('، '):'—'}`,
    `📊 جزئیات نیازهای طرف مقابل:\n${otherBlock||'—'}`,
    ``,
    `🎲 آیا بوی بازی می‌داد؟ ${state.game_flag||'—'}`,
    `🎲 نام بازی/ها: ${state.game_names.length?state.game_names.join('، '):'—'}`,
    `🧩 لحظهٔ سوئیچ: ${state.game_switch_note||'—'}`,
    `🕒 زمان: ${ts}`
  ].join('\n');
}
function formatNeedBlock(d){
  const lines=[];
  for(const need of Object.keys(d)){
    const info = d[need]||{};
    lines.push(`• ${need} — شدت:${info.intensity??'؟'} | جهت:${info.valence||'؟'} | راهبرد:${info.strategy||'—'} | نتیجه:${info.outcome||'—'}`);
  }
  return lines.join('\n');
}

/* ====== ذخیرهٔ محلی ====== */
const STORE_KEY = 'tapwa_records';
function loadStore(){ try{ return JSON.parse(localStorage.getItem(STORE_KEY)||'[]'); }catch{return []} }
function saveToStore(obj){
  const list = loadStore();
  list.unshift(obj);
  localStorage.setItem(STORE_KEY, JSON.stringify(list));
}
function renderStore(){
  const list = loadStore();
  const host = $('#storeList');
  if(!list.length){ host.innerHTML = `<div class="helper">چیزی ذخیره نشده.</div>`; return; }
  host.innerHTML = list.map((it,i)=>`
    <div class="item">
      <div><b>${it.your_name||'—'}</b> ↔ <b>${it.other_name||'—'}</b></div>
      <div class="helper">${(it.summary||'').slice(0,120)}${(it.summary||'').length>120?'…':''}</div>
      <div class="row wrap" style="margin-top:6px">
        <button class="btn" data-copy="${i}">کپی</button>
        <button class="btn danger" data-del="${i}">حذف</button>
      </div>
    </div>
  `).join('');
  host.querySelectorAll('[data-copy]').forEach(b=>{
    b.addEventListener('click', e=>{
      const i = +e.currentTarget.dataset.copy;
      navigator.clipboard.writeText(list[i].summary_text||"").then(()=>{
        alert('کپی شد ✅');
      });
    });
  });
  host.querySelectorAll('[data-del]').forEach(b=>{
    b.addEventListener('click', e=>{
      const i = +e.currentTarget.dataset.del;
      list.splice(i,1);
      localStorage.setItem(STORE_KEY, JSON.stringify(list));
      renderStore();
    });
  });
}

/* ====== رویدادها ====== */
$('#btnReset').addEventListener('click', resetAll);

// Intro → Roles
$('#toRoles').addEventListener('click', ()=>{
  state.your_name = $('#your_name').value.trim();
  state.other_name = $('#other_name').value.trim();
  state.summary = $('#summary').value.trim();
  show('roles');
});

// Roles → Emotions (با بررسی زیرنقش)
$('#toEmotions').addEventListener('click', ()=>{
  // اگر کودک/والد است ولی زیرنقش خالی باشد، اجازه نده
  if(state.your_role==="کودک" && !state.your_subrole) return alert('زیرنقش شما را انتخاب کن.');
  if(state.your_role==="والد" && !state.your_subrole) return alert('زیرنقش شما را انتخاب کن.');
  if(state.other_role==="کودک" && !state.other_subrole) return alert('زیرنقش طرف مقابل را انتخاب کن.');
  if(state.other_role==="والد" && !state.other_subrole) return alert('زیرنقش طرف مقابل را انتخاب کن.');
  renderEmotions();
  show('emotions');
});

// Emotions → Needs (you)
$('#toNeedsYou').addEventListener('click', ()=>{
  renderNeeds('you');
  show('needs-you');
});

// Needs (you) → Need details (you)
$('#toNeedDetailsYou').addEventListener('click', ()=>{
  if(!state.your_needs.length) return alert('حداقل یک نیاز برای خودت انتخاب کن.');
  detailWizard('you');
  show('need-details-you');
});

// Needs (other)
$('#toNeedDetailsOther').addEventListener('click', ()=>{
  if(!state.other_needs.length) return alert('برای طرف مقابل هم حداقل یک نیاز انتخاب کن.');
  detailWizard('other');
  show('need-details-other');
});

// Games
$('#gameNo').addEventListener('click', ()=>{
  state.game_flag = "خیر";
  $('#gamePanel').classList.add('hidden');
});
$('#gameYes').addEventListener('click', ()=>{
  state.game_flag = "بله";
  $('#gamePanel').classList.remove('hidden');
  renderGames();
});
$('#toSummary').addEventListener('click', ()=>{
  if(state.game_flag==="بله" && !state.game_names.length){
    // اجازه می‌دهیم کاربر بدون انتخاب بازی هم رد شود، اما هشدار دوستانه
    if(!confirm('هیچ بازی‌ای انتخاب نشده. ادامه بدهم؟')) return;
  }
  state.game_switch_note = $('#gameSwitchNote').value.trim();
  const text = buildSummary();
  $('#summaryText').textContent = text;
  renderStore();
  show('summary');
});

// Summary actions
$('#btnCopy').addEventListener('click', ()=>{
  const t = $('#summaryText').textContent;
  navigator.clipboard.writeText(t).then(()=> alert('کپی شد ✅'));
});
$('#btnShare').addEventListener('click', ()=>{
  const t = $('#summaryText').textContent;
  if(navigator.share){
    navigator.share({title:'خلاصهٔ TAJ', text:t}).catch(()=>{});
  }else{
    navigator.clipboard.writeText(t).then(()=> alert('در کلیپ‌بورد کپی شد ✅'));
  }
});
$('#btnSave').addEventListener('click', ()=>{
  const summary_text = $('#summaryText').textContent;
  saveToStore({...state, summary_text});
  renderStore();
  alert('ذخیره شد ✅ (فقط روی همین دستگاه)');
});
$('#btnClearLocal').addEventListener('click', ()=>{
  if(confirm('همهٔ ذخیره‌های محلی پاک می‌شوند. مطمئنی؟')){
    localStorage.removeItem(STORE_KEY);
    renderStore();
  }
});
$('#btnRestart').addEventListener('click', resetAll);

// Back buttons (همهٔ [data-back])
$$('[data-back]').forEach(b=>{
  b.addEventListener('click', ()=> window.history.back() || show('intro'));
});

/* ====== شروع ====== */
renderRoles();
renderEmotions();
renderNeeds('you');
renderNeeds('other');
show('intro');

/* ====== سرویس‌ورکر ====== */
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
  });
}
