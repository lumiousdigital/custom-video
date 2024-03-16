import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import lozad from 'lozad';

// Your custom JavaScript here
$(() => {
    // Initialize Lozad.js for lazy loading videos
    const observer = lozad('[data-lazy-load]');
    observer.observe();

    // Variable for Plyr instance of lightbox video
    let lightboxPlyrInstance = null;

    // Update video source and poster in the lightbox and play video
    const updateLightboxVideoAndPlay = (videoSrc, videoPoster) => {
        const lightboxVideo = document.querySelector('[data-video-lightbox] video');

        // Update the source and poster if they have changed
        if (lightboxVideo.src !== videoSrc || lightboxVideo.getAttribute('data-poster') !== videoPoster) {
            lightboxVideo.src = videoSrc;
            lightboxVideo.setAttribute('data-poster', videoPoster);
            lightboxVideo.load(); // Ensure the changes are applied

            // Update Plyr source and poster if the instance exists
            if (lightboxPlyrInstance) {
                lightboxPlyrInstance.source = {
                    type: 'video',
                    sources: [{ src: videoSrc, type: 'video/mp4' }],
                    poster: videoPoster,
                };
            } else {
                // Initialize Plyr for the first time
                lightboxPlyrInstance = new Plyr(lightboxVideo, {autoplay: true});
            }
        }

        // Show the lightbox
        $('[data-video-lightbox]').show();

        // Play the video using the Plyr instance
        if (lightboxPlyrInstance) {
            lightboxPlyrInstance.play();
        }
    };

    // Close the lightbox and stop the video
    const closeLightbox = () => {
        if (lightboxPlyrInstance) {
            lightboxPlyrInstance.stop(); // Stop the video
        }

        // Hide the lightbox
        $('[data-video-lightbox]').hide();
    };

    // Listener for opening the lightbox
    $(document).on('click', '[data-lightbox-toggle]', function() {
        const videoSrc = $(this).attr('data-video-src');
        const videoPoster = $(this).attr('data-video-poster');
        updateLightboxVideoAndPlay(videoSrc, videoPoster);
    });

    // Listener for closing the lightbox
    $(document).on('click', '[data-lightbox-close]', () => {
        closeLightbox();
    });
});