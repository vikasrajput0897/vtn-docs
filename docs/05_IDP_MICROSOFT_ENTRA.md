# Microsoft Entra ID (Azure AD) — Enterprise SSO Setup Guide (SAML 2.0 & OIDC)

Complete administrator guide for integrating **Microsoft Entra ID** (formerly Azure Active Directory) with **VoiceToNotes AI** using either **SAML 2.0** or **OpenID Connect (OIDC)**.

---

## Prerequisites
- **Entra Admin Center Access:** Cloud Application Administrator or Global Administrator privileges in [entra.microsoft.com](https://entra.microsoft.com).
- **VoiceToNotes Account:** Owner or Administrator on an active B2B Enterprise plan.
- **Verified Corporate Domain:** Active DNS TXT record (`vtn-site-verification=...`) in VoiceToNotes Settings > Single Sign-On.

---

## Option A: SAML 2.0 Setup (Enterprise Applications)

### Step 1: Create Enterprise Application
1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com).
2. Navigate to **Identity > Applications > Enterprise applications**.
3. Click **+ New application**, then click **+ Create your own application**.
4. In the drawer:
   - **Name:** `VoiceToNotes SSO`
   - Select: **Integrate any other application you don't find in the gallery (Non-gallery)**.
5. Click **Create** and wait for the application to be provisioned.

---

### Step 2: Configure Basic SAML
1. In the application's left sidebar, click **Single sign-on**, then select **SAML**.
2. In **Section 1: Basic SAML Configuration**, click **Edit**:

| Field | Required Value | Notes |
| :--- | :--- | :--- |
| **Identifier (Entity ID)** | `https://vtnaiproject.firebaseapp.com` | Check "Default" |
| **Reply URL (Assertion Consumer Service URL)** | `https://vtnaiproject.firebaseapp.com/__/auth/handler` | Exact ACS URL |
| **Sign on URL** | *(Leave blank or set to `https://voicetonotes.ai`)* | Optional |

3. Click **Save** and close the configuration panel.

---

### Step 3: Copy App Federation Metadata URL
1. Scroll down to **Section 3: SAML Certificates**.
2. Locate the **App Federation Metadata Url** and click the copy icon.
3. Keep this URL handy — VoiceToNotes will query this URL directly during Fast Setup to extract your signing certificate, issuer ID, and login redirect URLs automatically.

---

### Step 4: Assign Users and Groups
> [!IMPORTANT]
> Microsoft Entra ID blocks all users by default with error `AADSTS50105` until they or their security groups are explicitly assigned to the enterprise app.

1. In the app navigation, click **Users and groups**.
2. Click **+ Add user/group**.
3. Under **Users**, select the employees, departments, or security groups authorized to use VoiceToNotes.
4. Click **Select**, then click **Assign**.

---

### Step 5: Configure in VoiceToNotes Admin Console
1. Open VoiceToNotes and go to **Settings > Single Sign-On**.
2. On your verified corporate domain card, click **Configure SSO**.
3. Select **SAML 2.0**.
4. Choose **Fast Setup (Metadata URL)** and paste your **App Federation Metadata Url**.
5. Click **Fetch Metadata**. VoiceToNotes parses the metadata payload and fills in the fields.
6. Click **[ Configure SSO ]**.

---

## Option B: OpenID Connect (OIDC) Setup (App Registrations)

Microsoft Entra ID supports standard OpenID Connect (OIDC) via App Registrations, providing OAuth 2.0 authentication with automatic discovery.

### Step 1: Register New Application
1. In the Microsoft Entra admin center, navigate to **Identity > Applications > App registrations**.
2. Click **+ New registration**.
3. Configure the registration parameters:
   - **Name:** `VoiceToNotes SSO (OIDC)`
   - **Supported account types:** Select **Accounts in this organizational directory only (Default Directory only - Single tenant)**.
   - **Redirect URI (optional):** Select **Web** from the dropdown and enter:
     ```text
     https://vtnaiproject.firebaseapp.com/__/auth/handler
     ```
4. Click **Register**.

---

### Step 2: Retrieve Application (Client) ID and Tenant ID
1. On the app registration **Overview** blade, locate the essentials section.
2. Copy the following two GUIDs:
   - **Application (client) ID:** e.g., `8f7b2c14-5d89-4e72-b13c-9012abcdef34`
   - **Directory (tenant) ID:** e.g., `3a1b5c7d-9e0f-4123-8456-abcdef789012`

> [!NOTE]
> Your OpenID Issuer / Discovery URL is formed using your Tenant ID:  
> `https://login.microsoftonline.com/<DIRECTORY_TENANT_ID>/v2.0`

---

### Step 3: Generate a Client Secret
1. In the left navigation, click **Certificates & secrets**.
2. Under the **Client secrets** tab, click **+ New client secret**.
3. Enter a description (e.g., `VoiceToNotes SSO Secret`) and choose an expiration period (e.g., 180 or 730 days per your IT policy).
4. Click **Add**.
5. **Immediately copy the string in the "Value" column** (not the "Secret ID").

> [!WARNING]
> Entra ID only shows the client secret Value once. If you navigate away before copying it, you must create a new secret.

---

### Step 4: Configure API Permissions
1. In the left menu, click **API permissions**.
2. Ensure the following standard delegated Microsoft Graph permissions are present:
   - `User.Read`
   - `openid`
   - `profile`
   - `email`
3. Click **Grant admin consent for <Your Organization>** so end-users do not face consent approval prompts during their first login.

---

### Step 5: (Optional) Enforce User Assignment
To restrict which employees can authenticate via this OIDC app:
1. Go to **Identity > Applications > Enterprise applications**.
2. Open `VoiceToNotes SSO (OIDC)`.
3. In **Properties**, set **Assignment required?** to **Yes** and click **Save**.
4. In **Users and groups**, add the allowed users or security groups.

---

### Step 6: Configure in VoiceToNotes Admin Console
1. In VoiceToNotes, go to **Settings > Single Sign-On > Configure SSO**.
2. Select **OIDC** as the protocol.
3. Enter the parameters:

| VoiceToNotes Field | Required Entra Value | Example |
| :--- | :--- | :--- |
| **Client ID** | Application (client) ID from Overview | `8f7b2c14-5d89-4e72-b13c-9012abcdef34` |
| **Client Secret** | Client Secret Value from Certificates & Secrets | `_v8Q~...` |
| **Issuer / Discovery URL** | `https://login.microsoftonline.com/<TENANT_ID>/v2.0` | `https://login.microsoftonline.com/3a1b5c7d.../v2.0` |

4. Click **[ Configure SSO ]** to activate OIDC.

---

## Troubleshooting Microsoft Entra ID

| Error Code | Protocol | Cause & Resolution |
| :--- | :--- | :--- |
| **`AADSTS50105`** | SAML & OIDC | The signed-in user is not assigned to a role for the application. Fix: Go to *Enterprise applications > VoiceToNotes SSO > Users and groups* and assign the employee or their security group. |
| **`AADSTS700016`** | SAML | Application with identifier not found. Fix: Check that the Identifier / Entity ID in Entra strictly matches `https://vtnaiproject.firebaseapp.com` without a trailing slash. |
| **`AADSTS50011`** | OIDC | The reply URL specified in the request does not match the reply URLs configured for the application. Fix: Ensure Redirect URI in App Registrations is set to `https://vtnaiproject.firebaseapp.com/__/auth/handler`. |
| **`AADSTS7000215`** | OIDC | Invalid client secret provided. Fix: Verify you copied the secret **Value** (not the Secret ID), or generate a new client secret if expired. |
