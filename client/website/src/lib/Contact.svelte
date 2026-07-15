<script>
  import content from '../../../data/content.json';
  import ScrollReveal from './ScrollReveal.svelte';

  let email = $state('');
  let reason = $state('');
  let remarks = $state('');
  let submitted = $state(false);
  let submitting = $state(false);

  async function handleSubmit(e) {
    e.preventDefault();
    submitting = true;

    try {
      const response = await fetch('http://127.0.0.1:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, reason, remarks })
      });
      
      const result = await response.json();
      
      if (result.success) {
        submitted = true;
        email = '';
        reason = '';
        remarks = '';

        // Reset success message after 5s
        setTimeout(() => {
          submitted = false;
        }, 5000);
      } else {
        alert('Failed to send email: ' + (result.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Error connecting to the server. Make sure the Flask server is running.');
      console.error(err);
    } finally {
      submitting = false;
    }
  }
</script>

<section id="contact" class="section contact-section">
  <div class="container">
    <ScrollReveal>
      <div class="contact-header">
        <h2 data-content-id="contact_headline">{content.contact_headline}</h2>
        <p data-content-id="contact_subheadline">{content.contact_subheadline}</p>
      </div>
    </ScrollReveal>

    <div class="contact-layout">
      <ScrollReveal delay={100}>
        <form class="contact-form card" onsubmit={handleSubmit}>
          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input
              type="email"
              id="email"
              class="form-input"
              placeholder="your@email.com"
              required
              bind:value={email}
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="reason">Reason</label>
            <select id="reason" class="form-select" required bind:value={reason}>
              <option value="" disabled>Select a reason</option>
              <option value="software">Software</option>
              <option value="marketing">Marketing</option>
              <option value="both">Both</option>
              <option value="other">Something Else</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="remarks">Remarks</label>
            <textarea
              id="remarks"
              class="form-textarea"
              placeholder="Tell us about your project..."
              rows="4"
              bind:value={remarks}
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary submit-btn" disabled={submitting}>
            {#if submitting}
              <span class="spinner"></span>
              Sending...
            {:else if submitted}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              Sent!
            {:else}
              Send Message
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            {/if}
          </button>

          {#if submitted}
            <div class="success-message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              We'll get back to you within 24 hours.
            </div>
          {/if}
        </form>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div class="contact-sidebar">
          <div class="sidebar-block">
            <h3>Prefer to chat?</h3>
            <p>Drop us a message on WhatsApp and we'll respond quickly.</p>
            <a
              href="https://wa.me/918015777932"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-accent whatsapp-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          <div class="sidebar-block sidebar-info">
            <div class="info-item">
              <div class="info-label">Response Time</div>
              <div class="info-value">Within 24 hours</div>
            </div>
            <div class="info-item">
              <div class="info-label">Location</div>
              <div class="info-value">India</div>
            </div>
            <div class="info-item">
              <div class="info-label">Working Hours</div>
              <div class="info-value">Mon – Sat, 9am – 7pm IST</div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

<style>
  .contact-section {
    position: relative;
  }

  .contact-header {
    text-align: center;
    margin-bottom: 64px;
  }

  .contact-header h2 {
    margin-bottom: 16px;
  }

  .contact-header p {
    max-width: 460px;
    margin: 0 auto;
  }

  .contact-layout {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 32px;
    align-items: start;
  }

  /* Form */
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .submit-btn {
    width: 100%;
    padding: 16px;
    margin-top: 8px;
    font-size: 1rem;
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(215, 215, 208, 0.3);
    border-top-color: var(--color-bg);
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .success-message {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 18px;
    background: rgba(37, 211, 102, 0.08);
    border: 1px solid rgba(37, 211, 102, 0.2);
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    color: #1a7a3a;
    animation: slideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Sidebar */
  .contact-sidebar {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .sidebar-block {
    background: rgba(245, 242, 235, 0.5);
    border: 1.5px dashed var(--color-border-strong);
    border-radius: 16px;
    padding: 32px;
  }

  .sidebar-block h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
  }

  .sidebar-block p {
    font-size: 0.92rem;
    margin-bottom: 20px;
  }

  .whatsapp-btn {
    width: 100%;
  }

  .sidebar-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .info-label {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--color-fg-muted);
  }

  .info-value {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--color-fg);
  }

  @media (max-width: 768px) {
    .contact-layout {
      grid-template-columns: 1fr;
    }
  }
</style>
