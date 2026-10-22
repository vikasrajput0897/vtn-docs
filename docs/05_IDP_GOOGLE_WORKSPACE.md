# Google Workspace — Enterprise SSO Setup Guide (SAML 2.0 & OIDC)

Complete administrator guide for integrating **Google Workspace** with **VoiceToNotes AI** Single Sign-On (SSO) using either **SAML 2.0** or **OpenID Connect (OIDC)**.

---

## Prerequisites
- **Google Administrator Account:** Super Administrator access to [admin.google.com](https://admin.google.com) (for SAML) or Google Cloud Console [console.cloud.google.com](https://console.cloud.google.com) (for OIDC).
- **VoiceToNotes Account:** Signed in as Owner or Administrator with an active B2B Enterprise subscription.
- **Corporate Domain Verified:** Corporate email domain verified via DNS TXT record (`vtn-site-verification=...`) in VoiceToNotes Settings > Single Sign-On.

---

## Option A: SAML 2.0 Setup (Google Admin Console)

### Step 1: Create Custom SAML App in Google Admin
1. Sign in to the [Google Admin Console](https://admin.google.com) as a Super Administrator.
2. In the left navigation menu, go to **Apps > Web and mobile apps**.
3. Click the **Add app** button and select **Add custom SAML app**.
4. In **App details**:
   - **App name:** `VoiceToNotes SSO`
   - **Description:** `Enterprise Single Sign-On for VoiceToNotes AI`
   - (Optional) Upload the VoiceToNotes logo.
   - Click **Continue**.

---

### Step 2: Download Google IdP Metadata
1. On **Step 2 (Google Identity Provider details)**, locate **Option 1: Download IdP metadata**.
2. Click **Download Metadata** to save `GoogleIDPMetadata.xml` to your computer.
3. Click **Continue**.

> [!TIP]
> You will upload this XML directly into VoiceToNotes Fast Setup. There is no need to manually copy certificates or URLs.

---

### Step 3: Enter VoiceToNotes Service Provider Details
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

### Step 4: Attribute Mapping (Optional)
On **Step 4 (Attribute mapping)**, map employee profile attributes:
- `Basic Information > First name` &rarr; App attribute: `firstName`
- `Basic Information > Last name` &rarr; App attribute: `lastName`
- Click **Finish**.

---

### Step 5: CRITICAL — Turn User Access ON
> [!IMPORTANT]
> By default, Google Admin sets new SAML apps to **OFF for everyone**. Employees will receive **Google Error 403: app_not_configured_for_user** until you turn this on!

1. On the app overview screen, click the **User access** section.
2. Select **ON for everyone** (or specify specific Organizational Units / Groups).
3. Click **Save**.

---

### Step 6: Configure in VoiceToNotes Admin Console
1. Open the VoiceToNotes Admin Console and go to **Settings > Single Sign-On**.
2. Under **Step 2: Choose Protocol**, select **SAML 2.0**.
3. Under **Step 3: SAML 2.0 Configuration**, select **Fast Setup (Metadata File Upload)**.
4. Drag and drop the downloaded `GoogleIDPMetadata.xml` file.
5. Click **[ Configure SSO ]**.
6. The status badge will update to **SSO Active**.

---

## Option B: OpenID Connect (OIDC) Setup (Google Cloud Console)

If your organization prefers OpenID Connect (OIDC) with OAuth 2.0 over SAML, you can configure Google Workspace as an OIDC Identity Provider via the Google Cloud Console attached to your Google Workspace organization.

### Step 1: Open Google Cloud Console
1. Sign in to the [Google Cloud Console](https://console.cloud.google.com) using your Google Workspace Super Admin or Cloud Identity Admin account.
2. Select your Google Workspace organization at the top of the console and choose or create an administrative project (e.g., `VoiceToNotes-SSO`).

---

### Step 2: Configure OAuth Consent Screen
1. In the navigation menu, go to **APIs & Services > OAuth consent screen**.
2. Choose **User Type: Internal** (this ensures only users inside your Google Workspace organization can authenticate).
3. Click **Create**.
4. Fill in the required app details:
   - **App name:** `VoiceToNotes AI SSO`
   - **User support email:** Your admin email.
   - **Authorized domains:** Add `firebaseapp.com` and your corporate domain (e.g., `acme.com`).
   - **Developer contact information:** Your IT admin email.
5. In **Scopes**, click **Add or remove scopes** and select:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `openid`
6. Click **Save and Continue** through the remaining steps.

---

### Step 3: Create OAuth 2.0 Client Credentials
1. In the left navigation, go to **APIs & Services > Credentials**.
2. Click **+ Create Credentials** at the top and select **OAuth client ID**.
3. Select **Application type:** `Web application`.
4. Enter **Name:** `VoiceToNotes SSO (OIDC)`.
5. Under **Authorized JavaScript origins**, add:
   ```text
   https://vtnaiproject.firebaseapp.com
   ```
6. Under **Authorized redirect URIs**, add:
   ```text
   https://vtnaiproject.firebaseapp.com/__/auth/handler
   ```
7. Click **Create**.
8. A modal will display your **Client ID** and **Client Secret**. Copy both values securely.

---

### Step 4: Configure in VoiceToNotes Admin Console
1. Open the VoiceToNotes Admin Console and go to **Settings > Single Sign-On**.
2. On your verified corporate domain card, click **Configure SSO**.
3. Select **OIDC** as the protocol.
4. Enter the configuration parameters:

| VoiceToNotes Field | Value from Google | Notes |
| :--- | :--- | :--- |
| **Client ID** | *(Paste your Google OAuth Client ID)* | Ends in `.apps.googleusercontent.com` |
| **Client Secret** | *(Paste your Google OAuth Client Secret)* | Masked for security |
| **Issuer / Discovery URL** | `https://accounts.google.com` | VoiceToNotes auto-detects `/.well-known/openid-configuration` |

5. Click **[ Configure SSO ]** to test and activate.

---

## Troubleshooting Google Workspace SSO

| Issue | Protocol | Root Cause & Resolution |
| :--- | :--- | :--- |
| **Google Error 403 `app_not_configured_for_user`** | SAML 2.0 | User Access is set to OFF in Google Admin. Go to Google Admin > Apps > Web and mobile apps > VoiceToNotes SSO > User access, and change to **ON for everyone**. |
| **Google Error 400 `redirect_uri_mismatch`** | OIDC | The redirect URI in Google Cloud Console does not match `https://vtnaiproject.firebaseapp.com/__/auth/handler` exactly. Verify no trailing spaces or missing slashes. |
| **Google Error: Access Denied / Organization restricted** | OIDC | The OAuth Consent Screen was created as **Internal**, and an external Google account (e.g., personal `@gmail.com`) attempted to sign in. Only accounts with your verified corporate workspace domain can log in. |
| **Domain Mismatch Error** | SAML / OIDC | The user's Google Workspace primary email domain must match the verified domain in VoiceToNotes. |
