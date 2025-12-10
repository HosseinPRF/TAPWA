
# TA Journal PWA (Offline)

این پوشه یک وب‌اپ کاملاً آفلاین است که روی موبایل/دسکتاپ کار می‌کند.

## روش ۱ — GitHub Pages
1) یک ریپوی جدید بساز و همین فایل‌ها را در ریشه‌ی ریپو پوش کن.
2) Settings → Pages → Deploy from a branch → Branch: main → Folder: /(root)
3) لینک پابلیک را در موبایل باز کن → منوی مرورگر → Add to Home screen / Install App.

## روش ۲ — اجرا روی اندروید (Termux)
```
pkg update -y && pkg install -y python unzip
termux-setup-storage
cd ~/storage/downloads
unzip taj-pwa.zip -d taj-pwa
cd taj-pwa
python -m http.server 8000
```
بعد در Chrome برو به: http://localhost:8000  و «Add to Home screen».

## نکات
- داده‌ها در localStorage می‌مانند (همان دستگاه/همان مرورگر).
- از صفحهٔ خلاصه خروجی JSON/CSV بگیرید.
