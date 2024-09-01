import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./FamilyTree.css";
import data from "./data.json";

const FamilyTree = () => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 1000;
    const height = 500;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const dataStructure = d3
      .stratify()
      .id((d) => d.child.id)
      .parentId((d) => d.parent)(data);

    // Adjust the size of the tree layout
    const treeStructure = d3.tree().size([width - 50, height - 50]);
    const information = treeStructure(dataStructure);

    console.log("data", information);

    // Create a group element to contain the tree
    const g = svg.append("g");

    // Draw connections1
    g.append("g")
      .selectAll("path")
      .data(information.links())
      .enter()
      .append("path")
      .attr(
        "d",
        (d) => `
        M${d.source.x - 10},${d.source.y} h 70 v 50 H ${d.target.x + 10} V${
          d.target.y
        }
      `
      )
      .attr("fill", "none")
      .attr("stroke", "#dcdcdc")
      .attr("stroke-width", 2);

    // Draw connections2
    g.append("g")
      .selectAll("path")
      .data(information.links())
      .enter()
      .append("path")
      .attr(
        "d",
        (d) => `
        M${d.source.x + 40},${d.source.y} h 40
      `
      )
      .attr("fill", "none")
      .attr("stroke", "#dcdcdc")
      .attr("stroke-width", 2);

    // Draw nodes
    g.append("g")
      .selectAll("rect")
      .data(information.descendants())
      .enter()
      .append("rect")
      .attr("x", (d) => d.x - 60)
      .attr("y", (d) => d.y - 20)
      .attr("stroke", "#f1f1f1")
      .attr("fill", "#f1f1f1")
      .attr("width", "100px")
      .attr("height", "40px")
      .attr("rx", 5)
      .attr("ry", 5);

    // Draw spouse nodes
    g.append("g")
      .selectAll("rect")
      .data(information.descendants().filter((d) => d.data.spouse !== null))
      .enter()
      .append("rect")
      .attr("x", (d) => d.x + 80)
      .attr("y", (d) => d.y - 20)
      .attr("stroke", "#f1f1f1")
      .attr("fill", "#f1f1f1")
      .attr("width", "100px")
      .attr("height", "40px")
      .attr("rx", 5)
      .attr("ry", 5);

    // Draw circles of above rectangle for image
    g.append("g")
      .selectAll("circle")
      .data(information.descendants())
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x - 10)
      .attr("cy", (d) => d.y - 20)
      .attr("r", 17)
      .attr("fill", "#f1f1f1");

    // Draw spouse circles of above rectangle for image
    g.append("g")
      .selectAll("circle")
      .data(information.descendants().filter((d) => d.data.spouse !== null))
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x + 110)
      .attr("cy", (d) => d.y - 20)
      .attr("r", 17)
      .attr("fill", "#f1f1f1");

    //Add Images
    g.append("g")
      .selectAll("image")
      .data(information.descendants())
      .enter()
      .append("image")
      .attr("xlink:href", (d) => `${d.data.child.image}`)
      .attr("x", (d) => d.x - 25)
      .attr("y", (d) => d.y - 35)
      .attr("width", 30)
      .attr("height", 30);

    //Add spouse Images
    g.append("g")
      .selectAll("image")
      .data(information.descendants().filter((d) => d.data.spouse !== null))
      .enter()
      .append("image")
      .attr("xlink:href", (d) => `${d.data.spouse.image}`)
      .attr("x", (d) => d.x + 95)
      .attr("y", (d) => d.y - 35)
      .attr("width", 30)
      .attr("height", 30);

    // Add node labels
    g.append("g")
      .selectAll("text")
      .data(information.descendants())
      .enter()
      .append("text")
      .text((d) => d.data.child.name)
      .attr("x", (d) => d.x - 10)
      .attr("y", (d) => d.y + 5)
      .attr("font-size", "12px")
      .attr("dominant-baseline", "middle")
      .attr("text-anchor", "middle");

    // Add spouse labels
    g.append("g")
      .selectAll("text")
      .data(information.descendants().filter((d) => d.data.spouse !== null))
      .enter()
      .append("text")
      .text((d) => d.data.spouse.name)
      .attr("x", (d) => d.x + 110)
      .attr("y", (d) => d.y + 5)
      .attr("font-size", "12px")
      .attr("dominant-baseline", "middle")
      .attr("text-anchor", "middle");

    // Center the tree
    const bounds = svg.node().getBBox();
    svg.attr(
      "viewBox",
      `${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`
    );
  }, []);

  return (
    <div className="svgContainer">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default FamilyTree;
