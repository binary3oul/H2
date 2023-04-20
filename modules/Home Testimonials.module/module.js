var glide = new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  perView: 1,
  // autoplay: 6000,
  arrows: {
    prev: ".glide__arrow--left",
    next: ".glide__arrow--right",
  },
})

glide.mount();