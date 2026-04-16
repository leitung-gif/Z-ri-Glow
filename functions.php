<?php
/**
 * Zuriglow Theme — functions.php
 * Enqueue styles, scripts, and theme support.
 */

// ─── Theme Support ───
function zuriglow_theme_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );

    // Register navigation menus
    register_nav_menus( array(
        'primary' => __( 'Hauptnavigation', 'zuriglow' ),
    ) );
}
add_action( 'after_setup_theme', 'zuriglow_theme_setup' );

// ─── Enqueue Styles & Scripts ───
function zuriglow_enqueue_assets() {
    $theme_uri = get_template_directory_uri();
    $theme_ver = wp_get_theme()->get( 'Version' );

    // Google Fonts — Cormorant Garamond + Inter
    wp_enqueue_style(
        'zuriglow-google-fonts',
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap',
        array(),
        null
    );

    // Main theme stylesheet (minified)
    wp_enqueue_style(
        'zuriglow-style',
        $theme_uri . '/style.min.css',
        array( 'zuriglow-google-fonts' ),
        $theme_ver
    );

    // Main theme script (minified, in footer)
    wp_enqueue_script(
        'zuriglow-script',
        $theme_uri . '/script.min.js',
        array(),
        $theme_ver,
        true // Load in footer
    );
}
add_action( 'wp_enqueue_scripts', 'zuriglow_enqueue_assets' );

// ─── Preload Critical Assets ───
function zuriglow_preload_assets() {
    $theme_uri = get_template_directory_uri();
    echo '<link rel="preload" href="' . esc_url( $theme_uri . '/assets/hero-beauty.webp' ) . '" as="image" type="image/webp">' . "\n";
    echo '<link rel="preload" href="' . esc_url( $theme_uri . '/assets/logo.png' ) . '" as="image">' . "\n";
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
}
add_action( 'wp_head', 'zuriglow_preload_assets', 1 );

// ─── Custom Meta Tags (SEO, OG, GEO) ───
function zuriglow_meta_tags() {
    if ( is_front_page() ) {
        $theme_uri = get_template_directory_uri();
        ?>
        <meta name="description" content="Züri Glow – dein Kosmetikstudio in Zürich Altstetten. Hydrafacial, Microneedling, PMU, Massagen & Waxing. V-NISSG zertifiziert. Über 60 Behandlungen. ☎ 076 582 70 05">
        <meta name="keywords" content="Kosmetikstudio Zürich, Beauty Studio Altstetten, Gesichtsbehandlung Zürich, Hydrafacial Zürich, Microneedling Zürich, Permanent Make-up Zürich, PMU Zürich, Anti-Aging Zürich, Hautpflege Zürich, Waxing Zürich, Massage Zürich Altstetten, Kosmetikerin Zürich, SGMK Kosmetik, BB Glow Zürich, Chemical Peeling Zürich, Aknebehandlung Zürich, Braut Make-up Zürich, V-NISSG zertifiziert, Kosmetik Altstetten">
        <meta name="author" content="Züri Glow Beauty Studio">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <link rel="canonical" href="https://zuriglow.ch/">

        <!-- Favicon -->
        <link rel="icon" type="image/png" sizes="512x512" href="<?php echo esc_url( $theme_uri . '/assets/favicon.png' ); ?>">
        <link rel="icon" type="image/png" sizes="192x192" href="<?php echo esc_url( $theme_uri . '/assets/favicon.png' ); ?>">
        <link rel="icon" type="image/png" sizes="32x32" href="<?php echo esc_url( $theme_uri . '/assets/favicon.png' ); ?>">
        <link rel="icon" type="image/png" sizes="16x16" href="<?php echo esc_url( $theme_uri . '/assets/favicon.png' ); ?>">
        <link rel="apple-touch-icon" sizes="180x180" href="<?php echo esc_url( $theme_uri . '/assets/favicon.png' ); ?>">
        <meta name="msapplication-TileImage" content="<?php echo esc_url( $theme_uri . '/assets/favicon.png' ); ?>">
        <meta name="msapplication-TileColor" content="#D4AD5A">
        <meta name="theme-color" content="#FFFCF7">

        <!-- Language & Region -->
        <meta http-equiv="content-language" content="de-CH">
        <link rel="alternate" hreflang="de-CH" href="https://zuriglow.ch/">
        <link rel="alternate" hreflang="de" href="https://zuriglow.ch/">
        <link rel="alternate" hreflang="x-default" href="https://zuriglow.ch/">

        <!-- GEO Tags -->
        <meta name="geo.region" content="CH-ZH">
        <meta name="geo.placename" content="Zürich Altstetten">
        <meta name="geo.position" content="47.3769;8.4879">
        <meta name="ICBM" content="47.3769, 8.4879">

        <!-- Open Graph -->
        <meta property="og:title" content="Züri Glow Beauty Studio | Kosmetik & Hautpflege Zürich Altstetten">
        <meta property="og:description" content="Über 60 professionelle Behandlungen: Hydrafacial, Microneedling, Permanent Make-up, Massagen & Waxing. V-NISSG zertifiziert. Jetzt Termin buchen!">
        <meta property="og:image" content="https://zuriglow.ch/wp-content/themes/zuriglow/assets/hero-beauty.png">
        <meta property="og:image:width" content="1024">
        <meta property="og:image:height" content="1024">
        <meta property="og:image:alt" content="Züri Glow Beauty Studio – Kosmetikerin mit Züri Glow Schild">
        <meta property="og:url" content="https://zuriglow.ch/">
        <meta property="og:type" content="website">
        <meta property="og:locale" content="de_CH">
        <meta property="og:site_name" content="Züri Glow Beauty Studio">

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Züri Glow Beauty Studio | Zürich Altstetten">
        <meta name="twitter:description" content="Dein Kosmetikstudio in Zürich Altstetten. Hydrafacial, Microneedling, PMU & mehr. V-NISSG zertifiziert. Jetzt Termin buchen!">
        <meta name="twitter:image" content="https://zuriglow.ch/wp-content/themes/zuriglow/assets/hero-beauty.png">
        <?php
    }
}
add_action( 'wp_head', 'zuriglow_meta_tags', 2 );

