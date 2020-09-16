class Node {
  constructor (lineText) {
    this.text = lineText.trimLeft();
    this.indentLevel = this.calculateIndentLevel(lineText);
    this.parent;
    this.children = [];
    this.isBottom = true;
    this.pipeChars = {
      true: {
        true: atom.config.get('tree.bottomChildIndent'),
        false: atom.config.get('tree.childIndent')
      },
      false: {
        true: atom.config.get('tree.bottomIndent'),
        false: atom.config.get('tree.indent')
      }
    }
  }
  
  addChild (childNode) {
    if (this.canParent(childNode)) {
      if (this.hasChildren()) 
      this.lastChild().setNotBottom();
      this.children.push(childNode);
      childNode.setParent(this);
    } else {
      this.lastChild().addChild(childNode);
    }
  }
  
  getIndentText (isEnd) {
    return this.hasParent() ? this.parent.getIndentText(false) + this.pipeChars[isEnd][this.isBottom] : '';
  }
  
  output () {
    let indentText = this.getIndentText(true);
    let thisText = indentText + this.text + '\n';
    let childrenOutputsText = this.children.map(node => node.output()).join('');
    return thisText + childrenOutputsText;
  }
  
  // getters and setters
  
  hasChildren () {
    return !!this.children.length;
  }
  
  canParent (childNode) {
    return childNode.indentLevel === this.indentLevel + 1;
  }
  
  hasParent() {
    return !!this.parent;
  }
  
  lastChild() {
    return this.children.slice(-1)[0]
  }
  
  setParent (parentNode) {
    this.parent = parentNode;
  }
  
  setNotBottom () {
    this.isBottom = false;
  }
  
  calculateIndentLevel (lineText) {
    let whitespaceLength = lineText.match(/^[ \t]*/)[0].length;
    let indentSize = atom.config.get('editor.tabLength');
    return Math.floor(whitespaceLength / indentSize);
  }
  
  canFit (childNode) {
    // return this.canParent(childNode) ||
    //   ((childNode.indentLevel > this.indentLevel && this.hasChildren()) ?
    //     this.lastChild().canFit(childNode) :
    //     false);
    if (this.canParent(childNode)) {
      return true;
    } else if (childNode.indentLevel > this.indentLevel && this.hasChildren()) {
      return this.lastChild().canFit(childNode);
    } else {
      return false;
    }
  }
}


class Tree {
  constructor (textLines) {
    this.textLines = textLines;
    this.output;
  }
  
  generateAndReturnFinalIndex () {
    let index = 1, rootNode = new Node(this.textLines[0]);
    
    for (; index<this.textLines.length; index++) {
      let currentNode = new Node(this.textLines[index]);
      if (rootNode.canFit(currentNode)) 
        rootNode.addChild(currentNode);
      else break;
    }
    
    this.output = rootNode.output();
    return index;
  }
}



function generateTree (text) {
  let textLines = text.split('\n');
  if (textLines.length <= 1) return text;
  
  let tree, index = 0, outputText = '';
  
  while (index < textLines.length) {
    tree = new Tree(textLines.slice(index));
    index += tree.generateAndReturnFinalIndex();
    outputText += tree.output;
  }
  
  return outputText.slice(0, -1);
}


module.exports = generateTree;
