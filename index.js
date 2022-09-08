let login = document.querySelector("#login")
let bienvenido = document.querySelector("#bienvenido")
let user


login.addEventListener("click", () => {
    Swal.fire({
        title: 'Ingresa el nombre de usuario',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Login',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            user = login
            return fetch(`./carrito${login}.json`)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    console.log(data)
                    localStorage.setItem("carrito", JSON.stringify(data))
                })
                .catch(() => {
                    Swal.showValidationMessage(
                        `Usuario no encontrado`
                    )
                })
        },
    }).then(() => {
        login.classList.add("hidden")
        bienvenido.innerText = `¡Bienvenido ${user}!`
    })
})