const sendBox = document.querySelector('.send').children
const chatBox = document.querySelector('.history')
const onlineCounter = document.querySelector('.header .online')
const darkBtn = document.querySelector('.header .darkimg')
const name = document.querySelector('.header .name')
var clientId = localStorage.getItem('clientId')
var clientName = localStorage.getItem('clientName')
var msgHistory = localStorage.getItem('msgHistory')
var typing = setTimeout(1)
var socket = io()

if (!clientId) {
    clientId = Math.floor(Math.random() * 10000000000000001)
    localStorage.setItem('clientId', clientId)
}

if (!clientName) {
    setName()
}
else {
    name.innerHTML = clientName + '\'s Lair'
}

socket.emit('connection', clientId)

socket.on('recieve', (data) => {
    msgHistory.push(data)
    createMsg(data)
    localStorage.setItem('msgHistory', JSON.stringify(msgHistory))
})

socket.on('connected', (counter) => {
    onlineCounter.innerHTML = counter + ' Online'
})

socket.on('disconnected', (counter) => {
    onlineCounter.innerHTML = counter + ' Online'
})

socket.on('typerecieve', (data) => {
    if (clientId != data.clientDetails.clientId) {
        msgToRemove = createMsg(data)
        clearTimeout(typing)
        console.log(data)
        typing = setTimeout(()=> {
            msgToRemove.remove()
        }, 800)
    }
})