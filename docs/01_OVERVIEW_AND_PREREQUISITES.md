# VoiceToNotes Enterprise SSO — Administrator Guide

Welcome to the **VoiceToNotes Single Sign-On (SSO)** Administrator Guide. This guide provides clear, step-by-step instructions for enterprise administrators on how to configure, verify, test, and manage SSO for your organization.

---

## 1. What is Enterprise SSO?

Enterprise Single Sign-On allows employees in your organization to log in to VoiceToNotes using their existing corporate credentials (such as Google Workspace, Microsoft Entra ID / Azure AD, Okta, OneLogin, or Ping Identity).

- **For Administrators:** Configure SSO once in VoiceToNotes Settings, manage corporate domains, and control user access via team seats.
- **For Employees:** Effortless one-click sign in with their work email — no separate passwords required.

---

## 2. Administrator Prerequisites

Before configuring SSO in VoiceToNotes, ensure you have:

1. **B2B Enterprise Subscription:** Your workspace must be on an active B2B Enterprise plan.
2. **Administrator Role:** You must be logged in as the Owner or Administrator of the VoiceToNotes workspace.
3. **Corporate Domain DNS Access:** Access to your domain registrar or DNS management console (e.g. Cloudflare, AWS Route 53, GoDaddy) to add a TXT verification record.
4. **Identity Provider (IdP) Admin Access:** Administrative privileges in your organization's IdP (Google Admin Console, Microsoft Entra admin center, or Okta).

---

## 3. High-Level Flows

### Admin Configuration Flow
```text
Settings ➔ Single Sign-On ➔ [ Configure SSO ] ➔ Select Protocol (SAML 2.0 / OIDC) ➔ Enter Credentials ➔ [ Configure SSO ] ➔ Validated & Active
```

### Team Member Login Flow
```text
VoiceToNotes Login ➔ [ Continue with SSO ] ➔ Enter Work Email ➔ [ Continue ] ➔ Organization Login ➔ VoiceToNotes Workspace
```

---

## 4. VoiceToNotes Service Provider (SP) Details

When configuring VoiceToNotes inside your Identity Provider (e.g., Google, Microsoft Entra, or Okta), use the following platform values:

| Parameter | Value |
| :--- | :--- |
| **SP Entity ID / Audience URI** | `https://vtnaiproject.firebaseapp.com` |
| **ACS URL / Reply URL / Redirect URI** | `https://vtnaiproject.firebaseapp.com/__/auth/handler` |
| **NameID Format (SAML)** | `EmailAddress` (`urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`) |
| **NameID Attribute** | User Primary Work Email |

> [!NOTE]
> These values are configured for the production Firebase Authentication instance (`vtnaiproject`).
