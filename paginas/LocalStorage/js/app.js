//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


//Event Listeners

eventListeners();
function eventListeners(){

    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo 
    document.addEventListener('DOMContentLoaded', () =>{
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    console.log(tweets);
    
    crearHTML();

    });


}


//Funciones

function agregarTweet(e){

    e.preventDefault();
    
    //TextArea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //validacion 
    if(tweet === '' ){
        mostrarError('Un mensaje no puede ir vacio');
        return; //evita que se ejecute mas lineas de codigo 
    }


    const tweetObj ={

        id: Date.now(),
        tweet // es igual a texto: tweet
    }

    //Mostrar tweets

    tweets = [...tweets, tweetObj];

  //Una vez agregado creamos el HTML
  crearHTML();

  //Reiniciar o limpiar el formulario
  formulario.reset();

}

    //Mostrar mensaje de error

    function mostrarError(error){

        const mensajeError = document.createElement('p');
        mensajeError.textContent = error;
        mensajeError.classList.add('error'); // diseño css

        //Insertarlo en el contenido
        const contenido = document.querySelector('#contenido');
        contenido.appendChild(mensajeError);


        //  Elimina el mensaje de error despues de 3 seg

            setTimeout (() => {
            mensajeError.remove();            
        }, 3000);
}

function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach( tweet => {

            //Agregar boton eleminar tweets
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añador la funcion eliminar
            btnEliminar.onclick =()=>{
               borrarTweet(tweet.id);
            }

            //crear el HTML
            const li = document.createElement('li');

            li.innerText = tweet.tweet;

            //Asignar el boton borrar al texto
            li.appendChild(btnEliminar);

            //insertar en la lista vacia en el HTML
            listaTweets.appendChild(li);

        });
      
    }

    sincronizarStorage();

}

//Agrega los tweets actuales al LocalStorage
function sincronizarStorage() {
  localStorage.setItem('tweets', JSON.stringify(tweets));
}


//Elimina tweet
function borrarTweet(id){

    tweets = tweets.filter(tweet => tweet.id != id);

    crearHTML();
}

//Limpiar HTML
function limpiarHTML(){
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}