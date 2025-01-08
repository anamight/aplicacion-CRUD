const form = document.querySelector('form');
const animeList = document.querySelector('ul');

function loadAnimes(){
    const storedAnimes = JSON.parse(localStorage.getItem('animes')) || [];
    storedAnimes.forEach(anime => {
        if (anime.name.trim()) {
            addAnimeToUI(anime);
        }
    });
}

function addAnime(event) {
    event.preventDefault();

    const animeName= form.elements['anime-name'].value; 
    const genre = form.elements['anime-genre'].value;
    const episodes = form.elements['anime-episodes'].value;
    const status = form.elements['anime-status'].value;
    const comments= form.elements['anime-comments'].value;

    if (animeName === '') return;

    const anime = {
        id: Date.now(),
        name: animeName,
        genre,
        episodes,
        status,
        comments
    };

    addAnimeToUI(anime);
    saveAnimeToStorage(anime);
    form.reset();

    cleanEmptyElements();
}

function addAnimeToUI(anime){
    if (!anime.name.trim()) return; 

    const li = document.createElement('li');
    li.innerHTML = `<strong>${anime.name}</strong><br>
                    Género: ${anime.genre}<br>
                    Episodios: ${anime.episodes}<br>
                    Estado: ${anime.status}<br>
                    Comentarios: ${anime.comments}`;
    li.dataset.id = anime.id;

    //Boton de editar
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', () => editAnime(anime, li));

    //Boton de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', deleteAnime);

    li.appendChild(editButton);
    li.appendChild(deleteButton);

    animeList.appendChild(li);
}

function saveAnimeToStorage(anime) {
    const storedAnimes= JSON.parse(localStorage.getItem('anime')) || [];
    storedAnimes.push(anime);
    localStorage.setItem('animes', JSON.stringify(storedAnimes));

}

function deleteAnime(event){
    const li = event.target.parentElement;
    const animeId = li.dataset.id;
    li.remove();

    let storedAnimes = JSON.parse(localStorage.getItem('animes')) || [];
    storedAnimes = storedAnimes.filter(anime => anime.id != animeId);
    localStorage.setItem('animes', JSON.stringify(storedAnimes));
}

 //Función para editar la lista de animes agregados
function editAnime(anime, li) {
    const editForm = document.createElement('form');

    editForm.innerHTML = `
        <input type="text" name="anime-name" value="${anime.name}" placeholder="Nombre del Anime"><br>
        <input type="text" name="anime-genre" value="${anime.genre}" placeholder="Género"><br>
        <input type="number" name="anime-episodes" value="${anime.episodes}" placeholder="Número de Episodios"><br>
        <input type="text" name="anime-status" value="${anime.status}" placeholder="Estado"><br>
        <textarea name="anime-comments" placeholder="Comentarios">${anime.comments}</textarea><br>
        <button type="button" class="save">Guardar</button>
        <button type="button" class="cancel">Cancelar</button>
    `;

    li.innerHTML = '';
    li.appendChild(editForm);

    editForm.querySelector('.save').addEventListener('click', () => {
        anime.name = editForm.elements['anime-name'].value;
        anime.genre = editForm.elements['anime-genre'].value;
        anime.episodes = editForm.elements['anime-episodes'].value;
        anime.status = editForm.elements['anime-status'].value;
        anime.comments = editForm.elements['anime-comments'].value;

        let storedAnimes = JSON.parse(localStorage.getItem('animes')) || [];
        storedAnimes = storedAnimes.map(storedAnime =>
            storedAnime.id === anime.id ? anime : storedAnime
        );
        localStorage.setItem('animes', JSON.stringify(storedAnimes));

        li.innerHTML = '';
        if (anime.name.trim()) {
        addAnimeToUI(anime);
    } else {
            li.remove(); 
        }

        cleanEmptyElements();
    });

    editForm.querySelector('.cancel').addEventListener('click', () => {
        li.innerHTML = '';
        addAnimeToUI(anime);

        cleanEmptyElements();
    });
}

function cleanEmptyElements() {
    const listItems = animeList.querySelectorAll('li');
    listItems.forEach(item => {
        if (!item.textContent.trim() || !item.querySelector('strong')) {
            item.remove();
        }
    });
}

form.addEventListener('submit', addAnime);

loadAnimes();