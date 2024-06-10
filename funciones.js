import { eliminar, getData, obtener, save, update} from "./firebase.js"

let id = 0
document.getElementById('btnGuardar').addEventListener('click', async () => {
    validarradio()
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            const pelicula = {
                'codigo': document.getElementById('codigo').value,
                'nombre': document.getElementById('nombre').value.trim(),
                'genero': document.getElementById('genero').value.trim(),
                'duracion': document.getElementById('duracion').value,
                'rango': document.getElementById('rango').value,
                'presupuesto': document.getElementById('presupuesto').value,
                'radiostacked': document.querySelector('input[name="radiostacked"]:checked').value,
                'apto': document.querySelector('input[name="apto"]:checked').value
            }
            const cambio = await save(pelicula)
            if(!cambio){
                Swal.fire({
                    title: "Error",
                    text: "El codigo ya fue ingresado",
                    icon: "error"
                })
            } else {
                Swal.fire({
                    title: "Enviado",
                    text: "Agregado con exito",
                    icon: "success"
                }).then(() => {
                    limpiar()
                })
            }
        }else{
            const pelicula = {
                'codigo': document.getElementById('codigo').value,
                'nombre': document.getElementById('nombre').value.trim(),
                'genero': document.getElementById('genero').value.trim(),
                'duracion': document.getElementById('duracion').value,
                'rango': document.getElementById('rango').value,
                'presupuesto': document.getElementById('presupuesto').value,
                'radiostacked': document.querySelector('input[name="radiostacked"]:checked').value,
                'apto': document.querySelector('input[name="apto"]:checked').value
            }
            update(id,pelicula)
            limpiar()
            id = 0
        }
    }
})
window.addEventListener('DOMContentLoaded', () => {
    getData((collection) => {
        let tabla = '';

        collection.forEach((doc) => {
            const item = doc.data();
            tabla += `<tr>
            <td>${item.codigo}</td>
            <td>${item.nombre}</td>
            <td>${item.genero}</td>
            <td>${item.duracion}</td>
            <td>${item.rango}</td>
            <td>${item.presupuesto}</td>
            <td>${item.radiostacked}</td>
            <td>${item.apto}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        eliminar(btn.id)
                        Swal.fire({
                            title: "Eliminado",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })

        document.querySelectorAll('.btn-warning').forEach( btn => {
            btn.addEventListener('click',async() =>{
                const doc = await obtener(btn.id)
                const d = doc.data()
                document.getElementById('codigo').value = d.codigo
                document.getElementById('nombre').value = d.nombre
                document.getElementById('genero').value = d.genero
                document.getElementById('duracion').value = d.duracion
                document.getElementById('rango').value = d.rango
                document.getElementById('presupuesto').value = d.presupuesto
                document.getElementById('radiostacked').value = d.radiostacked
                document.getElementById('apto').value = d.apto
                document.getElementById('btnGuardar').value = 'Modificar'
                id = btn.id
            })
        })

    })
})