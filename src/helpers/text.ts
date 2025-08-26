import { paths } from 'constant';

const replacePlaceholders = (text: string, domen: string, email: string) =>
  text
    .replace(/\{\{domen\}\}/g, domen)
    .replace(/\{\{email\}\}/g, email)
    .replace(/\{\{policyPath\}\}/g, paths.policy);

export const renderTextWithLinks = (
  text: string,
  domen: string,
  email: string
) => {
  const processedText = replacePlaceholders(text, domen, email);

  const domainRegex = new RegExp(
    `(${domen.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'g'
  );
  const emailRegex = new RegExp(
    `(${email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'g'
  );
  const policyPathRegex = new RegExp(`(${paths.policy})`, 'g');

  let result = processedText;

  result = result.replace(
    domainRegex,
    (match) =>
      `<a href="${match}" target="_blank" rel="noopener noreferrer" style="color: #3182ce; text-decoration: underline;">${match}</a>`
  );

  result = result.replace(
    emailRegex,
    (match) =>
      `<a href="mailto:${match}" style="color: #3182ce; text-decoration: underline;">${match}</a>`
  );

  result = result.replace(
    policyPathRegex,
    (match) =>
      `<a href="${domen}${match}" target="_blank" rel="noopener noreferrer" style="color: #3182ce; text-decoration: underline;">${domen}${match}</a>`
  );

  return result;
};
