/* ========================
 * TA PWA – ویزارد آفلاین
 * ======================== */

const SUBROLES = {
  "کودک": ["کودک طبیعی","کودک انطباق‌یافته مطیع","کودک انطباق‌یافته سرکش"],
  "والد": ["والد انتقادگر مثبت","والد انتقادگر منفی","والد حمایتگر مثبت","والد حمایتگر منفی"]
};

const EMOTIONS = ["خشم","غم","ترس","شادی","عشق","گناه","شرم","هیجان","آرامش"];
const NEEDS = ["بقا 🛡️","عشق و تعلق 💞","قدرت و ارزشمندی 💪","آزادی 🕊️","تفریح و لذت 🎨"];

const NEED_SHORT = {
  "بقا 🛡️": "امنیت/سلامت/پول/نظم؛ وقتی شرایط ناپایدار/خطرناک حس می‌شود.",
  "عشق و تعلق 💞": "ارتباط/صمیمیت/پذیرفته‌شدن؛ نیاز به پیوند و دیده‌شدن.",
  "قدرت و ارزشمندی 💪": "موثر بودن/احترام/موفقیت/کنترل.",
  "آزادی 🕊️": "استقلال/حق‌انتخاب/آزادی تصمیم/بیان.",
  "تفریح و لذت 🎨": "سرگرمی/خلاقیت/خنده/یادگیری خوشایند."
};

const NEED_STRATEGIES = {
  "بقا 🛡️": [
    "اطمینان از امنیت/مرزبندی فوری",
    "کاهش ریسک/توقف موقعیت",
    "جمع‌آوری اطلاعات/شفاف‌سازی",
    "کنترل/مدیریت منابع",
    "درخواست کمک/حمایت عملی",
  ],
  "عشق و تعلق 💞": [
    "درخواست توجه/شنیده‌شدن",
    "جستجوی حمایت/همدلی",
    "نزدیکی/برقراری تماس",
    "همکاری/شراکت",
    "مرزبندی محترمانه برای حفظ رابطه",
  ],
  "قدرت و ارزشمندی 💪": [
    "بیان نظر قاطع/ایستادن پای موضع",
    "تعیین معیار/استاندارد",
    "دفاع از شایستگی/ارزش",
    "هدایت گفتگو/تصمیم‌گیری",
    "بازخورد مشخص به عملکرد",
  ],
  "آزادی 🕊️": [
    "نه گفتن/مرزبندی",
    "پیشنهاد گزینهٔ جایگزین",
    "تغییر موضوع/مسیر",
    "درخواست زمان/فرصت",
    "خودمختاری در انجام کار",
  ],
  "تفریح و لذت 🎨": [
    "شوخ‌طبعی/لطیفه",
    "بازی/خلاقیت",
    "سبک‌کردن فضا",
    "دعوت به فعالیت لذت‌بخش",
    "یادگیری/کاوش کنجکاوانه",
  ],
};

