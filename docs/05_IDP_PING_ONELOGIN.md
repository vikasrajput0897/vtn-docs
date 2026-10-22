# OneLogin & PingIdentity — Enterprise SSO Setup Guide (SAML 2.0 & OIDC)

Complete administrator guide for integrating **OneLogin** and **PingIdentity (PingOne / PingFederate)** with **VoiceToNotes AI** Single Sign-On (SSO) using either **SAML 2.0** or **OpenID Connect (OIDC)**.

---

## Universal Service Provider Parameters
Provide these parameters to your OneLogin or PingIdentity configuration:

| Parameter | SAML 2.0 Value | OIDC Value |
| :--- | :--- | :--- |
| **ACS URL / Redirect URI** | `https://vtnaiproject.firebaseapp.com/__/auth/handler` | `https://vtnaiproject.firebaseapp.com/__/auth/handler` |
| **Entity ID / Audience URI** | `https://vtnaiproject.firebaseapp.com` | `https://vtnaiproject.firebaseapp.com` |
| **NameID Format / Scopes** | `EmailAddress` / `EMAIL` | `openid`, `profile`, `email` |
| **SAML Binding / Flow** | HTTP-POST | Authorization Code Flow |

---

## Part 1: OneLogin Enterprise Setup

### Option A: OneLogin SAML 2.0 Setup

#### Step 1: Create SAML Connector in OneLogin
1. Sign in to your OneLogin Administrator Portal (`https://<company>.onelogin.com`).
2. Navigate to **Applications > Applications** and click **Add App**.
3. In the search box, type `SAML Custom Connector (Advanced)` and select it.
4. Set **Display Name** to `VoiceToNotes SSO` and click **Save**.

#### Step 2: Configure Service Provider Parameters
1. In the app settings, select the **Configuration** tab.
2. Enter the parameters:
   - **Audience (EntityID):** `https://vtnaiproject.firebaseapp.com`
   - **Recipient:** `https://vtnaiproject.firebaseapp.com/__/auth/handler`
   - **ACS (Consumer) URL Validator:** `^https:\/\/vtnaiproject\.firebaseapp\.com\/__\/auth\/handler$`
   - **ACS (Consumer) URL:** `https://vtnaiproject.firebaseapp.com/__/auth/handler`
   - **Login URL:** `https://voicetonotes.ai`
   - **SAML initiator:** `Service Provider`
   - **SAML nameID format:** `Email`
3. Click **Save**.

#### Step 3: Copy SSO Endpoints & Certificate
1. Switch to the **SSO** tab.
2. Under **SAML 2.0 Endpoint (HTTP)**, copy the login URL.
3. Under **Issuer URL**, copy the Issuer ID.
4. Under **X.509 Certificate**, click **View Details** and download the certificate (`.pem` format).

#### Step 4: Assign Roles and Save in VoiceToNotes
1. Go to the **Access** tab in OneLogin and assign user Roles / Groups who should have access.
2. Open VoiceToNotes **Settings > Single Sign-On > Configure SSO**.
3. Select **SAML 2.0 > Manual Setup** (or upload the metadata XML if exported from More Actions).
4. Paste the OneLogin SSO URL, Entity ID / Issuer, and Certificate.
5. Click **[ Configure SSO ]**.

---

### Option B: OneLogin OpenID Connect (OIDC) Setup

#### Step 1: Add OpenID Connect App
1. In the OneLogin Admin Portal, go to **Applications > Applications > Add App**.
2. Search for `OpenId Connect (OIDC)` and select the core connector.
3. Set **Display Name** to `VoiceToNotes SSO (OIDC)` and click **Save**.

#### Step 2: Configure Redirect URI & Token Settings
1. Click the **Configuration** tab.
2. In **Redirect URI**, add:
   ```text
   https://vtnaiproject.firebaseapp.com/__/auth/handler
   ```
3. Set **Login URL:** `https://voicetonotes.ai`.
4. Click **Save**.

#### Step 3: Copy Credentials & Issuer URL
1. Click the **SSO** tab.
2. Set **Token Endpoint Authentication Method** to `POST` or `Basic`.
3. Copy the **Client ID**.
4. Click **Show** next to **Client Secret** and copy the secret value.
5. Copy the **Issuer URL** (e.g., `https://<your-subdomain>.onelogin.com/oidc/2`).

