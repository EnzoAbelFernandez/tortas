document.querySelector("#xd").addEventListener("click", (e) => {
    e.preventDefault()
    console.log(carrito)
    console.log(flag);
})
function filtro(num) {
    if (Math.sign(num)) {
        return num
    } else {
        return 0
    }
}

let coberturas = [{

}, {
    nombre: "Crema Chantilly",
    precio: 100
}, {
    nombre: "Buttercream",
    precio: 200
}, {
    nombre: "Fondant",
    precio: 300
}]

function preview(col, cob) {
    tortaPreview.innerHTML = `<img src="images/${cob}${col}.png" alt="">`
}

let gramosPreview = document.getElementById("gramosnum")
let formulario = document.getElementById("formulario")
let personasInput = document.getElementById("input-personas")
let coberturaInput = document.getElementById("cob-select")
let colorInput = document.querySelector("#color-select")
let precioTorta = 0
let precioDis = document.getElementById("precioDis")
let tortaPreview = document.querySelector("#tortaPreview")
let color
let cobertura

colorInput.addEventListener("input", () => {
    color = colorInput.value
    preview(color, cobertura)
})
coberturaInput.addEventListener("input", () => {
    cobertura = coberturaInput.value
    preview(color, cobertura)
})
formulario.addEventListener("input", () => {
    let gramos = filtro(personasInput.value) * 100
    let cobertura = Number(coberturaInput.value)
    gramosPreview.innerText = gramos
    precioTorta = gramos * 5 + coberturas[cobertura].precio
    precioDis.innerText = filtro(precioTorta)
})
personasInput.addEventListener("input", () => {
    Math.sign(personasInput.value) != 1 ? personasInput.classList.add("error") : personasInput.classList.remove("error")
})
let id = Number(localStorage.getItem("id")) || 0
console.log("antes" + id);
carrito = JSON.parse(localStorage.getItem("carrito")) || []
formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    if ((Math.sign(personasInput.value) != 1) || (Math.sign(coberturaInput.value) != 1)) {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: "Ingresa valores válidos"
        })
        return
    }
    if (Math.sign(personasInput.value) != 1) {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: "Ingresa un valor válido de personas"
        })
        return
    }
    id++
    console.log("despues" + id);
    let gramos = personasInput.value * 100
    let coberturaI = coberturaInput.value
    let precio = precioTorta
    let torta = {
        id,
        gramos,
        cobertura: coberturas[coberturaI].nombre,
        color,
        img: `images/${cobertura}${color}.png`,
        precio
    }
    carrito.push(torta)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    localStorage.setItem("id", id)
    personasInput.value = null
    coberturaInput.value = "error"
    precioDis.innerText = 0
    gramosPreview.innerText = 0
    localStorage.setItem("flag", "1")
    Swal.fire({
        icon: 'success',
        title: '¡Torta agregada al carrito!',
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 2000
    })
})