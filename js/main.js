const pokemonTypes = [
  "Steel",
  "Water",
  "Bug",
  "Dragon",
  "Electric",
  "Ghost",
  "Fire",
  "Fairy",
  "Ice",
  "Fighting",
  "Normal",
  "Grass",
  "Psychic",
  "Rock",
  "Dark",
  "Ground",
  "Poison",
  "Flying",
];

const allPokemons = await fetch("https://server-api-pokemon.onrender.com")
  .then((res) => res.json())
  .then((pokemons) => pokemons);

const listPokemons = document.getElementById("list-pokemons");

const renderPokemons = (pokemons) => {
  listPokemons.textContent = "";

  if (pokemons.length == 0) {
    listPokemons.innerHTML = "<h1>No se encontraron Pokemones!</h1>";
    return true;
  }

  pokemons.map((pokemon) => {
    const item = `
      <li class="pokemon" id="${pokemon.id}">
              <img src="https://img.pokemondb.net/artwork/large/${pokemon.name.toLowerCase()}.jpg" alt="">
              <div>
                  <h3>
                      <span class="pk-id">00${pokemon.id}</span>
                      ${pokemon.name}
                  </h3>
                  <h4>Tipos:</h4>
                  <ul>
                      ${pokemon.type.map(
                        (type) =>
                          `<li class="type ${type.toLowerCase()}">${type.toUpperCase()}</li>`
                      )}
                  </ul>
              </div>  
            </li>
      `;
    listPokemons.insertAdjacentHTML("beforeend", item);
  });
};

renderPokemons(allPokemons);

const selectFilter = document.getElementById("filter-select");
pokemonTypes.forEach((type) => {
  const item = `
    <option value="${type}">${type}</option>
  `;
  selectFilter.insertAdjacentHTML("beforeend", item);
});

// EVITAMOS EL ENVIO DEL FORMULARIO
const formFilter = document.getElementById("filter-form");
formFilter.addEventListener("submit", (e) => e.preventDefault());

// MANEJAMOS EL EVENTO CUANDO CAMBIA UN VALOR DEL FORMULARIO
formFilter.addEventListener("change", (e) => {
  const valueInput = formFilter.filterName.value.toLowerCase();
  const valueSelect = formFilter.filterType.value;

  // FILTRAMOS POR NOMBRE
  const pokemonsFiltered = allPokemons.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(valueInput) &&
      (valueSelect == "" ? true : pokemon.type.includes(valueSelect))
    );
  });

  renderPokemons(pokemonsFiltered);
});

const modal = document.getElementById("modal");

const idTag = document.getElementById("info-id");
const nameTag = document.getElementById("info-name");
const imgTag = document.getElementById("info-img");
const typeTag = document.getElementById("info-types");
const weakTag = document.getElementById("info-w-types");
const resiTag = document.getElementById("info-r-types");

const hpSpan = document.getElementById("sp-hp");
const attSpan = document.getElementById("sp-att");
const defSpan = document.getElementById("sp-def");
const sattSpan = document.getElementById("sp-satt");
const sdefSpan = document.getElementById("sp-sdef");
const spdSpan = document.getElementById("sp-spd");

listPokemons.addEventListener("click", (e) => {
  if (e.target != listPokemons) {
    const liPokemon = e.target.closest(".pokemon");
    const id = liPokemon.id;

    const { name, type, stats, weaknesses, resistances } = allPokemons.find(
      (pk) => pk.id == id
    );

    idTag.textContent = `00${id}`;
    nameTag.textContent = name;
    imgTag.setAttribute(
      "src",
      `https://img.pokemondb.net/artwork/large/${name.toLowerCase()}.jpg`
    );

    const { hp, attack, defense, specialAttack, specialDefense, speed } = stats;

    [
      [typeTag, type],
      [weakTag, weaknesses],
      [resiTag, resistances],
    ].forEach((lst) => {
      const [tag, value] = lst;
      tag.textContent = "";
      value.forEach((type) => {
        const item = `
          <li class="type ${type.toLowerCase()}">${type.toUpperCase()}</li>
        `;
        tag.insertAdjacentHTML("beforeend", item);
      });
    });

    [
      [hpSpan, hp],
      [attSpan, attack],
      [defSpan, defense],
      [sattSpan, specialAttack],
      [sdefSpan, specialDefense],
      [spdSpan, speed],
    ].forEach(([tag, value]) => {
      tag.textContent = value;
    });

    modal.classList = "pokemon-attrs active";
  }
});

const iconClose = document.getElementById("icon-close");
iconClose.addEventListener("click", () => {
  modal.classList = "pokemon-attrs";
});