const STRATEGY_INFO = {
  "اطمینان از امنیت/مرزبندی فوری": "مکث/توقف گفتگو؛ فاصله گرفتن؛ «الان امن نیست—بعداً ادامه می‌دهیم».",
  "کاهش ریسک/توقف موقعیت": "کم‌کردن احتمال آسیب: خروج کوتاه؛ تعویق تصمیم؛ پایین آوردن شدت بحث.",
  "جمع‌آوری اطلاعات/شفاف‌سازی": "سؤال دقیق؛ درخواست مثال/جزئیات؛ واقعیت‌سنجی پیش از واکنش.",
  "کنترل/مدیریت منابع": "تنظیم زمان/پول/امکانات برای امن و منظم‌ماندن.",
  "درخواست کمک/حمایت عملی": "صریح کمک خواستن: «می‌تونی فلان کار رو انجام بدی؟».",

  "درخواست توجه/شنیده‌شدن": "خواهش برای شنیدن بدون قطع‌کردن.",
  "جستجوی حمایت/همدلی": "می‌گم الان همدلی می‌خوام، نه راهکار.",
  "نزدیکی/برقراری تماس": "در آغوش/پیام دوستانه/تماس برای حس پیوند.",
  "همکاری/شراکت": "دعوت به انجام مشترک کار: «با هم برنامه بچینیم».",
  "مرزبندی محترمانه برای حفظ رابطه": "نهِ محترمانه برای جلوگیری از دلخوری بعدی.",

  "بیان نظر قاطع/ایستادن پای موضع": "روشن و محترمانه موضعم را می‌گویم و می‌ایستم.",
  "تعیین معیار/استاندارد": "تعریف شفاف کیفیت/زمان: «تعریفِ آماده این‌هاست».",
  "دفاع از شایستگی/ارزش": "ارائهٔ مثال/شواهد از توانمندی‌هام؛ پاسخ به تضعیف ارزش.",
  "هدایت گفتگو/تصمیم‌گیری": "تسهیل جلسه؛ جمع‌بندی؛ تعیین مسئولیت‌ها.",
  "بازخورد مشخص به عملکرد": "رفتار مشخص + اثرش + انتظار اصلاح؛ بدون برچسب شخصی.",

  "نه گفتن/مرزبندی": "رد محترمانه فشار/درخواست: «الان نمی‌پذیرم».",
  "پیشنهاد گزینهٔ جایگزین": "به‌جای نهِ مطلق، راه‌حل جایگزین می‌دهم.",
  "تغییر موضوع/مسیر": "گفتگو/کار را به مسیر مفیدتر می‌برم.",
  "درخواست زمان/فرصت": "مهلت می‌گیرم تا تصمیم/کیفیت بهتر شود.",
  "خودمختاری در انجام کار": "شیوهٔ اجرا/ابزار/زمان‌بندی را خودم انتخاب می‌کنم.",

  "شوخ‌طبعی/لطیفه": "طنز ملایم برای کاهش تنش (بدون تمسخر).",
  "بازی/خلاقیت": "رویکرد بازی‌گونه/خلاقانه برای حل مسئله.",
  "سبک‌کردن فضا": "تنفس کوتاه/استراحت/موسیقی برای نرم شدن فضا.",
  "دعوت به فعالیت لذت‌بخش": "پیشنهاد قهوه/پیاده‌روی/فعالیت باحال مشترک.",
  "یادگیری/کاوش کنجکاوانه": "امتحان ایدهٔ جدید/پرسش کنجکاوانه برای لذت."
};

const GAMES = [
  "چرا نمی‌کنی—آره، ولی…",
  "بزن منو",
  "حالا گرفتمت…!",
  "اگر تو نبودی…",
  "لکه پیدا کن",
  "ببین منو مجبور کردی",
  "هیاهو",
  "بذار این و اون بجنگن",
];

const GAME_INFO = {
  "چرا نمی‌کنی—آره، ولی…": {
    desc: "پیشنهاد می‌گیری اما هر کدام را با «ولی…» خنثی می‌کنی تا گیرماندگی تأیید شود.",
    anti: "پیشنهاد نده؛ قرارداد مسئولیت ببند: «دقیقاً چه کمکی می‌خوای؟ راه‌حل خودت چیه؟»"
  },
  "بزن منو": {
    desc: "زمینهٔ انتقاد را فراهم می‌کنم تا تأیید کنم «من بد/قربانی‌ام».",
    anti: "مرزبندی + بازخورد بالغِ مشخصِ رفتاری؛ نه تنبیه/طعنه."
  },
  "حالا گرفتمت…!": {
    desc: "کمین برای خطای کوچک و انفجار سرزنش؛ «دیگران بدند».",
    anti: "شفاف‌سازی معیارها و تمرکز بر ترمیم نه مجازات."
  },
  "اگر تو نبودی…": {
    desc: "دیگری بهانهٔ نرفتن به سمت آزادی/هدف می‌شود.",
    anti: "تمرکز بر اختیار: یک گام کوچک مستقل تعریف کن."
  },
  "لکه پیدا کن": {
    desc: "هر کاری کنی عیبی پیدا می‌شود تا «من برتر/تو ناکافی».",
    anti: "معیارهای روشنِ کیفیت + قدردانی واقعی از بخش‌های خوب."
  },
  "ببین منو مجبور کردی": {
    desc: "فرافکنی مسئولیت پیامدها به دیگری.",
    anti: "بازگرداندن مسئولیت: «انتخاب بعدی تو چیه؟»"
  },
  "هیاهو": {
    desc: "بالا بردن تنش/هیجان تا اصل موضوع گم شود.",
    anti: "کند کردن سرعت؛ زمان‌بندی؛ گفت‌وگوی بالغ–بالغ."
  },
  "بذار این و اون بجنگن": {
    desc: "تحریک دو نفر دیگر به درگیری برای دور ماندن از مسئولیت.",
    anti: "امتناع از واسطه‌گریِ مخرب؛ هدایت به گفت‌وگوی مستقیم."
  }
};

