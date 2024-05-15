<template>
  <div :class="'content ' + props.widgetConfig['select-theme']">
    <div class="board" :style="`width: ${boardSize * tileSize}px`"></div>
    <div class="endscreen" v-show="endscreenContent.show">
      <span v-html="endscreenContent.message"></span>
    </div>
    <button class="btn" @click="restartGame">Restart</button>
    <button class="btn btn2" @click="SettingGame">Setting</button>
    <div class="settings" v-show="settingBtn">
      <label>Board Size:</label>
      <select id="boardSize" @change="updateBoardSize">
        <option value="10">10 x 10</option>
        <option value="15">15 x 15</option>
        <option value="20">20 x 20</option>
      </select>
      <label>Tile Size:</label>
      <select id="tileSize" @change="updateTileSize">
        <option value="25">Small</option>
        <option value="60">Medium</option>
        <option value="80">Large</option>
      </select>
      <div class="difficulty">
        <input
          type="radio"
          id="easy"
          name="difficulty"
          value="0.15"
          @click="updateBombFrequency"
        />
        <label for="easy">Easy</label>
        <input
          type="radio"
          id="medium"
          name="difficulty"
          value="0.2"
          @click="updateBombFrequency"
          checked
        />
        <label for="medium">Medium</label>
        <input
          type="radio"
          id="hard"
          name="difficulty"
          value="0.25"
          @click="updateBombFrequency"
        />
        <label for="hard">Hard</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
// 设置的类型定义
interface Props {
  widgetConfig: {
    [index: string]: any;
  };
}
// 从父组件读取配置
const props = defineProps<Props>();
console.clear();

let size = ref(10); // size x size tiles
let bombFrequency = ref(0.2); // percentage of bombs
let tileSize = ref(25);

const board = ref(null);
let tiles: any[] | NodeListOf<Element>;
let boardSize: number;

const restartBtn = ref(null);
const endscreen = ref(null);
const settingBtn = ref(false);
// settings
const boardSizeBtn = ref(null);
const tileSizeBtn = ref(null);
const difficultyBtns = ref(null);

let bombs = ref([]);
let numbers = ref([]);
let numberColors = ref([
  "#3498db",
  "#2ecc71",
  "#e74c3c",
  "#9b59b6",
  "#f1c40f",
  "#1abc9c",
  "#34495e",
  "#7f8c8d",
]);
let endscreenContent = ref({
  win: "<span>✔</span> you won!",
  loose: "💣 Booom! Game over.",
  show: false,
});

let gameOver = ref(false);
const SettingGame = () => {
  settingBtn.value = !settingBtn.value;
};
/* clear board */
const clear = () => {
  gameOver.value = false;
  bombs.value = [];
  numbers.value = [];
  endscreen.value.innerHTML = "";
  endscreen.value.classList.remove("show");
  tiles.forEach((tile: { remove: () => void }) => {
    tile.remove();
  });

  setup();
};

