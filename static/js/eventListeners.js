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

sendBox[0].addEventListener('keypress', () => {
    data = {
        'clientDetails': {
            'clientId': clientId,
            'clientName': clientName
        },
        'message': 'Typing...'
    }
    socket.emit('typesend', data)
})

onbeforeunload = () => {
    socket.emit('disconnection', clientId)
}

if (!msgHistory) {
    msgHistory = []
}
else {
    msgHistory = JSON.parse(msgHistory)
    msgHistory.forEach(msg => {
        createMsg(msg)
    })
}