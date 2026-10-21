# VoiceToNotes Enterprise SSO — Administrator Documentation

Welcome to the **VoiceToNotes Single Sign-On (SSO)** Administrator Documentation. This repository provides complete, step-by-step guidance for enterprise administrators configuring and managing SAML 2.0 and OIDC authentication.

---

## Administrator Documentation Index

| Step / Guide | Description |
| :--- | :--- |
| [01. Overview & Prerequisites](docs/01_OVERVIEW_AND_PREREQUISITES.md) | Enterprise subscription requirements, admin role, and VoiceToNotes Service Provider details. |
| [02. Step 1: Open SSO Settings & Verify Domain](docs/02_ADMIN_CONFIGURATION_FLOW.md) | Accessing Settings > Single Sign-On, DNS TXT verification (`vtn-site-verification=...`), and protocol selection. |
| [03. Step 2: SAML 2.0 Configuration](docs/03_SAML_2_0_SETUP.md) | Fast Setup (Metadata XML / URL) vs. Manual Setup and X.509 certificate rules. |
| [04. Step 3: OpenID Connect (OIDC) Setup](docs/04_OIDC_SETUP.md) | Client ID, Client Secret, and Discovery / Issuer URL parameters. |
| [05. Identity Provider Directory](docs/05_IDENTITY_PROVIDERS.md) | Overview index of all supported IdP configurations. |
| &nbsp;&nbsp;&bull; [Google Workspace Guide](docs/05_IDP_GOOGLE_WORKSPACE.md) | Dedicated guide for Google Admin Console SAML 2.0 app and User Access setup. |
| &nbsp;&nbsp;&bull; [Microsoft Entra ID Guide](docs/05_IDP_MICROSOFT_ENTRA.md) | Dedicated guide for Microsoft Entra ID (Azure AD) SAML 2.0 & OIDC. |
| &nbsp;&nbsp;&bull; [Okta Setup Guide](docs/05_IDP_OKTA.md) | Dedicated guide for Okta SAML 2.0 and OIDC Web App Integration. |
| &nbsp;&nbsp;&bull; [OneLogin & PingIdentity Guide](docs/05_IDP_PING_ONELOGIN.md) | Dedicated guide for OneLogin SAML Custom Connector and PingIdentity. |
| [06. Managing SSO & Team Seats](docs/06_MANAGING_SSO_AND_TEAMS.md) | SSO ON/OFF toggle, zero-downtime certificate rotation, and Team Seat access control. |
| [07. Member Login Experience](docs/07_MEMBER_LOGIN_EXPERIENCE.md) | Walkthrough of employee sign-in via "Continue with SSO" and work email. |
| [08. Troubleshooting & FAQs](docs/08_TROUBLESHOOTING_AND_FAQS.md) | Solutions for DNS delays, certificate validation, and seat allocation errors. |

---

## Interactive Documentation Portal (Next.js)

An interactive Next.js web documentation portal that directly renders all Markdown guides on a single, responsive page:

- **Framework:** Next.js (App Router, React 19)
- **Features:**
  - **Single Page Markdown Engine:** Automatically reads and compiles all `.md` guides from `docs/`.
  - **Clean Light Mode Only:** Modern typography, high-contrast readability, and red brand accents.
  - **Categorized Linear Sidebar:** Seamless scrollspy navigation linking all 12 setup guides.
  - **Interactive Code Blocks:** 1-click copy with instant visual confirmation.
  - **Visual Walkthrough Screenshots:** Full-resolution captures with click-to-zoom Lightbox.
  - **Mobile Responsive Drawer:** Collapsible navigation for tablets and mobile devices.

---

### How to Run Locally & Deploy

**Development Server:**
```powershell
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

**Production Build (Vercel, Netlify, Render, Cloudflare):**
```powershell
npm run build
npm start
```
> [!TIP]
> When deploying to **Vercel**, import the repository directly. Next.js is auto-detected with zero configuration needed.