/* setup the game */
const setup = () => {
  for (let i = 0; i < Math.pow(size.value, 2); i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    board.value.appendChild(tile);
  }
  tiles = document.querySelectorAll(".tile");
  boardSize = Math.sqrt(tiles.length);
  board.value.style.width = boardSize * tileSize.value + "px";

  document.documentElement.style.setProperty(
    "--tileSize",
    `${tileSize.value}px`
  );
  document.documentElement.style.setProperty(
    "--boardSize",
    `${boardSize * tileSize.value}px`
  );

  let x = 0;
  let y = 0;
  tiles.forEach((tile, i) => {
    // set tile coordinates
    tile.setAttribute("data-tile", `${x},${y}`);

    // add bombs
    let random_boolean = Math.random() < bombFrequency.value;
    if (random_boolean) {
      bombs.value.push(`${x},${y}`);
      if (x > 0) numbers.value.push(`${x - 1},${y}`);
      if (x < boardSize - 1) numbers.value.push(`${x + 1},${y}`);
      if (y > 0) numbers.value.push(`${x},${y - 1}`);
      if (y < boardSize - 1) numbers.value.push(`${x},${y + 1}`);

      if (x > 0 && y > 0) numbers.value.push(`${x - 1},${y - 1}`);
      if (x < boardSize - 1 && y < boardSize - 1)
        numbers.value.push(`${x + 1},${y + 1}`);

      if (y > 0 && x < boardSize - 1) numbers.value.push(`${x + 1},${y - 1}`);
      if (x > 0 && y < boardSize - 1) numbers.value.push(`${x - 1},${y + 1}`);
    }

    x++;
    if (x >= boardSize) {
      x = 0;
      y++;
    }

    /* rightclick */
    tile.oncontextmenu = function (e: { preventDefault: () => void }) {
      e.preventDefault();
      flag(tile);
    };

    /* leftclick */
    tile.addEventListener("click", function (e) {
      clickTile(tile);
    });
  });

  numbers.value.forEach((num) => {
    let coords = num.split(",");
    let tile = document.querySelectorAll(
      `[data-tile="${parseInt(coords[0])},${parseInt(coords[1])}"]`
    )[0];
    let dataNum = parseInt(tile.getAttribute("data-num"));
    if (!dataNum) dataNum = 0;
    tile.setAttribute("data-num", dataNum + 1);
  });
};

/* flag a tile */
const flag = (tile: Element) => {
  if (gameOver.value) return;
  if (!tile.classList.contains("tile--checked")) {
    if (!tile.classList.contains("tile--flagged")) {
      tile.innerHTML = "🚩";
      tile.classList.add("tile--flagged");
    } else {
      tile.innerHTML = "";
      tile.classList.remove("tile--flagged");
    }
  }
};

/* check if bomb or not */
const clickTile = (tile: Element) => {
  settingBtn.value = false;
  if (gameOver.value) return;
  if (
    tile.classList.contains("tile--checked") ||
    tile.classList.contains("tile--flagged")
  )
    return;
  let coordinate = tile.getAttribute("data-tile");
  if (bombs.value.includes(coordinate)) {
    endGame(tile);
  } else {
    /* check if nearby bomb */
    let num = tile.getAttribute("data-num");
    if (num != null) {
      tile.classList.add("tile--checked");
      tile.innerHTML = num;
      tile.style.color = numberColors.value[num - 1];
      setTimeout(() => {
        checkVictory();
      }, 100);
      return;
    }

    checkTile(tile, coordinate);
  }
  tile.classList.add("tile--checked");
};

/* clicked the right one */
const checkTile = (tile: any, coordinate: string) => {
  console.log("✔");
  let coords = coordinate.split(",");
  let x = parseInt(coords[0]);
  let y = parseInt(coords[1]);

  /* check nearby tiles */
  setTimeout(() => {
    if (x > 0) {
      let targetW = document.querySelectorAll(`[data-tile="${x - 1},${y}"`)[0];
      clickTile(targetW, `${x - 1},${y}`);
    }
    if (x < boardSize - 1) {
      let targetE = document.querySelectorAll(`[data-tile="${x + 1},${y}"`)[0];
      clickTile(targetE, `${x + 1},${y}`);
    }
    if (y > 0) {
      let targetN = document.querySelectorAll(`[data-tile="${x},${y - 1}"]`)[0];
      clickTile(targetN, `${x},${y - 1}`);
    }
    if (y < boardSize - 1) {
      let targetS = document.querySelectorAll(`[data-tile="${x},${y + 1}"]`)[0];
      clickTile(targetS, `${x},${y + 1}`);
    }

    if (x > 0 && y > 0) {
      let targetNW = document.querySelectorAll(
        `[data-tile="${x - 1},${y - 1}"`
      )[0];
      clickTile(targetNW, `${x - 1},${y - 1}`);
    }
    if (x < boardSize - 1 && y < boardSize - 1) {
      let targetSE = document.querySelectorAll(
        `[data-tile="${x + 1},${y + 1}"`
      )[0];
      clickTile(targetSE, `${x + 1},${y + 1}`);
    }

    if (y > 0 && x < boardSize - 1) {
      let targetNE = document.querySelectorAll(
        `[data-tile="${x + 1},${y - 1}"]`
      )[0];
      clickTile(targetNE, `${x + 1},${y - 1}`);
    }
    if (x > 0 && y < boardSize - 1) {
      let targetSW = document.querySelectorAll(
        `[data-tile="${x - 1},${y + 1}"`
      )[0];
      clickTile(targetSW, `${x - 1},${y + 1}`);
    }
  }, 10);
};

