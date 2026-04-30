<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

    <!-- Skip Navigation (Accessibility) -->
    <a href="#main-content" class="skip-nav" id="skip-nav">Zum Inhalt springen</a>

    <!-- Preloader -->
    <div id="preloader" class="preloader">
        <div class="preloader-inner">
            <div class="preloader-ring"></div>
            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/logo.png' ); ?>" alt="Züri Glow Logo" class="preloader-logo">
        </div>
    </div>

    <!-- Cursor Glow -->
    <div id="cursor-glow" class="cursor-glow"></div>

    <!-- Navigation -->
    <header id="main-header" class="header">
        <nav class="nav" role="navigation" aria-label="Hauptnavigation">
            <a href="#hero" class="nav-logo" aria-label="Züri Glow – Zurück zur Startseite">
                <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/logo.png' ); ?>" alt="Züri Glow Beauty Studio Logo" class="nav-logo-img">
            </a>

            <ul class="nav-links" id="nav-links">
                <li><a href="#hero" class="nav-link active" data-section="hero">Home</a></li>
                <li><a href="#about" class="nav-link" data-section="about">Über Uns</a></li>
                <li><a href="#treatments" class="nav-link" data-section="treatments">Behandlungen</a></li>
                <li><a href="#studio" class="nav-link" data-section="studio">Studio</a></li>
                <li><a href="#preise" class="nav-link" data-section="preise">Preise</a></li>
                <li><a href="#kontakt" class="nav-link" data-section="kontakt">Kontakt</a></li>
            </ul>

            <a href="https://trea.tw/EbJwgyW359U9x48DT" target="_blank" rel="noopener" class="nav-cta" id="nav-book-btn">Termin Buchen</a>

            <button class="nav-hamburger" id="nav-hamburger" aria-label="Menü öffnen" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    </header>

    <!-- Mobile Navigation Overlay -->
    <div class="mobile-nav-overlay" id="mobile-nav-overlay">
        <div class="mobile-nav-content">
            <ul class="mobile-nav-links">
                <li><a href="#hero" class="mobile-nav-link" data-index="0">Home</a></li>
                <li><a href="#about" class="mobile-nav-link" data-index="1">Über Uns</a></li>
                <li><a href="#treatments" class="mobile-nav-link" data-index="2">Behandlungen</a></li>
                <li><a href="#studio" class="mobile-nav-link" data-index="3">Studio</a></li>
                <li><a href="#preise" class="mobile-nav-link" data-index="4">Preise</a></li>
                <li><a href="#kontakt" class="mobile-nav-link" data-index="5">Kontakt</a></li>
            </ul>
            <a href="https://trea.tw/EbJwgyW359U9x48DT" target="_blank" rel="noopener" class="mobile-nav-cta">Termin Buchen</a>
            <div class="mobile-nav-social">
                <a href="https://www.instagram.com/zuri_glow_?utm_source=qr&igsh=cnAwZzNtNjRreW9i" target="_blank" rel="noopener" aria-label="Instagram">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
                </a>
                <a href="https://www.facebook.com/share/1Av7gSAWCR/" target="_blank" rel="noopener" aria-label="Facebook">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@zuriglow" target="_blank" rel="noopener" aria-label="TikTok">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.3a8.18 8.18 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.73z"/></svg>
                </a>
            </div>
        </div>
    </div>

    <main id="main-content">
