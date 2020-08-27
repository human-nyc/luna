/**
 * Customer Addresses Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Customer Addresses
 * template.
 *
 * @namespace customerAddresses
 */

import { AddressForm } from '@shopify/theme-addresses';

document.addEventListener('DOMContentLoaded', event => {


  const addressForms = document.querySelectorAll('[data-address]');

  if (addressForms.length) {
    addressForms.forEach((addressContainer) => {
      initializeAddressForm(addressContainer);
    });
  }


});


function initializeAddressForm(container) {
  const addressFields = container.querySelector('[data-address-fields]');
  const addressForm = container.querySelector('[data-address-form]');
  const deleteForm = container.querySelector('[data-address-delete-form]');

  container.querySelectorAll('[data-address-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      addressForm.classList.toggle('hide');
    });
  });

  AddressForm(addressFields, 'en');

  if (deleteForm) {
    deleteForm.addEventListener('submit', (event) => {
      const confirmMessage = deleteForm.getAttribute('data-confirm-message');

      if (!window.confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
        event.preventDefault();
      }
    });
  }
}