/* Bomb clicked -> end game */
const endGame = (tile: {
  classList: { add: (arg0: string) => void };
  innerHTML: string;
}) => {
  console.log("💣 Booom! Game over.");
  endscreen.value.message = endscreenContent.value.loose;
  endscreen.value.show = true;
  gameOver.value = true;
  tile.classList.add("tile--checked");
  tile.classList.add("tile--bomb");
  tile.innerHTML = "💣";
  // Reveal all bombs
  bombs.value.forEach((bomb) => {
    let coords = bomb.split(",");
    let bombTile = document.querySelectorAll(
      `[data-tile="${parseInt(coords[0])},${parseInt(coords[1])}"]`
    )[0];
    bombTile.classList.add("tile--checked");
  });

  setTimeout(() => {
    endscreen.value.classList.add("show");
  }, 100);
};

/* Check if all non-bomb tiles are cleared */ const checkVictory = () => {
  let clearedTiles = document.querySelectorAll(".tile--checked");
  let totalTiles = boardSize * boardSize;
  if (clearedTiles.length === totalTiles - bombs.value.length) {
    console.log("✔ you won!");
    endscreen.value.message = endscreenContent.value.win;
    endscreen.value.show = true;
    gameOver.value = true;
  }
};

/* Restart the game */ const restartGame = () => {
  console.log("Restarting...");
  clear();
};

/* Update board size */ const updateBoardSize = (e: {
  target: { value: string };
}) => {
  size.value = parseInt(e.target.value);
};

/* Update tile size */ const updateTileSize = (e: {
  target: { value: string };
}) => {
  tileSize.value = parseInt(e.target.value);
};

/* Update bomb frequency */ const updateBombFrequency = (e: {
  target: { value: string };
}) => {
  bombFrequency.value = parseFloat(e.target.value);
};

/* Hook up events */ onMounted(() => {
  board.value = document.getElementsByClassName("board")[0];
  restartBtn.value = document.getElementsByClassName("btn")[0];
  endscreen.value = document.getElementsByClassName("endscreen")[0];
  boardSizeBtn.value = document.getElementById("boardSize");
  tileSizeBtn.value = document.getElementById("tileSize");
  difficultyBtns.value = document.getElementsByClassName("difficulty")[0];

  setup();

  restartBtn.value.addEventListener("click", restartGame);
  boardSizeBtn.value.addEventListener("change", updateBoardSize);
  tileSizeBtn.value.addEventListener("change", updateTileSize);
  Array.from(difficultyBtns.value.getElementsByTagName("input")).forEach(
    (btn) => {
      btn.addEventListener("click", updateBombFrequency);
    }
  );
});

onBeforeUnmount(() => {
  restartBtn.value.removeEventListener("click", restartGame);
  boardSizeBtn.value.removeEventListener("change", updateBoardSize);
  tileSizeBtn.value.removeEventListener("change", updateTileSize);
  Array.from(difficultyBtns.value.getElementsByTagName("input")).forEach(
    (btn) => {
      btn.removeEventListener("click", updateBombFrequency);
    }
  );
});
</script>

