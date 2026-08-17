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
