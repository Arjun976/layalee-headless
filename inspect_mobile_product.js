const fs = require('fs');

const figmaData = JSON.parse(fs.readFileSync('figma_mobile.json', 'utf8'));
const rootNode = figmaData.nodes["1163:4615"].document;

// Let's find "Frame 283" or nodes that look like the product section
// In figma_mobile.json we had:
// Root [1163:4615] > 768w light > Frame 283
function printNodeSummary(node, indent = '') {
  console.log(`${indent}- [${node.id}] ${node.name} (${node.type})`);
  if (node.absoluteBoundingBox) {
    console.log(`${indent}  Bounds:`, node.absoluteBoundingBox);
  }
  if (node.children) {
    node.children.forEach(child => printNodeSummary(child, indent + '  '));
  }
}

// Find children of 768w light that might represent the product gallery
const frame283 = rootNode.children.find(c => c.name === "Frame 283" || c.id === "1163:4682" || c.name.includes("283"));
if (frame283) {
  console.log("=== Found Frame 283 (Tablet Product Section) ===");
  printNodeSummary(frame283);
} else {
  console.log("Frame 283 not found, printing top level of 768w light:");
  rootNode.children.forEach(c => {
    console.log(`- [${c.id}] ${c.name} (${c.type})`, c.absoluteBoundingBox);
  });
}