<style>
:root {
  --tileSize: 30px;
  --boardSize: 0px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "VT323", monospace;
}
*::selection {
  background: rgba(127, 140, 141, 0.6);
}
html {
  width: 100%;
  height: 100%;
}
body {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
}
.content.dark .btn {
  background: #080c0a;
  box-shadow: inset 0 2px 0 #080c0a, inset 0 -2px 0 #6b6b6b,
    inset 2px 0 0 #080c0a, inset -2px 0 0 #080c0a;
  text-shadow: 0 1px 0 #080c0a, 0 -1px 0 #080c0a;
}
.btn {
  background: #c9c9c9;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #969696;
  font-size: 1.5rem;
  text-transform: uppercase;
  user-select: none;
  transition: background 0.2s ease, transform 0.2s ease;
  box-shadow: inset 0 2px 0 #e7e7e7, inset 0 -2px 0 #bcbcbc,
    inset 2px 0 0 #e7e7e7, inset -2px 0 0 #bcbcbc;
  text-shadow: 0 1px 0 #efefef, 0 -1px 0 #7c7c7c;
}
.btn.btn2 {
  float: right;
}
.content.dark .btn:hover {
  background: #323232;
}

.btn:hover {
  background: #d5d5d5;
  transform: translateY(-1px);
}
.btn:active {
  background: #bcbcbc;
  transform: translateY(1px);
}
.endscreen {
  position: fixed;
  background: #e2e2e2;
  padding: 1rem 2rem;
  font-size: 40px;
  display: none;
  box-shadow: inset 0 2px 0 #e7e7e7, inset 0 -2px 0 #bcbcbc,
    inset 2px 0 0 #e7e7e7, inset -2px 0 0 #bcbcbc,
    0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 16px 32px 0 rgba(0, 0, 0, 0.2);
  text-shadow: 0 1px 0 #efefef, 0 -1px 0 #7c7c7c;
}
.endscreen.show {
  display: block;
}
.endscreen span {
  color: #2ecc71;
}
.content.dark .board {
  background: #252525;
  border: 10px solid #252525;
  box-shadow: none;
}
.board {
  background: #e2e2e2;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  border: 10px solid #d5d5d5;
  box-sizing: content-box;
  box-shadow: 0 6px 0 #bcbcbc, 0 -6px 0 #e7e7e7, 6px 0 0 #bcbcbc,
    -6px 0 0 #e7e7e7;
}

.board .tile {
  background: #e2e2e2;
  width: var(--tileSize);
  height: var(--tileSize);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(var(--tileSize) * 0.8);
  cursor: pointer;
  user-select: none;
  transition: background 0.2s ease;
  box-shadow: inset 0 2px 0 0 #fcfcfc, inset 2px 0 0 0 #fcfcfc,
    inset 0 -2px 0 0 #c9c9c9, inset -2px 0 0 0 #c9c9c9;
}
.board .tile:hover:not(.tile--checked) {
  background: #efefef;
}
.content.dark .board .tile:hover:not(.tile--checked) {
  background: #000000;
}
.board .tile--checked {
  background: #d5d5d5;
  box-shadow: inset 0 1px 0 0 #c9c9c9, inset 1px 0 0 0 #c9c9c9,
    inset 0 -1px 0 0 #c9c9c9, inset -1px 0 0 0 #c9c9c9;
}

.content.dark .tile {
  background: #252525;
  box-shadow: inset 0 2px 0 0 #2d2d2d, inset 2px 0 0 0 #2d2d2d,
    inset 0 -2px 0 0 #191919, inset -2px 0 0 0 #191919;
}

.content.dark .tile--checked {
  background: #3e3e3e;
  box-shadow: inset 0 1px 0 0 #191919, inset 1px 0 0 0 #191919,
    inset 0 -1px 0 0 #191919, inset -1px 0 0 0 #191919;
}
.board .tile--checked.tile--bomb:before,
.board .tile--checked.tile--bomb:after {
  opacity: 1;
}
.board .tile--checked:hover {
  cursor: default;
}
.board .tile--bomb {
  font-size: calc(var(--tileSize) * 0.5);
}
.board .tile--flagged {
  font-size: calc(var(--tileSize) * 0.5);
}
.content.dark .settings {
  color: #b5b5b5;
}
.settings {
  backdrop-filter: blur(1px);
  position: fixed;
  left: 30%;
  top: 30%;
  background: rgba(84, 84, 84, 0.5);
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.settings label {
  font-size: 1.2rem;
}
</style>
