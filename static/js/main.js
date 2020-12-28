const sendBox = document.querySelector('.send').children
const chatBox = document.querySelector('.history')
var socket = io()

clientId = localStorage.getItem('clientId') 
if (!clientId) {
    clientId = Math.floor(Math.random() * 10000000000000001)
    localStorage.setItem('clientId', clientId)
    console.log(clientId)
}

socket.on('recieve', (data) => {
    var msgBubble = document.createElement('div')
    if (clientId == data.clientId){
        msgBubble.classList.add('msgSent')
    }
    else {
        msgBubble.classList.add('msgRecieved')
    }
    msgBubble.innerHTML = data.message
    chatBox.append(msgBubble)
    console.log(data)
})

sendBox[1].addEventListener('click', () => {
    socket.emit('send', {'message': sendBox[0].value, 'clientId': clientId})
})