const GAME_SWITCH_GUIDE = {
  "چرا نمی‌کنی—آره، ولی…": {
    cues: [
      "ردِ پشت‌سرهمِ پیشنهادها با «ولی…»",
      "درخواست کمک بدون پذیرش مسئولیت/راه‌حلِ خود"
    ],
    examples: [
      "بعد از سومین «ولی…»، من از نجاتگر → آزارگر چرخیدم و او به قربانی رفت.",
      "وقتی پرسیدم «خودت چه راه‌حلی داری؟»، تنش بالا رفت و نقش‌ها چرخید."
    ]
  },
  "بزن منو": {
    cues: [
      "خودتحقیری/بی‌دفاع کردن خود برای دعوت به انتقاد",
      "چیدمان موقعیت‌هایی که احتمال ایراد گرفتن بالاست"
    ],
    examples: [
      "وقتی نقد تند کردم، او قربانی شد و بازی payoff گرفت.",
      "با یک طعنهٔ کوچک من، سوئیچ رخ داد (من آزارگر/او قربانی)."
    ]
  },
  "حالا گرفتمت…!": {
    cues: [
      "کمین برای خطای کوچک و بزرگنمایی آن",
      "سفت/صفر-یکی شدن ناگهانی معیارها"
    ],
    examples: [
      "به محض یک اشتباه ریز، او آزارگر شد و من قربانی.",
      "وقتی گفت «دیدی گفتم بلد نیستی»، سوئیچ روشن شد."
    ]
  },
  "اگر تو نبودی…": {
    cues: [
      "نسبت‌دادن موانع آزادی/هدف به دیگری",
      "واکنش سرزنش‌گرانه به مرزبندی"
    ],
    examples: [
      "گفتم «الان وقت ندارم»، جواب: «تو همیشه منو محدود می‌کنی» → سوئیچ.",
      "با پیشنهاد یک گام مستقل، نقش‌ها به قربانی/آزارگر چرخید."
    ]
  },
  "לکه پیدا کن": { // در بعضی فونت‌ها کاف جدا می‌شود—برای ایمنی می‌گذاریم همانی بماند.
    cues: [
      "جستجوی عیب در هر نتیجه",
      "تغییر معیارها برای ناممکن کردن «خوب بودن»"
    ],
    examples: [
      "پس از تحویل کار، با یافتن عیب تازه، او آزارگر شد.",
      "وقتی معیار را در لحظه عوض کرد، سوئیچ رخ داد."
    ]
  },
  "لکه پیدا کن": {
    cues: [
      "جستجوی عیب در هر نتیجه",
      "تغییر معیارها برای ناممکن کردن «خوب بودن»"
    ],
    examples: [
      "پس از تحویل کار، با یافتن عیب تازه، او آزارگر شد.",
      "وقتی معیار را در لحظه عوض کرد، سوئیچ رخ داد."
    ]
  },
  "ببین منو مجبور کردی": {
    cues: [
      "فرافکنی: «تو باعث شدی…»",
      "انکار نقش شخصی در پیامد"
    ],
    examples: [
      "«تو باعث شدی عصبانی بشم» → نقش‌ها چرخید.",
      "با انداختن تقصیر، از حل‌مسئله خارج شدیم (سوئیچ)."
    ]
  },
  "هیاهو": {
    cues: [
      "افزایش ناگهانی صدا/شتاب و تغییر موضوع از اصل",
      "هجوم مثال‌های قدیمی"
    ],
    examples: [
      "با بالا رفتن صدا و عوض شدن موضوع، سوئیچ اتفاق افتاد.",
      "وقتی بحث رفت سمت گذشتهٔ بی‌ربط، نقش‌ها جابه‌جا شد."
    ]
  },
  "بذار این و اون بجنگن": {
    cues: [
      "تحریک دو نفر دیگر به درگیری",
      "کنار کشیدن از مسئولیت خود"
    ],
    examples: [
      "به‌جای گفت‌وگوی مستقیم، دوتای دیگر را به جان هم انداخت → سوئیچ.",
      "با «تو به فلانی بگو…» مسیر بازی شد."
    ]
  }
};

