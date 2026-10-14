# Hot Takes and High Stakes — Pixel Party Edition v3.0

Real-time room-code party game for 2–8 players. **Version 3 replaces the old mix-and-match avatar editor with 16 complete, selectable pixel-art characters.**

## Run locally

Requires Node.js 20+.

```bash
npm install
npm start
```

Open http://localhost:3000. Use separate browsers/devices to test multiple players.

## Deploy on Render

Connect the repository to a **Web Service**. Build command: `npm install`. Start command: `npm start`. The app uses the `PORT` environment variable automatically. Deploy one instance; rooms are held in server memory, so restarting the service clears active rooms. A sleeping free instance may delay the first connection.

## Files

- `server.js`: Socket.IO room management, round timers, secret voting, scoring, and server-side validation of selected character IDs.
- `public/app.js`: join flow, selection grid, gameplay and results.
- `public/avatar.js`: stable character ID API; selects one of 16 prebuilt portraits.
- `public/avatars/00.svg`–`15.svg`: 16 fully designed portraits, each with its own hair, facial features, and clothing.
- `public/avatars/manifest.json`: names and descriptions.
- `public/style.css`: bright retro arcade styling and responsive character grid.

## Character selection

Choose one of 16 complete portraits before creating or joining a room. Click Surprise Me for a random character. The selection persists in localStorage and travels with the player's room session. Existing v2 customization saves fall back to character 0; older saved feature combinations are intentionally not migrated because this version uses fixed portraits.

## Gameplay

1. **Your Take:** Secret personal Agree/Disagree vote (20 seconds).
2. **Read the Room:** Predict majority Agree/Disagree (15 seconds).
3. **Raise the Stakes:** Wager points on the locked prediction (15 seconds).
4. **Big Reveal:** View majority and net payouts (10 seconds), then optional 30-second debate.

All points are fictional. The winning-margin payout schedule remains unchanged from v2. 2–8 players can join by a six-character room code. Player avatars are displayed in the lobby and results.

## Deploying this version over v2

Upload the **contents** of this folder to your existing GitHub repository, replacing the old `public/avatar.js`, `public/app.js`, `public/style.css`, and `server.js`. Add the new `public/avatars/` folder with all 16 SVG files. Keep `public/index.html` and `package.json` in their existing locations. Do not upload the ZIP as a single repository file. Commit, then wait for Render's auto-deploy.

## Validation

JavaScript syntax and all 16 SVG files were checked during packaging; a composite preview was generated. Full multiplayer browser testing on the deployed Render site is still required.
