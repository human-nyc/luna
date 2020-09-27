document.addEventListener('DOMContentLoaded', initPolicyPageHero);
document.addEventListener('DOMContentLoaded', initPolicyPageSidebar);

async function initPolicyPageHero() {
  const mainEl = document.querySelector('.main');

  if(document.body.id == 'refund-policy') {
    var sectionResp = await fetch('/?section_id=faq-hero');
    console.log({sectionResp});
    var responseFragment = await sectionResp.text();
    console.log({responseFragment});

    let frag = document.createRange().createContextualFragment(responseFragment);
    console.log(frag);
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
    console.log({sectionResp});
    var responseFragment = await sectionResp.text();
    console.log({responseFragment});

    let frag = document.createRange().createContextualFragment(responseFragment);
    console.log(frag);
    containerEl.appendChild(frag);


    document.querySelectorAll(`[href="${window.location.pathname}"]`).forEach(el => {
      el.classList.add('active');
    });
  }
}
