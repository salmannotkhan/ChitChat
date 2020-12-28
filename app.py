from flask import Flask, render_template
from datetime import datetime
from flask_socketio import SocketIO, send, emit
app = Flask(__name__)
app.config['SECRET_KEY'] = 'AFPurmxhSC06jlHwDbZzBvFs'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('send')
def message_recieved(data):
    data['timestamp'] = datetime.now().strftime('%I:%M')
    emit('recieve', data, broadcast=True)


if __name__ == '__main__':
    socketio.run(app)