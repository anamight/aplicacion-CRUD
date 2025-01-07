const form = document.querySelector('form');
const animeList = document.querySelector('ul');

function loadAnimes(){
    const storedAnimes = JSON.parse(localStorage.getItem('animes')) || [];
    storedAnimes.forEach(addAnimeToUI);
}

function addAnime(event) {
    event.preventDefault();

    const animeName= form.elements['anime-name'].value; 
    if (animeName === '') return;

    const anime = { id: Date.now(), name:animeName};
    addAnimeToUI(anime);
    saveAnimeToStorage(anime);
    form.reset();
}

function addAnimeToUI(anime){
    const li = document.createElement('li');
    li.textContent = anime.name;
    li.dataset.id = anime.id;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', deleteAnime);
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

form.addEventListener('submit', addAnime);

loadAnimes();