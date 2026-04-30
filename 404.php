<?php get_header(); ?>

        <!-- 404 Error Page -->
        <section class="error-404 section" style="min-height: 80vh; display: flex; align-items: center;">
            <div class="container" style="text-align: center; padding: 120px 0 80px;">
                <span class="section-label">Seite nicht gefunden</span>
                <div style="font-family: var(--font-display); font-size: clamp(6rem, 15vw, 12rem); font-weight: 300; line-height: 1; margin-bottom: 1rem; background: linear-gradient(135deg, var(--color-logo-peach), var(--color-logo-pink), var(--color-magenta), var(--color-logo-lilac)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">404</div>
                <h1 class="section-title" style="margin-bottom: 1rem;">
                    Diese Seite gibt es <em>leider nicht</em>
                </h1>
                <p class="section-desc" style="margin: 0 auto var(--space-2xl) auto;">
                    Die gesuchte Seite wurde nicht gefunden. Vielleicht wurde sie verschoben oder existiert nicht mehr.
                    Kein Problem – entdecke unsere Behandlungen oder buche direkt einen Termin.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-primary">
                        <span>Zur Startseite</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                    <a href="https://trea.tw/EbJwgyW359U9x48DT" target="_blank" rel="noopener" class="btn btn-ghost">
                        <span>Termin Buchen</span>
                    </a>
                </div>
            </div>
        </section>

<?php get_footer(); ?>
