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
      <li class="pokemon">
              <img src="https://img.pokemondb.net/artwork/large/${pokemon.name.toLowerCase()}.jpg" alt="">
              <div>
                  <h3>
                      <span>00${pokemon.id}</span>
                      ${pokemon.name}
                  </h3>
                  <h4>Tipos:</h4>
                  <ul>
                      ${pokemon.type.map(
                        (type) =>
                          `<li class="${type.toLowerCase()}">${type.toUpperCase()}</li>`
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

  console.log(valueSelect);

  // FILTRAMOS POR NOMBRE
  const pokemonsFiltered = allPokemons.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(valueInput) &&
      (valueSelect == "" ? true : pokemon.type.includes(valueSelect))
    );
  });

  renderPokemons(pokemonsFiltered);
});
