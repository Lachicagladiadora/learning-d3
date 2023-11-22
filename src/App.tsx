import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { useCallback, useState } from "react";

const initialBars = [3, 2, 9, 5, 7];

function App() {
  // el setBars fuerza el renderizado
  const [bars, setBars] = useState<number[]>(initialBars);

  const randomNumber = Math.ceil(Math.random() * 10);

  const generateAxes = () => {
    const width = 640;
    const height = 400;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;

    const x = d3
      .scaleUtc()
      .domain([new Date("2023-01-01"), new Date("2024-01-01")])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - marginBottom, marginTop]);

    const svg = d3.create("svg").attr("width", width).attr("height", height);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));

    return svg;
  };

  const drawBarChart = (data: number[], root: SVGGElement) => {
    const barsElement = d3.select(root).selectAll("rect").data(data);
    console.log({ root });
    // Acciones para los nuevos datos (enter)
    barsElement
      .join("rect")
      .attr("x", function (_: number, i: number) {
        return i * 80;
      })
      .attr("y", function (d: number) {
        return 200 - d * 5;
      })
      .attr("width", 70)
      .attr("height", function (d: number) {
        return d * 5;
      })
      .attr("fill", "blue");

    // function (enter) {
    //   enter()
    //     .append("rect")
    //     .attr("x", function (d: number, i: number) {
    //       return i * 80;
    //     })
    //     .attr("y", function (d: number) {
    //       return 200 - d * 5;
    //     })
    //     .attr("width", 70)
    //     .attr("height", function (d: number) {
    //       return d * 5;
    //     })
    //     .attr("fill", "blue");
    // },
    // function (update) {
    //   update()
    //     .append("rect")
    //     .attr("x", function (d: number, i: number) {
    //       return i * 80;
    //     })
    //     .attr("y", function (d: number) {
    //       return 200 - d * 5;
    //     })
    //     .attr("width", 70)
    //     .attr("height", function (d: number) {
    //       return d * 5;
    //     })
    //     .attr("fill", "blue");
    // },
    // function (exit) {
    //   exit().remove();
    // }

    // Acciones para los datos existentes (update)
    // barsElement.attr("y", function(d:number) { return 200 - d * 5; })
    //   .attr("height", function(d:number) { return d * 5; });

    // Acciones para los datos que salen (exit)
    // barsElement.exit().remove();
  };

  // el useCallback revisa lo que tine en memoria antes de renderizar
  const axesRef = useCallback((container: SVGGElement | null) => {
    if (!container) return;
    container.append(generateAxes().node());
  }, []);

  const barChartRef = useCallback(
    (container: SVGGElement) => {
      // if (!container) return
      drawBarChart(bars, container);
    },
    [bars]
  );

  const handleClick = () => {
    setBars((prev) => [...prev, randomNumber]);
  };

  const handleRemove = (indexNumber: number) => {
    setBars((prev) => prev.filter((_, idx) => idx !== indexNumber));
  };

  const handleUpdate = (indexNumber: number) => {
    setBars((prev) => {
      const newBars = prev.map((cur, idx) => {
        return idx === indexNumber ? randomNumber : cur;
      });
      return newBars;
    });
  };

  return (
    <>
      <h1>Learning d3</h1>
      <g>
        <svg ref={axesRef} />
        <svg
          ref={barChartRef}
          width="800px"
          height="500px"
          style={{ background: "whiteSmoke" }}
        />
      </g>
      <div style={{ display: "flex", gap: "5px" }}>
        {bars.map((cur, idx) => (
          <div
            key={idx}
            style={{ display: "flex", gap: "5px", flexDirection: "column" }}
          >
            <span>{`${cur}`}</span>
            <button onClick={() => handleUpdate(idx)}>u</button>
            <button onClick={() => handleRemove(idx)}>r</button>
          </div>
        ))}
      </div>
      <button onClick={handleClick}>add</button>
    </>
  );
}

export default App;
