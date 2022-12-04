export default function linearRegression(cordinates, x) {
  let sumPowX = 0;
  let sumXY = 0;
  let sumX = 0;
  let sumY = 0;

  for (const { x, y } of cordinates) {
    sumPowX = sumPowX + Math.pow(x, 2);

    sumXY = sumXY + x * y;

    sumX = sumX + x;
    sumY = sumY + y;
  }

  const promedioX = sumX / cordinates.length;
  const promedioY = sumY / cordinates.length;

  const b =
    (sumXY - cordinates.length * promedioX * promedioY) /
    (sumPowX - cordinates.length * Math.pow(promedioX, 2));

  const a = promedioY - b * promedioX;

  const y = a + b * x;

  // Drawn

  /* Sumatoria X^2 */
  function drawn($) {
    const steps = [];

    const stepsSumX = { _1: [] };
    const stepsSumY = { _1: [] };
    const stepsSumPowX = { _1: [], _2: [] };
    const stepsSumXY = { _1: [], _2: [] };

    for (const { x, y } of cordinates) {
      stepsSumX._1.push(`${x}`);
      stepsSumY._1.push(`${y}`);

      stepsSumPowX._1.push(`${x}^2`);
      stepsSumPowX._2.push(`${Math.pow(x, 2).toFixed(2)}`);

      stepsSumXY._1.push(`${x} * ${y}`);
      stepsSumXY._2.push(`${(x * y).toFixed(2)}`);
    }

    // Cola de render
    steps.push(`\\( n = ${cordinates.length} \\)`);
    steps.push("");

    steps.push(`\\( X = ${x} \\)`);
    steps.push("");

    steps.push(
      `\\( \\bar{x} = {${stepsSumX._1.join(" + ")} \\over ${
        cordinates.length
      } } \\)`
    );
    steps.push(
      `\\( \\bar{x} = {${sumX.toFixed(2)} \\over ${cordinates.length} } \\)`
    );
    steps.push(`\\( \\bar{x} = ${promedioX.toFixed(2)}\\)`);
    steps.push("");

    steps.push(
      `\\( \\bar{y} = {${stepsSumY._1.join(" + ")} \\over ${
        cordinates.length
      } } \\)`
    );
    steps.push(
      `\\( \\bar{y} = {${sumY.toFixed(2)} \\over ${cordinates.length} } \\)`
    );
    steps.push(`\\( \\bar{y} = ${promedioY.toFixed(2)}\\)`);
    steps.push("");

    steps.push(`\\( \\sum xy = ${stepsSumXY._1.join(" + ")} \\)`);
    steps.push(`\\( \\sum xy = ${stepsSumXY._2.join(" + ")} \\)`);
    steps.push(`\\( \\sum xy = ${sumXY.toFixed(2)} \\)`);
    steps.push("");

    steps.push(`\\( \\sum x^2 = ${stepsSumPowX._1.join(" + ")} \\)`);
    steps.push(`\\( \\sum x^2 = ${stepsSumPowX._2.join(" + ")} \\)`);
    steps.push(`\\( \\sum x^2 = ${sumPowX.toFixed(2)} \\)`);

    steps.push("");
    steps.push(`\\(  \\)`);
    steps.push(
      `\\( b = {\\sum xy - n \\bar {x} \\bar{y} \\over \\sum x^2 - n \\bar{x}^2 } \\)`
    );
    steps.push(`\\( 
        b = {${sumXY.toFixed(2)} - (${cordinates.length}) (${promedioX.toFixed(
      2
    )}) (${promedioY.toFixed(2)}) \\over ${sumPowX.toFixed(2)} - (${
      cordinates.length
    }) (${promedioX.toFixed(2)})^2} 
      \\)`);
    steps.push(`\\( 
        b = {${sumXY.toFixed(2)} - ${(
      cordinates.length *
      promedioX *
      promedioY
    ).toFixed(2)} \\over ${sumPowX.toFixed(2)} - ${(
      cordinates.length * Math.pow(promedioX, 2)
    ).toFixed(2)}} 
      \\)`);
    steps.push(`\\( 
        b = {${(sumXY - cordinates.length * promedioX * promedioY).toFixed(
          2
        )} \\over ${(
      sumPowX -
      cordinates.length * Math.pow(promedioX, 2)
    ).toFixed(2)}} 
      \\)`);
    steps.push(`\\( 
        b = ${b.toFixed(2)} 
      \\)`);
    steps.push("");

    steps.push(`\\( a = \\bar{y} - b\\bar{x} \\)`);
    steps.push(
      `\\( a = ${promedioY.toFixed(2)} - (${b.toFixed(
        2
      )}) * (${promedioX.toFixed(2)}) \\)`
    );
    steps.push(
      `\\( a = ${promedioY.toFixed(2)} - ${(b * promedioX).toFixed(2)} \\)`
    );
    steps.push(`\\( a = ${a.toFixed(2)} \\)`);
    steps.push("");

    steps.push(`\\( Y = a + bX \\)`);
    steps.push(`\\( Y = ${a.toFixed(2)} + (${b.toFixed(2)}) (${x}) \\)`);
    steps.push(`\\( Y = ${a.toFixed(2)} + ${(b * x).toFixed(2)} \\)`);
    steps.push(`\\( Y = ${y.toFixed(4)} \\)`);
    steps.push("");

    $.innerText = " " + steps.join("\n") + " ";

    MathJax.typesetPromise([$]);
  }

  return { a, b, y, drawn };
}

// 93 67 47.7
