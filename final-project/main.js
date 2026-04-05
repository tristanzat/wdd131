import { pokemonData } from "./pokemon-data.js";

const pageType = document.body.dataset.page;

function statTotal(pokemon) {
  return (
    pokemon.hp +
    pokemon.attack +
    pokemon.defense +
    pokemon.spAttack +
    pokemon.spDefense +
    pokemon.speed
  );
}

function cardMarkup(pokemon) {
  return `
    <img src="${pokemon.image}" alt="${pokemon.name} official artwork" width="240" height="240">
    <div class="card-body">
      <p class="pokemon-number">#${pokemon.id.toString().padStart(3, "0")}</p>
      <h3>${pokemon.name}</h3>
      <p class="type-row">${pokemon.types.map((type) => `<span class="chip">${type}</span>`).join("")}</p>
      <p class="description">${pokemon.description}</p>
      <dl class="stats">
        <div><dt>HP</dt><dd>${pokemon.hp}</dd></div>
        <div><dt>ATK</dt><dd>${pokemon.attack}</dd></div>
        <div><dt>DEF</dt><dd>${pokemon.defense}</dd></div>
        <div><dt>SP.A</dt><dd>${pokemon.spAttack}</dd></div>
        <div><dt>SP.D</dt><dd>${pokemon.spDefense}</dd></div>
        <div><dt>SPD</dt><dd>${pokemon.speed}</dd></div>
        <div><dt>Total</dt><dd>${statTotal(pokemon)}</dd></div>
        <div><dt>Size</dt><dd>${pokemon.height}m / ${pokemon.weight}kg</dd></div>
      </dl>
      <p class="ability-row"><strong>Abilities:</strong> ${pokemon.abilities.join(", ")}</p>
    </div>
  `;
}

function imageOnlyMarkup(pokemon) {
  return `<img class="featured-image" src="${pokemon.image}" alt="${pokemon.name} official artwork" width="320" height="320">`;
}

function initNavigation() {
  const navButton = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  if (!navButton || !nav) {
    return;
  }

  navButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navButton.setAttribute("aria-expanded", String(isOpen));
  });
}

function pickRandomPokemon() {
  const randomIndex = Math.floor(Math.random() * pokemonData.length);
  return pokemonData[randomIndex];
}

function initHomePage() {
  const featuredCard = document.getElementById("featured-card");

  if (!featuredCard) {
    return;
  }

  featuredCard.innerHTML = imageOnlyMarkup(pickRandomPokemon());
}

function filteredAndSortedPokemon(searchValue, typeValue, sortValue) {
  const searchTerm = searchValue.trim().toLowerCase();

  const filtered = pokemonData.filter((pokemon) => {
    const nameMatches = pokemon.name.toLowerCase().includes(searchTerm);
    const abilityMatches = pokemon.abilities.some((ability) =>
      ability.toLowerCase().includes(searchTerm)
    );
    const typeMatches =
      typeValue === "all" || pokemon.types.some((type) => type.toLowerCase() === typeValue);

    return (nameMatches || abilityMatches || searchTerm.length === 0) && typeMatches;
  });

  const sorters = {
    "number-asc": (a, b) => a.id - b.id,
    "number-desc": (a, b) => b.id - a.id,
    "name-asc": (a, b) => a.name.localeCompare(b.name),
    "stats-desc": (a, b) => statTotal(b) - statTotal(a)
  };

  return filtered.sort(sorters[sortValue]);
}

function populateTypeFilter(typeSelect) {
  const allTypes = [...new Set(pokemonData.flatMap((pokemon) => pokemon.types))]
    .sort((a, b) => a.localeCompare(b));

  allTypes.forEach((type) => {
    const option = document.createElement("option");
    option.value = type.toLowerCase();
    option.textContent = type;
    typeSelect.append(option);
  });
}

function initEncyclopediaPage() {
  const searchInput = document.getElementById("search");
  const typeFilter = document.getElementById("type-filter");
  const sortFilter = document.getElementById("sort-filter");
  const randomButton = document.getElementById("random-pick");
  const resultCount = document.getElementById("results-count");
  const pokemonGrid = document.getElementById("pokemon-grid");

  if (!searchInput || !typeFilter || !sortFilter || !randomButton || !resultCount || !pokemonGrid) {
    return;
  }

  populateTypeFilter(typeFilter);

  const renderPokemonList = (pokemonList) => {
    resultCount.textContent = `Showing ${pokemonList.length} Pokemon`;

    if (pokemonList.length === 0) {
      pokemonGrid.innerHTML = "<p class='empty'>No Pokemon match your search.</p>";
      return;
    }

    pokemonGrid.innerHTML = pokemonList
      .map(
        (pokemon) =>
          `<article class="pokemon-card" id="pokemon-${pokemon.id}">${cardMarkup(pokemon)}</article>`
      )
      .join("");
  };

  const render = () => {
    const pokemonList = filteredAndSortedPokemon(
      searchInput.value,
      typeFilter.value,
      sortFilter.value
    );

    renderPokemonList(pokemonList);
  };

  const chooseRandomVisible = () => {
    const currentList = filteredAndSortedPokemon(
      searchInput.value,
      typeFilter.value,
      sortFilter.value
    );

    if (currentList.length === 0) {
      return;
    }

    const randomPokemon = currentList[Math.floor(Math.random() * currentList.length)];
    renderPokemonList([randomPokemon]);
  };

  [searchInput, typeFilter, sortFilter].forEach((control) => {
    control.addEventListener("input", render);
    control.addEventListener("change", render);
  });

  randomButton.addEventListener("click", chooseRandomVisible);
  render();
}

initNavigation();

if (pageType === "home") {
  initHomePage();
}

if (pageType === "encyclopedia") {
  initEncyclopediaPage();
}