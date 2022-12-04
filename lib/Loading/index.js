import styles from "./styles.js";

const $body = document.body;

const container = document.createElement("div");
container.style = styles.container;

const spiner = document.createElement("div");
spiner.style = styles.spiner;
spiner.animate(
  [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
  { iterations: Infinity, duration: 1000 }
);

container.appendChild(spiner);

function start() {
  // if (typeof document.getElementById("LOADING-LOADING") === "object") return;

  console.log("a");
  $body.appendChild(container);
}

function end() {
  console.log("b");
  container.remove();
}

(($, win) => {
  console.log(typeof window.Loading);
  if (typeof window.Loading !== "undefined") return;

  window.Loading = {
    start,
    end,
  };
})(document, window);
