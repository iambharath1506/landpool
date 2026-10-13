# Landpool ✈️🤝

**Split the airport ride with people on your flight.**

Landpool matches verified flight passengers landing around the same time into
shared rides — no app download for strangers, no phone numbers exchanged, fare
split automatically. The platform arranges the people; the group books one
Uber/Lyft together. No drivers in the loop until Phase 3.

A second mode, **Concert mode**, points the same pooling mechanic at concerts,
sports games, and festivals — verified by event ticket instead of boarding pass.

> 🌐 **Live site:** https://iambharath1506.github.io/landpool/


---

## ✨ Features

- **PNR / boarding-pass verification** — only real passengers join a flight's pool
- **Arrival-window matching** — pools across *all* flights landing within ±45 min,
  not just your own flight; flight delays auto-adjust the window
- **Invite-based groups** — accept an invite, meet at one terminal point
- **Privacy-first chat & calls** — WhatsApp-style in-app messaging and voice/video,
  masked identity, no phone numbers ever, chats auto-expire after the trip
- **1-on-1 messaging** after an invite is accepted
- **Women-only pools**, block/report, live trip sharing
- **Automatic fare split** — interactive savings calculator on the site
- **Concert mode** — same mechanic for events, ticket-verified
- **Interactive demo** — simulated JFK arrivals board, animated group-chat walkthrough

## 🗂️ Project structure

```
landpool/
├── index.html              # Page markup (content + structure)
├── assets/
│   ├── css/
│   │   └── styles.css      # All styling
│   ├── js/
│   │   └── app.js          # Demo logic: board, chat sim, calculator, mode toggle
│   └── img/
│       ├── hero-1.jpg
│       ├── hero-2.jpg
│       └── hero-3.jpg
├── .nojekyll              # Tell GitHub Pages to serve as-is
└── README.md
```

No build step. No dependencies. No backend — the demo data on the page is
simulated and clearly labeled.

## 🚀 Run locally

```bash
# any static server works; e.g. Python:
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just double-click `index.html` (Google Fonts need internet).

## 🌍 Deploy (GitHub Pages, free)

```bash
git init
git add .
git commit -m "Landpool concept site"
gh repo create landpool --public --source=. --push
```

Then in the repo: **Settings → Pages → Deploy from branch → `main` / root**.
Your site goes live at `https://<username>.github.io/landpool/`.

## 🗺️ Roadmap

- **Phase 1 — Matching layer (MVP):** PNR verification, arrival-window matching,
  group chat, meetup points. No drivers, no fleet — riders use Uber/Lyft.
- **Phase 2 — Concert mode:** event-ticket verification, venue pickup zones.
- **Phase 3 — Own supply:** recruit drivers only once the pools are a hit.

## 📄 License

MIT — do what you want with it.
