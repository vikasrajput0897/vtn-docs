# Identity Provider Setup Guides

VoiceToNotes AI provides comprehensive, step-by-step administrator instructions for configuring Single Sign-On (SSO) with your organization's Identity Provider. 

Select your Identity Provider below to view its dedicated guide:

---

## Dedicated Identity Provider Guides

| Identity Provider | Supported Protocols | Guide Link | Key Features |
| :--- | :--- | :--- | :--- |
| **Google Workspace** | SAML 2.0 & OIDC | [Google Workspace Setup Guide](05_IDP_GOOGLE_WORKSPACE.md) | Custom SAML App, Google Cloud OAuth 2.0 / OIDC credentials, OU User Access. |
| **Microsoft Entra ID** | SAML 2.0 & OIDC | [Microsoft Entra ID Setup Guide](05_IDP_MICROSOFT_ENTRA.md) | Non-gallery Enterprise App, App Federation Metadata URL, App Registrations OIDC. |
| **Okta** | SAML 2.0 & OIDC | [Okta Setup Guide](05_IDP_OKTA.md) | SAML 2.0 Web App, OIDC Web App Integration, Attribute statements, Group assignments. |
| **OneLogin & PingIdentity** | SAML 2.0 & OIDC | [OneLogin & PingIdentity Guide](05_IDP_PING_ONELOGIN.md) | OneLogin SAML/OIDC connectors, PingOne SAML application & OIDC Web App setup. |

---

## Universal Service Provider (SP) Details
For all Identity Providers (whether using SAML 2.0 or OIDC), VoiceToNotes uses the following standard parameters:

- **Entity ID / Audience URI / Identifier:** `https://vtnaiproject.firebaseapp.com`
- **ACS URL / Reply URL / Redirect URI:** `https://vtnaiproject.firebaseapp.com/__/auth/handler`
- **NameID Format (SAML):** `EMAIL` / `EmailAddress` (`urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`)
- **Scopes (OIDC):** `openid`, `profile`, `email`