#### Step 4: Configure in VoiceToNotes Admin Console
1. In VoiceToNotes, go to **Settings > Single Sign-On > Configure SSO**.
2. Select **OIDC**.
3. Enter the fields:
   - **Client ID:** Your OneLogin Client ID.
   - **Client Secret:** Your OneLogin Client Secret.
   - **Issuer / Discovery URL:** `https://<your-subdomain>.onelogin.com/oidc/2`
4. Click **[ Configure SSO ]**.

---

## Part 2: PingIdentity (PingOne) Enterprise Setup

### Option A: PingOne SAML 2.0 Setup

#### Step 1: Create Application in PingOne
1. Sign in to your **PingOne Admin Console** (`https://admin.pingone.com`).
2. Navigate to **Connections > Applications**.
3. Click the **+ Add Application** icon.
4. Select **SAML** application type and click **Configure**.
5. Set **Application Name:** `VoiceToNotes SSO`.

#### Step 2: Enter SAML Configuration
1. Under **Configure SAML**, enter:
   - **ACS URL:** `https://vtnaiproject.firebaseapp.com/__/auth/handler`
   - **Entity ID:** `https://vtnaiproject.firebaseapp.com`
   - **Subject NameID Format:** `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`
2. Under **Attribute Mappings**, map `saml_subject` to `Email Address`.
3. Click **Save and Close**.

#### Step 3: Export PingOne Metadata or Certificate
1. On the VoiceToNotes application page in PingOne, go to the **Configuration** tab.
2. Under **Connection Details**, copy the **Single Sign-On URL** and **Issuer ID**, or click **Download Metadata** to obtain the XML.
3. Switch the toggle on the top right to enable the application.
4. In the **Access** tab, assign the required employee groups.

#### Step 4: Configure in VoiceToNotes Admin Console
1. In VoiceToNotes, go to **Settings > Single Sign-On > Configure SSO**.
2. Select **SAML 2.0 > Fast Setup** and upload the PingOne XML metadata file (or use Manual Setup).
3. Click **[ Configure SSO ]**.

---

### Option B: PingOne OpenID Connect (OIDC) Setup

#### Step 1: Create OIDC Web Application
1. In PingOne Admin Console, navigate to **Connections > Applications**.
2. Click **+ Add Application**.
3. Select **Web App**, then choose **OIDC** as the connection type, and click **Configure**.
4. Set **Application Name:** `VoiceToNotes SSO (OIDC)`.

#### Step 2: Configure Redirect URI & Grants
1. In the **Configure OIDC** step:
   - **Grant Types:** Check **Authorization Code** and **Refresh Token**.
   - **Redirect URIs:** Add:
     ```text
     https://vtnaiproject.firebaseapp.com/__/auth/handler
     ```
   - **Token Endpoint Authentication Method:** `Client Secret Post` or `Client Secret Basic`.
2. Click **Save and Close**.

#### Step 3: Retrieve Credentials & Discovery URL
1. Open the application details and click the **Configuration** tab.
2. Copy the **Client ID**.
3. Copy the **Client Secret**.
4. Note your **Issuer URL** or Environment Discovery endpoint:
   ```text
   https://auth.pingone.com/<ENVIRONMENT_ID>/as
   ```
5. Toggle the application status to **Active**.
6. In the **Access** tab, assign the authorized user groups.

#### Step 4: Configure in VoiceToNotes Admin Console
1. In VoiceToNotes, go to **Settings > Single Sign-On > Configure SSO**.
2. Select **OIDC**.
3. Enter:
   - **Client ID:** PingOne Client ID.
   - **Client Secret:** PingOne Client Secret.
   - **Issuer / Discovery URL:** `https://auth.pingone.com/<ENVIRONMENT_ID>/as`
4. Click **[ Configure SSO ]**.

---

## Troubleshooting OneLogin & PingIdentity

| Issue | Provider & Protocol | Root Cause & Resolution |
| :--- | :--- | :--- |
| **"Invalid ACS URL" / 400 Bad Request** | OneLogin (SAML) | Check that the **ACS (Consumer) URL Validator** regex strictly matches `^https:\/\/vtnaiproject\.firebaseapp\.com\/__\/auth\/handler$`. |
| **User Not Assigned to Role** | OneLogin (SAML/OIDC) | In OneLogin, users must be explicitly linked via Roles under the app's **Access** tab. |
| **PingOne Application Disabled** | PingOne (SAML/OIDC) | Ensure the active toggle switch on the top right of the application card is toggled to **Active** (green). |
| **Discovery URL 404** | PingOne (OIDC) | Verify the issuer URL follows the format `https://auth.pingone.com/<ENVIRONMENT_ID>/as` without extra trailing paths. |
