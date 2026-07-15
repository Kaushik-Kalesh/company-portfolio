<script>
    import content from "../../../data/content.json";
</script>

<footer class="footer">
    <div class="container">
        <div class="footer-inner">
            <div class="footer-brand">
                <div class="footer-logo">CPL</div>
                <p class="footer-tagline" data-content-id="footer_tagline">
                    {content.footer_tagline}
                </p>
            </div>

            <div class="footer-links">
                <div class="footer-col">
                    <h4 class="footer-col-title">Navigate</h4>
                    <a href="#services" class="footer-link">Services</a>
                    <a href="#portfolio" class="footer-link">Portfolio</a>
                    <a href="#contact" class="footer-link">Contact</a>
                </div>

                <div class="footer-col">
                    <h4 class="footer-col-title">Connect</h4>
                    <a
                        href="https://wa.me/918015777932"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="footer-link">WhatsApp</a
                    >
                    <span class="footer-link footer-link-placeholder"
                        >LinkedIn</span
                    >
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <span data-content-id="footer_copyright"
                >{content.footer_copyright}</span
            >
        </div>
    </div>
</footer>

<style>
    .footer {
        border-top: 1.5px dashed var(--color-border-strong);
        padding: 64px 0 32px;
        margin-top: auto;
    }

    .footer-inner {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 48px;
        padding-bottom: 48px;
        border-bottom: 1px solid var(--color-border);
        margin-bottom: 28px;
    }

    .footer-brand {
        max-width: 320px;
    }

    .footer-logo {
        font-size: 1.5rem;
        font-weight: 800;
        letter-spacing: -0.04em;
        color: var(--color-fg);
        margin-bottom: 10px;
    }

    .footer-tagline {
        font-size: 0.92rem;
        color: var(--color-fg-muted);
        line-height: 1.6;
    }

    .footer-links {
        display: flex;
        gap: 64px;
    }

    .footer-col {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .footer-col-title {
        font-size: 0.78rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--color-fg-muted);
        margin-bottom: 4px;
    }

    .footer-link {
        font-size: 0.9rem;
        color: var(--color-fg);
        text-decoration: none;
        transition: opacity 0.3s ease;
    }

    .footer-link:hover {
        opacity: 0.6;
    }

    .footer-link-placeholder {
        cursor: default;
        opacity: 0.45;
    }

    .footer-bottom {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.82rem;
        color: var(--color-fg-muted);
    }

    .footer-separator {
        opacity: 0.4;
    }

    @media (max-width: 768px) {
        .footer-inner {
            flex-direction: column;
            gap: 36px;
        }

        .footer-links {
            gap: 40px;
        }

        .footer-bottom {
            flex-wrap: wrap;
            justify-content: center;
            text-align: center;
        }
    }
</style>