// حالت برنامه
const S = {
  step: "intro",
  your: { name: "", role: "", subrole: "", needs: [], needDetails: {} },
  other: { name: "", role: "", subrole: "", needs: [], needDetails: {} },
  summary: "",
  emotions: [],
  games: { flag: "خیر", names: [], switchNote: "" }
};

// رجیستری سادهٔ صفحه‌ها
const screens = Array.from(document.querySelectorAll(".screen"));
function goto(id) {
  screens.forEach(s => s.classList.toggle("active", s.id === `screen-${id}`));
  S.step = id;
}

// ساخت چیپ‌های انتخابی
function makeChips(container, items, multi = false, selected = [], onToggle) {
  container.innerHTML = "";
  items.forEach(txt => {
    const lab = document.createElement("label");
    lab.className = "chip";
    const inp = document.createElement("input");
    inp.type = multi ? "checkbox" : "radio";
    inp.name = container.id + (multi ? "-m" : "-s");
    inp.value = txt;
    if (selected.includes(txt)) inp.checked = true;
    lab.appendChild(inp);
    lab.append(document.createTextNode(txt));
    lab.addEventListener("change", () => onToggle(txt, inp.checked));
    container.appendChild(lab);
  });
}

// زیرنقش‌ها (نمایش فوری)
function showSubroles(target) {
  const role = target === "your" ? S.your.role : S.other.role;
  const box = document.getElementById(target === "your" ? "your-subroles" : "other-subroles");
  if (role === "کودک" || role === "والد") {
    const options = SUBROLES[role] || [];
    box.classList.remove("hidden");
    makeChips(box, options, false, [], (val, checked) => {
      if (checked) {
        if (target === "your") S.your.subrole = val;
        else S.other.subrole = val;
      }
    });
    box.prepend(Object.assign(document.createElement("div"), { className: "help", textContent: "زیرنقش را انتخاب کن:" }));
  } else {
    box.classList.add("hidden");
    if (target === "your") S.your.subrole = "";
    else S.other.subrole = "";
  }
}

// احساسات
const emotionChips = document.getElementById("emotion-chips");
makeChips(emotionChips, EMOTIONS, true, [], (val, checked) => {
  if (checked) S.emotions.push(val);
  else S.emotions = S.emotions.filter(x => x !== val);
});
document.getElementById("emotion-free").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const v = e.currentTarget.value.trim();
    if (v && !S.emotions.includes(v)) {
      S.emotions.push(v);
      makeChips(emotionChips, Array.from(new Set([...EMOTIONS, v])), true, S.emotions, (val, checked) => {
        if (checked) S.emotions.push(val);
        else S.emotions = S.emotions.filter(x => x !== val);
      });
    }
    e.currentTarget.value = "";
  }
});

// نیازها
const yourNeedsList = document.getElementById("your-needs-list");
makeChips(yourNeedsList, NEEDS, true, [], (val, checked) => {
  if (checked) S.your.needs.push(val);
  else S.your.needs = S.your.needs.filter(x => x !== val);
});

// راهنمای کوتاهِ نیازها (بدون شلوغی)
(function fillNeedsCheatsheet(){
  const ul = document.getElementById("needs-cheatsheet-list");
  ul.innerHTML = "";
  NEEDS.forEach(n => {
    const li = document.createElement("li");
    li.textContent = `• ${n} — ${NEED_SHORT[n]}`;
    ul.appendChild(li);
  });
})();

// راهنمای مرحلهٔ جزییات
function intensityHelp(need) {
  return {
    q: `🌡️ شدت درگیری «${need}» را انتخاب کن (۱ تا ۵)`,
    h: "1 = خیلی کم\n2 = کم/ملایم\n3 = متوسط (قابل‌توجه)\n4 = زیاد (محور واکنش‌ها)\n5 = خیلی زیاد (تقریباً همه‌چیز حول این نیاز)"
  };
}
function valenceHelp(need) {
  return {
    q: `↕️ جهت درگیری «${need}» را انتخاب کن`,
    h: "➕ ارضا/دستیابی: برای رسیدن به نیاز اقدام شد.\n➖ دفاع/پرهیز: برای حفاظت از تهدیدِ نیاز اقدام شد."
  };
}
function strategyHelp(need) {
  const items = NEED_STRATEGIES[need] || [];
  const lines = items.map(x => `• ${x} — ${STRATEGY_INFO[x] || ""}`).join("\n");
  return { q: `🛠️ چه راهبردی برای «${need}» به‌کار رفت؟`, h: lines || "می‌توانی خودت هم بنویسی." };
}
function outcomeHelp(need) {
  return {
    q: `🎯 نتیجهٔ نهایی برای «${need}»؟`,
    h: "✅ برآورده شد — نیاز به‌طور رضایت‌بخش تأمین شد.\n◼️ تا حدی — بخشی تأمین شد/موقت بود.\n❌ برآورده نشد — تأمین نشد یا بدتر شد."
  };
}

