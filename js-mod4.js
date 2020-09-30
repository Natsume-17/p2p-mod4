// MODELO DE DATOS
let mis_peliculas_iniciales = [
    { titulo: "Superlópez", director: "Javier Ruiz Caldera", miniatura: "files/superlopez.png" },
    { titulo: "Jurassic Park", director: "Steven Spielberg", miniatura: "files/jurassicpark.png" },
    { titulo: "Interstellar", director: "Christopher Nolan", miniatura: "files/interstellar.png" }
];

localStorage.mis_peliculas = localStorage.mis_peliculas || JSON.stringify(mis_peliculas_iniciales);
let mis_peliculas = mis_peliculas_iniciales;

// VISTAS
const indexView = (peliculas) => {
    let i = 0;
    let view = "";
    while (i < peliculas.length) {
        view += `
        <div class="movie">
           <div class="movie-img">
                <img data-my-id="${i}" src="${peliculas[i].miniatura}" onerror="this.src='files/placeholder.png'"/>
           </div>
           <div class="title">
               ${peliculas[i].titulo || "<em>Sin título</em>"}
           </div>
           <div class="actions">
               <button class="show" data-my-id="${i}">ver</button>
               <button class="edit" data-my-id="${i}">editar</button>
               <button class="delete" data-my-id="${i}">borrar</button>
            </div>
        </div>\n`;
        i = i + 1;
    };

    view += `<div class="actions">
               <button class="new">añadir</button>
               <button class="reset">reset</button>
            </div>`;

    return view;
};

const editView = (i, pelicula) => {
    return `<h2>Editar película</h2>
        <div class="field">
            Título<br>
            <input type="text" id="titulo" placeholder="Título" value="${pelicula.titulo}">
        </div>
        <div class="field">
            Director/a<br>
            <input type="text" id="director" placeholder="Director/a" value="${pelicula.director}">
        </div>
        <div class="field">
            Miniatura<br>
            <input type="text" id="miniatura" placeholder="URL de la miniatura" value="${pelicula.miniatura}">
        </div>
        <div class="actions">
            <button class="update" data-my-id="${i}">actualizar</button>
            <button class="index">volver</button>
        </div>`;
}

const showView = (pelicula) => {
    return `<p>La película <strong>${pelicula.titulo}</strong> fue dirigida por <strong>${pelicula.director}</strong>.</p>
     <div class="actions">
        <button class="index">volver</button>
     </div>`;
}

const newView = () => {
    return `<h2>Crear película</h2>
        <div class="field">
            Título<br>
            <input type="text" id="titulo" placeholder="Título">
        </div>
        <div class="field">
            Director/a<br>
            <input type="text" id="director" placeholder="Director/a">
        </div>
        <div class="field">
            Miniatura<br>
            <input type="text" id="miniatura" placeholder="URL de la miniatura">
        </div>
        <div class="actions">
            <button class="create">crear</button>
            <button class="index">volver</button>
        </div>`;
}

// CONTROLADORES 
const indexContr = () => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    document.getElementById('main').innerHTML = indexView(mis_peliculas);
};

const showContr = (i) => {
    let pelicula = JSON.parse(localStorage.mis_peliculas)[i];
    document.getElementById('main').innerHTML = showView(pelicula);
};

const newContr = () => {
    document.getElementById('main').innerHTML = newView();
};

const createContr = () => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    let nueva_pelicula = {};
    nueva_pelicula.titulo = document.getElementById('titulo').value;
    nueva_pelicula.director = document.getElementById('director').value;
    nueva_pelicula.miniatura = document.getElementById('miniatura').value;
    mis_peliculas.push(nueva_pelicula);
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
    indexContr();
};

const editContr = (i) => {
    let pelicula = JSON.parse(localStorage.mis_peliculas)[i];
    document.getElementById('main').innerHTML = editView(i, pelicula);
};

const updateContr = (i) => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    mis_peliculas[i].titulo = document.getElementById('titulo').value;
    mis_peliculas[i].director = document.getElementById('director').value;
    mis_peliculas[i].miniatura = document.getElementById('miniatura').value;
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
    indexContr();
};

const deleteContr = (i) => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    let eleccion = Boolean;
    confirm("¿Quieres borrar la película?");
    eleccion = true;
    if (eleccion === true) {
        mis_peliculas.splice(i, 1);
        localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
    }
    indexContr();
};

const resetContr = () => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
	mis_peliculas = mis_peliculas_iniciales;
	localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
    indexContr();
};

// ROUTER de eventos
const matchEvent = (ev, sel) => ev.target.matches(sel); // simplifica código en if - else if 
const myId = (ev) => Number(ev.target.dataset.myId); // simplifica código en parámetro de llamada a función

document.addEventListener('click', ev => {
    if (matchEvent(ev, '.index')) indexContr(); // botones 'volver'
    else if (matchEvent(ev, '.show')) showContr(myId(ev)); // botones 'ver'
    else if (matchEvent(ev, '.edit')) editContr(myId(ev)); // botones 'editar'
    else if (matchEvent(ev, '.update')) updateContr(myId(ev)); // botón 'actualizar'
    else if (matchEvent(ev, '.new')) newContr(); // botón 'añadir'
    else if (matchEvent(ev, '.create')) createContr(); // botón 'crear'
    else if (matchEvent(ev, '.delete')) deleteContr(myId(ev)); // botones 'borrar'
    else if (matchEvent(ev, '.reset')) resetContr(); // botón 'reset'
});

// Inicialización        
document.addEventListener('DOMContentLoaded', indexContr);