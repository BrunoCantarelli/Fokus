const html = document.querySelector('html')
const focoButton = document.querySelector('.app__card-button--foco')
const descansoCurtoButton = document.querySelector('.app__card-button--curto')
const descansoLongoButton = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const title = document.querySelector('.app__title')
const timerScreen = document.querySelector('#timer')
const buttons = document.querySelectorAll('.app__card-button')
const musicFocoinput = document.getElementById('alternar-musica')
const timerButton = document.querySelector('#start-pause')
const buttonChange = document.querySelector('#start-pause span')
const imgButton = document.querySelector('.app__card-primary-butto-icon')
const music = new Audio('sons/luna-rise-part-one.mp3')
const timerSongButtonStart = new Audio('sons/play.wav')
const timerSongButtonReset = new Audio('sons/pause.mp3')
const  timeFinishSong = new Audio('sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500 // 1500s = 25min
let interval;

music.loop = true // para musicar smepre ficar tocando

musicFocoinput.addEventListener('change', () => {
    if (music.paused) {
        music.play()
    } else {
        music.pause()
    }
})

focoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoButton.classList.add('active')
})

descansoCurtoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    descansoCurtoButton.classList.add('active')
})

descansoLongoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900

    alterarContexto('descanso-longo')
    descansoLongoButton.classList.add('active')
})

music

function alterarContexto(contexto) {

    showTime()

    buttons.forEach(function (contexto) {
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)

    switch (contexto) {
        case "foco":
            title.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case "descanso-curto":
            title.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;

        case "descanso-longo":
            title.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break

        default:
            break;
    }

}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        timeFinishSong.play()
        alert('Tempo Finalizado!');
        reset()
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    showTime()
}

timerButton.addEventListener('click', startTimer)

function startTimer() {
    if (interval) {
        reset()
        return
    }
    imgButton.src = "./imagens/pause.png"
    buttonChange.innerText = 'Pausar'
    interval = setInterval(contagemRegressiva, 1000);
    timerSongButtonStart.play()
}

function reset() {
    clearInterval(interval);
    interval = null;
    imgButton.src = "/imagens/play_arrow.png"
    buttonChange.innerText = 'Começar'
    timerSongButtonReset.play()
}
function showTime() {
    const time = new Date(tempoDecorridoEmSegundos * 1000)
    const formattedTime = time.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    timerScreen.innerHTML = `${formattedTime}`
}
showTime()