// ویزارد جزییات: وضعیت جاری
const detail = {
  target: "your", // your | other
  index: 0,
  step: "intensity", // intensity | valence | strategy | outcome
};

function renderDetail(target) {
  detail.target = target;
  const isYour = target === "your";
  const needs = isYour ? S.your.needs : S.other.needs;

  if (!needs.length) {
    goto(isYour ? "your-needs" : "other-needs");
    return;
  }

  const need = needs[detail.index];
  const titleEl = document.getElementById(isYour ? "detail-title" : "detail-title-other");
  const qEl = document.getElementById(isYour ? "detail-question" : "detail-question-other");
  const hEl = document.getElementById(isYour ? "detail-help" : "detail-help-other");
  const optEl = document.getElementById(isYour ? "detail-options" : "detail-options-other");

  titleEl.textContent = `جزئیات: ${need}`;

  let qh;
  if (detail.step === "intensity") qh = intensityHelp(need);
  if (detail.step === "valence") qh = valenceHelp(need);
  if (detail.step === "strategy") qh = strategyHelp(need);
  if (detail.step === "outcome") qh = outcomeHelp(need);

  qEl.textContent = qh.q;
  hEl.textContent = qh.h;

  // گزینه‌ها
  optEl.innerHTML = "";
  if (detail.step === "intensity") {
    makeChips(optEl, ["1","2","3","4","5"], false, [], (val) => setDetailValue(need, "intensity", Number(val), isYour));
  } else if (detail.step === "valence") {
    makeChips(optEl, ["➕ ارضا/دستیابی","➖ دفاع/پرهیز"], false, [], (val) => setDetailValue(need, "valence", val, isYour));
  } else if (detail.step === "strategy") {
    const items = NEED_STRATEGIES[need] || [];
    makeChips(optEl, items, false, [], (val) => setDetailValue(need, "strategy", val, isYour));
    // تایپ آزاد
    const free = document.createElement("input");
    free.placeholder = "راهبرد دیگر (Enter)";
    free.addEventListener("keydown", e => {
      if (e.key === "Enter" && free.value.trim()) {
        setDetailValue(need, "strategy", free.value.trim(), isYour);
        free.value = "";
      }
    });
    optEl.appendChild(free);
  } else if (detail.step === "outcome") {
    makeChips(optEl, ["✅ برآورده شد","◼️ تا حدی","❌ برآورده نشد"], false, [], (val) => setDetailValue(need, "outcome", val, isYour));
  }

  goto(isYour ? "your-need-detail" : "other-need-detail");
}

function setDetailValue(need, key, value, isYour) {
  const bag = isYour ? S.your.needDetails : S.other.needDetails;
  bag[need] = bag[need] || {};
  bag[need][key] = value;
}

// کنترل دکمه‌های detail (your)
document.getElementById("detail-back").addEventListener("click", () => {
  if (detail.step === "intensity") {
    goto("your-needs");
  } else if (detail.step === "valence") {
    detail.step = "intensity"; renderDetail("your");
  } else if (detail.step === "strategy") {
    detail.step = "valence"; renderDetail("your");
  } else if (detail.step === "outcome") {
    detail.step = "strategy"; renderDetail("your");
  }
});
document.getElementById("detail-next").addEventListener("click", () => {
  const needs = S.your.needs;
  const need = needs[detail.index] || "";
  const info = S.your.needDetails[need] || {};
  const required = { intensity: "intensity", valence: "valence", strategy: "strategy", outcome: "outcome" }[detail.step];
  if (!info[required]) return toast("اول یک گزینه انتخاب کن.");

  if (detail.step === "intensity") detail.step = "valence";
  else if (detail.step === "valence") detail.step = "strategy";
  else if (detail.step === "strategy") detail.step = "outcome";
  else if (detail.step === "outcome") {
    if (detail.index + 1 < needs.length) { detail.index += 1; detail.step = "intensity"; }
    else { detail.index = 0; detail.step = "intensity"; goto("other-needs"); return; }
  }
  renderDetail("your");
});

