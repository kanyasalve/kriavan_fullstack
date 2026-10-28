/* =========================================================
   PRODUCT IMAGES
========================================================= */

const productImages = [];

document.querySelectorAll(".thumbnail").forEach(function (image) {
    productImages.push(image.src);
});

let currentImageIndex = 0;


/* =========================================================
   SELECT PRODUCT IMAGE
========================================================= */

function selectProductImage(element) {

    const mainImage =
        document.getElementById("mainProductImage");

    if (!mainImage) {
        return;
    }

    mainImage.src = element.src;

    document
        .querySelectorAll(".thumbnail")
        .forEach(function (img) {

            img.classList.remove("active");

        });

    element.classList.add("active");

    currentImageIndex =
        parseInt(element.dataset.index) || 0;
}


/* =========================================================
   OPEN LIGHTBOX
========================================================= */

function openLightbox(index) {

    if (productImages.length === 0) {
        return;
    }

    currentImageIndex = index;

    const lightbox =
        document.getElementById("imageLightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    if (!lightbox || !lightboxImage) {
        return;
    }

    lightboxImage.src =
        productImages[currentImageIndex];

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {

    const lightbox =
        document.getElementById("imageLightbox");

    if (!lightbox) {
        return;
    }

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}


/* =========================================================
   CLOSE LIGHTBOX OUTSIDE
========================================================= */

function closeLightboxOutside(event) {

    if (
        event.target &&
        event.target.id === "imageLightbox"
    ) {

        closeLightbox();

    }
}


/* =========================================================
   CHANGE LIGHTBOX IMAGE
========================================================= */

function changeLightboxImage(direction) {

    if (productImages.length === 0) {
        return;
    }

    currentImageIndex += direction;


    if (currentImageIndex < 0) {

        currentImageIndex =
            productImages.length - 1;

    }


    if (
        currentImageIndex >=
        productImages.length
    ) {

        currentImageIndex = 0;

    }


    const lightboxImage =
        document.getElementById("lightboxImage");


    if (lightboxImage) {

        lightboxImage.src =
            productImages[currentImageIndex];

    }


    const mainImage =
        document.getElementById("mainProductImage");


    if (mainImage) {

        mainImage.src =
            productImages[currentImageIndex];

    }


    document
        .querySelectorAll(".thumbnail")
        .forEach(function (img, index) {

            img.classList.remove("active");


            if (
                index ===
                currentImageIndex
            ) {

                img.classList.add("active");

            }

        });

}


/* =========================================================
   THUMBNAIL CAROUSEL
========================================================= */

function scrollThumbnails(direction) {

    const container =
        document.getElementById(
            "thumbnailContainer"
        );

    if (!container) {
        return;
    }

    container.scrollBy({

        left: direction * 250,

        behavior: "smooth"

    });
}


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        const lightbox =
            document.getElementById(
                "imageLightbox"
            );


        if (
            !lightbox ||
            !lightbox.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowLeft") {

            changeLightboxImage(-1);

        }


        if (event.key === "ArrowRight") {

            changeLightboxImage(1);

        }

    }
);


/* =========================================================
   LANGUAGE MENU
========================================================= */

function toggleLanguage() {

    const menu =
        document.getElementById(
            "languageMenu"
        );


    if (!menu) {
        return;
    }


    menu.classList.toggle("active");
}


/* =========================================================
   CHANGE LANGUAGE
========================================================= */

