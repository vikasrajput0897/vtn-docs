# Step 2: SAML 2.0 Configuration Guide

Security Assertion Markup Language (SAML 2.0) is the enterprise standard for Single Sign-On. VoiceToNotes provides two setup methods: **Fast Setup** (recommended) and **Manual Setup**.

---

## 1. Accessing SAML 2.0 Setup

1. In VoiceToNotes, go to **Settings > Single Sign-On**.
2. Click **Configure SSO** on your verified domain card.
3. Select **SAML 2.0** on the protocol selector.

---

## 2. Option A: Fast Setup (Recommended)

Fast Setup extracts your Identity Provider credentials automatically from an XML metadata file or federation URL.

### Method 1: Upload Metadata XML
1. Download the SAML Federation Metadata XML file from your IdP (e.g., Google Admin Console, Okta, or Entra ID).
2. In VoiceToNotes, select **Metadata File Upload**.
3. Drag & drop the `.xml` file or click to browse.
4. VoiceToNotes automatically parses the **SSO URL**, **Entity ID**, and formats the **X.509 Certificate**.
5. Click **[ Configure SSO ]** to validate and save.

### Method 2: Metadata URL
1. Copy the public Federation Metadata URL from your IdP (e.g. from Microsoft Entra ID).
2. In VoiceToNotes, select **Metadata URL** and paste the link.
3. Click **Fetch & Parse**.
4. VoiceToNotes safely retrieves the metadata and populates the fields.
5. Click **[ Configure SSO ]**.

---

## 3. Option B: Manual Setup

If your IdP does not provide an XML metadata export, select **Manual Setup** and fill in these three fields:

| Field | Description | Example |
| :--- | :--- | :--- |
| **SAML Single Sign-On URL** | The HTTP-POST redirect endpoint provided by your IdP | `https://login.microsoftonline.com/tenant-id/saml2` |
| **IdP Entity ID / Issuer** | Unique identifier for your Identity Provider | `https://sts.windows.net/tenant-id/` |
| **X.509 Certificate** | Public signing certificate (PEM format) | `-----BEGIN CERTIFICATE----- ... -----END CERTIFICATE-----` |

---

## 4. X.509 Certificate Rules & Best Practices

- **Standard PEM Format:** Ensure your certificate begins with `-----BEGIN CERTIFICATE-----` and ends with `-----END CERTIFICATE-----`.
- **Auto-Formatting:** If you paste raw Base64 without headers, VoiceToNotes will automatically wrap the certificate with standard PEM headers.
- **Size Limit:** Maximum allowed certificate size is **10 KB**.
- **Rotation:** During certificate updates, your active SSO remains working until the new certificate passes validation.
