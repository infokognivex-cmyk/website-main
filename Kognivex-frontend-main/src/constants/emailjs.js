export const emailJsConfig = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY
};

export function assertEmailJsConfig() {
  const missing = Object.entries(emailJsConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length) {
    throw new Error(
      `Email service not configured. Missing: ${missing.join(', ')}`
    );
  }

  return emailJsConfig;
}

