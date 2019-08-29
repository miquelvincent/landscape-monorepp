
import io from 'socket.io-client'

const socket = io('http://localhost:8200', {})

socket.on('Data', msg => {
  console.log(msg)
})
