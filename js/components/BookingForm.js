/**
 * BookingForm Component
 * Elegant enquiry form integrated with centralized WhatsApp link generator.
 */
import { siteConfig } from '../data/siteConfig.js';
import { createWhatsAppEnquiryUrl } from '../utils/whatsapp.js';

export function renderBookingForm() {
  const { contact } = siteConfig.photographer;

  return `
    <section id="booking" class="booking-section section-spacing--lg" aria-label="Booking and Availability Enquiry">
      <div class="mobile-container">
        <div class="reveal-init text-center">
          <span class="chapter-badge text-gold">RESERVATIONS</span>
          <h2 class="section-title text-inverted">LET'S TELL YOUR STORY</h2>
          <div class="section-divider"></div>
          <p class="editorial-quote" style="color: var(--color-accent-gold-soft); margin-top: 10px;">
            "Your wedding deserves to be remembered as it felt."
          </p>
          <p style="font-size: 0.85rem; color: var(--color-ink-inverted-muted); margin-top: 8px;">
            We accept a limited number of commissions each season to ensure unwavering creative devotion.
          </p>
        </div>

        <form id="wedding-enquiry-form" class="booking-form reveal-init delay-1" novalidate>
          <div class="form-group">
            <label class="form-label" for="clientName">Your Name *</label>
            <input type="text" id="clientName" name="clientName" class="form-input" placeholder="e.g. Linthoingambi / Sanatomba" required />
          </div>

          <div class="form-group">
            <label class="form-label" for="clientPhone">Phone / WhatsApp Number *</label>
            <input type="tel" id="clientPhone" name="clientPhone" class="form-input" placeholder="+91 ••••• •••••" required />
          </div>

          <div class="form-group">
            <label class="form-label" for="weddingDate">Wedding Date / Season</label>
            <input type="date" id="weddingDate" name="weddingDate" class="form-input" />
          </div>

          <div class="form-group">
            <label class="form-label" for="weddingLocation">Ceremony Location / Venue</label>
            <input type="text" id="weddingLocation" name="weddingLocation" class="form-input" placeholder="e.g. Imphal, Manipur" />
          </div>

          <div class="form-group">
            <label class="form-label">Ceremonies to Document</label>
            <div class="events-checkbox-grid">
              <label class="event-checkbox-label">
                <input type="checkbox" name="events" value="Heijingpot" checked />
                <span>Heijingpot</span>
              </label>
              <label class="event-checkbox-label">
                <input type="checkbox" name="events" value="Luhongba" checked />
                <span>Luhongba</span>
              </label>
              <label class="event-checkbox-label">
                <input type="checkbox" name="events" value="Chakouba" />
                <span>Chakouba</span>
              </label>
              <label class="event-checkbox-label">
                <input type="checkbox" name="events" value="Post Wedding" checked />
                <span>Post Wedding</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="preferredPackage">Preferred Collection</label>
            <select id="preferredPackage" name="preferredPackage" class="form-select">
              <option value="Signature (Most Requested)">Collection II — Signature (Recommended)</option>
              <option value="Essential">Collection I — Essential</option>
              <option value="Legacy">Collection III — Legacy</option>
              <option value="Undecided">Undecided / Open to Guidance</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="clientMessage">Tell Us About Your Vision</label>
            <textarea id="clientMessage" name="clientMessage" class="form-textarea" rows="3" placeholder="Family traditions, special requests, or questions..."></textarea>
          </div>

          <button type="submit" class="btn-primary" id="submit-enquiry-btn">
            CHECK AVAILABILITY ON WHATSAPP
          </button>

          <a href="https://wa.me/${contact.whatsappNumber}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-direct">
            <span>DIRECT WHATSAPP CHAT</span>
            <span aria-hidden="true"> ↗</span>
          </a>
        </form>
      </div>
    </section>
  `;
}

export function initBookingFormEvents() {
  const form = document.getElementById('wedding-enquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('clientName')?.value.trim();
    const phone = document.getElementById('clientPhone')?.value.trim();
    const weddingDate = document.getElementById('weddingDate')?.value;
    const weddingLocation = document.getElementById('weddingLocation')?.value.trim();
    const preferredPackage = document.getElementById('preferredPackage')?.value;
    const message = document.getElementById('clientMessage')?.value.trim();

    const checkedEvents = Array.from(document.querySelectorAll('input[name="events"]:checked')).map(cb => cb.value);

    if (!name) {
      alert('Please enter your name to proceed.');
      document.getElementById('clientName')?.focus();
      return;
    }

    const whatsappUrl = createWhatsAppEnquiryUrl({
      name,
      phone,
      weddingDate,
      weddingLocation,
      events: checkedEvents,
      preferredPackage,
      message
    });

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}
