let pokemonRepository = (function () {
  let pkmnList = [];
  
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pkmnList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
    // pokemonList.push(pokemon);
  }

  function getAll() {
    return pkmnList;
  }

  function addListItem(pokemon) {
    //list of variables in the function
    let pokemonList = document.querySelector('.pokemon-list');
    let pkmnListItem = document.createElement('li');
    let button = document.createElement('button');
    //button features
    button.innerText = pokemon.name;
    button.classList.add('pkbutton','btn','btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');
    pkmnListItem.classList.add('list-group-item','mt-3');
    //appending children
    pokemonList.appendChild(pkmnListItem);
    pkmnListItem.appendChild(button);
    //event listener
    button.addEventListener('click', () => {showDetails(pokemon);
    });
  }
  
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      console.log(details);
      item.image = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    loadDetails(item).then(function(){
    showModal(item);
    console.log(item);
   })
  };

  let modalContainer = document.querySelector('#modal-container');

  function showModal(item){
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    modalTitle.empty();
    modalBody.empty();
    let nameElement = $("<h1>" + item.name + "<h1>");
    let imageElement = $('<img class="modal-img" style="width:120%">');
    imageElement.attr("src", item.image);
    let heightElement = $("<p>" + "Height : " + item.height + "</p>");
    let weightElement = $("<p>" + "Weight : " + item.weight + "</p>");
    let typeName
      if(item.types.length === 1){
      typeName = item.types[0].type.name
      }else if (item.types.length === 2){
      typeName = item.types[0].type.name + ', ' + item.types[1].type.name 
      }
    let typesElement = $('<p>' + 'Types: ' + typeName + '</p>')
    let abilitiesName
      if(item.abilities.length === 1){
      abilitiesName = item.abilities[0].ability.name
      }else if (item.abilities.length === 2){
      abilitiesName = item.abilities[0].ability.name + ', ' + item.abilities[1].ability.name 
      }
    let abilitiesElement = $('<p>' + 'Abilities : ' + abilitiesName + '</p>');
    modalContainer.append(modalBody);
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
 }

  function hideModal(){
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer){
      hideModal();
    }
  })

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
