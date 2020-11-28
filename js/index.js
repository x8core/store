let u = {}
u.f = {}

let p = new Plyr('#player', {});
//let p = document.getElementById('player')
p.volume = 0.4

let playingTrack

let info = document.getElementById('info')

let get = (name) => {
  let nameEQ = name + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
let uuid = () => {
  function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

let playTrack = (dom) => {
  if (playingTrack) playingTrack.style.background = null
  playingTrack = dom
  playingTrack.style.background = '#00b3ff'

  info.innerText = playingTrack.innerText
  p.source = {type: 'audio', sources: [{src: dom.innerText}] };
  p.play()
}

(async() => {
  let list = await fetch('list.json')
  list = await list.json()
  console.log(list.length)

  for (let i = 0; i < list.length; i++) {
    let dom = document.createElement('a')
    dom.setAttribute('href', list[i])
    dom.style.display = 'block'; dom.style.color = 'black'
    dom.innerText = list[i]
    dom.addEventListener('click', (e) => {
      e.preventDefault()
      playTrack(dom)
      p.on('ended', (e) => playTrack(playingTrack.nextElementSibling))
    })

    document.body.appendChild(dom)
  }
})()