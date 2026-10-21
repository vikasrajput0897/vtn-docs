import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import DocViewer from './components/DocViewer';

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: false,
});

const docDefinitions = [
  {
    file: '01_OVERVIEW_AND_PREREQUISITES.md',
    id: 'overview',
    title: 'Overview & Prerequisites',
    category: 'Getting Started',
    num: '01',
  },
  {
    file: '02_ADMIN_CONFIGURATION_FLOW.md',
    id: 'domain-verification',
    title: 'Settings & Verify Domain',
    category: 'Admin Configuration',
    num: '02',
    screenshot: '/assets/images/step1_domain_input.webp',
    screenshotAlt: 'Step 1: Domain Input & DNS Verification Token',
    screenshotCaption: 'Step 1 & 2: Enter corporate domain and generate DNS TXT verification token.',
  },
  {
    file: '03_SAML_2_0_SETUP.md',
    id: 'saml-setup',
    title: 'SAML 2.0 Configuration',
    category: 'Admin Configuration',
    num: '03',
    screenshot: '/assets/images/step4_saml_configuration.webp',
    screenshotAlt: 'Step 3: SAML 2.0 Configuration',
    screenshotCaption: 'Step 3: Fast Setup (XML Metadata) vs Manual Setup (SSO URL, IdP Entity ID, Certificate).',
  },
  {
    file: '04_OIDC_SETUP.md',
    id: 'oidc-setup',
    title: 'OpenID Connect (OIDC) Setup',
    category: 'Admin Configuration',
    num: '04',
    screenshot: '/assets/images/step3_protocol_select.webp',
    screenshotAlt: 'Step 4: OIDC Protocol Configuration',
    screenshotCaption: 'Step 4: Configure Client ID, Client Secret, and Issuer / Discovery URL.',
  },
  {
    file: '05_IDENTITY_PROVIDERS.md',
    id: 'idp-directory',
    title: 'Identity Provider Directory',
    category: 'IdP Guides',
    num: '05',
  },
  {
    file: '05_IDP_GOOGLE_WORKSPACE.md',
    id: 'idp-google',
    title: 'Google Workspace (SAML)',
    category: 'IdP Guides',
    num: '06',
  },
  {
    file: '05_IDP_MICROSOFT_ENTRA.md',
    id: 'idp-entra',
    title: 'Microsoft Entra ID (Azure AD)',
    category: 'IdP Guides',
    num: '07',
  },
  {
    file: '05_IDP_OKTA.md',
    id: 'idp-okta',
    title: 'Okta Setup (SAML & OIDC)',
    category: 'IdP Guides',
    num: '08',
  },
  {
    file: '05_IDP_PING_ONELOGIN.md',
    id: 'idp-ping-onelogin',
    title: 'OneLogin & PingIdentity',
    category: 'IdP Guides',
    num: '09',
  },
  {
    file: '06_MANAGING_SSO_AND_TEAMS.md',
    id: 'managing-sso',
    title: 'Managing SSO & Team Seats',
    category: 'Manage & Rollout',
    num: '10',
    screenshot: '/assets/images/step6_sso_management.webp',
    screenshotAlt: 'Step 5: SSO Management & Active Seats',
    screenshotCaption: 'Step 5 & 6: SSO ON/OFF toggle, Safe Edit, and Team Seat allocation.',
  },
  {
    file: '07_MEMBER_LOGIN_EXPERIENCE.md',
    id: 'member-login',
    title: 'Member Login Experience',
    category: 'Manage & Rollout',
    num: '11',
  },
  {
    file: '08_TROUBLESHOOTING_AND_FAQS.md',
    id: 'troubleshooting',
    title: 'Troubleshooting & FAQs',
    category: 'Help & FAQs',
    num: '12',
  },
];

// Map external file links to in-page hash links
const linkMap = {
  'docs/01_OVERVIEW_AND_PREREQUISITES.md': '#overview',
  '01_OVERVIEW_AND_PREREQUISITES.md': '#overview',
  'docs/02_ADMIN_CONFIGURATION_FLOW.md': '#domain-verification',
  '02_ADMIN_CONFIGURATION_FLOW.md': '#domain-verification',
  'docs/03_SAML_2_0_SETUP.md': '#saml-setup',
  '03_SAML_2_0_SETUP.md': '#saml-setup',
  'docs/04_OIDC_SETUP.md': '#oidc-setup',
  '04_OIDC_SETUP.md': '#oidc-setup',
  'docs/05_IDENTITY_PROVIDERS.md': '#idp-directory',
  '05_IDENTITY_PROVIDERS.md': '#idp-directory',
  'docs/05_IDP_GOOGLE_WORKSPACE.md': '#idp-google',
  '05_IDP_GOOGLE_WORKSPACE.md': '#idp-google',
  'idp-google.html': '#idp-google',
  'docs/05_IDP_MICROSOFT_ENTRA.md': '#idp-entra',
  '05_IDP_MICROSOFT_ENTRA.md': '#idp-entra',
  'idp-entra.html': '#idp-entra',
  'docs/05_IDP_OKTA.md': '#idp-okta',
  '05_IDP_OKTA.md': '#idp-okta',
  'idp-okta.html': '#idp-okta',
  'docs/05_IDP_PING_ONELOGIN.md': '#idp-ping-onelogin',
  '05_IDP_PING_ONELOGIN.md': '#idp-ping-onelogin',
  'idp-ping-onelogin.html': '#idp-ping-onelogin',
  'docs/06_MANAGING_SSO_AND_TEAMS.md': '#managing-sso',
  '06_MANAGING_SSO_AND_TEAMS.md': '#managing-sso',
  'docs/07_MEMBER_LOGIN_EXPERIENCE.md': '#member-login',
  '07_MEMBER_LOGIN_EXPERIENCE.md': '#member-login',
  'docs/08_TROUBLESHOOTING_AND_FAQS.md': '#troubleshooting',
  '08_TROUBLESHOOTING_AND_FAQS.md': '#troubleshooting',
};

