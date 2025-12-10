
// ===== Data =====
const ROLES = ["کودک","بالغ","والد"];
const CHILD_SUBROLES = ["کودک طبیعی","کودک انطباق‌یافته مطیع","کودک انطباق‌یافته سرکش"];
const PARENT_SUBROLES = ["والد انتقادگر مثبت","والد انتقادگر منفی","والد حمایتگر مثبت","والد حمایتگر منفی"];

const EMOTIONS_FLAT = ["خشم","غم","ترس","شادی","عشق","گناه","شرم","هیجان","آرامش"];
const NEED_INFO = {
  "بقا 🛡️":"امنیت، سلامت، پول، سرپناه، نظم — وقتی شرایط ناپایدار/خطرناک حس می‌شود.",
  "عشق و تعلق 💞":"ارتباط، صمیمیت، پذیرفته‌شدن — نیاز به دیده‌شدن و پیوند با دیگران.",
  "قدرت و ارزشمندی 💪":"موثر بودن، احترام، موفقیت، کنترل — می‌خواهم مفید و باارزش باشم.",
  "آزادی 🕊️":"استقلال، حق انتخاب، آزادی بیان/تصمیم — از محدود شدن بدم می‌آید.",
  "تفریح و لذت 🎨":"سرگرمی، خلاقیت، خنده، یادگیری لذت‌بخش — از مسیر، کیف کنم.",
};
const NEEDS = Object.keys(NEED_INFO);

