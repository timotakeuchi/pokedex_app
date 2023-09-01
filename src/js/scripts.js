const pokemonRepository = (function () {
  const pkmnList = [];

  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  // Pushes each pokemon object into the JavaScript array after receiving it from the loadList function.
  function add(pokemon) {
    // Verifies is the pokemon is an object
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pkmnList.push(pokemon);
    } else {
      // Logs pokemon as incorrect if it is not an object
      console.log('pokemon is not correct');
    }
  }

  // Returns the array of Pokemon
  function getAll() {
    return pkmnList;
  }

  // Targets unordered list element, adds list item & pokemon button
  function addListItem(pokemon) {
    // Pokemon list items that connect to the unordered pokemon element
    let pokemonList = document.querySelector('.pokemon-list');
    let pkmnListItem = document.createElement('li');
    // Button features
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pkbutton', 'btn', 'btn-primary');
    // Button attributes connecting to Bootstrap
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');
    // Uses Bootstrap to size
    pkmnListItem.classList.add('list-group-item', 'mt-3');
    //Attaches list item element to untitled list element and button to list item element
    pokemonList.appendChild(pkmnListItem);
    pkmnListItem.appendChild(button);
    // Listens for button click to active showDetails function
    button.addEventListener('click', () => {
      showDetails(pokemon);
    });
  }

  // Parses api
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          // Creates an object with each Pokemon in the api
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          // Passes each Pokemon through the add function
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Uses url listed within each Pokemon object to access Pokemon details
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Accesses each pokemon's information
        item.image = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Uses loadDetails and showModal to make each pokemon image, info, button and modal visible on screen
  function showDetails(item) {
    // Access's each Pokemon's information and then stores it within modals
    loadDetails(item).then(function () {
      showModal(item);
    });
  }

  // Defined outside of any modal because it is frequently used a varies modals
  let modalContainer = document.querySelector('#modal-container');

  // Sets the modal body's location on screen and hold the Pokemon's image and information
  function showModal(item) {
    // Uses jQuery to make Bootstraps modal into a variable
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    // Empties modal body and title for new Pokemon objects to be entered in upon each click.
    modalTitle.empty();
    modalBody.empty();

    // Collects each Pokemon's information from listDetails function to fill out modal
    let nameElement = $('<h1>' + item.name + '<h1>');
    let imageElement = $('<img class="modal-img" style="width:120%">');
    imageElement.attr('src', item.image);
    let heightElement = $('<p>' + 'Height : ' + item.height + '</p>');
    let weightElement = $('<p>' + 'Weight : ' + item.weight + '</p>');

    // Created if/else statements in the case of a Pokemon with more than one type/abilites.
    let typeName;
    if (item.types.length === 1) {
      typeName = item.types[0].type.name;
    } else if (item.types.length === 2) {
      typeName = item.types[0].type.name + ', ' + item.types[1].type.name;
    }
    let typesElement = $('<p>' + 'Types: ' + typeName + '</p>');
    let abilitiesName;
    if (item.abilities.length === 1) {
      abilitiesName = item.abilities[0].ability.name;
    } else if (item.abilities.length === 2) {
      abilitiesName =
        item.abilities[0].ability.name + ', ' + item.abilities[1].ability.name;
    }
    let abilitiesElement = $('<p>' + 'Abilities : ' + abilitiesName + '</p>');

    // Appended all information into modal body
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
