// Definición de variables por las partes del DOM (Canvas, su método get Context, y el input "buscador", en ese orden)
const lienzo = document.querySelector("#logo");
const buscador = document.querySelector("#buscador");
const dibujo = lienzo.getContext("2d");
const creador = document.querySelector("#tarjeta");
const opcion = document.querySelector("#tipo");
// Constructores de la petición
const url = "https://pokemon-go1.p.rapidapi.com/";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4681d3afb8msh01f77bf23170c6cp165e4cjsn727ae7a4e705",
    "X-RapidAPI-Host": "pokemon-go1.p.rapidapi.com",
  },
};
//Constructor del objeto corrector
const corrector = {
        regex: new RegExp(/^[A-Za-z]+$/),
        msg:"Solo se permiten letras"
    }
/**
 * Metodo diseñador del logo
 */
crearLogo = () => {
  dibujo.fillStyle = "red";
  dibujo.beginPath();
  dibujo.fillRect(0, 0, 300, 145); // crea el rectángulo superior en rojo
  dibujo.closePath();
  dibujo.fillStyle = "black";
  dibujo.beginPath();
  dibujo.fillRect(0, 145, 300, 10); // crea la franja de la mitad
  dibujo.closePath();
  dibujo.beginPath();
  dibujo.arc(150, 150, 30, 0, Math.PI * 2, true); // crea el reborde negro del botón
  dibujo.fill();
  dibujo.closePath();
  dibujo.fillStyle = "white";
  dibujo.beginPath();
  dibujo.arc(150, 150, 20, 0, Math.PI * 2, true); // crea el botón en blanco
  dibujo.fill();
};

/**
 * Función que se llama al momento de pulsar el botón
 */
buscar = () => {
  let busqueda = buscador.value; // asigna los valores del input
  let op = opcion.value; // asigna los valores del desplegable de búsquedas
  let mensaje = url; // inicializa el mensaje
  if(corrector.regex.test(busqueda)){
    switch (op) { // según la opción del desplegable, construye el mensaje 0,1 o 2
        case "0":
          mensaje += `pokemon_stats.json`;
          break;
        case "1":
          mensaje += `pokemon_evolutions.json`;
          break;
        case "2":
          mensaje += `pokemon_types.json`;
          break;
      }
      try {
        fetch(mensaje, options) // construye la llamada
          .then((promesa) => promesa.text())
          .then((dato) => {
            json = JSON.parse(dato);
            console.log(json); // convierte JSON en objeto
            console.log(`mensaje: ${busqueda}`);
            buscarPorNombre(busqueda, json, op); // Realiza la búsqueda según las opciones tomadas por el usuario
          });
      } catch (error) {
        console.error(error);
      }
  }
  else{
    alert(corrector.msg); // envía mensaje de error y no permite la ejecución en caso que el usuario coloque valores no aceptados
  }  
};


/**
 * Función que realiza la búsqueda de los pokemon por nombre
 * recibe @nombre que es el nombre del pokemon
 * recibe @lista que es el envío del JSON ya tratado desde la web
 * recibe @op que es la opción tildada en la lista de búsquedas
 */
buscarPorNombre = (nombre, lista, op) => {
  let pronombre = (elemento) => elemento.pokemon_name == nombre;
  let ubicacion = lista.filter(pronombre);
  switch (op) {
    case "0":
      crearPorNombre(ubicacion);
      break;
    case "1":
      crearPorEvoluciones(ubicacion);
      break;
    case "2":
      crearPorTipo(ubicacion);
      break;
  }
  return ubicacion;
};

/**
 * Realiza la búsqueda por Nombre del pokemon y construye el mensaje
 */
crearPorNombre = (pokemon) => {
    let text="";
  for (let i of pokemon) {
    text += `<div class="card w-25 col-sm-3 mx-5">
        <div class="card-header">
            ${i.pokemon_id}
        </div>
        <div class="card-body">
            <h4 class="card-title">${i.pokemon_name}</h4>
        </div>
        <div class="card-footer text-muted row align-items-center">
            <p class="btn-danger col-5 mx-1 my-1">Ataque Base: ${i.base_attack}</p>
            <p class="btn-primary col-5 mx-1 my-1">Defensa Base: ${i.base_defense}</p>
            <p class="btn-success col-5 mx-1 my-1">PC: ${i.base_stamina}</p>
            <p class="btn-light col-5 mx-1 my-1">Región: ${i.form}</p>
        </div>
    </div>`;
  }
  tarjeta.innerHTML = text;
  return text;
};

/**
 * Realiza la búsqueda por nombre del pokemon y construye la tarjeta de cada evolución
 */
crearPorEvoluciones = (pokemon) => {
    let text = "";
    //let lista = pokemon;
    for(let i of pokemon){        
        console.log(pokemon);
        for (let j of i.evolutions) {
            text += `<div class="card w-25 col-sm-3 mx-5">
            <div class="card-header">
            ${j.pokemon_id}
            </div>
            <div class="card-body">
                <h4 class="card-title">${j.pokemon_name}</h4>
            </div>
            <div class="card-footer text-muted row align-items-center">
                <p class="btn-danger col-5 mx-1 my-1">Cantidad de caramelos para evolucionar: ${j.candy_required}</p>
                <p class="btn-light col-5 mx-1 my-1">Región: ${j.form}</p>
                </div>
                </div>`;
            }
    }
      tarjeta.innerHTML = text;
      return text;
};

/** 
 * Realiza la búsqueda por pokemon y muestra sus tipos, según si tiene uno o dos
*/
crearPorTipo = (pokemon) => {
    console.log(pokemon);
    // let color={
    //     siniestro: "black",
    //     hoja: "green",
    //     hada: "pink",
    //     acero: "darkgrey",
    //     normal: "grey",
    //     fuego: "orange",
    //     electrico: "yellow",
    //     bicho: "#c6ce00",
    //     agua: "blue",
    //     dragon: "red",
    //     lucha: "#ff6961",
    //     psiquico: "purple"
    // };
    let text="";
  for (let i of pokemon) {
        text += `<div class="card w-25 col-sm-3 mx-5">
        <div class="card-header">
        ${i.pokemon_id}
        </div>
        <div class="card-body">
        <h4 class="card-title">${i.pokemon_name}</h4>
        </div>
        <div class="card-footer text-muted row align-items-center">`
        for(let j of i.type){
            text+=`<p class="btn-danger col-5 mx-1 my-1">${i.type}</p>`
        }
        text+=`</div>
        </div>`;
    }
    tarjeta.innerHTML = text;
    return text;
  };

/**
 * Función que escucha si se escribe en el input, garantiza que la primera letra sea Mayúscula, como se requiere en la búsqueda
 */
  revisarTexto=()=>{
    let texto = buscador.value;
    if(texto.length==1&&texto.toUpperCase()!=texto){
        texto=texto.toUpperCase();
        buscador.value = texto;
    }
  }
