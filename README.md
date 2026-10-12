# Hot Takes and High Stakes — Pixel Party Edition

A colorful, 8-bit-inspired real-time party game for 2–8 players. Each player joins on their own device with a six-character room code.

## What's new in v2.0

- New name: **Hot Takes and High Stakes** (both plural).
- Bright retro arcade palette, pixel borders, chunky buttons, legible text.
- Inclusive customizable pixel avatars: 16 skin tones, 24 hairstyles, varied hair colors and textures, face shapes, facial features, headwear, hearing aids, glasses, clothing, and more. No gender gates. Avatar preferences are saved on each player's device.
- Four **separate synchronized steps**: (1) Your Take — secret personal vote (20s); (2) Read the Room — majority prediction (15s); (3) Raise the Stakes — wager (15s); (4) Big Reveal (10s), then optional 30-second debate.
- Server validates and locks each action; the bet step no longer asks players to predict again.

## Run locally

Requires Node.js 20 or later.

```bash
npm install
npm start
```

Open `http://localhost:3000` in your browser. To test two local players, use two separate browser profiles or devices. Use your computer's LAN IP if testing from another device on the same network.

## Deploy to your EXISTING GitHub repository and Render site

**Do not create a second Render service unless you want a second site.**

1. Extract this ZIP. Inside `hot-takes-and-high-stakes/` are `server.js`, `package.json`, `README.md`, `.gitignore`, and `public/`.
2. Open your existing GitHub repository `BrieJDion/hot-take-high-stakes`.
3. Replace **both** `server.js` and `package.json` at the repository root. Replace the existing `public/app.js` and `public/index.html`, and add the new `public/avatar.js` and `public/style.css`.
4. You can update `README.md` too. **Keep the `public` directory structure intact**: do not put the contents of `public/` in the repository root.
5. Commit the changes to `main`. Your existing Render Web Service should automatically redeploy if auto-deploy is enabled. Otherwise, use **Manual Deploy → Deploy latest commit**.
6. Verify Render says **Live**, refresh your game in both browsers, and create a **new room**. Old rooms exist only in the old server's memory and won't survive redeployment.

Render settings remain: Node, `npm install`, `npm start`, blank Root Directory. The app listens on `process.env.PORT` and serves its `public/` directory.

The game **does not need a new URL** just because its displayed name has changed. Your existing Render URL may remain `https://hot-take-high-stakes.onrender.com`.

## How to play

- Host creates a room; 2–8 players join using a code.
- Each player starts with 1,000 fictional points.
- Vote your own opinion (Agree/Disagree); separately predict the room's majority; separately wager 50–500 points (or remaining balance if under 50).
- Surprise profit multiplier for correct predictions: 2× for winning margin >0% and ≤25%; 1.5× for >25% and ≤50%; 1× for >50%. Wrong predictions lose the wager; tied vote returns all wagers. The multiplier is shown only at the reveal.
- Zero-point players receive 100 points at the next round. Highest balance wins; tied leaders share first place.
- Host can skip the optional debate.

## Verification checklist

1. Open the public URL on a Mac and phone (ideally phone on cellular data).
2. Create a room on the Mac and join it on the phone; confirm both custom avatars appear.
3. Vote separately on both devices; confirm the game advances to **Read the Room**.
4. Predict on both devices; confirm it advances to **Raise the Stakes**.
5. Wager on both devices; confirm the results are identical, including net point changes.
6. Test a tie (one Agree and one Disagree) and confirm all wagers are returned.
7. Test reconnect by refreshing a player's browser during the lobby or a round.
8. Open the in-game rules and confirm they match the gameplay.

## Technical notes

- Server: Express + Socket.IO; client: HTML/CSS/vanilla JavaScript.
- Game state and rooms are held **in memory**. Restarting the server resets active rooms. Run a single server instance for this version.
- Avatars are generated from pixel-art SVG layers on the client; no photo upload is needed.
- The web font is optional; the page falls back to readable system fonts when offline.
- All wagering uses fictional points only.
