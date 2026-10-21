import './globals.css';

export const metadata = {
  title: 'Voice to notes docs | SSO Admin Configuration',
  description: 'Step-by-step Enterprise Administrator Guide on how to configure, verify, and manage Single Sign-On (SSO) in VoiceToNotes using SAML 2.0 or OIDC.',
  icons: {
    icon: [
      {
        url: '/icons/vtn-logo.svg',
        media: '(prefers-color-scheme: light)',
        type: 'image/svg+xml',
      },
      {
        url: '/icons/vtn-dark-logo.svg',
        media: '(prefers-color-scheme: dark)',
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
