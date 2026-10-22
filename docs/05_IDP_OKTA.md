# Okta — Enterprise SSO Setup Guide (SAML 2.0 & OIDC)

Complete administrator guide for integrating **Okta** with **VoiceToNotes AI** Single Sign-On (SSO) using either **SAML 2.0** or **OpenID Connect (OIDC)**.

---

## Prerequisites
- **Okta Admin Console:** Administrator privileges in your Okta organization (`https://<company>-admin.okta.com`).
- **VoiceToNotes Account:** Owner or Administrator on an active B2B Enterprise plan.
- **Verified Corporate Domain:** Active DNS TXT record (`vtn-site-verification=...`) in VoiceToNotes Settings > Single Sign-On.

---

## Option A: SAML 2.0 Web App Integration (Recommended)

### Step 1: Create Integration in Okta
1. Sign in to your Okta Admin Console.
2. Navigate to **Applications > Applications**.
3. Click **Create App Integration**.
4. In the modal, select **SAML 2.0** and click **Next**.
5. In **Step 1: General Settings**:
   - **App name:** `VoiceToNotes SSO`
   - (Optional) Upload application logo.
   - Click **Next**.

---

### Step 2: Configure SAML Settings
In **Step 2: Configure SAML**, enter the VoiceToNotes Service Provider parameters:

| Okta Setting | Required Value | Notes |
| :--- | :--- | :--- |
| **Single sign-on URL** | `https://vtnaiproject.firebaseapp.com/__/auth/handler` | Check *Use this for Recipient URL and Destination URL* |
| **Audience URI (SP Entity ID)** | `https://vtnaiproject.firebaseapp.com` | VoiceToNotes Audience Identifier |
| **Default RelayState** | *(Leave blank)* | Not required |
| **Name ID format** | `EmailAddress` | Select from dropdown |
| **Application username** | `Email` | Maps employee corporate email |

#### Attribute Statements (Optional for Profile Provisioning)
Configure user profile attributes to automatically sync names:

| Name | Name format | Value |
| :--- | :--- | :--- |
| `email` | Unspecified | `user.email` |
| `firstName` | Unspecified | `user.firstName` |
| `lastName` | Unspecified | `user.lastName` |

Click **Next**. In **Step 3: Feedback**, select *I'm an Okta customer adding an internal app*, and click **Finish**.

---

### Step 3: Export Okta IdP Metadata
1. On the app integration's **Sign On** tab, scroll to **SAML Setup**.
2. Under **Metadata details**, you can either:
   - Click **Copy** next to the **Metadata URL** (Recommended for Fast Setup).
   - Or click **Download metadata** to save the `.xml` file locally.

---

### Step 4: Assign Users and Groups in Okta
> [!IMPORTANT]
> Okta users will receive error `400 Bad Request` or "User not assigned to application" until granted access.

1. Navigate to the **Assignments** tab of the VoiceToNotes app in Okta.
2. Click **Assign** and choose **Assign to People** or **Assign to Groups**.
3. Select your desired corporate teams or security groups and click **Done**.

---

### Step 5: Configure in VoiceToNotes Admin Console
1. Open VoiceToNotes and go to **Settings > Single Sign-On**.
2. Select your verified corporate domain and choose **SAML 2.0**.
3. Choose **Fast Setup**:
   - Paste the Okta **Metadata URL**, OR
   - Upload the downloaded **Okta Metadata XML** file.
4. Click **[ Configure SSO ]**.

---

## Option B: OpenID Connect (OIDC) Setup (Web Application)

Okta provides native OIDC integrations with standard authorization code flow and JSON Web Key Sets (JWKS).

### Step 1: Create OIDC App Integration
1. In your Okta Admin Console, go to **Applications > Applications**.
2. Click **Create App Integration**.
3. Under **Sign-in method**, select **OIDC - OpenID Connect**.
4. Under **Application type**, select **Web Application**.
5. Click **Next**.

---

### Step 2: Configure General Settings & Grant Types
1. **App integration name:** `VoiceToNotes SSO (OIDC)`.
2. **Grant type:**
   - [x] **Authorization Code** (Required)
   - [x] **Refresh Token** (Recommended)
3. **Sign-in redirect URIs:**
   ```text
   https://vtnaiproject.firebaseapp.com/__/auth/handler
   ```
4. **Sign-out redirect URIs (optional):**
   ```text
   https://voicetonotes.ai
   ```
5. **Assignments:**
   - Choose **Allow everyone in your organization to access** (or choose *Limit access to selected groups* if controlling access by team).
6. Click **Save**.

---

### Step 3: Copy Credentials & Discovery URL
On the app's **General** tab:
1. Locate the **Client Credentials** section.
2. Copy your **Client ID**.
3. Copy your **Client secret**.

Your **Issuer / Discovery URL** is your Okta organization domain:
```text
https://<your-organization>.okta.com
```
*(If your organization uses the Okta default authorization server, you can also use `https://<your-organization>.okta.com/oauth2/default`)*.

---

### Step 4: Configure in VoiceToNotes Admin Console
1. In VoiceToNotes, go to **Settings > Single Sign-On > Configure SSO**.
2. Select **OIDC** as the protocol.
3. Enter the parameters:

| VoiceToNotes Field | Required Okta Value | Example |
| :--- | :--- | :--- |
| **Client ID** | Okta Client ID | `0oac123456789abcdef0` |
| **Client Secret** | Okta Client Secret | `sec_abc123...` |
| **Issuer / Discovery URL** | Okta Org URL | `https://company.okta.com` |

4. Click **[ Configure SSO ]** to test and save.

---

## Troubleshooting Okta SSO

| Issue | Protocol | Root Cause & Resolution |
| :--- | :--- | :--- |
| **400 Bad Request / "User is not assigned"** | SAML & OIDC | The employee is not assigned to the app in Okta. Open Okta > Applications > VoiceToNotes > Assignments tab, and assign the user or their department group. |
| **Audience URI Mismatch** | SAML | Audience URI in Okta must strictly match `https://vtnaiproject.firebaseapp.com` without a trailing slash. |
| **Redirect URI Mismatch** | OIDC | Ensure the Sign-in redirect URI in Okta exactly matches `https://vtnaiproject.firebaseapp.com/__/auth/handler`. |
| **Invalid Issuer URL** | OIDC | Ensure the Discovery URL begins with `https://` and does not include `/login` or admin paths. |
