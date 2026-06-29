const fs = require('fs');

const figmaData = JSON.parse(fs.readFileSync('figma_nodes.json', 'utf8'));
const rootNode = figmaData.nodes["1163:4615"].document;

function printNodeSummary(node, indent = '') {
  console.log(`${indent}- [${node.id}] ${node.name} (${node.type})`);
  if (node.characters) {
    console.log(`${indent}  Text: "${node.characters.replace(/\n/g, '\\n')}"`);
  }
  if (node.layoutMode) {
    console.log(`${indent}  Layout: ${node.layoutMode}, spacing: ${node.itemSpacing}, padding: [${node.paddingTop}, ${node.paddingRight}, ${node.paddingBottom}, ${node.paddingLeft}]`);
  }
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

// Find Frame 158 or equivalent child that represents the section in mobile frame
const sectionNode = rootNode.children.find(c => c.name === "Frame 158" || c.name.includes("158") || c.id === "1163:4728");
if (sectionNode) {
  console.log("=== Found Mobile Section structure ===");
  printNodeSummary(sectionNode);
} else {
  console.log("Section not found under immediate children of 768w light, printing all immediate children:");
  rootNode.children.forEach(c => {
    console.log(`- [${c.id}] ${c.name} (${c.type})`);
    if (c.children) {
      c.children.forEach(cc => {
        if (cc.name.includes("Indoor") || cc.name.includes("Crafted")) {
          console.log(`  - [${cc.id}] ${cc.name} (${cc.type})`);
        }
      });
    }
  });
}