// other detail
document.getElementById("detail-back-other").addEventListener("click", () => {
  if (detail.step === "intensity") {
    goto("other-needs");
  } else if (detail.step === "valence") {
    detail.step = "intensity"; renderDetail("other");
  } else if (detail.step === "strategy") {
    detail.step = "valence"; renderDetail("other");
  } else if (detail.step === "outcome") {
    detail.step = "strategy"; renderDetail("other");
  }
});
document.getElementById("detail-next-other").addEventListener("click", () => {
  const needs = S.other.needs;
  const need = needs[detail.index] || "";
  const info = S.other.needDetails[need] || {};
  const required = { intensity: "intensity", valence: "valence", strategy: "strategy", outcome: "outcome" }[detail.step];
  if (!info[required]) return toast("اول یک گزینه انتخاب کن.");

  if (detail.step === "intensity") detail.step = "valence";
  else if (detail.step === "valence") detail.step = "strategy";
  else if (detail.step === "strategy") detail.step = "outcome";
  else if (detail.step === "outcome") {
    if (detail.index + 1 < needs.length) { detail.index += 1; detail.step = "intensity"; }
    else { goto("games"); return; }
  }
  renderDetail("other");
});

// بازی‌ها
const gameYesNo = document.getElementById("game-yesno");
const gameSelectBox = document.getElementById("game-select");
const gameChips = document.getElementById("game-chips");
const switchGuide = document.getElementById("switch-guide");
makeChips(gameChips, GAMES, true, [], (val, checked) => {
  if (checked) S.games.names.push(val);
  else S.games.names = S.games.names.filter(x => x !== val);
  renderSwitchGuide();
});
gameYesNo.addEventListener("change", () => {
  const v = document.querySelector('input[name="game-flag"]:checked')?.value || "خیر";
  S.games.flag = v;
  if (v === "بله") gameSelectBox.classList.remove("hidden");
  else gameSelectBox.classList.add("hidden");
});
document.getElementById("game-switch-note").addEventListener("input", e => {
  S.games.switchNote = e.currentTarget.value;
});

// پرکردن «راهنمای کامل بازی‌ها»
(function fillGamesCheatsheet(){
  const body = document.getElementById("games-cheatsheet-body");
  const lines = [];
  GAMES.forEach(n => {
    const g = GAME_INFO[n] || {};
    lines.push(`— ${n}\nچیست؟ ${g.desc || ""}\nآنتی‌تز: ${g.anti || ""}\n`);
  });
  body.textContent = lines.join("\n");
})();

function renderSwitchGuide() {
  if (!S.games.names.length) { switchGuide.textContent = ""; return; }
  const blocks = S.games.names.map(n => {
    const gi = GAME_INFO[n] || {};
    const sw = GAME_SWITCH_GUIDE[n] || GAME_SWITCH_GUIDE["לکه پیدا کن"]; // fallback تایپی
    const cues = (sw?.cues || []).map(x => `  • ${x}`).join("\n");
    const ex  = (sw?.examples || []).map(x => `  • ${x}`).join("\n");
    return `• ${n}\nچیست؟ ${gi.desc || ""}\nآنتی‌تز: ${gi.anti || ""}\nنشانه‌های سوئیچ:\n${cues || "  —"}\nنمونهٔ سوئیچ:\n${ex || "  —"}`;
  });
  switchGuide.textContent = "🧭 راهنما:\n" + blocks.join("\n\n");
}

// نام‌ها و خلاصه (intro → your-role)
document.getElementById("next-0").addEventListener("click", () => {
  S.your.name = document.getElementById("your_name").value.trim();
  S.other.name = document.getElementById("other_name").value.trim();
  S.summary = document.getElementById("summary").value.trim();
  goto("your-role");
});

