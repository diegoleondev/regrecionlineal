const rootStyle = getComputedStyle(document.documentElement);

const COLORS = {
  danger: rootStyle.getPropertyValue("--danger") || "#f0f",
  info: rootStyle.getPropertyValue("--info") || "#f0f",
  success: rootStyle.getPropertyValue("--success") || "#f0f",
  warning: rootStyle.getPropertyValue("--warning") || "#f0f",
  text: rootStyle.getPropertyValue("--text") || "#f0f",
  secondary: rootStyle.getPropertyValue("--secondary") || "#f0f",
};

const ANIMATIONS = {
  HIDE: [{ opacity: 1 }, { opacity: 0 }],
  SHOW: [{ opacity: 0 }, { opacity: 1 }],
};

const container = document.createElement("div");
container.id = "popupaMessage";
container.style = `
    width: 90%;
    max-width: 500px;
    height: 50px;

    display: none;
    flex-direction: column;
    justify-content: space-between;

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    margin: auto;
    margin-bottom: 10vh;
`;

const embedStyle = `
    width: 100%;
    max-width: 500px;
    height: auto;
    display: inline-block;
    padding: 0.5em 0.5em 0.5em 1em;
    font-weight: 600;
    color: var;
    border-radius: 0em 0.4em 0.4em 0;
    background: #fff;

`;

const cache = [];
const $popup =
  document.getElementById("popup") || document.body.appendChild(container);

// -----------------------------------------------------------------------------
(function (win, doc) {
  function toCreate(type, messaage) {
    let height = 0;

    $popup.style.display = "flex";

    const embed = document.createElement("span");
    embed.id = "aa";
    embed.style = embedStyle;
    embed.innerText = messaage;
    embed.style.boxShadow = `inset 0.5em 0em 0em 0em ${COLORS[type]}, 0px 0px 1em #0005`;
    embed.animate(ANIMATIONS.SHOW, 800);

    $popup.appendChild(embed);

    [...$popup.children].forEach((e) => (height += e.clientHeight + 5));
    $popup.style.height = `${height}px`;

    setTimeout(() => {
      embed.animate(ANIMATIONS.HIDE, { duration: 900, fill: "forwards" });
      setInterval(() => {
        embed.remove();
        height = 0;
        [...$popup.children].forEach((e) => (height += e.clientHeight + 5));
        $popup.style.height = `${height}px`;
      }, 900);
    }, 10000);
  }

  if (typeof window.PopMsg === "undefined") {
    win.PopMsg = () => ({
      toCreate,
    });
  }
})(window, document);