const NEED_STRATEGIES = {
  "بقا 🛡️":[
    "اطمینان از امنیت/مرزبندی فوری","کاهش ریسک/توقف موقعیت","جمع‌آوری اطلاعات/شفاف‌سازی","کنترل/مدیریت منابع","درخواست کمک/حمایت عملی"
  ],
  "عشق و تعلق 💞":[
    "درخواست توجه/شنیده‌شدن","جستجوی حمایت/همدلی","نزدیکی/برقراری تماس","همکاری/شراکت","مرزبندی محترمانه برای حفظ رابطه"
  ],
  "قدرت و ارزشمندی 💪":[
    "بیان نظر قاطع/ایستادن پای موضع","تعیین معیار/استاندارد","دفاع از شایستگی/ارزش","هدایت گفتگو/تصمیم‌گیری","بازخورد مشخص به عملکرد"
  ],
  "آزادی 🕊️":[
    "نه گفتن/مرزبندی","پیشنهاد گزینهٔ جایگزین","تغییر موضوع/مسیر","درخواست زمان/فرصت","خودمختاری در انجام کار"
  ],
  "تفریح و لذت 🎨":[
    "شوخ‌طبعی/لطیفه","بازی/خلاقیت","سبک‌کردن فضا","دعوت به فعالیت لذت‌بخش","یادگیری/کاوش کنجکاوانه"
  ],
};
const STRATEGY_INFO = {
  "اطمینان از امنیت/مرزبندی فوری":"مکث/توقف، فاصله گرفتن، گفتن «الان امن نیست—بعداً ادامه می‌دیم».",
  "کاهش ریسک/توقف موقعیت":"خروج کوتاه، تعویق تصمیم، کم‌کردن شدت بحث.",
  "جمع‌آوری اطلاعات/شفاف‌سازی":"سؤال دقیق، درخواست مثال/جزئیات، واقعیت‌سنجی.",
  "کنترل/مدیریت منابع":"تنظیم زمان/پول/امکانات برای امن و منظم ماندن.",
  "درخواست کمک/حمایت عملی":"صریح کمک خواستن.",
  "درخواست توجه/شنیده‌شدن":"خواهش برای شنیدن بدون قطع‌کردن.",
  "جستجوی حمایت/همدلی":"می‌گم الان همدلی می‌خوام، نه راهکار.",
  "نزدیکی/برقراری تماس":"در آغوش/پیام دوستانه/تماس.",
  "همکاری/شراکت":"دعوت به انجام مشترک کار.",
  "مرزبندی محترمانه برای حفظ رابطه":"نهِ محترمانه.",
  "بیان نظر قاطع/ایستادن پای موضع":"روشن و محترمانه موضعم رو می‌گم.",
  "تعیین معیار/استاندارد":"تعریف شفاف کیفیت/زمان.",
  "دفاع از شایستگی/ارزش":"شواهد از توانمندی‌ها.",
  "هدایت گفتگو/تصمیم‌گیری":"تسهیل جلسه، جمع‌بندی.",
  "بازخورد مشخص به عملکرد":"رفتار مشخص + اثرش + انتظار اصلاح.",
  "نه گفتن/مرزبندی":"رد محترمانه درخواست.",
  "پیشنهاد گزینهٔ جایگزین":"راه‌حل جایگزین می‌دهم.",
  "تغییر موضوع/مسیر":"گفتگو را به مسیر مفیدتر می‌برم.",
  "درخواست زمان/فرصت":"مهلت برای تصمیم بهتر.",
  "خودمختاری در انجام کار":"شیوهٔ اجرا را خودم انتخاب می‌کنم.",
  "شوخ‌طبعی/لطیفه":"طنز ملایم بدون تمسخر.",
  "بازی/خلاقیت":"رویکرد بازی‌گونه/خلاق.",
  "سبک‌کردن فضا":"تنفس کوتاه/استراحت/موسیقی.",
  "دعوت به فعالیت لذت‌بخش":"قهوه/پیاده‌روی/کار مشترک.",
  "یادگیری/کاوش کنجکاوانه":"امتحان ایدهٔ جدید/پرسش کنجکاوانه.",
};
const GAMES = ["چرا نمی‌کنی—آره، ولی…","بزن منو","حالا گرفتمت…!","اگر تو نبودی…","لکه پیدا کن","ببین منو مجبور کردی","هیاهو","بذار این و اون بجنگن"];
const GAME_INFO = {
  "چرا نمی‌کنی—آره، ولی…":{desc:"پیشنهاد می‌گیری و هرکدام را با «ولی…» خنثی می‌کنی.", anti:"پیشنهاد نده؛ قرارداد مسئولیت ببند."},
  "بزن منو":{desc:"زمینهٔ انتقاد را فراهم می‌کنم تا تأیید کنم «من بد/قربانی‌ام».", anti:"مرزبندی + بازخورد بالغِ مشخص."},
  "حالا گرفتمت…!":{desc:"کمین برای خطای کوچک و انفجار سرزنش.", anti:"شفاف‌سازی معیارها؛ تمرکز بر ترمیم."},
  "اگر تو نبودی…":{desc:"دیگری بهانهٔ نرفتن به سمت آزادی/هدف.", anti:"تمرکز بر اختیار و گام مستقل."},
  "לکه پیدا کن":{desc:"هر کاری کنی عیبی پیدا می‌شود.", anti:"معیار روشن + قدردانی واقعی."},
  "ببین منو مجبور کردی":{desc:"فرافکنی مسئولیت پیامدها.", anti:"بازگرداندن مسئولیت: «انتخاب بعدی؟»"},
  "هیاهو":{desc:"بالا بردن تنش تا اصل گم شود.", anti:"کند کردن سرعت، زمان‌بندی، بالغ–بالغ."},
  "بذار این و اون بجنگن":{desc:"تحریک دو نفر دیگر به درگیری.", anti:"امتناع از واسطه‌گریِ مخرب."},
};
const SWITCH_GUIDE = {
  "چرا نمی‌کنی—آره، ولی…":{cues:["رد پشت‌سرهمِ پیشنهاد","عدم مسئولیت‌پذیری"], ex:["بعد از سومین «ولی…»، سوئیچ شد."]},
  "بزن منو":{cues:["خودتحقیری","چیدمان موقعیت پرایراد"], ex:["با یک طعنهٔ من، سوئیچ رخ داد."]},
  "حالا گرفتمت…!":{cues:["کمین برای خطای کوچک","صفر-یکی شدن معیارها"], ex:["به محض اشتباه ریز، آزارگر شد."]},
  "اگر تو نبودی…":{cues:["نسبت دادن مانع","واکنش تدافعی"], ex:["«تو منو محدود می‌کنی» → سوئیچ"]},
  "לکه پیدا کن":{cues:["جستجوی عیب دائمی","تغییر معیارها"], ex:["بعد از تحویل کار، عیب تازه پیدا شد."]},
  "ببین منو مجبور کردی":{cues:["«تو باعث شدی…»","انکار نقش شخصی"], ex:["با انداختن تقصیر، سوئیچ شد."]},
  "هیاهو":{cues:["بالا رفتن صدا/شتاب","هجوم مثال‌های قدیمی"], ex:["موضوع عوض شد."]},
  "بذار این و اون بجنگن":{cues:["تحریک دو نفر دیگر","کنار کشیدن"], ex:["به‌جای گفت‌وگو مستقیم، دو نفر درگیر شدند."]},
};

