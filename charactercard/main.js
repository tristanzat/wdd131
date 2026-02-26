const stats = {
  class: "Swamp Beast Diplomat",
  level: 5,
  health: 100,

  attacked: function () {
    if (this.health <= 0) {
      alert("Character Died");
    } else {
      this.health -= 20;
    }
    renderStats();
  },

  levelUp: function () {
    this.level++;
    renderStats();
  },
};

function statsTemplate() {
  return `<p><strong>Class: </strong>${stats.class}</p>
        <p><strong>Level: </strong>${stats.level}</p>
        <p><strong>Health: </strong>${stats.health}</p>`;
}

function renderStats() {
  document.querySelector(".stats").innerHTML = statsTemplate();
}

renderStats();

document.querySelector("#attack").addEventListener("click", function () {
  stats.attacked();
});

document.querySelector("#level-up").addEventListener("click", function () {
  stats.levelUp();
});
