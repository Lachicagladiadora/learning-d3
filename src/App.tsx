import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { useCallback, useState } from "react";

const initialBars = [3, 2, 9, 5, 7];

function App() {
  // el setBars fuerza el renderizado
  const [bars, setBars] = useState<number[]>(initialBars);

  const randomNumber = Math.ceil(Math.random() * 10);

  // el useCallback revisa lo que tine en memoria antes de renderizar
  const reference = useCallback((container: HTMLDivElement | null) => {
    if (!container) return;
    container.append(generateAxes().node());
  }, []);

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

  const generateAxes = () => {
    const width = 640;
    const height = 400;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;
    // const barWidth = 15

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

    // svg
    //   .selectAll("rect")
    //   .data(bars)
    //   .enter()
    //   .append("rect")
    //   .atrr("fill", "crimsom")
    //   .atrr("stroke", "yellow");
    // .atrr("x"function(d,i){return i*(barWidth+1)}).atrr('y',function(d) {return height - (x(d))}).atrr('width', barWidth).atrr('height', x);

    return svg;
  };

  return (
    <>
      <div>hello</div>
      <div ref={reference}></div>
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
