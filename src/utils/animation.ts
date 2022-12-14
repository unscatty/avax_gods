// import { explosion } from '../../public/resources'

// https://codepen.io/meodai/pen/OVVzBb\

export const playAudio = (clip: string) => {
  const audio = new Audio()
  audio.src = clip

  return audio.play()
}

const prefixes = ['webkit', 'moz', 'ms', '']

function prefixedEvent(
  element: HTMLElement,
  type: string,
  callback: EventListenerOrEventListenerObject
) {
  for (let p = 0; p < prefixes.length; p++) {
    if (!prefixes[p]) type = type.toLowerCase()
    element.addEventListener(prefixes[p] + type, callback, false)
  }
}

function transform(
  $e: HTMLElement,
  xValue: number,
  yValue: number,
  scaleValue: number,
  rotationValue?: number,
  percent?: boolean
) {
  const x = xValue || 0
  const y = yValue || 0
  const scale = scaleValue || 1
  const unit = percent ? '%' : 'px'
  const rotation = rotationValue || 0

  const transfromString =
    `translate(${x}${unit}, ${y}${unit}) ` +
    `scale(${scale}) ` +
    `rotate(${rotation}deg)`

  // $e.style.webkitTransform = transfromString
  // $e.style.MozTransform = transfromString
  $e.style.transform = transfromString
}

function createParticle(x: number, y: number, scale: number) {
  const $particle = document.createElement('i')
  const $sparcle = document.createElement('i')

  $particle.className = 'particle'
  $sparcle.className = 'sparcle'

  transform($particle, x, y, scale)
  $particle.appendChild($sparcle)

  return $particle
}

function explode($container: HTMLElement) {
  const particles = []

  particles.push(createParticle(0, 0, 1))
  particles.push(createParticle(50, -15, 0.4))
  particles.push(createParticle(50, -105, 0.2))
  particles.push(createParticle(-10, -60, 0.8))
  particles.push(createParticle(-10, 60, 0.4))
  particles.push(createParticle(-50, -60, 0.2))
  particles.push(createParticle(-50, -15, 0.75))
  particles.push(createParticle(-100, -15, 0.4))
  particles.push(createParticle(-100, -15, 0.2))
  particles.push(createParticle(-100, -115, 0.2))
  particles.push(createParticle(80, -15, 0.1))

  particles.forEach((particle) => {
    $container.appendChild(particle)

    prefixedEvent(particle, 'AnimationEnd', () => {
      // const self = this
      setTimeout(() => {
        requestAnimationFrame(() => {
          $container.removeChild(particle)
        })
      }, 100)
    })

    document.querySelectorAll('.container').forEach((el) => el.remove())
  })
}

function explodeGroup(
  x: number,
  y: number,
  trans: { scale: number; x: number; y: number; r: number }
) {
  const $container = document.createElement('div')

  $container.className = 'container'
  $container.style.top = `${y}px`
  $container.style.left = `${x}px`

  transform($container, trans.x, trans.y, trans.scale, trans.r, true)

  explode($container)
  return $container
}

export function sparcle(
  event: MouseEvent,
  clipSrc = '/resources/sounds/explosion.mp3'
) {
  const explosions: HTMLElement[] = []

  explosions.push(
    explodeGroup(event.pageX, event.pageY, { scale: 1, x: -50, y: -50, r: 0 })
  )
  explosions.push(
    explodeGroup(event.pageX, event.pageY, {
      scale: 0.5,
      x: -30,
      y: -50,
      r: 180,
    })
  )
  explosions.push(
    explodeGroup(event.pageX, event.pageY, {
      scale: 0.5,
      x: -50,
      y: -20,
      r: -90,
    })
  )

  requestAnimationFrame(() => {
    playAudio(clipSrc)
    explosions.forEach((boum, i) => {
      setTimeout(() => {
        document.body.appendChild(boum)
      }, i * 100)
    })
  })
}
