# Managing SSO & Team Seat Access

This guide covers managing your active Single Sign-On configuration, using the ON/OFF toggle, performing zero-downtime certificate rotation, and allocating team seats.

---

## 1. The Single Sign-On ON/OFF Toggle

The toggle is positioned at the top-right of the Single Sign-On section alongside the heading:

- **ON (Active):** Single Sign-On is live. All employees entering an email matching your verified domain are routed to authenticate via your Identity Provider.
- **OFF (Disabled):** SSO is temporarily deactivated, but your configuration remains securely saved. Members can log in using traditional email/password or magic links.

---

## 2. Editing & Zero-Downtime Certificate Rotation

When your SAML certificate is nearing expiration or you need to update an IdP URL:

1. Navigate to **Settings > Single Sign-On**.
2. Click **Configure SSO** (or **Edit**) on the active domain card.
3. Previously entered values remain visible in the form.
4. Update the certificate or URL.
5. Click **[ Configure SSO ]** to validate and apply.

> [!TIP]
> **Zero-Downtime Guarantee:** VoiceToNotes validates updated credentials before replacing active settings. If an updated configuration fails validation, the system displays an error while **keeping your previous configuration active**, preventing employee sign-in interruptions.

---

## 3. Deleting an SSO Configuration

1. On the Single Sign-On screen, click **Delete** next to the domain.
2. Confirm the prompt.
3. VoiceToNotes safely unbinds the domain and deletes the SSO provider.

---

## 4. CRITICAL: Team Seats Control Workspace Access

A fundamental rule in VoiceToNotes Enterprise security:

```text
Authentication (Identity)  ≠  Authorization (Workspace Access & Seats)
```

- **SSO authentication proves an employee's identity, but does NOT automatically grant workspace access or consume seats.**
- **Admins must assign an active seat in Dashboard > Teams.**

### How to Allocate Seats:
1. Go to the Web Dashboard under **Dashboard > Teams** (or Members).
2. Check your available seat count under your Enterprise subscription.
3. Click **Invite Member** and add the employee's corporate email.
4. Ensure the member's status is **Active**.

### What Happens if an Employee Has No Seat?
If an employee successfully authenticates through your corporate IdP (e.g. Google or Okta) but has not been assigned a seat in your VoiceToNotes team:
1. VoiceToNotes authenticates the user but immediately halts workspace entry.
2. Access is denied with the notice: *"Access Denied: You do not have an active seat assigned in this workspace. Please contact your organization administrator."*
3. The user is logged out safely.
