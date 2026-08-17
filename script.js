const button = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
button?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  button.setAttribute('aria-expanded', open);
});
document.querySelectorAll('#main-nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
