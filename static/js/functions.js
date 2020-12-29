function createMsg(data) {
    var msgBubble = document.createElement('div')
    msgBubble.classList.add('msgBubble')
    if (clientId == data.clientDetails.clientId){
        msgBubble.classList.add('msgSent')
    }
    else {
        msgBubble.classList.add('msgRecieved')
        if (data.message != 'Typing...') {
            if (msgHistory[msgHistory.indexOf(data) - 1].clientDetails.clientId != data.clientDetails.clientId) {
                var msgName = document.createElement('div')
                msgName.innerHTML = data.clientDetails.clientName
                msgName.classList.add('name')
                msgBubble.append(msgName)
            }
        }
    }
    if (data.message == 'Typing...') {
        msgBubble.innerHTML = data.clientDetails.clientName + ' Typing...'
        msgBubble.classList.add('typing')
        if (chatBox.lastElementChild) {
            if (chatBox.lastElementChild.innerHTML != data.clientDetails.clientName + ' Typing...') {
                chatBox.append(msgBubble)
                return msgBubble
            }
            else {
                return chatBox.lastElementChild
            }
        }
        else {
            chatBox.appendChild(msgBubble)
            return msgBubble
        }
    }
    else {
        msgBubble.innerHTML += data.message
        msgBubble.innerHTML += data.timestamp.small()
        chatBox.append(msgBubble)
        window.scrollBy(0, 100)
        return msgBubble
    }
}

function clearHistory() {
    if (confirm('This is will clear all the chat history')) {
        msgHistory = []
        localStorage.setItem('msgHistory', JSON.stringify(msgHistory))
        window.location.reload(false)
    }
}

function setName() {
    newName = prompt('Enter your name:')
    if (!globalThis.clientName && !newName){
        while (!newName || newName == ''){
            newName = prompt('Enter your name(Don\'t try to be oversmart enter your proper name):')
        }
    }
    if (newName) {
        name.innerHTML = newName + '\'s Lair'
        globalThis.clientName = newName
    }   
    localStorage.setItem('clientName', clientName)
}