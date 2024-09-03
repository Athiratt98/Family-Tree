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
    const treeStructure = d3.tree().size([width - 50, height - 270]);
    const information = treeStructure(dataStructure);

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
        M${d.source.parent === null ? d.source.x : d.source.x + 70},${
          d.source.y + 60
        } v 20 H ${d.target.x} V${d.target.y}
      `
      )
      .attr("fill", "none")
      .attr("stroke", "#dcdcdc")
      .attr("stroke-width", 1);

    // Draw connections for spouses
    g.append("g")
      .selectAll("path")
      .data(information.links())
      .enter()
      .append("path")
      .attr(
        "d",
        (d) => `
        M${d.source.parent === null ? d.source.x - 65 : d.source.x},${
          d.source.y + 40
        }
        V${d.source.y + 60}
        H${d.source.data.parent === null ? d.source.x + 70 : d.source.x + 140}
        V${d.source.y}
      `
      )
      .attr("fill", "none")
      .attr("stroke", "#dcdcdc")
      .attr("stroke-width", 1);

    // Draw nodes
    g.append("g")
      .selectAll("rect")
      .data(information.descendants())
      .enter()
      .append("rect")
      .attr("x", (d) => (d.data.parent === null ? d.x - 135 : d.x - 65))
      .attr("y", (d) => d.y)
      .attr("stroke", "#f1f1f1")
      .attr("fill", "#f1f1f1")
      .attr("width", 130)
      .attr("height", 40)
      .attr("rx", 5)
      .attr("ry", 5);

    // Draw spouse nodes
    g.append("g")
      .selectAll("rect")
      .data(information.descendants().filter((d) => d.data.spouse !== null))
      .enter()
      .append("rect")
      .attr("x", (d) => (d.data.parent === null ? d.x + 5 : d.x + 75))
      .attr("y", (d) => d.y)
      .attr("stroke", "#f1f1f1")
      .attr("fill", "#f1f1f1")
      .attr("width", 130)
      .attr("height", 40)
      .attr("rx", 5)
      .attr("ry", 5);

    // Draw circles of above rectangle for image
    g.append("g")
      .selectAll("circle")
      .data(information.descendants())
      .enter()
      .append("circle")
      .attr("cx", (d) => (d.data.parent === null ? d.x - 65 : d.x))
      .attr("cy", (d) => d.y - 5)
      .attr("r", 17)
      .attr("fill", "#f1f1f1");

    // Draw spouse circles of above rectangle for image
    g.append("g")
      .selectAll("circle")
      .data(information.descendants().filter((d) => d.data.spouse !== null))
      .enter()
      .append("circle")
      .attr("cx", (d) => (d.data.parent === null ? d.x + 70 : d.x + 140))
      .attr("cy", (d) => d.y - 5)
      .attr("r", 17)
      .attr("fill", "#f1f1f1");

    //Add Images
    g.append("g")
      .selectAll("image")
      .data(information.descendants())
      .enter()
      .append("image")
      .attr("xlink:href", (d) => `${d.data.child.image}`)
      .attr("x", (d) => (d.data.parent === null ? d.x - 80 : d.x - 15))
      .attr("y", (d) => d.y - 20)
      .attr("width", 30)
      .attr("height", 30);

    //Add spouse Images
    g.append("g")
      .selectAll("image")
      .data(information.descendants().filter((d) => d.data.spouse !== null))
      .enter()
      .append("image")
      .attr("xlink:href", (d) => `${d.data.spouse.image}`)
      .attr("x", (d) => (d.data.parent === null ? d.x + 55 : d.x + 125))
      .attr("y", (d) => d.y - 20)
      .attr("width", 30)
      .attr("height", 30);

    // Add node labels
    g.append("g")
      .selectAll("text")
      .data(information.descendants())
      .enter()
      .append("text")
      .text((d) => d.data.child.name)
      .attr("x", (d) => (d.data.parent === null ? d.x - 65 : d.x))
      .attr("y", (d) => d.y + 25)
      .attr("font-size", "12px")
      .attr("dominant-baseline", "middle")
      .attr("text-anchor", "middle")
      .attr("fill", "#202123");

    // Add spouse labels
    g.append("g")
      .selectAll("text")
      .data(information.descendants().filter((d) => d.data.spouse !== null))
      .enter()
      .append("text")
      .text((d) => d.data.spouse.name)
      .attr("x", (d) => (d.data.parent === null ? d.x + 70 : d.x + 140))
      .attr("y", (d) => d.y + 25)
      .attr("font-size", "12px")
      .attr("dominant-baseline", "middle")
      .attr("text-anchor", "middle")
      .attr("fill", "#202123");

    // Add Options dots
    g.append("g")
      .selectAll("text")
      .data(information.descendants())
      .enter()
      .append("text")
      .text("...")
      .attr("x", (d) => (d.data.parent === null ? d.x - 20 : d.x + 50))
      .attr("y", (d) => d.y + 10)
      .attr("font-size", "15px")
      .attr("dominant-baseline", "middle")
      .attr("text-anchor", "middle")
      .attr("fill", "#737373");

    // Add Options dots in spouse
    g.append("g")
      .selectAll("text")
      .data(information.descendants().filter((d) => d.data.spouse !== null))
      .enter()
      .append("text")
      .text("...")
      .attr("x", (d) => (d.data.parent === null ? d.x + 120 : d.x + 190))
      .attr("y", (d) => d.y + 10)
      .attr("font-size", "15px")
      .attr("dominant-baseline", "middle")
      .attr("text-anchor", "middle")
      .attr("fill", "#737373");

    //  Added yellow circle in main parent
    g.append("g")
      .selectAll("circle")
      .data(information.descendants().filter((d) => d.data.child.id === 0)) // Filter data directly here
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x - 53)
      .attr("cy", (d) => d.y + 10)
      .attr("r", 8)
      .attr("fill", "#d5b04d");

    //  Added heart shape in main parent
    g.append("g")
      .selectAll("text")
      .data(information.descendants().filter((d) => d.data.child.id === 0))
      .enter()
      .append("text")
      .attr("x", (d) => d.x - 53)
      .attr("y", (d) => d.y + 14)
      .attr("font-size", "11px")
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text("🖤");

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