// نقش شما
document.getElementById("your-role-group").addEventListener("change", () => {
  const v = document.querySelector('input[name="your-role"]:checked')?.value;
  S.your.role = v || "";
  showSubroles("your");
});
document.getElementById("next-your-role").addEventListener("click", () => {
  if (!S.your.role) return toast("اول نقش خودت را انتخاب کن.");
  if ((S.your.role === "کودک" || S.your.role === "والد") && !S.your.subrole)
    return toast("یک زیرنقش هم انتخاب کن.");
  goto("other-role");
});

// نقش طرف مقابل
document.getElementById("other-role-group").addEventListener("change", () => {
  const v = document.querySelector('input[name="other-role"]:checked')?.value;
  S.other.role = v || "";
  showSubroles("other");
});
document.getElementById("next-other-role").addEventListener("click", () => {
  if (!S.other.role) return toast("نقش طرف مقابل را انتخاب کن.");
  if ((S.other.role === "کودک" || S.other.role === "والد") && !S.other.subrole)
    return toast("یک زیرنقش برای طرف مقابل هم انتخاب کن.");
  goto("emotions");
});

// احساسات → نیازهای تو
document.getElementById("next-emotions").addEventListener("click", () => {
  if (!S.emotions.length) return toast("حداقل یک احساس انتخاب کن.");
  goto("your-needs");
});

// نیازهای تو → ویزارد جزییات تو
document.getElementById("next-your-needs").addEventListener("click", () => {
  if (!S.your.needs.length) return toast("حداقل یک نیاز را انتخاب کن.");
  detail.index = 0; detail.step = "intensity";
  renderDetail("your");
});

// نیازهای طرف مقابل → ویزارد جزییات طرف مقابل
document.getElementById("next-other-needs").addEventListener("click", () => {
  if (!S.other.needs.length) return toast("برای طرف مقابل هم حداقل یک نیاز انتخاب کن.");
  detail.index = 0; detail.step = "intensity";
  renderDetail("other");
});

// بازی‌ها → خلاصه
document.getElementById("next-games").addEventListener("click", () => {
  if (S.games.flag === "بله" && !S.games.names.length)
    return toast("حداقل یک بازی انتخاب کن یا «خیر» را بزن.");
  buildSummary();
  goto("summary");
});

// خلاصهٔ رکورد
function buildSummary() {
  const youRole = S.your.subrole ? `${S.your.role} (${S.your.subrole})` : S.your.role;
  const otherRole = S.other.subrole ? `${S.other.role} (${S.other.subrole})` : S.other.role;

  function fmtDetails(bag) {
    const lines = [];
    Object.keys(bag).forEach(need => {
      const d = bag[need] || {};
      lines.push(`• ${need} — شدت:${d.intensity ?? "?"} | جهت:${d.valence ?? "?"} | راهبرد:${d.strategy ?? "—"} | نتیجه:${d.outcome ?? "—"}`);
    });
    return lines.join("\n") || "—";
  }

  const msg =
`👤 نام شما: ${S.your.name || "—"}
👥 طرف مقابل: ${S.other.name || "—"}
📝 خلاصه:
${S.summary || "—"}

🎭 نقش شما: ${youRole || "—"}
🎭 نقش طرف مقابل: ${otherRole || "—"}
💬 احساس(ها): ${S.emotions.join("، ") || "—"}

🌱 نیازهای شما: ${S.your.needs.join("، ") || "—"}
📊 جزییات نیازهای شما:
${fmtDetails(S.your.needDetails)}

🌱 نیازهای طرف مقابل: ${S.other.needs.join("، ") || "—"}
📊 جزییات نیازهای طرف مقابل:
${fmtDetails(S.other.needDetails)}

🎲 آیا بوی بازی می‌داد؟ ${S.games.flag || "—"}
🎲 نام بازی/ها: ${S.games.names.join("، ") || "—"}
🧩 لحظهٔ سوئیچ: ${S.games.switchNote || "—"}
🕒 زمان: ${new Date().toISOString().replace("T"," ").slice(0,19)} UTC`;

  document.getElementById("summary-text").textContent = msg;
}

