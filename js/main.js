(function () {
  // Variables
  var nav = document.querySelector('.header__navigation');
  var langSwitcher = document.querySelector('.header__language-switcher');
  var search = document.querySelector('.header__search');
  var allToggles = document.querySelectorAll('.header--toggle');
  var navToggle = document.querySelector('.header__navigation--toggle');
  var langToggle = document.querySelector('.header__language-switcher--toggle');
  var searchToggle = document.querySelector('.header__search--toggle');
  var closeToggle = document.querySelector('.header__close--toggle');
  var allElements = document.querySelectorAll(
    '.header--element, .header--toggle'
  );
  var emailGlobalUnsub = document.querySelector('input[name="globalunsub"]');
  var glide = document.querySelector('.glide');
  var compareImage = document.querySelector('.compare-images');

  // Functions

  // Function for executing code on document ready
  function domReady(callback) {
    if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  // Function for toggling mobile navigation
  function toggleNav() {
    allToggles.forEach(function (toggle) {
      toggle.classList.toggle('hide');
    });

    nav.classList.toggle('open');
    navToggle.classList.toggle('open');

    closeToggle.classList.toggle('show');
  }

  // Function for toggling mobile language selector
  function toggleLang() {
    allToggles.forEach(function (toggle) {
      toggle.classList.toggle('hide');
    });

    langSwitcher.classList.toggle('open');
    langToggle.classList.toggle('open');

    closeToggle.classList.toggle('show');
  }

  // Function for toggling mobile search field
  function toggleSearch() {
    allToggles.forEach(function (toggle) {
      toggle.classList.toggle('hide');
    });

    search.classList.toggle('open');
    searchToggle.classList.toggle('open');

    closeToggle.classList.toggle('show');
  }

  // Function for the header close option on mobile
  function closeAll() {
    allElements.forEach(function (element) {
      element.classList.remove('hide', 'open');
    });

    closeToggle.classList.remove('show');
  }

  // Function to disable the other checkbox inputs on the email subscription system page template
  function toggleDisabled() {
    var emailSubItem = document.querySelectorAll('#email-prefs-form .item');

    emailSubItem.forEach(function (item) {
      var emailSubItemInput = item.querySelector('input');

      if (emailGlobalUnsub.checked) {
        item.classList.add('disabled');
        emailSubItemInput.setAttribute('disabled', 'disabled');
        emailSubItemInput.checked = false;
      } else {
        item.classList.remove('disabled');
        emailSubItemInput.removeAttribute('disabled');
      }
    });
  }

  // Execute JavaScript on document ready
  domReady(function () {
    console.log('[compare-image]',)
    if (!document.body) {
      return;
    } else {
      // Function dependent on language switcher
      if (langSwitcher) {
        langToggle.addEventListener('click', toggleLang);
      }

      // Function dependent on navigation
      if (navToggle) {
        navToggle.addEventListener('click', toggleNav);
      }

      // Function dependent on search field
      if (searchToggle) {
        searchToggle.addEventListener('click', toggleSearch);
      }

      // Function dependent on close toggle
      if (closeToggle) {
        closeToggle.addEventListener('click', closeAll);
      }

      // Function dependent on email unsubscribe from all input
      if (emailGlobalUnsub) {
        emailGlobalUnsub.addEventListener('change', toggleDisabled);
      }

      if (glide) {
        new Glide('.glide', {
          type: 'carousel',
          startAt: 0,
          perView: 1,
          // autoplay: 6000,
          arrows: {
              prev: ".glide__arrow--left",
              next: ".glide__arrow--right",
          },
        }).mount();
      }

      if(compareImage) {
        let isClicked = false;

        const image = document.querySelector(".compare__overlay");
        const width = image.offsetWidth;
        const height = image.offsetHeight;
        const slider = document.createElement("div");
        const circleSlider = document.createElement("div");
        const endSlider = document.createElement("div");
        compare();

        function compare() {
            image.parentElement.insertBefore(slider, image);
            image.parentElement.insertBefore(circleSlider, image);
            image.parentElement.insertBefore(endSlider, image);

            slider.classList.add("absolute", "cursor-grab", "bg-white", "z-10", "w-0.5", "h-[45%]" )
            circleSlider.classList.add("absolute", "cursor-grab", "z-20", "aspect-square", "h-[10%]", "rounded-full", "bg-[url({{ get_asset_url('/theherd/images/projects/drag-button.png') }})]", "bg-cover", "bg-no-repeat", "active:cursor-grabbing");
            endSlider.classList.add("absolute", "cursor-grab", "bg-white", "z-10", "w-0.5", "h-[45%]")
            circleSlider.style.top = "45%";
            circleSlider.style.left = width / 2 - circleSlider.offsetWidth / 2 - 20 + "px";
            endSlider.style.top = "55%";
            endSlider.style.left = width / 2 - endSlider.offsetWidth / 2 + "px";

            slider.style.top = 0;
            slider.style.left = width / 2 - slider.offsetWidth / 2 + "px";
            image.style.width = "50%";

            circleSlider.addEventListener("mousedown", onSlideStart);
            circleSlider.addEventListener("touchstart", onSlideStart);

            window.addEventListener("mouseup", () => (isClicked = false));
            window.addEventListener("touchstop", () => (isClicked = false));

            window.addEventListener("mousemove", onSlideMove);
            window.addEventListener("touchmove", onSlideMove);
        }

        function onSlideStart(event) {
            event.preventDefault();
            isClicked = true;
        }

        function onSlideMove(event) {
            if (!isClicked) return;

            doSlide(currentPosition(event));
        }

        function currentPosition(event = window.event) {
            let xImage = image.getBoundingClientRect();
            let x = 0;

            x = event.pageX - xImage.left;

            if (x < 0) x = 0;

            if (x > width) x = width;

            return x;
        }

        function doSlide(x) {
            image.style.width = x + "px";
            slider.style.left = image.offsetWidth - slider.offsetWidth / 2 + "px";
            circleSlider.style.left = image.offsetWidth - circleSlider.offsetWidth / 2 + "px";
            endSlider.style.left = image.offsetWidth - endSlider.offsetWidth / 2 + "px";
        }
      }
    }
  });
})();
