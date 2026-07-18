/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);

// --- SLIDE IN ANIMATION ---
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.slide-in-scroll, .slide-in-left');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
});

/* ============================================
   REVIEWS CAROUSEL - PURE VANILLA JS
   ============================================ */

(function() {
    'use strict';
    
    // Get elements
    const track = document.getElementById('reviewsTrack');
    const items = track.querySelectorAll('.review-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');
    
    let currentIndex = 0;
    let totalItems = items.length;
    let autoPlayInterval = null;
    let isTransitioning = false;
    
    // Show specific slide
    function showSlide(index) {
        if (isTransitioning) return;
        if (index < 0) index = totalItems - 1;
        if (index >= totalItems) index = 0;
        
        isTransitioning = true;
        
        // Update slides
        items.forEach((item, i) => {
            item.classList.remove('active');
        });
        items[index].classList.add('active');
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
        });
        dots[index].classList.add('active');
        
        currentIndex = index;
        
        // Reset transition lock
        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    }
    
    // Next slide
    function nextSlide() {
        showSlide(currentIndex + 1);
    }
    
    // Previous slide
    function prevSlide() {
        showSlide(currentIndex - 1);
    }
    
    // Go to specific slide (dot click)
    function goToSlide(index) {
        showSlide(index);
        resetAutoPlay();
    }
    
    // Reset autoplay timer
    function resetAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
        startAutoPlay();
    }
    
    // Start autoplay
    function startAutoPlay() {
        if (autoPlayInterval) return;
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    // Stop autoplay
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Event Listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
            resetAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
            resetAutoPlay();
        });
    }
    
    // Dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            goToSlide(index);
        });
        
        // Touch support
        dot.addEventListener('touchstart', function(e) {
            e.preventDefault();
            goToSlide(index);
        });
    });
    
    // Keyboard support (accessibility)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoPlay();
        }
    });
    
    // Pause autoplay on hover (desktop) / touch (mobile)
    const container = document.querySelector('.reviews-container');
    if (container) {
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);
        container.addEventListener('touchstart', stopAutoPlay);
        container.addEventListener('touchend', startAutoPlay);
    }
    
    // Start autoplay
    startAutoPlay();
    
    // Initialize first slide
    showSlide(0);
    
})();
