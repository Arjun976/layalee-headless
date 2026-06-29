const fs = require('fs');

const figmaData = JSON.parse(fs.readFileSync('figma_nodes.json', 'utf8'));

// We want to print the structure of Root [1163:5363]
const rootNode = figmaData.nodes["1163:5363"].document;

function printNodeSummary(node, indent = '') {
  console.log(`${indent}- [${node.id}] ${node.name} (${node.type})`);
  
  if (node.characters) {
    console.log(`${indent}  Text: "${node.characters.replace(/\n/g, '\\n')}"`);
  }
  
  if (node.layoutMode) {
    console.log(`${indent}  Layout: ${node.layoutMode}, spacing: ${node.itemSpacing}, padding: [${node.paddingTop}, ${node.paddingRight}, ${node.paddingBottom}, ${node.paddingLeft}]`);
  }
  
  // If it's an image fill, print it
  if (node.fills) {
    node.fills.forEach(fill => {
      if (fill.type === 'IMAGE') {
        console.log(`${indent}  Fill: IMAGE (${fill.imageRef})`);
      }
    });
  }

  if (node.children) {
    node.children.forEach(child => printNodeSummary(child, indent + '  '));
  }
}

// Let's print the child that starts with Frame 286
const frame286 = rootNode.children.find(c => c.name === "Frame 286" || c.id === "1163:5365" || c.name.includes("286"));
if (frame286) {
  console.log("=== Found Frame 286 structure ===");
  printNodeSummary(frame286);
} else {
  console.log("Frame 286 not found at root level, printing all immediate children of Root [1163:5363]:");
  rootNode.children.forEach(c => {
    console.log(`- [${c.id}] ${c.name} (${c.type})`);
    // Print one level down
    if (c.children) {
      c.children.forEach(cc => {
        console.log(`    - [${cc.id}] ${cc.name} (${cc.type})`);
      });
    }
  });
}
