// variables 

const carrito = document.querySelector('#carrito');

const contenedorCarrito = document.querySelector('#lista-carrito tbody');

const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = []


//Funciones 

cargarEvenListeners();
function cargarEvenListeners(){

    //Cuando agregas un curso presionando "Agregar al Carrito  "

    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);


     //Muestra los cursos de Local Storage
     document.addEventListener('DOMContentLoaded',() =>{

        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
     })


    vaciarCarritoBtn.addEventListener('click', () => {

     articulosCarrito = []; // reseteamos el arreglo


     limpiarHTML (); // eliminamos todo el HTML



    })

}


function agregarCurso (e){

e.preventDefault(); // dar un id y no se suba la pagina 

if(e.target.classList.contains('agregar-carrito')) {

const cursoSeleccionado = e.target.parentElement.parentElement;

leerDatosCurso(cursoSeleccionado)
    
  }

}


//Eliminar cursos del carrrito 

function eliminarCurso(e){

    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
      
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id

        articulosCarrito = articulosCarrito.filter(curso => curso.id !==cursoId )

        carritoHTML(); // iterar sobre el carrito y mostrar su HTML

    }


}




//Leer el contenido del HTML al que le dimos click y extrae la informacion del curso 

function leerDatosCurso(curso){

    //console.log(curso);

    // crear un objeto con el contenido del curso actual
    
    const infoCurso ={

        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'), 
        cantidad: 1
    }


    //Revisa si un elemento ya existe en el carrito 

    const existe = articulosCarrito.some(curso =>  curso.id === infoCurso.id)

    if(existe){

        const cursos = articulosCarrito.map(curso => {


        if (curso.id === infoCurso.id){
    
            const evaluar = confirm('Este curso ya ha sido agregado al carrito. ¿Deseas agregarlo nuevamente?');
                if (evaluar) {
                    curso.cantidad++;

                    //Se le notifica la usurio del curso agregado
                    alert("Agregado correctamente");
                }

        return curso;

        } else{
            return curso;

        }
    } )
    articulosCarrito = [...cursos];

    } else{

     // Agregar Elementos al carrito

    articulosCarrito = [...articulosCarrito, infoCurso]

     //Se le notifica la usurio del curso agregado
     alert("Agregado correctamente");

    }

    
    console.log(articulosCarrito);

    carritoHTML()
}

//Muentra el carrito de compras en html

function carritoHTML(){

    // Limpiar el HTML
    limpiarHTML()
      

    //Mostrar el carrito y genera HTML
    articulosCarrito.forEach( curso => {

     const {imagen, titulo, precio, cantidad, id  } = curso
     const row = document.createElement('tr');
     row.innerHTML = `

        <td>
              <img src= " ${imagen} " width=100>
        </td> 
        <td>${titulo} </td> 
        <td>${precio} </td>   
        <td>${cantidad} </td>   
    
        <td>
             <a href="#" class="borrar-curso" data-id="${id}">X</a>
       </td>

     `;

      
       // Agregar el HTML del carrito en el tbody
       contenedorCarrito.appendChild(row);

       //Agregar el carrito de compras al storage
       sincronizarStorage();

    } );
}

function sincronizarStorage(){

    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}


//Elimina los cursos del tbody

function limpiarHTML(){
  //Forma lenta
// contenedorCarrito.innerHTML = '';


// forma optimizada (eliminar por padre)

while(contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
   }

}