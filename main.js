import { drawnGraph, linearRegression, table } from "./modules/index.js";

const $cordinateInputs = document.getElementById("table-container");
const $probability = document.getElementById("probability");
const $operations = document.getElementById("operations");
const $dahsboard = document.getElementById("dahsboard");
const $topSection = document.getElementById("top-section");

let cordinates = [{ x: NaN, y: NaN }];

drawnGraph([{ x: 1, y: 1 }]);

/*----------------------------------------------------------------------------*\
| TABLE - LOGIC
\*----------------------------------------------------------------------------*/

function onTable({ type, state }) {
  switch (type) {
    case "update":
      cordinates = state;
      break;
    case "danger":
      PopMsg().toCreate("danger", state);
      break;
    case "warning":
      PopMsg().toCreate("warning", state);
  }
}

const tableCtx = table($cordinateInputs, onTable);

tableCtx.setValues(cordinates);

/*----------------------------------------------------------------------------*\
| BUTTONBAR
\*----------------------------------------------------------------------------*/

function handleCalculate() {
  const p = parseFloat($probability.value);
  if (isNaN(p) || p < 0) {
    PopMsg().toCreate("danger", `La probabilidad debe ser un número positivo.`);
    return;
  }
  if (tableCtx.hasProblems()) {
    PopMsg().toCreate(
      "danger",
      `Debe corregir los problemas en la tabla, antes de graficar.`
    );
    return;
  }

  if (cordinates.length == 1) {
    PopMsg().toCreate("danger", `No hay nada que graficar, completa la tabla.`);
    return;
  }

  const { a, b, y, drawn } = linearRegression(
    cordinates.filter(({ x, y }) => x >= 0 && y >= 0),
    $probability.value
  );

  drawnGraph(cordinates).drawnLine(0, a, parseFloat($probability.value, 10), y);

  drawn($operations);
}

function handleExample() {
  $probability.value = 32;
  $topSection.innerHTML += `<p>¿Qué índice de mortalidad se podría predecir para una población que consume una media  de 32      cigarrillos diarios? <br> <br> La siguiente tabla muestra el índice de mortalidad (Y) y el consumo medio diario de cigarrillos (X) para poblaciones distintas:</p>`;

  tableCtx.setValues([
    { x: 3, y: 0.2 },
    { x: 5, y: 0.3 },
    { x: 6, y: 0.3 },
    { x: 15, y: 0.5 },
    { x: 20, y: 0.7 },
    { x: 40, y: 1.4 },
    { x: 45, y: 1.5 },
    { x: NaN, y: NaN },
  ]);

  handleCalculate();
}

function handleClear() {
  $probability.value = NaN;
  tableCtx.setValues([{ x: NaN, y: NaN }]);
  $operations.innerText = "";
  $topSection.innerHTML = "<h1>Regrecion Lineal<h1>";
  drawnGraph([{ x: 1, y: 1 }]);
}
// Handle click
$dahsboard.addEventListener("click", async (e) => {
  const target = e.target;

  if (target.id == "btn-calculate") handleCalculate();
  if (target.id == "btn-example") handleExample();
  if (target.id == "btn-clear") handleClear();
});

// 3 y 5 - brian
