const sendBox = document.querySelector('.send').children
const chatBox = document.querySelector('.history')
const darkBtn = document.querySelector('.header img')
var socket = io()
clientId = localStorage.getItem('clientId') 
clientName = localStorage.getItem('clientName')

if (!clientId) {
    clientId = Math.floor(Math.random() * 10000000000000001)
    localStorage.setItem('clientId', clientId)
    console.log(clientId)
}

if (!clientName) {
    clientName = prompt('Enter your name:')
    while (clientName == ''){
        clientName = prompt('Enter your name(Don\'t try to be oversmart enter your proper name):')
    }
    localStorage.setItem('clientName', clientName)
}

function darkMode() {
    status = document.querySelector("body").classList.toggle("dark")
    localStorage.setItem("darkmode", status)
    if (status == "true") {
        darkBtn.src = "static/images/sun-icon.webp"
        return status
    }
    darkBtn.src = "static/images/moon-icon.webp"
    return status
}

if (localStorage.getItem('darkmode') == "true") {
    darkMode()
}

socket.on('recieve', (data) => {
    var msgBubble = document.createElement('div')
    msgBubble.classList.add('msgBubble')
    msgBubble.innerHTML = data.message
    msgBubble.innerHTML += data.timestamp.small()
    if (clientId == data.clientDetails.clientId){
        msgBubble.classList.add('msgSent')
    }
    else {
        var msgName = document.createElement('div')
        msgBubble.classList.add('msgRecieved')
        msgName.innerHTML = data.clientDetails.clientName + ':'
        msgName.classList.add('name')
        msgBubble.prepend(msgName)
    }
    chatBox.append(msgBubble)
    console.log(data)
    window.scrollBy(0, 100)
})

sendBox[1].addEventListener('click', () => {
    hours = new Date().toLocaleTimeString()
    if (sendBox[0].value != ''){
        data = {
            'clientDetails': {
                'clientId': clientId,
                'clientName': clientName
            },
            'message': sendBox[0].value
        }
        socket.emit('send', data)
        sendBox[0].value = ''
    }
})