function processMarkdown(content, section) {
  // 1. Transform markdown file links to hash links
  for (const [target, anchor] of Object.entries(linkMap)) {
    content = content.split(`(${target})`).join(`(${anchor})`);
  }

  // 2. Parse Markdown to HTML via marked
  let html = marked(content);

  // 3. Transform GitHub Alert Blockquotes into styled alerts
  html = html.replace(
    /<blockquote>\s*<p>\[!NOTE\]\s*([\s\S]*?)<\/blockquote>/gi,
    '<div class="doc-alert alert-note p-4 sm:p-5 rounded-2xl my-6 flex gap-3.5 items-start text-sm leading-relaxed"><span class="text-xl shrink-0 leading-none">ℹ️</span><div class="flex-1"><span class="doc-alert-title block font-bold font-display text-[14.5px] mb-1">NOTE</span><p class="m-0 text-gray-700 leading-relaxed">$1</div></div>'
  );
  html = html.replace(
    /<blockquote>\s*<p>\[!WARNING\]\s*([\s\S]*?)<\/blockquote>/gi,
    '<div class="doc-alert alert-warning p-4 sm:p-5 rounded-2xl my-6 flex gap-3.5 items-start text-sm leading-relaxed"><span class="text-xl shrink-0 leading-none">⚠️</span><div class="flex-1"><span class="doc-alert-title block font-bold font-display text-[14.5px] mb-1">WARNING</span><p class="m-0 text-gray-700 leading-relaxed">$1</div></div>'
  );
  html = html.replace(
    /<blockquote>\s*<p>\[!IMPORTANT\]\s*([\s\S]*?)<\/blockquote>/gi,
    '<div class="doc-alert alert-important p-4 sm:p-5 rounded-2xl my-6 flex gap-3.5 items-start text-sm leading-relaxed"><span class="text-xl shrink-0 leading-none">⚡</span><div class="flex-1"><span class="doc-alert-title block font-bold font-display text-[14.5px] mb-1">IMPORTANT</span><p class="m-0 text-gray-700 leading-relaxed">$1</div></div>'
  );
  html = html.replace(
    /<blockquote>\s*<p>\[!TIP\]\s*([\s\S]*?)<\/blockquote>/gi,
    '<div class="doc-alert alert-tip p-4 sm:p-5 rounded-2xl my-6 flex gap-3.5 items-start text-sm leading-relaxed"><span class="text-xl shrink-0 leading-none">💡</span><div class="flex-1"><span class="doc-alert-title block font-bold font-display text-[14.5px] mb-1">TIP</span><p class="m-0 text-gray-700 leading-relaxed">$1</div></div>'
  );

  // 4. Wrap tables with responsive wrapper
  html = html.replace(
    /<table>/gi,
    '<div class="doc-table-wrapper my-6 rounded-2xl border border-gray-200 overflow-x-auto shadow-xs bg-white"><table class="doc-table w-full border-collapse text-[13.5px] text-left">'
  );
  html = html.replace(/<\/table>/gi, '</table></div>');

  // 5. Wrap pre/code blocks with header and copy button
  html = html.replace(/<pre><code(?:\s+class="language-([^"]*)")?>([\s\S]*?)<\/code><\/pre>/gi, (match, lang, code) => {
    const rawText = code
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    const langLabel = lang || 'code';
    const escapedRaw = encodeURIComponent(rawText);
    return `
      <div class="code-block-wrapper relative my-5 rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden shadow-sm">
        <div class="flex items-center justify-between px-4 py-2 bg-gray-800/90 text-gray-400 text-[11px] font-mono uppercase tracking-wider">
          <span>${langLabel}</span>
          <button class="code-copy-btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-sans bg-white/10 hover:bg-vtn-red text-gray-200 hover:text-white border border-white/15 hover:border-vtn-red transition-colors cursor-pointer" data-copy="${escapedRaw}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy
          </button>
        </div>
        <pre class="p-4 sm:p-5 overflow-x-auto m-0 bg-gray-950"><code class="language-${langLabel} font-mono text-[13px] leading-relaxed text-gray-100 bg-transparent p-0 border-0">${code}</code></pre>
      </div>
    `;
  });

  // 6. If section has a screenshot, append visual screenshot card
  if (section.screenshot) {
    html += `
      <div class="doc-screenshot-card my-8 rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-vtn-red/40 hover:-translate-y-0.5 transition-all duration-200 cursor-zoom-in">
        <img src="${section.screenshot}" alt="${section.screenshotAlt}" class="w-full h-auto block" />
        <div class="px-4 py-3 text-[13px] text-gray-600 border-t border-gray-100 bg-gray-50/70 flex items-center justify-between">
          <span>${section.screenshotCaption}</span>
          <span class="text-[11px] text-vtn-red font-semibold flex items-center gap-1">🔍 Click to zoom</span>
        </div>
      </div>
    `;
  }

  return html;
}

export default async function Page() {
  const docsDir = path.join(process.cwd(), 'docs');

  const sections = docDefinitions.map((def) => {
    const filePath = path.join(docsDir, def.file);
    let content = '';
    try {
      content = fs.readFileSync(filePath, 'utf-8');
    } catch (e) {
      content = `# ${def.title}\n\nContent could not be loaded.`;
    }

    const htmlContent = processMarkdown(content, def);

    return {
      ...def,
      htmlContent,
    };
  });

  return <DocViewer sections={sections} />;
}
