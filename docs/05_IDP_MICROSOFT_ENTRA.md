# Microsoft Entra ID (Azure AD) — Enterprise SSO Setup Guide

Complete administrator guide for integrating **Microsoft Entra ID** (formerly Azure Active Directory) with **VoiceToNotes AI** using **SAML 2.0** or **OpenID Connect (OIDC)**.

---

## Prerequisites
- **Entra Admin Center:** Cloud Application Administrator or Global Administrator privileges in [entra.microsoft.com](https://entra.microsoft.com).
- **Verified Corporate Domain:** Active DNS TXT record in VoiceToNotes Settings > Single Sign-On.

---

## Option A: SAML 2.0 Setup (Enterprise Applications)

### Step 1: Create Enterprise Application
1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com).
2. Go to **Identity > Applications > Enterprise applications**.
3. Click **+ New application**, then click **+ Create your own application**.
4. Enter Name: `VoiceToNotes SSO`.
5. Select: **Integrate any other application you don't find in the gallery (Non-gallery)**.
6. Click **Create**.

### Step 2: Configure Basic SAML
1. In the left navigation, click **Single sign-on**, then select **SAML**.
2. In **Section 1 (Basic SAML Configuration)**, click **Edit**:
   - **Identifier (Entity ID):** `https://vtnaiproject.firebaseapp.com`
   - **Reply URL (ACS URL):** `https://vtnaiproject.firebaseapp.com/__/auth/handler`
3. Click **Save** and close the panel.

### Step 3: Copy App Federation Metadata URL
1. In **Section 3 (SAML Certificates)**, copy the **App Federation Metadata Url**.
2. VoiceToNotes can read this URL directly during Fast Setup to automatically fetch your certificates and login endpoints.

### Step 4: Assign Users and Groups
> [!IMPORTANT]
> Entra ID blocks all users by default with error `AADSTS50105` until they are assigned.
1. In the left menu, click **Users and groups**.
2. Click **+ Add user/group** and select the employees or groups who should have access.
3. Click **Assign**.

### Step 5: Configure in VoiceToNotes
1. Go to VoiceToNotes **Settings > Single Sign-On > SAML 2.0**.
2. Select **Fast Setup (Metadata URL)** and paste the App Federation Metadata URL.
3. Click **Fetch Metadata**, then click **[ Configure SSO ]**.

---

## Option B: OpenID Connect (OIDC) Setup (App Registrations)

1. In Entra admin center, go to **Identity > Applications > App registrations**.
2. Click **+ New registration**.
3. Name: `VoiceToNotes SSO (OIDC)`.
4. Supported account types: **Accounts in this organizational directory only (Single tenant)**.
5. Under **Redirect URI**, choose **Web** and paste: `https://vtnaiproject.firebaseapp.com/__/auth/handler`.
6. Click **Register**.
7. From the **Overview** blade, copy:
   - **Application (client) ID**
   - **Directory (tenant) ID**
8. Under **Certificates & secrets**, click **+ New client secret** and copy the **Value**.
9. In VoiceToNotes, choose **OIDC**, enter the Client ID, Client Secret, and Discovery URL (`https://login.microsoftonline.com/<TENANT_ID>/v2.0`), and click **Configure SSO**.

---

## Troubleshooting Entra ID
- **`AADSTS50105`:** The signed-in user is not assigned to a role for the application. Fix: Add user in *Enterprise applications > VoiceToNotes SSO > Users and groups*.
- **`AADSTS700016`:** Application with identifier not found. Fix: Check that Entity ID matches `https://vtnaiproject.firebaseapp.com` with no trailing slash.
