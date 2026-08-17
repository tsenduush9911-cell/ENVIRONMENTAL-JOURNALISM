const button = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
button?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  button.setAttribute('aria-expanded', open);
});
document.querySelectorAll('#main-nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const editor = document.querySelector('#editor');
const trigger = document.querySelector('.edit-trigger');
const closeEditor = document.querySelector('.editor-close');
const backdrop = document.querySelector('.editor-backdrop');
const hero = document.querySelector('#hero');
const video = document.querySelector('#hero-video');
const fields = {
  kicker: document.querySelector('#edit-kicker'), title: document.querySelector('#edit-title'),
  description: document.querySelector('#edit-description'), image: document.querySelector('#edit-image'), video: document.querySelector('#edit-video')
};
const defaults = { kicker: document.querySelector('#hero-kicker').textContent, title: 'Цөл цөлждөг үү?', description: document.querySelector('#hero-description').textContent };
const openEditor = () => { editor.classList.add('open'); backdrop.classList.add('open'); editor.setAttribute('aria-hidden', 'false'); trigger.setAttribute('aria-expanded', 'true'); };
const hideEditor = () => { editor.classList.remove('open'); backdrop.classList.remove('open'); editor.setAttribute('aria-hidden', 'true'); trigger.setAttribute('aria-expanded', 'false'); };
const setText = (key, value) => {
  if (!value) return;
  if (key === 'title') document.querySelector('#hero-title').innerHTML = value.replace(/\n/g, '<br>');
  else document.querySelector(`#hero-${key}`).textContent = value;
};
const editorStorageKey = 'cop17-editor-v2';
const stored = JSON.parse(localStorage.getItem(editorStorageKey) || '{}');
['kicker', 'title', 'description'].forEach(key => { fields[key].value = stored[key] || defaults[key]; setText(key, stored[key]); });
trigger?.addEventListener('click', openEditor); closeEditor?.addEventListener('click', hideEditor); backdrop?.addEventListener('click', hideEditor);
document.querySelector('.save-preview')?.addEventListener('click', () => {
  const content = { kicker: fields.kicker.value, title: fields.title.value, description: fields.description.value };
  localStorage.setItem(editorStorageKey, JSON.stringify(content));
  Object.entries(content).forEach(([key, value]) => setText(key, value));
  hideEditor();
});
fields.image?.addEventListener('change', event => { const file = event.target.files[0]; if (!file) return; hero.style.setProperty('--hero-image', `url("${URL.createObjectURL(file)}")`); hero.classList.remove('has-video'); video.removeAttribute('src'); });
fields.video?.addEventListener('change', event => { const file = event.target.files[0]; if (!file) return; video.src = URL.createObjectURL(file); hero.classList.add('has-video'); video.play().catch(() => {}); });
document.querySelector('.reset-preview')?.addEventListener('click', () => { localStorage.removeItem(editorStorageKey); hero.style.removeProperty('--hero-image'); hero.classList.remove('has-video'); video.removeAttribute('src'); Object.entries(defaults).forEach(([key,value]) => { fields[key].value=value; setText(key,value); }); });
