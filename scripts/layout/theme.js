/**
 * Vue Imports
 *
 * Components must be imported before App instances
 * so they can be registered.
 */
import '../components/ProductGridItem';
import '../apps/Cart';
import '../apps/Main';
import '../apps/ProductSuggestion';
import '../apps/Header';
import '../apps/Product';
import '../apps/ShopMore';
/* End Vue Imports */

import '../sections/footer';

import '../policies';


addEventListener('load', fadeInContent);
setTimeout(fadeInContent, 3000);

function fadeInContent() {
  document.documentElement.classList.remove('loading');
}
