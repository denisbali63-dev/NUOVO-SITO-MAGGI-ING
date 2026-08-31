# Studio Ingegneria Maggi — Sito web

Sito istituzionale di **Studio Ingegneria Maggi S.r.l.** (Fiuggi · Nola · Rieti):
single-page in React + Vite, con servizi, progetti, approccio e contatti.

Il progetto è organizzato come **monorepo pnpm** (eredità dell'ambiente Replit in
cui è nato). Il sito vero e proprio vive in
`artifacts/studio-ingegneria-maggi/` ed è **autonomo**: non richiede né
l'API server né il database per funzionare (il modulo contatti è lato client).

## Struttura

- `artifacts/studio-ingegneria-maggi/` — **il sito** (React + Vite). È questo che
  viene pubblicato online.
- `artifacts/api-server/` — API server Express (opzionale, non usato dal sito).
- `artifacts/mockup-sandbox/` — sandbox di mockup usata in fase di design.
- `lib/*` — librerie condivise (client API, schema Zod, database Drizzle).
- `scripts/` — script di supporto.
- `.github/workflows/deploy.yml` — pubblicazione automatica su GitHub Pages.

## Requisiti

- [Node.js](https://nodejs.org) 22+
- [pnpm](https://pnpm.io) 11+ (`corepack enable && corepack prepare pnpm@11 --activate`)

## Avviare in locale

```bash
pnpm install
pnpm --filter @workspace/studio-ingegneria-maggi run dev
```

Il sito parte su http://localhost:5173 (variabili `PORT` e `BASE_PATH`
opzionali; in locale hanno default `5173` e `/`).

Per generare la versione statica di produzione:

```bash
pnpm --filter @workspace/studio-ingegneria-maggi run build
```

L'output finisce in `artifacts/studio-ingegneria-maggi/dist/public/`.

## Pubblicare su GitHub Pages

Il repository include una GitHub Action (`.github/workflows/deploy.yml`) che
builda il sito e lo pubblica automaticamente.

1. Carica il progetto su un repository GitHub (vedi sotto).
2. Su GitHub apri **Settings → Pages** e in *Build and deployment → Source*
   scegli **GitHub Actions**.
3. Ad ogni `push` sul branch `main` il sito viene ricostruito e pubblicato.
   L'indirizzo sarà `https://<tuo-utente>.github.io/<nome-repo>/`.

Il `BASE_PATH` viene calcolato in automatico dal nome del repository, quindi il
sito funziona anche pubblicato in una sottocartella. Se in futuro userai un
**dominio personalizzato** o una *user/organization page*
(`https://<utente>.github.io/`), imposta `BASE_PATH` a `/` nel workflow.

## Caricare il progetto su GitHub (prima volta)

Dalla cartella del progetto:

```bash
git remote add origin https://github.com/<tuo-utente>/<nome-repo>.git
git push -u origin main
```

Il repository è già inizializzato con un commit iniziale pulito.

## Note

- La cartella nasce da Replit: i file `.replit`, `.replitignore`, `replit.md` e
  `**/.replit-artifact/` sono lasciati come documentazione ma non servono su
  GitHub.
- Il vecchio backup git di Replit (con LFS su server interni) è stato rimosso e
  sostituito con un repository git pulito.
