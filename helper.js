const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
        console.log(div)
    }
    else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        if (id == 'presupuesto') {
            if (input.value < 1000000) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El presupuesto minimo es de $1000000</span>'

            }
        }
        if (id === 'codigo') {
            if (input.value.length !== 8) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">El código de barra requiere 8 caracteres</span>';
            }
        }
        }
    }
       
const limpiar = () => {
        document.querySelector('form').reset()
        document.querySelectorAll('.form-control').forEach(item => {
            item.classList.remove('is-valid')
            item.classList.remove('is-invalid')
        })
        document.querySelectorAll('.form-check-input').forEach(items => {
            items.classList.remove('is-valid')
            items.classList.remove('is-invalid')
        })
}

const soloNumeros = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57)
        return true
    return false
}

const validarDuracion = (duracion) => {
        if (duracion >= 60 && duracion <= 150) 
                return true
            else 
                return false
}


const validarradio = () => {
    const opiniones = document.getElementsByName('radiostacked')
    let elegir = false

    opiniones.forEach(radio => {
        if (radio.checked) {
            radio.classList.add('is-valid')
            radio.classList.remove('is-invalid')
            elegir = true
        } else {
            radio.classList.add('is-invalid')
            radio.classList.remove('is-valid')
        }
    })

    if (elegir) {
        opiniones.forEach(radio => {
            radio.classList.remove('is-invalid')
        })
    }
}

const rangopunt = document.getElementById('rangopunt')
rangopunt.innerHTML = 4

document.getElementById('rango').addEventListener('input', () => {
    rangopunt.innerHTML = document.getElementById('rango').value
})

function limitarCaracteres(input) {
    if (input.value.length > 8) {
        input.value = input.value.slice(0, 8);
    }
}