function changeLanguage(
    language,
    languageName
) {

    const selected =
        document.getElementById(
            "selectedLanguage"
        );


    if (selected) {

        selected.innerText =
            languageName;

    }


    const menu =
        document.getElementById(
            "languageMenu"
        );


    /* =====================================================
       ENGLISH
    ====================================================== */

    if (language === "en") {

        const googleSelect =
            document.querySelector(
                ".goog-te-combo"
            );


        if (googleSelect) {

            googleSelect.value = "en";

            googleSelect.dispatchEvent(
                new Event("change")
            );

        }


        if (menu) {

            menu.classList.remove(
                "active"
            );

        }


        return;
    }


    /* =====================================================
       OTHER LANGUAGES
    ====================================================== */

    const googleSelect =
        document.querySelector(
            ".goog-te-combo"
        );


    if (!googleSelect) {

        setTimeout(
            function () {

                changeLanguage(
                    language,
                    languageName
                );

            },
            500
        );

        return;
    }


    googleSelect.value =
        language;


    googleSelect.dispatchEvent(
        new Event("change")
    );


    if (menu) {

        menu.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   CLOSE LANGUAGE MENU
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const wrapper =
            document.querySelector(
                ".language-wrapper"
            );

        const menu =
            document.getElementById(
                "languageMenu"
            );


        if (
            wrapper &&
            menu &&
            !wrapper.contains(
                event.target
            )
        ) {

            menu.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================================
   MOBILE SWIPE
========================================================= */

let touchStartX = 0;
let touchEndX = 0;


const lightbox =
    document.getElementById(
        "imageLightbox"
    );


if (lightbox) {

    lightbox.addEventListener(
        "touchstart",
        function (event) {

            if (
                event.changedTouches &&
                event.changedTouches.length
            ) {

                touchStartX =
                    event.changedTouches[0]
                        .screenX;

            }

        },
        {
            passive: true
        }
    );


    lightbox.addEventListener(
        "touchend",
        function (event) {

            if (
                event.changedTouches &&
                event.changedTouches.length
            ) {

                touchEndX =
                    event.changedTouches[0]
                        .screenX;

                handleSwipe();

            }

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   HANDLE MOBILE SWIPE
========================================================= */

function handleSwipe() {

    const swipeDistance =
        touchEndX - touchStartX;


    if (
        Math.abs(swipeDistance) <
        50
    ) {

        return;

    }


    if (swipeDistance > 0) {

        changeLightboxImage(-1);

    } else {

        changeLightboxImage(1);

    }

}


/* =========================================================
   GOOGLE TRANSLATE READY CHECK
========================================================= */

let googleTranslateCheck =
    setInterval(
        function () {

            const googleSelect =
                document.querySelector(
                    ".goog-te-combo"
                );


            if (googleSelect) {

                clearInterval(
                    googleTranslateCheck
                );

            }

        },
        500
    );


/* =========================================================
   GOOGLE TRANSLATE INITIALIZATION
========================================================= */

function googleTranslateElementInit() {

    if (
        typeof google === "undefined" ||
        !google.translate
    ) {

        return;

    }


    const translateElement =
        document.getElementById(
            "google_translate_element"
        );


    if (!translateElement) {
        return;
    }


    new google.translate.TranslateElement({

        pageLanguage: "en",

        includedLanguages:
            "en,hi,bn,mr,te,ta,gu,ur,kn,ml,or,pa,as,sa,ne",

        autoDisplay: false

    }, "google_translate_element");

}


/* =========================================================
   CONTACT FORM
   SWEETALERT SUBMIT LOADING
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const contactForm =
            document.getElementById(
                "contactForm"
            );


        const submitButton =
            document.getElementById(
                "submitButton"
            );


        if (!contactForm) {
            return;
        }


        contactForm.addEventListener(
            "submit",
            function () {

                if (
                    !contactForm.checkValidity()
                ) {

                    return;

                }


                if (submitButton) {

                    submitButton.disabled =
                        true;


                    submitButton.innerHTML =
                        '<i class="bi bi-hourglass-split"></i>' +
                        '&nbsp; Sending...';

                }


                if (
                    typeof Swal !==
                    "undefined"
                ) {

                    Swal.fire({

                        title:
                            "Sending Enquiry...",

                        text:
                            "Please wait.",

                        allowOutsideClick:
                            false,

                        allowEscapeKey:
                            false,

                        showConfirmButton:
                            false,

                        didOpen:
                            function () {

                                Swal.showLoading();

                            }

                    });

                }

            }
        );

    }
);