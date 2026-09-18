/**
 * WhatsApp Utility
 * Direct wa.me link generation with culturally tailored wedding booking messages.
 * Prompted naturally with "Our wedding date is: " to facilitate immediate date checking.
 */
import { siteConfig } from '../data/siteConfig.js';

export function getPackageWhatsAppUrl(packageName, price) {
  const number = siteConfig.photographer.contact.whatsappNumber;
  const name = siteConfig.photographer.name;
  
  const text = `Hello ${name}, our wedding dates are fixed and we would like to enquire about booking the ${packageName} Package (${price}) for our wedding in Manipur. Our wedding date is: `;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function getGeneralWhatsAppUrl() {
  const number = siteConfig.photographer.contact.whatsappNumber;
  const name = siteConfig.photographer.name;

  const text = `Hello ${name}, our wedding dates are fixed and we would like to enquire about booking your team for our wedding in Manipur. Our wedding date is: `;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
