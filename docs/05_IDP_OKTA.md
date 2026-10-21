# Okta — Enterprise SSO Setup Guide

Complete administrator guide for integrating **Okta** with **VoiceToNotes AI** using **SAML 2.0** or **OpenID Connect (OIDC)**.

---

## Prerequisites
- **Okta Admin Console:** Administrator privileges in your Okta organization (`https://<company>-admin.okta.com`).
- **Verified Corporate Domain:** Active DNS TXT record in VoiceToNotes Settings > Single Sign-On.

---

## Option A: SAML 2.0 Web App Integration (Recommended)

### Step 1: Create Integration in Okta
1. Sign in to your Okta Admin Console.
2. Go to **Applications > Applications** and click **Create App Integration**.
3. Choose **SAML 2.0** and click **Next**.
4. In **1. General Settings**, set App name to `VoiceToNotes SSO` and click **Next**.

### Step 2: Configure SAML Settings
Enter the following VoiceToNotes Service Provider parameters:

| Okta Setting | Value | Notes |
| :--- | :--- | :--- |
| **Single sign-on URL** | `https://vtnaiproject.firebaseapp.com/__/auth/handler` | ACS URL |
| **Audience URI (SP Entity ID)** | `https://vtnaiproject.firebaseapp.com` | SP Entity ID |
| **Name ID format** | `EmailAddress` | Select from dropdown |
| **Application username** | `Email` | Maps primary email |

- Under **Attribute Statements (optional)**:
  - `email` &rarr; `user.email`
  - `firstName` &rarr; `user.firstName`
  - `lastName` &rarr; `user.lastName`
- Click **Next**, choose *I'm an Okta customer adding an internal app*, and click **Finish**.

### Step 3: Export Metadata
1. On the app's **Sign On** tab, under **Metadata details**, copy the **Metadata URL** or click **Download metadata** to save the XML file.

### Step 4: Assign Users in Okta
1. Go to the **Assignments** tab.
2. Click **Assign > Assign to People** (or *Assign to Groups*).
3. Assign authorized employees and click **Done**.

### Step 5: Configure in VoiceToNotes
1. In VoiceToNotes, go to **Settings > Single Sign-On > SAML 2.0**.
2. Select **Fast Setup**, upload the XML file (or paste the Okta Metadata URL), and click **[ Configure SSO ]**.

---

## Option B: OpenID Connect (OIDC) Setup
1. In Okta, select **Create App Integration > OIDC - OpenID Connect > Web Application**.
2. Sign-in redirect URIs: `https://vtnaiproject.firebaseapp.com/__/auth/handler`.
3. Save and copy the **Client ID** and **Client Secret**.
4. Discovery URL: `https://<your-okta-domain>.okta.com`.
5. Enter these into VoiceToNotes under **OIDC Configuration** and click **[ Configure SSO ]**.

---

## Troubleshooting Okta
- **User Not Assigned (400 Bad Request):** Open the app in Okta, click Assignments, and verify that the user or group has been assigned.
- **Audience Mismatch:** Ensure Audience URI in Okta strictly matches `https://vtnaiproject.firebaseapp.com`.
