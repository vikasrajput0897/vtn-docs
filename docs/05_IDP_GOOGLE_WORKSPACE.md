# Google Workspace — Enterprise SAML 2.0 Setup Guide

Complete administrator guide for integrating **Google Workspace** with **VoiceToNotes AI** Single Sign-On (SSO).

---

## Prerequisites
- **Google Admin Console:** Super Administrator access to [admin.google.com](https://admin.google.com).
- **VoiceToNotes Account:** Signed in as Owner or Administrator with an active B2B Enterprise subscription.
- **Corporate Domain Verified:** Domain verified via DNS TXT record (`vtn-site-verification=...`) in VoiceToNotes Settings > Single Sign-On.

---

## Step 1: Create Custom SAML App in Google Admin
1. Sign in to the [Google Admin Console](https://admin.google.com).
2. In the left navigation menu, go to **Apps > Web and mobile apps**.
3. Click the **Add app** button and select **Add custom SAML app**.
4. In **App details**:
   - **App name:** `VoiceToNotes SSO`
   - **Description:** `Enterprise Single Sign-On for VoiceToNotes AI`
   - Click **Continue**.

---

## Step 2: Download Google IdP Metadata
1. On **Step 2 (Google Identity Provider details)**, locate **Option 1: Download IdP metadata**.
2. Click **Download Metadata** to save `GoogleIDPMetadata.xml` to your computer.
3. Click **Continue**.

> [!TIP]
> You will upload this XML directly into VoiceToNotes Fast Setup. There is no need to manually copy certificates or URLs.

---

## Step 3: Enter VoiceToNotes Service Provider Details
On **Step 3 (Service provider details)**, enter the following parameters:

| Field | Required Value | Notes |
| :--- | :--- | :--- |
| **ACS URL** | `https://vtnaiproject.firebaseapp.com/__/auth/handler` | Exact Assertion Consumer Service URL |
| **Entity ID** | `https://vtnaiproject.firebaseapp.com` | VoiceToNotes Audience URI |
| **Name ID format** | `EMAIL` | Select `EMAIL` from dropdown |
| **Name ID** | `Basic Information > Primary email` | Maps work email address |

- Leave **Signed response** checked.
- Click **Continue**.

---

## Step 4: Attribute Mapping (Optional)
On **Step 4 (Attribute mapping)**, map employee names for automatic profile provisioning:
- `Basic Information > First name` &rarr; App attribute: `firstName`
- `Basic Information > Last name` &rarr; App attribute: `lastName`
- Click **Finish**.

---

## Step 5: CRITICAL — Turn User Access ON
> [!IMPORTANT]
> By default, Google Admin sets new SAML apps to **OFF for everyone**. Employees will receive **Google Error 403: app_not_configured_for_user** until you turn this on!

1. On the app overview screen, click the **User access** section.
2. Select **ON for everyone** (or specify specific Organizational Units / Groups).
3. Click **Save**.

---

## Step 6: Configure in VoiceToNotes Admin Console
1. Open the VoiceToNotes Admin Console and go to **Settings > Single Sign-On**.
2. Under **Step 2: Choose Protocol**, select **SAML 2.0**.
3. Under **Step 3: SAML 2.0 Configuration**, select **Fast Setup (Metadata File Upload)**.
4. Drag and drop the downloaded `GoogleIDPMetadata.xml` file.
5. Click **[ Configure SSO ]**.
6. The status badge will update to **SSO Active**.

---

## Troubleshooting Google Workspace SAML
- **Error 403 `app_not_configured_for_user`:** User Access is set to OFF. Go to Google Admin > Apps > Web and mobile apps > VoiceToNotes SSO > User access, and change to ON for everyone.
- **Domain Mismatch:** The employee's primary email domain must match the domain verified in VoiceToNotes.