const OUTCOME = ["✅ برآورده شد","◼️ تا حدی","❌ برآورده نشد"];
const VALENCE_POS = "➕ ارضا/دستیابی";
const VALENCE_NEG = "➖ دفاع/پرهیز";

let S = {
  screen: 0,
  your_name:"", other_name:"", summary:"",
  your_role:"", other_role:"",
  emotions:[], your_needs:[], other_needs:[],
  your_need_details:{}, other_need_details:{},
  game_flag:"خیر", game_names:[], game_switch_note:"",
  detailTarget:"your", detailIndex:0, detailStep:"intensity",
};

const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
function saveLocal(){
  const all = JSON.parse(localStorage.getItem('taj_records')||'[]');
  const rec = {
    your_name:S.your_name, other_name:S.other_name, summary:S.summary,
    your_role:S.your_role, other_role:S.other_role,
    emotion:S.emotions.join("، "),
    your_needs:S.your_needs, other_needs:S.other_needs,
    your_need_details:S.your_need_details, other_need_details:S.other_need_details,
    game_flag:S.game_flag, game_names:S.game_names, game_switch_note:S.game_switch_note,
    created_at:new Date().toISOString()
  };
  all.push(rec);
  localStorage.setItem('taj_records', JSON.stringify(all));
  return rec;
}
function toCSV(records){
  const header = ["your_name","other_name","summary","your_role","other_role","emotion","your_needs","other_needs","your_need_details","other_need_details","game_flag","game_names","game_switch_note","created_at"];
  const rows = [header.join(",")];
  for(const r of records){
    const row = [
      r.your_name, r.other_name, r.summary, r.your_role, r.other_role,
      r.emotion, (r.your_needs||[]).join(" | "), (r.other_needs||[]).join(" | "),
      JSON.stringify(r.your_need_details), JSON.stringify(r.other_need_details),
      r.game_flag, (r.game_names||[]).join(" | "), r.game_switch_note, r.created_at
    ].map(x=>('"'+String(x).replace(/"/g,'""')+'"'));
    rows.push(row.join(","));
  }
  return rows.join("\\n");
}
function download(name, content, type="text/plain"){
  const blob = new Blob([content], {type});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 5000);
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e)=>{ e.preventDefault(); deferredPrompt = e; showInstallBar(); });
function showInstallBar(){
  const t = document.getElementById('tpl-install'); if(!t) return;
  const bar = t.content.cloneNode(true); document.body.appendChild(bar);
  $('#btn-install').onclick = async()=>{ if(deferredPrompt){ await deferredPrompt.prompt(); deferredPrompt=null; } $('.install-bar').remove(); };
  $('#btn-close-install').onclick = ()=> $('.install-bar').remove();
}

function render(){
  const app = document.getElementById('app');
  const h = (html)=> app.innerHTML = `<div class="card">${html}</div>`;
  const nav = (b=true,n=true)=>`<div class="row">${b?`<button class="btn ghost" id="btn-back">⬅️ بازگشت</button>`:""} ${n?`<button class="btn" id="btn-next">ادامه ▶️</button>`:""} <button class="btn alt" id="btn-reset">شروع از اول 🔄</button></div>`;
  const onNav=(o={})=>{
    $('#btn-back') && ($('#btn-back').onclick = o.back || (()=>{S.screen=Math.max(0,S.screen-1); render();}));
    $('#btn-next') && ($('#btn-next').onclick = o.next || (()=>{S.screen+=1; render();}));
    $('#btn-reset').onclick = ()=>{ S = {screen:0,your_name:"",other_name:"",summary:"",your_role:"",other_role:"",emotions:[],your_needs:[],other_needs:[],your_need_details:{},other_need_details:{},game_flag:"خیر",game_names:[],game_switch_note:"",detailTarget:"your",detailIndex:0,detailStep:"intensity"}; render(); };
  };

  switch(S.screen){
    case 0:{
      h(`<span class="badge">Privacy-first • Offline</span><h1>TA Journal — ژورنال تعاملی TA</h1><p>ثبت نقش‌ها، احساس‌ها، نیازها و بازی‌ها — <b>کاملاً آفلاین</b>.</p>${nav(false,true)}`);
      onNav(); break;
    }
    case 1:{
      h(`<h2>۱) نام‌ها و خلاصه</h2>
      <label>نام شما <input class="input" id="your_name" value="${S.your_name||""}"></label>
      <label>نام طرف مقابل <input class="input" id="other_name" value="${S.other_name||""}"></label>
      <label>خلاصهٔ کوتاه <textarea id="summary">${S.summary||""}</textarea></label>
      ${nav(true,true)}`);
      onNav({ next:()=>{ S.your_name=$('#your_name').value.trim(); S.other_name=$('#other_name').value.trim(); S.summary=$('#summary').value.trim(); S.screen=2; render(); } });
      break;
    }
    case 2:{
      const base = (S.your_role||"").split(" (")[0];
      const subOptions = base==="کودک"?CHILD_SUBROLES:(base==="والد"?PARENT_SUBROLES:[]);
      const curSub = S.your_role.includes("(")? S.your_role.split("(")[1].replace(")",""):"";
      h(`<h2>۲) نقش شما</h2>
        <div class="kb">${ROLES.map(r=>`<button data-role="${r}">${r}</button>`).join("")}</div>
        <p class="help">کودک=احساس/خودانگیختگی | بالغ=واقع‌نگر | والد=قواعد/حمایت یا انتقاد</p>
        ${subOptions.length?`<label>زیرنقش: <select id="sub"><option value="">—</option>${subOptions.map(s=>`<option ${s===curSub?'selected':''}>${s}</option>`).join("")}</select></label>`:""}
        ${nav(true,true)}`);
      $$('.kb button').forEach(b=> b.onclick=()=>{ S.your_role = b.dataset.role; render(); });
      onNav({ next:()=>{ if(S.your_role==="کودک"||S.your_role==="والد"){ const sub=$('#sub').value.trim(); if(sub) S.your_role=`${S.your_role} (${sub})`; } S.screen=3; render(); } });
      break;
    }
    case 3:{
      const base = (S.other_role||"").split(" (")[0];
      const subOptions = base==="کودک"?CHILD_SUBROLES:(base==="والد"?PARENT_SUBROLES:[]);
      const curSub = S.other_role.includes("(")? S.other_role.split("(")[1].replace(")",""):"";
      h(`<h2>۳) نقش طرف مقابل</h2>
        <div class="kb">${ROLES.map(r=>`<button data-role="${r}">${r}</button>`).join("")}</div>
        ${subOptions.length?`<label>زیرنقش: <select id="sub"><option value="">—</option>${subOptions.map(s=>`<option ${s===curSub?'selected':''}>${s}</option>`).join("")}</select></label>`:""}
        ${nav(true,true)}`);
      $$('.kb button').forEach(b=> b.onclick=()=>{ S.other_role = b.dataset.role; render(); });
      onNav({ next:()=>{ if(base==="کودک"||base==="والد"){ const sub=$('#sub')?.value?.trim(); if(sub) S.other_role=`${base} (${sub})`; } S.screen=4; render(); } });
      break;
    }
    case 4:{
      h(`<h2>۴) احساس‌ها (چندتایی)</h2>
        <div class="kb">${EMOTIONS_FLAT.map(e=>`<button class="${S.emotions.includes(e)?'active':''}" data-e="${e}">${e}</button>`).join("")}</div>
        <label>احساس دیگری داری؟ <input class="input" id="custom" placeholder="بنویس و اضافه کن"></label>
        <div class="row"><button class="btn ghost" id="add">➕ اضافه کن</button></div>
        <p class="small">انتخاب‌ها: ${S.emotions.join("، ")||"—"}</p>
        ${nav(true,true)}`);
      $$('.kb button').forEach(b=> b.onclick=()=>{ const e=b.dataset.e; const i=S.emotions.indexOf(e); if(i>-1)S.emotions.splice(i,1); else S.emotions.push(e); render(); });
      $('#add').onclick = ()=>{ const v=$('#custom').value.trim(); if(v && !S.emotions.includes(v)) S.emotions.push(v); $('#custom').value=''; render(); };
      onNav({ next:()=>{ S.screen=5; render(); } });
      break;
    }
    case 5:{
      h(`<h2>۵) نیازهای شما</h2>
        <div class="grid">${NEEDS.map(n=>`<label><input type="checkbox" value="${n}" ${S.your_needs.includes(n)?'checked':''}> ${n}</label><div class="small">${NEED_INFO[n]}</div>`).join("")}</div>
        <p class="help">بعداً شدت/جهت/راهبرد/نتیجه را می‌گیریم.</p>
        ${nav(true,true)}`);
      $$('input[type=checkbox]').forEach(ch=> ch.onchange=()=>{ const v=ch.value; if(ch.checked){ if(!S.your_needs.includes(v)) S.your_needs.push(v);} else {S.your_needs=S.your_needs.filter(x=>x!==v);} });
      onNav({ next:()=>{ S.screen=6; render(); } });
      break;
    }
    case 6:{
      h(`<h2>۶) نیازهای طرف مقابل</h2>
        <div class="grid">${NEEDS.map(n=>`<label><input type="checkbox" value="${n}" ${S.other_needs.includes(n)?'checked':''}> ${n}</label><div class="small">${NEED_INFO[n]}</div>`).join("")}</div>
        ${nav(true,true)}`);
      $$('input[type=checkbox]').forEach(ch=> ch.onchange=()=>{ const v=ch.value; if(ch.checked){ if(!S.other_needs.includes(v)) S.other_needs.push(v);} else {S.other_needs=S.other_needs.filter(x=>x!==v);} });
      onNav({ next:()=>{ S.detailTarget="your"; S.detailIndex=0; S.detailStep="intensity"; S.screen=7; render(); } });
      break;
    }
    case 7:{
      const arr = S.detailTarget==="your"? S.your_needs : S.other_needs;
      if(!arr.length){ S.screen+=1; render(); return; }
      const idx = S.detailIndex;
      if(idx>=arr.length){
        if(S.detailTarget==="your"){ S.detailTarget="other"; S.detailIndex=0; S.detailStep="intensity"; render(); return; }
        else{ S.screen=9; render(); return; }
      }
      const need = arr[idx];
      const dstore = S.detailTarget==="your"? S.your_need_details : S.other_need_details;
      dstore[need] = dstore[need]||{};
      let body = `<h2>۷) جزییات «${need}» (${idx+1}/${arr.length})</h2>`;
      if(S.detailStep==="intensity"){
        body += `<div class="help">🌡️ شدت حضور این نیاز: 1 خیلی کم … 5 خیلی زیاد</div>
                 <div class="kb">${[1,2,3,4,5].map(i=>`<button data-i="${i}" ${dstore[need].intensity===i?'class="active"':''}>${i}</button>`).join("")}</div>`;
      } else if(S.detailStep==="valence"){
        body += `<div class="help">${VALENCE_POS}=اقدام برای رسیدن | ${VALENCE_NEG}=حفاظت/پرهیز</div>
                 <div class="kb"><button data-v="${VALENCE_POS}">${VALENCE_POS}</button><button data-v="${VALENCE_NEG}">${VALENCE_NEG}</button></div>`;
      } else if(S.detailStep==="strategy"){
        const opts = NEED_STRATEGIES[need]||[];
        body += `<label>راهبرد: <select id="strategy"><option value="">—</option>${opts.map(s=>`<option ${dstore[need].strategy===s?'selected':''}>${s}</option>`).join("")}</select></label>
                 <div class="card small">${opts.map(s=>`<div><b>${s}</b> — ${STRATEGY_INFO[s]||""}</div>`).join("")||"—"}</div>
                 <label>راهبرد دیگر: <input class="input" id="strategyCustom"></label>`;
      } else if(S.detailStep==="outcome"){
        body += `<div class="kb">${OUTCOME.map(o=>`<button data-o="${o}" ${dstore[need].outcome===o?'class="active"':''}>${o}</button>`).join("")}</div>`;
      }
      body += `${nav(true,true)}`;
      h(body);
      $$('.kb button').forEach(b=>{
        if(b.dataset.i){ b.onclick = ()=>{ $$('.kb button').forEach(x=>x.classList.remove('active')); b.classList.add('active'); dstore[need].intensity = Number(b.dataset.i); }; }
        if(b.dataset.v){ b.onclick = ()=>{ $$('.kb button').forEach(x=>x.classList.remove('active')); b.classList.add('active'); dstore[need].valence = b.dataset.v; }; }
        if(b.dataset.o){ b.onclick = ()=>{ $$('.kb button').forEach(x=>x.classList.remove('active')); b.classList.add('active'); dstore[need].outcome = b.dataset.o; }; }
      });
      onNav({
        back:()=>{
          if(S.detailStep==="intensity"){
            if(idx>0){ S.detailIndex -= 1; S.detailStep="outcome"; }
            else{ S.screen = (S.detailTarget==="your")?5:6; }
          } else if(S.detailStep==="valence"){ S.detailStep="intensity"; }
          else if(S.detailStep==="strategy"){ S.detailStep="valence"; }
          else if(S.detailStep==="outcome"){ S.detailStep="strategy"; }
          render();
        },
        next:()=>{
          if(S.detailStep==="intensity" && !dstore[need].intensity){ alert('شدت را انتخاب کن'); return; }
          if(S.detailStep==="valence" && !dstore[need].valence){ alert('جهت را انتخاب کن'); return; }
          if(S.detailStep==="strategy"){
            const val = $('#strategy').value.trim(); const cus = $('#strategyCustom').value.trim();
            if(!val && !cus){ alert('یک راهبرد انتخاب/وارد کن'); return; }
            dstore[need].strategy = val || cus;
          }
          if(S.detailStep==="outcome" && !dstore[need].outcome){ alert('نتیجه را انتخاب کن'); return; }
          S.detailStep = (S.detailStep==="intensity")?"valence":(S.detailStep==="valence")?"strategy":(S.detailStep==="strategy")?"outcome":"done";
          if(S.detailStep==="done"){ S.detailIndex += 1; S.detailStep="intensity"; }
          render();
        }
      });
      break;
    }
    case 9:{
      h(`<h2>۸) بوی «بازی» می‌داد؟</h2>
         <div class="kb"><button data-g="بله" ${S.game_flag==="بله"?'class="active"':''}>بله</button><button data-g="خیر" ${S.game_flag==="خیر"?'class="active"':''}>خیر</button></div>
         <p class="help">«بازی» الگویی تکراری است که با سوئیچ نقش‌ها و حس ناخوشایند تمام می‌شود.</p>
         ${nav(true,true)}`);
      $$('.kb button').forEach(b=> b.onclick=()=>{ S.game_flag=b.dataset.g; render(); });
      onNav({ next:()=>{ S.screen = (S.game_flag==="بله")?10:12; render(); } });
      break;
    }
    case 10:{
      h(`<h2>۹) نام بازی‌ها (چندتایی)</h2>
        <div class="grid">${GAMES.map(g=>`<label><input type="checkbox" value="${g}" ${S.game_names.includes(g)?'checked':''}> ${g}</label><div class="small">${GAME_INFO[g].desc} — <b>آنتی‌تز:</b> ${GAME_INFO[g].anti}</div>`).join("")}</div>
        <hr/>
        <div class="card small">
          <h3>🧭 راهنمای سوئیچ</h3>
          ${S.game_names.map(n=>{ const gg=SWITCH_GUIDE[n]; return gg?`<div><b>${n}</b> — نشانه‌ها: ${gg.cues.join("، ")} — نمونه: ${gg.ex}</div>`:""; }).join("")||"—"}
        </div>
        <label>🧩 لحظهٔ سوئیچ:<textarea id="switch_note">${S.game_switch_note||""}</textarea></label>
        ${nav(true,true)}`);
      $$('input[type=checkbox]').forEach(ch=> ch.onchange=()=>{ const v=ch.value; if(ch.checked){ if(!S.game_names.includes(v)) S.game_names.push(v);} else {S.game_names=S.game_names.filter(x=>x!==v);} render(); });
      onNav({ next:()=>{ S.game_switch_note = $('#switch_note').value.trim(); S.screen=12; render(); } });
      break;
    }
    case 12:{
      const rec = {
        your_name:S.your_name, other_name:S.other_name, summary:S.summary,
        your_role:S.your_role, other_role:S.other_role,
        emotion:S.emotions.join("، "), your_needs:S.your_needs, other_needs:S.other_needs,
        your_need_details:S.your_need_details, other_need_details:S.other_need_details,
        game_flag:S.game_flag, game_names:S.game_names, game_switch_note:S.game_switch_note,
        created_at:new Date().toISOString()
      };
      h(`<h2>خلاصه و ذخیره</h2>
        <pre class="small">${JSON.stringify(rec, null, 2)}</pre>
        <div class="row">
          <button class="btn" id="btn-save">ذخیره در دستگاه</button>
          <button class="btn ghost" id="btn-json">خروجی JSON</button>
          <button class="btn ghost" id="btn-csv">خروجی CSV (همه رکوردها)</button>
        </div>
        <p class="small">داده‌ها در مرورگر شما ذخیره می‌شوند (localStorage).</p>
        ${nav(true,false)}`);
      $('#btn-save').onclick = ()=>{ saveLocal(); alert('✅ ذخیره شد'); };
      $('#btn-json').onclick = ()=>{ download(`taj_record_${Date.now()}.json`, JSON.stringify(rec, null, 2), 'application/json'); };
      $('#btn-csv').onclick = ()=>{ const all=JSON.parse(localStorage.getItem('taj_records')||'[]'); download(`taj_records_${Date.now()}.csv`, toCSV(all), 'text/csv'); };
      onNav({ back:()=>{ S.screen-=1; render(); } });
      break;
    }
  }
}
render();