// ذخیره‌سازی محلی
const DB_KEY = "tapwa_records";
function loadRecords() {
  try { return JSON.parse(localStorage.getItem(DB_KEY) || "[]"); } catch { return []; }
}
function saveRecord(text) {
  const recs = loadRecords();
  recs.unshift({ id: Date.now(), text });
  localStorage.setItem(DB_KEY, JSON.stringify(recs));
}
function listRecords() {
  const box = document.getElementById("records-list");
  box.innerHTML = "";
  const recs = loadRecords();
  if (!recs.length) { box.textContent = "هنوز چیزی ذخیره نشده."; return; }
  recs.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";
    const pre = document.createElement("pre");
    pre.textContent = r.text;
    const row = document.createElement("div");
    row.className = "row";
    const btnCopy = document.createElement("button");
    btnCopy.textContent = "کپی";
    btnCopy.className = "secondary";
    btnCopy.onclick = () => copyText(r.text);
    const btnShare = document.createElement("button");
    btnShare.textContent = "ارسال";
    btnShare.onclick = () => shareText(r.text);
    row.append(btnCopy, btnShare);
    card.append(pre, row);
    box.append(card);
  });
}

// دکمه‌های پایین خلاصه
document.getElementById("btn-save").addEventListener("click", () => {
  const txt = document.getElementById("summary-text").textContent || "";
  if (!txt.trim()) return;
  saveRecord(txt);
  toast("ذخیره شد ✅");
});
document.getElementById("btn-share").addEventListener("click", () => {
  const txt = document.getElementById("summary-text").textContent || "";
  shareText(txt);
});
document.getElementById("btn-view").addEventListener("click", () => {
  listRecords();
  goto("records");
});
document.getElementById("btn-new").addEventListener("click", () => resetWizard());

// اشتراک/کپی
async function shareText(text) {
  if (navigator.share) {
    try { await navigator.share({ text }); } catch(e) {}
  } else {
    copyText(text);
  }
}
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast("در کلیپ‌بورد کپی شد 📋");
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text; document.body.appendChild(ta);
    ta.select(); document.execCommand("copy");
    ta.remove();
    toast("در کلیپ‌بورد کپی شد 📋");
  }
}
function downloadBlob(blob, filename) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

// پاک‌سازی ذخیره‌ها
document.getElementById("btn-clear").addEventListener("click", () => {
  if (confirm("همهٔ ذخیره‌ها پاک شود؟")) {
    localStorage.removeItem(DB_KEY);
    toast("پاک شد.");
  }
});

// شروع از اول (ریست ویزارد—بدون حذف ذخیره‌ها)
document.getElementById("btn-restart").addEventListener("click", () => resetWizard());
function resetWizard() {
  // حالت
  S.step = "intro";
  S.your = { name: "", role: "", subrole: "", needs: [], needDetails: {} };
  S.other = { name: "", role: "", subrole: "", needs: [], needDetails: {} };
  S.summary = "";
  S.emotions = [];
  S.games = { flag: "خیر", names: [], switchNote: "" };

  // فرم‌ها
  document.getElementById("your_name").value = "";
  document.getElementById("other_name").value = "";
  document.getElementById("summary").value = "";
  document.querySelectorAll('input[type="radio"]').forEach(i => i.checked = false);
  document.querySelectorAll('input[type="checkbox"]').forEach(i => i.checked = false);
  document.getElementById("your-subroles").classList.add("hidden");
  document.getElementById("other-subroles").classList.add("hidden");
  document.getElementById("game-switch-note").value = "";
  document.getElementById("switch-guide").textContent = "";
  document.getElementById("game-select").classList.add("hidden");

  // بازسازی چیپ احساسات (برای پاک شدن انتخاب‌های آزاد)
  makeChips(emotionChips, EMOTIONS, true, [], (val, checked) => {
    if (checked) S.emotions.push(val);
    else S.emotions = S.emotions.filter(x => x !== val);
  });

  goto("intro");
}

// ناوبری «بازگشت»
document.querySelectorAll("[data-back]").forEach(btn => {
  btn.addEventListener("click", () => goto(btn.getAttribute("data-back")));
});

// اکپورت‌ها
document.getElementById("btn-export-json").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(loadRecords(), null, 2)], { type: "application/json" });
  downloadBlob(blob, "ta-records.json");
});
document.getElementById("btn-export-csv").addEventListener("click", () => {
  const rows = loadRecords().map(r => `"${String(r.text).replace(/"/g,'""')}"`);
  const csv = "text\n" + rows.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  downloadBlob(blob, "ta-records.csv");
});

// سرویس‌ورکر
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}

// Toast ساده
let toastTimer = null;
function toast(msg) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.className = "show";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.className = "", 2000);
}
