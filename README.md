# TAPWA (TA Logger PWA)

آفلاین کار می‌کند. داده‌ها در مرورگر شما ذخیره می‌شود (localStorage).

## استقرار روی GitHub Pages
1) این فایل‌ها را در **ریشه‌ی ریپو** `TAPWA` آپلود کن.
2) در **Settings → Pages** گزینهٔ **Deploy from a branch** را انتخاب کن و `main / root` را ست کن.
3) آدرس برنامه: `https://hosseinprf.github.io/TAPWA/`
4) در موبایل با Chrome باز کن → منوی ⋮ → **Add to Home screen** یا **Install app**.
5) برای به‌روزرسانی SW، مقدار `CACHE` را در `service-worker.js` افزایش بده (مثل `tapwa-v2`).

## آیکن‌ها
دو فایل PNG مربعی اضافه کن:
- `icon-192.png`
- `icon-512.png`

(اگر نگذاری، هم کار می‌کند؛ ولی برای نمایش آیکن در Home Screen بهتر است اضافه شود.)

## خروجی‌گرفتن
بالای صفحه دکمهٔ **خروجی CSV** دارد؛ همهٔ رکوردهای ذخیره‌شده را دانلود می‌کند.
