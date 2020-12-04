class ProductStickyAddToCart {
  constructor() {
    this.rootElement = document.querySelector('#stickyAddToCart');

    window.addEventListener('scroll', () => {
      this.checkScrollPosition();
    });

    const headerHeight = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
    const options = {
      rootMargin: `-50% 0% -50% 0%`
    };

  }

  checkScrollPosition() {
    if(scrollY >= this.rootElement.offsetTop) {
      requestAnimationFrame(() => {
        this.rootElement.classList.add('active');
      });
    } else {
      requestAnimationFrame(() => {
        this.rootElement.classList.remove('active');
      });
    }
  }

}

export default ProductStickyAddToCart;
