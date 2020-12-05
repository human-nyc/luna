class ProductStickyAddToCart {
  constructor() {
    this.stickyAddToCart = document.querySelector('#stickyAddToCart');

    window.addEventListener('scroll', () => {
      this.checkScrollPosition();
    });
  }

  checkScrollPosition() {
    if(scrollY >= this.stickyAddToCart.offsetTop) {
      requestAnimationFrame(() => {
        stickyAddToCartIsActive = true
        this.stickyAddToCart.classList.add('active');
      });
    } else {
      requestAnimationFrame(() => {
        stickyAddToCartIsActive = false
        this.stickyAddToCart.classList.remove('active');
      });
    }
  } 

}

export default ProductStickyAddToCart;
