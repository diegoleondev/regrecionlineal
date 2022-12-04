function maxXY(cordinates) {
  function callback(pre, current) {
    const [preX, preY] = pre;
    const { x, y } = current;

    return [x > preX ? x : preX, y > preY ? y : preY];
  }

  return cordinates.reduce(callback, [0, 0]);
}

export default function drawnGraph(cordinates) {
  let [maxX, maxY] = maxXY(cordinates);
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 800;
  canvas.height = 800;

  const dialSize = 80;
  const u = canvas.width / 100;
  const stroke = "#000";
  let dialSizeU = dialSize * u;
  const margin = (canvas.width - dialSizeU) / 2;

  dialSizeU = dialSize * u + margin;

  const scale = 10;
  let increment, acomulador;

  // Canvas ctx
  ctx.fillStyle = "#0000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "20px Arial";
  ctx.fillStyle = stroke;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 2;

  increment = Math.ceil(maxY / scale);
  maxY = maxY + increment;

  acomulador = 0;

  // Guias Eje Horizontal
  for (let i = 0; i <= maxY; i++) {
    if (i != acomulador) continue;
    else acomulador += increment;

    i == 0 ? (ctx.strokeStyle = stroke) : (ctx.strokeStyle = `${stroke}2`);

    const text = i == maxY ? "y" : i;
    const celdaY = dialSizeU - ((i * dialSize) / maxY) * u;

    ctx.beginPath();
    ctx.moveTo(margin, celdaY);
    ctx.lineTo(dialSizeU, celdaY);
    ctx.stroke();

    ctx.save();
    ctx.translate(u * 7, celdaY);
    ctx.rotate((0 * Math.PI) / 180);
    ctx.textAlign = "end";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }

  increment = Math.ceil(maxX / scale);
  acomulador = 0;

  maxX = maxX + increment;

  for (let i = 0; i <= maxX; i++) {
    if (i != acomulador) continue;
    else acomulador = acomulador + increment;

    i == 0 ? (ctx.strokeStyle = stroke) : (ctx.strokeStyle = `${stroke}2`);

    const text = i == maxX ? "x" : i;
    const celdaX = margin + ((i * dialSize) / maxX) * u;

    ctx.beginPath();
    ctx.moveTo(celdaX, margin);
    ctx.lineTo(celdaX, dialSizeU);
    ctx.stroke();

    ctx.save();
    ctx.translate(celdaX, canvas.height - 7 * u);
    ctx.rotate((80 * Math.PI) / 180);
    ctx.textAlign = "start";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }

  /* Trazado de Puntos */
  for (const { x, y } of cordinates) {
    if (typeof x !== "number" || typeof y !== "number") continue;
    const pX = ((x * dialSize) / maxX) * u;
    const pY = dialSizeU - ((y * dialSize) / maxY) * u;

    ctx.beginPath();
    ctx.fillStyle = "#f00";
    ctx.arc(pX + margin, pY, 4, 0, 2 * Math.PI);
    ctx.fill();
  }

  /* Trazado de Linea */
  function drawnLine(x1, y1, x2, y2) {
    const pX1 = ((x1 * dialSize) / maxX) * u;
    const pY1 = dialSizeU - ((y1 * dialSize) / maxY) * u;

    const pX2 = ((x2 * dialSize) / maxX) * u;
    const pY2 = dialSizeU - ((y2 * dialSize) / maxY) * u;

    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.moveTo(pX1 + margin, pY1);
    ctx.lineTo(pX2 + margin, pY2);
    ctx.stroke();
  }

  return { drawnLine };
}
