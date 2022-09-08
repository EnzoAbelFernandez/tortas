let carrito = JSON.parse(localStorage.getItem("carrito")) || []
let container = document.querySelector("#container")


carrito.forEach((producto) => {
    let div = document.createElement("div")
    div.innerHTML = `
                        <section class="row me-2">
                            <div class="col-11 row">
                                <div class="col-6">
                                    <h5>Torta ${producto.id}</h6>
                                    <p>Peso: ${producto.gramos} gramos</p>
                                    <p>Cobertura: ${producto.cobertura}</p>
                                    <p>Color: ${producto.color}</p>
                                    <p>Precio: $${producto.precio}</p>
                                </div>
                                <div class="col-6">
                                    <img src=${producto.img} class="w-100">
                                </div>
                            </div>
                            <div class="col-1">
                                <button class="btn btn-danger" id="borrar${producto.id}">X</button>
                            </div>
                            <hr>
                        </section>
                        `

    container.append(div)
})
let precioTotal = 0
carrito.forEach((producto) => {
    precioTotal += Number(producto.precio)
})
let total = document.querySelector("#total")
total.innerText = `Total: $${precioTotal}`

let id = 1

for (let prod of carrito) {
    let indice = carrito.indexOf(prod) + 1
    console.log(indice);
    let borrar = document.querySelector("#borrar" + (indice).toString())
    borrar.addEventListener("click", () => {
        console.log(carrito.indexOf(prod))
        carrito.splice(carrito.indexOf(prod), 1)
        for (let prod of carrito) {
            prod.id = id
            id++
        }
        localStorage.setItem("id", carrito.length)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        window.location.reload()
        console.log(carrito)
    })
}

let comprar = document.querySelector("#comprar")
comprar.addEventListener("click", () => {
    if (carrito.length == 0) {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: "El carrito está vacío"
        })
        return
    } else {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "El total de tu compra es de $"+precioTotal,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#198754',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Comprar'
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("carrito")
                localStorage.removeItem("carritoS")
                localStorage.setItem("flag", "false")
                localStorage.removeItem("id")
                carrito = []
                window.location.reload()
            }
        })
    }
    

})

