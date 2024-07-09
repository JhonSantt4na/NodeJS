function a(){
    console.log("Execultando a()")
}
function b(){
    console.log("Execultando b()")
}
function c(){
    console.log("Execultando c()")
    a()
    b()
}


c()

// Basicamente ele garante que o codigo seja execultado
// na ordem da chamada