// ─── Structured Data (JSON-LD) ───
function zuriglow_structured_data() {
    if ( is_front_page() ) {
        $theme_uri = get_template_directory_uri();
        ?>
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "BeautySalon",
            "@id": "https://zuriglow.ch/#organization",
            "name": "Züri Glow Beauty Studio",
            "alternateName": ["Züri Glow", "ZÜRI GLOW", "Zueri Glow", "Zuriglow"],
            "image": "<?php echo esc_url( $theme_uri . '/assets/logo.png' ); ?>",
            "logo": "<?php echo esc_url( $theme_uri . '/assets/logo.png' ); ?>",
            "url": "https://zuriglow.ch/",
            "telephone": "+41765827005",
            "email": "info@zuriglow.ch",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Eugenhuberstrasse 53",
                "addressLocality": "Zürich",
                "addressRegion": "ZH",
                "postalCode": "8048",
                "addressCountry": "CH"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 47.3769,
                "longitude": 8.4879
            },
            "openingHoursSpecification": [
                {"@type": "OpeningHoursSpecification", "dayOfWeek": "Monday", "opens": "10:00", "closes": "19:00"},
                {"@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "10:00", "closes": "19:00"},
                {"@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "10:00", "closes": "20:00"},
                {"@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "10:00", "closes": "18:00"}
            ],
            "priceRange": "CHF 30 – CHF 420",
            "currenciesAccepted": "CHF",
            "paymentAccepted": "Cash, Credit Card, TWINT",
            "description": "Züri Glow Beauty Studio in Zürich Altstetten – professionelle Gesichtsbehandlungen, Hydrafacial, Microneedling, Permanent Make-up, Massagen, Waxing und mehr. V-NISSG zertifiziert. Über 60 Behandlungen für strahlend schöne Haut.",
            "knowsAbout": ["Gesichtsbehandlung", "Hydrafacial", "Microneedling", "Permanent Make-up", "Waxing", "Massage", "Anti-Aging", "Chemical Peeling", "BB Glow", "Aknebehandlung"],
            "areaServed": [
                {"@type": "City", "name": "Zürich"},
                {"@type": "Place", "name": "Altstetten"},
                {"@type": "Place", "name": "Albisrieden"},
                {"@type": "Place", "name": "Höngg"},
                {"@type": "Place", "name": "Schlieren"},
                {"@type": "Place", "name": "Dietikon"},
                {"@type": "Place", "name": "Wiedikon"}
            ],
            "sameAs": [
                "https://www.instagram.com/zuri_glow_",
                "https://www.facebook.com/share/1Av7gSAWCR/",
                "https://www.tiktok.com/@zuriglow"
            ],
            "hasCredential": [
                {"@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "V-NISSG Zertifizierung"},
                {"@type": "EducationalOccupationalCredential", "credentialCategory": "membership", "name": "SGMK – Schweizerischer Gewerbeverband Medical Kosmetik"}
            ],
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "bestRating": "5",
                "worstRating": "1",
                "ratingCount": "100",
                "reviewCount": "100"
            }
        }
        </script>
        <?php
    }
}
add_action( 'wp_head', 'zuriglow_structured_data', 5 );

// ─── Remove WordPress Emoji Scripts (Performance) ───
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

// ─── Remove WordPress Version (Security) ───
remove_action( 'wp_head', 'wp_generator' );
