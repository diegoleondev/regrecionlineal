let cordinates = [];
let cells = [];

const TYPES = {
  UPDATE: "update",
  DANGER: "danger",
};

const problems = {};

export default function table(element, on) {
  const hasFirstRow = element.children[1];

  // HELPERS -------------------------------------------------------------------
  function updateCordinates(newCordinates) {
    if (newCordinates) cordinates = newCordinates;
    on({ type: TYPES.UPDATE, state: cordinates });

    cells = [...element.children]
      .map(({ children }) => [...children].filter((e) => e.tagName === "INPUT"))
      .flat(5);
  }

  function createRow(index, cordinate = { x: NaN, y: NaN }) {
    const row = document.createElement("div");
    row.classList.add("table__row");
    row.setAttribute("data-index", index);

    const inputX = document.createElement("input");
    inputX.type = "number";
    inputX.classList.add("table__cell");
    inputX.classList.add("input");
    inputX.setAttribute("data-index", index);
    inputX.setAttribute("data-axis", "x");
    inputX.value = cordinate.x;
    inputX.placeholder = "x";

    const inputY = document.createElement("input");
    inputY.type = "number";
    inputY.classList.add("table__cell");
    inputY.classList.add("input");
    inputY.setAttribute("data-index", index);
    inputY.setAttribute("data-axis", "y");
    inputY.value = cordinate.y;
    inputY.placeholder = "y";

    const button = document.createElement("button");
    button.classList.add("table__cell-button");
    button.classList.add("table__cell--index");
    button.innerText = index;

    row.appendChild(inputX);
    row.appendChild(inputY);
    row.appendChild(button);

    element.appendChild(row);
  }

  function clear() {
    const childrens = [...element.children];

    for (let i = 1; i < childrens.length; i++) {
      childrens[i].remove();
    }

    updateCordinates([]);
  }

  function hasProblems() {
    for (const key in problems) {
      if (problems[key]) return true;
    }

    return false;
  }

  // LOGIC ---------------------------------------------------------------------

  if (hasFirstRow == undefined) {
    createRow(1);
  }

  function setValues(newCordinates) {
    clear();

    for (let i = 1; i <= newCordinates.length; i++) {
      createRow(i, newCordinates[i - 1]);
    }

    updateCordinates(newCordinates);
  }

  function getCurrent(target) {
    return {
      axis: target.getAttribute("data-axis"),
      index: parseInt(target.getAttribute("data-index"), 10),
      setAxis: function (value) {
        const currentCordinate = cordinates[this.index - 1];
        currentCordinate[this.axis] = value;
      },
    };
  }

  element.addEventListener("change", (e) => {
    const { target } = e;
    const value = parseFloat(target.value, 10);

    const current = getCurrent(target);

    if (value < 0) {
      target.classList.add("danger-input-text");
      on({
        type: TYPES.DANGER,
        state: `Los valores de 'x' e 'y' no pueden ser menores a 0. \n Verifique [${current.axis} ${current.index}] = ${value}.`,
      });

      problems[`${current.axis}-${current.index}`] = true;
    } else if (isNaN(value)) {
      target.classList.add("danger-input-text");
      on({
        type: TYPES.DANGER,
        state: `Los valores de 'x' e 'y' deben ser números. \n Verifique [${current.axis} ${current.index}] = ${value}.`,
      });

      problems[`${current.axis}-${current.index}`] = true;
    } else {
      target.classList.remove("danger-input-text");
      problems[`${current.axis}-${current.index}`] = false;
    }

    current.setAxis(value);

    const currentCordinate = cordinates[current.index - 1];
    if (current.axis === "y" && isNaN(currentCordinate.x)) {
      target.parentNode
        .querySelector("[data-axis='x']")
        .classList.add("danger-input-text");

      console.log(target.parentNode);
      on({
        type: TYPES.DANGER,
        state: `Los valores de 'x' e 'y' deben ser números. \n Verifique [x ${current.index}] = NaN.`,
      });
      problems[`x-${current.index}`] = true;
    }

    // Agregar una -FILA- nueva cuando se -llena X e Y-
    if (current.index == cordinates.length) {
      if (!(currentCordinate.x >= 0) || !(currentCordinate.y >= 0)) return;
      createRow(current.index + 1);

      cordinates.push({ x: NaN, y: NaN });
    }

    updateCordinates();
  });

  element.addEventListener("keyup", function (event) {
    event.preventdefault;

    if (event.key !== "Enter") return;
    const { target } = event;

    const current = getCurrent(target);

    const currentCell =
      current.axis === "x" ? current.index * 2 - 1 : current.index * 2;

    if (currentCell < cordinates.length * 2) {
      cells[currentCell].focus();
    }
  });

  element.addEventListener("click", (e) => {
    const { target } = e;

    if (target.tagName !== "BUTTON") return;
    const index = parseInt(target.parentNode.getAttribute("data-index"), 10);

    if (index === cordinates.length)
      return on({ type: "warning", state: "No puedes eliminar esta fila" });

    target.parentNode.remove();

    cordinates = cordinates.filter((c, i) => {
      return i !== index - 1;
    });

    setValues(cordinates);
  });

  return {
    setValues,
    hasProblems,
  };
}
