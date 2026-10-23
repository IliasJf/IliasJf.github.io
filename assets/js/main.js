document.getElementById('year').textContent = new Date().getFullYear()

/*=============== EMAIL JS ===============*/
/*
   To receive messages by email, create a free account at https://www.emailjs.com,
   then fill in these three values. Until then, the form copies the message and
   opens LinkedIn so the visitor can send it there.
*/
const EMAILJS = {
   serviceId: '',
   templateId: '',
   publicKey: '',
}

const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

const showMessage = (text) =>{
   contactMessage.textContent = text

   // Remove message after six seconds
   setTimeout(() =>{
      contactMessage.textContent = ''
   }, 6000)
}

const loadEmailJS = () => new Promise((resolve, reject) =>{
   if(window.emailjs) return resolve(window.emailjs)
   const script = document.createElement('script')
   script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4.4.1/dist/email.min.js'
   script.onload = () => resolve(window.emailjs)
   script.onerror = reject
   document.head.appendChild(script)
})

const sendEmail = async (e) =>{
   e.preventDefault()
   const data = new FormData(contactForm)

   if(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey){
      try{
         const emailjs = await loadEmailJS()
         // serviceID - templateID - #form - publicKey
         await emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, '#contact-form', EMAILJS.publicKey)
         showMessage('Message sent successfully ✅')
         contactForm.reset()
      } catch {
         showMessage('Message not sent (service error) ❌')
      }
      return
   }

   // No email service yet: copy the message and open LinkedIn
   const text = `Hi Ilias, I'm ${data.get('user_name')} (${data.get('user_email')}).\n\n${data.get('user_message')}`
   try{
      await navigator.clipboard.writeText(text)
      showMessage('Message copied. Paste it in a LinkedIn message to me ✅')
   } catch {
      showMessage('Opening LinkedIn. Send me your message there.')
   }
   window.open('https://www.linkedin.com/in/ilias-jafaoui', '_blank', 'noopener')
   contactForm.reset()
}
contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () =>{
   const scrollUp = document.getElementById('scroll-up')
   // When the scroll is higher than 350 viewport height, add the show-scroll class
   window.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                         : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
   const scrollDown = window.scrollY

   sections.forEach(current =>{
      const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__list a[href*=' + sectionId + ']')

      if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
         sectionsClass.classList.add('active-link')
      }else{
         sectionsClass.classList.remove('active-link')
      }
   })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
if(window.ScrollReveal && !matchMedia('(prefers-reduced-motion: reduce)').matches){
   const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2000,
      delay: 300,
      // reset: true, // Animations repeat
   })

   sr.reveal(`.home__perfil, .home__about, .section__title`)
   sr.reveal(`.home__info`, {origin: 'left', delay: 600})
   sr.reveal(`.home__skills`, {origin: 'left', delay: 900})
   sr.reveal(`.projects__card, .services__card, .experience__card`, {interval: 100})
   sr.reveal(`.contact__form`, {origin: 'bottom'})
}
