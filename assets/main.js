document.getElementById('year').textContent = new Date().getFullYear();

function handleSubmit(e){
  e.preventDefault();
  const status = document.getElementById('form-status');
  const form = e.target;
  if(!form.name.value || !form.email.value){
    status.textContent = 'Please fill in your name and email.';
    status.style.color = 'var(--danger)';
    return false;
  }
  status.textContent = 'Thanks — we\'ll be in touch shortly.';
  status.style.color = 'var(--accent)';
  form.reset();
  return false;
}

const revealEls = document.querySelectorAll('.card, .service-card, .step, .arch-box');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));
