# Administrator Troubleshooting & FAQs

This guide addresses common questions and troubleshooting scenarios encountered by Enterprise Administrators during SSO setup and management.

---

## 1. Quick Troubleshooting Matrix

| Issue | Root Cause | Solution |
| :--- | :--- | :--- |
| **"Domain verification failed"** | DNS TXT record hasn't propagated or host name is incorrect. | Ensure the record name is `@` (apex) and value matches `vtn-site-verification=...`. Allow up to 5–30 minutes for DNS propagation, or let our automated 48-hour background scanner verify it. |
| **"Invalid X.509 Certificate"** | Certificate is missing PEM boundaries, has invalid Base64, or exceeds 10 KB. | Ensure the certificate has `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` headers. Ensure there are no leading or trailing whitespace characters. |
| **"App not assigned to user" (Google / Microsoft error)** | The application is turned OFF or the user is not in the assigned group in your IdP console. | In Google Admin: Go to Apps > Web and mobile apps > VoiceToNotes SSO > User access > Turn **ON for everyone**. In Entra/Okta: Go to Users and groups / Assignments and add the user. |
| **"Access Denied: No active seat assigned"** | The employee authenticated at the IdP, but the admin hasn't invited them to the team. | SSO authenticates identity, but team seats control workspace access. Go to **Dashboard > Teams**, click **Invite Member**, and assign the user an active seat. |
| **"Redirect URL Mismatch"** | ACS URL or Redirect URI in your IdP does not match VoiceToNotes. | Verify your IdP configuration uses: `https://vtnaiproject.firebaseapp.com/__/auth/handler`. |

---

## 2. Frequently Asked Questions (FAQs)

### Can I configure SSO for `@gmail.com` or `@yahoo.com`?
No. Enterprise SSO is strictly available for private corporate domains owned and verified by your organization. Public email domains cannot be verified.

### Can an administrator still log in if the Identity Provider goes down?
Yes. Workspace owners and administrators can log in via email and password or magic links even if the external IdP experiences an outage. You can also toggle SSO to **OFF** in Settings to allow all members to use fallback authentication.

### What happens when I edit an active SSO configuration?
VoiceToNotes guarantees zero downtime. Your active SSO configuration continues to serve employee logins until the new configuration is fully tested and validated.

### Can we configure both SAML 2.0 and OIDC at the same time?
Each verified domain maps to one active SSO provider protocol (SAML 2.0 or OIDC). You can switch between protocols at any time without losing domain verification.
