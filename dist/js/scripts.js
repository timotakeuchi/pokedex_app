const pokemonRepository = (function () {
  let t = [];
  function e() {
    return t;
  }
  return (
    document.querySelector('#modal-container'),
    {
      getAll: e,
      addListItem: function t(e) {
        let i = document.querySelector('.pokemon-list'),
          n = document.createElement('li'),
          a = document.createElement('button');
        (a.innerText = e.name),
          a.classList.add('pkbutton', 'btn', 'btn-primary'),
          a.setAttribute('data-toggle', 'modal'),
          a.setAttribute('data-target', '#modal-container'),
          n.classList.add('list-group-item', 'mt-3'),
          i.appendChild(n),
          n.appendChild(a),
          a.addEventListener('click', () => {
            (function t(e) {
              var i;
              fetch((i = e).detailsUrl)
                .then(function (t) {
                  return t.json();
                })
                .then(function (t) {
                  (i.image = t.sprites.front_default),
                    (i.height = t.height),
                    (i.weight = t.weight),
                    (i.types = t.types),
                    (i.abilities = t.abilities);
                })
                .catch(function (t) {
                  console.error(t);
                })
                .then(function () {
                  var t;
                  let i, n, a, o, p, l, r, s, c, m;
                  (t = e),
                    (i = $('.modal-body')),
                    (n = $('.modal-title')),
                    n.empty(),
                    i.empty(),
                    (a = $('<h1>' + t.name + '<h1>')),
                    (o = $('<img class="modal-img" style="width:120%">')),
                    o.attr('src', t.image),
                    (p = $('<p>Height : ' + t.height + '</p>')),
                    (l = $('<p>Weight : ' + t.weight + '</p>')),
                    1 === t.types.length
                      ? (r = t.types[0].type.name)
                      : 2 === t.types.length &&
                        (r =
                          t.types[0].type.name + ', ' + t.types[1].type.name),
                    (s = $('<p>Types: ' + r + '</p>')),
                    1 === t.abilities.length
                      ? (c = t.abilities[0].ability.name)
                      : 2 === t.abilities.length &&
                        (c =
                          t.abilities[0].ability.name +
                          ', ' +
                          t.abilities[1].ability.name),
                    (m = $('<p>Abilities : ' + c + '</p>')),
                    n.append(a),
                    i.append(o),
                    i.append(p),
                    i.append(l),
                    i.append(s),
                    i.append(m);
                });
            })(e);
          });
      },
      loadList: function e() {
        return fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
          .then(function (t) {
            return t.json();
          })
          .then(function (e) {
            e.results.forEach(function (e) {
              var i;
              'object' == typeof (i = { name: e.name, detailsUrl: e.url }) &&
              'name' in i &&
              'detailsUrl' in i
                ? t.push(i)
                : console.log('pokemon is not correct');
            });
          })
          .catch(function (t) {
            console.error(t);
          });
      },
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
