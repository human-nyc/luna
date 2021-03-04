document.addEventListener('DOMContentLoaded', initPolicyPageHero);
document.addEventListener('DOMContentLoaded', initPolicyPageSidebar);

async function initPolicyPageHero() {
  const mainEl = document.querySelector('.main');

  if(document.body.id == 'refund-policy' || document.body.id == 'shipping-policy' || document.body.id == 'terms-of-service' || document.body.id == 'privacy-policy') {
    var sectionResp = await fetch('/?section_id=faq-hero');
    var responseFragment = await sectionResp.text();

    let frag = document.createRange().createContextualFragment(responseFragment);
    mainEl.prepend(frag);


    document.querySelectorAll(`[href="${window.location.pathname}"]`).forEach(el => {
      el.classList.add('active');
    });
  }
}

async function initPolicyPageSidebar() {
  const containerEl = document.querySelector('.shopify-policy__container');

  if(document.body.id == 'refund-policy') {
    var sectionResp = await fetch('/?section_id=faq-sidebar');

    var responseFragment = await sectionResp.text();

    let frag = document.createRange().createContextualFragment(responseFragment);

    containerEl.appendChild(frag);

    document.querySelectorAll(`[href="${window.location.pathname}"]`).forEach(el => {
      el.classList.add('active');
    });
  }
}
