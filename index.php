<?php
/**
 * The main template file.
 * WordPress requires this file to exist.
 * Since this is a one-page theme, we redirect to front-page.php.
 */
get_header();
?>

    <!-- Default template: content handled by front-page.php for the homepage -->
    <section class="section" style="padding: 120px 0 80px; text-align: center;">
        <div class="container">
            <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
                <article>
                    <h2><?php the_title(); ?></h2>
                    <div><?php the_content(); ?></div>
                </article>
            <?php endwhile; else : ?>
                <p>Keine Inhalte gefunden.</p>
            <?php endif; ?>
        </div>
    </section>

<?php get_footer(); ?>
