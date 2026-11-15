# ERHS FBLA Website

The official website for the Eleanor Roosevelt High School chapter of **Future Business Leaders of America**. It brings chapter announcements, competition resources, project guides, and member leaderboards together in one place.

**Live site:** https://erhsfblaweb.web.app

## Features
- **Competitive events:** an overview of FBLA competitive events and how to prepare
- **Project how-to guides:** step-by-step guides for Business Achievement Awards (BAA), Section Projects, State Projects, and the chapter service project
- **Live leaderboards:** community service hours and Adopt-A-Chapter points, pulled from Google Sheets that sync into Firebase Realtime Database
- **Press releases:** a list rendered from `press_releases.json`, so officers can add a release without touching HTML
- **Program pages:** Business Partnerships, American Enterprise, and Adopt-A-Chapter

## Tech
- **Frontend:** HTML, CSS, JavaScript, Bootstrap (designed in Bootstrap Studio, sources in `studio_designs/`)
- **Data:** Firebase Realtime Database, fed from Google Sheets
- **Hosting:** Firebase Hosting

## How the leaderboards work
```
Google Sheet ──sync──► Realtime DB  /<sheetId>/Sheet1/<row>/<column>
                                │  (one read per page)
                                ▼
          src/lib/leaderboard.js  ──►  ranked list in #content
```
`src/lib/leaderboard.js` is a shared module. Each page passes in its sheet ID and column names:

| Page | Entry script | Columns |
|---|---|---|
| `CSevents.html` | `src/cshours.js` | First and Last Name, Hours |
| `leaderboard.html` | `src/leaderboard.js` | Name, Points |

The database is **read-only** to the public (`database.rules.json`). Only the two leaderboard paths are readable, and nothing is writable from the browser.

## Structure
```
public/                 # Deployed site (Firebase Hosting root)
  index.html            # Home
  compevents.html       # Competitive events
  CSevents.html         # Community service + hours leaderboard
  leaderboard.html      # Adopt-A-Chapter points leaderboard
  baa.html, sectionproj.html, stateproj.html, csproj.html, test.html   # How-to guides
  Press_Release_Page.html + press_releases.json
  src/                  # Leaderboard scripts (src/lib = shared Firebase + rendering)
  assets/               # CSS, fonts, images, documents
studio_designs/         # Bootstrap Studio source files
database.rules.json     # Realtime Database security rules
firebase.json           # Hosting + database config
```

## Running locally
```bash
npm install -g firebase-tools
firebase login
firebase emulators:start     # or: firebase serve --only hosting
```

## Deploying
```bash
firebase deploy --only hosting,database --project erhsfblaweb
```

## Team
Praneet Dumpa (lead developer) · Ethan Tran · JacowySnafu · Ironspidr
