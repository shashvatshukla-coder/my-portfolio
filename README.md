# Shashvat Shukla — Portfolio

A responsive, technology-forward portfolio built with React and Vite.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Chat-to-email setup

The floating **Chat with Shashvat** form is delivered by the Vercel Function at
`/api/contact`. Configure these variables in **Vercel → Project Settings →
Environment Variables**:

```text
GMAIL_USER=your-gmail-address@gmail.com
GMAIL_APP_PASSWORD=your-16-character-Google-app-password
```

`CONTACT_TO_EMAIL` is optional and only needed when messages should be delivered
to a different address. Apply the variables to Production, then redeploy the
project. Never commit a Gmail password or app password to this repository.

## Shashvat AI setup

The Gemini-powered portfolio assistant is served through `/api/gemini-chat`, so
the API key is never exposed to browser code. Create an API key in Google AI
Studio, then add this variable in **Vercel → Project Settings → Environment
Variables**:

```text
GEMINI_API_KEY=your-google-ai-studio-api-key
```

The server defaults to `gemini-3.7-flash`. `GEMINI_MODEL` can optionally override
that model. Apply the variable to Production and Preview, save it, and redeploy.
Never put the API key in a `VITE_` variable or commit it to GitHub.
