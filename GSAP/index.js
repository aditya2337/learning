import { gsap } from 'gsap'

gsap.registerPlugin(ScrollTrigger)

gsap.to('.blue', { duration: 2, x: 300 })
gsap.from('.red', { scale: 0.5, duration: 3 })
gsap.to('.red', { duration: 3, rotation: 360, scale: 2, x: 300 })

gsap.set('.green', { backgroundColor: 'yellow' })

gsap.from('.eyes', {
  duration: 3, x: "-100vw", ease: "linear", scrollTrigger: ".eyes"
})
