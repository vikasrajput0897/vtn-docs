# Team Member SSO Login Experience

This guide explains how employees in your enterprise log in to VoiceToNotes using Single Sign-On.

---

## 1. Member Sign-In Flow

Enterprise employees follow a simple, password-free login experience:

```text
VoiceToNotes Login ➔ [ Continue with SSO ] ➔ Enter Work Email ➔ [ Continue ] ➔ Organization Login ➔ VoiceToNotes Workspace
```

---

## 2. Step-by-Step Employee Walkthrough

1. **Open Login Page:** The employee opens the VoiceToNotes login page (web or desktop app).
2. **Select SSO:** Alongside the Google and Apple options, they see the prominent **Continue with SSO** button.
3. **Enter Work Email:** Clicking the button opens the dedicated SSO email screen:
   - Contains only the **Work Email** field.
   - No password field is shown.
4. **Click Continue:** The employee enters their corporate email (e.g. `alex@acme.com`) and clicks **Continue**.
5. **Organization Login:** VoiceToNotes matches the domain to your verified enterprise configuration and redirects the employee to your corporate login page (Google Workspace, Microsoft 365, or Okta).
6. **Workspace Access:** After authenticating, the employee is redirected back into their active VoiceToNotes workspace with their notes and recordings synchronized.

---

## 3. Error Handling for Employees

| User Scenario | User Experience | Resolution |
| :--- | :--- | :--- |
| **Domain Not Configured** | *"SSO is not enabled for this email domain. Please check your work email or use another login method."* | Employee should check for typos or log in with regular credentials. |
| **No Active Seat Assigned** | *"Access Denied: You do not have an active seat assigned in this workspace. Please contact your administrator."* | Admin must invite the user in **Dashboard > Teams** to allocate a seat. |
| **IdP Authentication Failure** | *"Authentication failed with your organization's sign-in provider."* | Employee should contact their internal IT helpdesk to verify IdP account status. |
