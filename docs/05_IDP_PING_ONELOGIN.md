# OneLogin & PingIdentity — SAML 2.0 Setup Guide

Complete administrator guide for integrating **OneLogin** or **PingIdentity** (PingOne / PingFederate) with **VoiceToNotes AI** Single Sign-On (SSO).

---

## Service Provider Parameters
Provide these parameters to your OneLogin or PingIdentity configuration:

- **Assertion Consumer Service (ACS) URL:** `https://vtnaiproject.firebaseapp.com/__/auth/handler`
- **Entity ID / Audience URI:** `https://vtnaiproject.firebaseapp.com`
- **NameID Format:** `EmailAddress` / `EMAIL`
- **SAML Binding:** HTTP-POST

---

## 1. OneLogin SAML 2.0 Setup
1. Sign in to your OneLogin Admin Portal.
2. Go to **Applications > Applications > Add App**.
3. Search for `SAML Custom Connector (Advanced)` and select it.
4. Set Display Name to `VoiceToNotes SSO` and click **Save**.
5. In the **Configuration** tab:
   - **Audience (EntityID):** `https://vtnaiproject.firebaseapp.com`
   - **Recipient:** `https://vtnaiproject.firebaseapp.com/__/auth/handler`
   - **ACS (Consumer) URL Validator:** `^https:\/\/vtnaiproject\.firebaseapp\.com\/__\/auth\/handler$`
   - **ACS (Consumer) URL:** `https://vtnaiproject.firebaseapp.com/__/auth/handler`
   - **Login URL:** `https://voicetonotes.ai`
6. In the **SSO** tab:
   - Copy the **SAML 2.0 Endpoint (HTTP)**.
   - Copy the **Issuer URL**.
   - Under **X.509 Certificate**, click *View Details* and download the certificate.
7. In the **Access** tab, assign user Roles/Groups, and click **Save**.
8. In VoiceToNotes, choose **SAML 2.0 > Manual Setup**, paste the endpoints and certificate, and click **Configure SSO**.

---

## 2. PingIdentity (PingOne) Setup
1. Sign in to your PingOne Admin Console.
2. Go to **Applications > + Add Application > SAML**.
3. Application Name: `VoiceToNotes SSO`.
4. Enter ACS URL: `https://vtnaiproject.firebaseapp.com/__/auth/handler` and Entity ID: `https://vtnaiproject.firebaseapp.com`.
5. Map `saml_subject` to `Email Address`.
6. Download the Signing Certificate.
7. Assign user groups and configure in VoiceToNotes.
