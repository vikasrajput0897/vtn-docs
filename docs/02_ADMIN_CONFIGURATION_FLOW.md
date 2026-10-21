# Step 1: Open SSO Settings & Verify Domain

This guide walks you through accessing the Single Sign-On section in the VoiceToNotes console and verifying your organization's domain.

---

## 1. Navigating to SSO Settings

1. Log in to the [VoiceToNotes Web Dashboard](https://voicetonotes.ai) or Desktop App as an Enterprise Administrator.
2. In the navigation sidebar, click **Settings**.
3. Select **Single Sign-On**.
4. You will see the Single Sign-On dashboard with your verified domains and the **[ Configure SSO ]** entry point.

---

## 2. Adding & Verifying Your Corporate Domain

Before configuring SSO protocols, you must verify domain ownership. This security measure prevents unauthorized entities from claiming your corporate domain.

### Step A: Enter Domain
1. On the Single Sign-On screen, click **+ Add Domain**.
2. Enter your corporate email domain (e.g. `acme.com`).
3. Click **Generate Verification Token**.
4. VoiceToNotes generates a unique DNS TXT verification token:
   ```text
   vtn-site-verification=9c84e1b7-a3f2-45e8-b80c-e2f09424c561
   ```

> [!WARNING]
> Public email providers (such as `gmail.com`, `yahoo.com`, `hotmail.com`, `outlook.com`, `icloud.com`) cannot be configured for Enterprise SSO. You must verify a private organization domain.

### Step B: Add DNS TXT Record
Log in to your domain registrar or DNS management portal (Cloudflare, AWS Route 53, GoDaddy, Namecheap) and create a new **TXT Record**:

| Record Type | Host / Name | Value / Content | TTL |
| :--- | :--- | :--- | :--- |
| **TXT** | `@` *(or apex domain)* | `vtn-site-verification=<your-token>` | `300` *(Auto / 5 min)* |

### Step C: Confirm Verification
- **Instant Check:** Return to VoiceToNotes and click **Verify Domain**. If DNS propagation is complete, the status badge turns green (`Active / Verified`).
- **Automated 48-Hour Background Scan:** If your DNS registrar takes time to propagate, our automated background service checks pending domains every 2 hours for up to 48 hours. Once detected, the domain is verified automatically.

---

## 3. Protocol Selection

Once your domain is verified, click **Configure SSO**. VoiceToNotes displays the protocol selector:

- **SAML 2.0 (Recommended):** Best for Google Workspace, Microsoft Entra ID (Azure AD), Okta, OneLogin, Ping Identity.
- **OIDC (OpenID Connect):** Best for OAuth 2.0 and modern cloud identity platforms.

> [!IMPORTANT]
> Neither protocol is selected by default. Clicking your desired protocol dynamically reveals only the relevant configuration fields.
