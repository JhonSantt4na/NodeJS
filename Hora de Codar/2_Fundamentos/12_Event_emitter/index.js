const EventEmitter = require('events');
const eventemitter = new EventEmitter()

eventemitter.on("start", () => {
    console.log("Durante")
})

console.log("Antes")

// Quando emitir ele chama a função
eventemitter.emit("start")

console.log("Depois");