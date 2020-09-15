class Node {
    constructor (lineText) {
        this.text = lineText.trimLeft();
        this.indentLevel = this.getIndentLevel(lineText);
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
            this.tryAddChildNodeToChildren(childNode);
        }
    }
    
    tryAddChildNodeToChildren (childNode) {
        if (this.hasChildren()) {
            this.lastChild().addChild(childNode);
        } else {
            throw `Invalid indentation: "${childNode.text}"`;
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
    
    getIndentLevel (lineText) {
        let whitespaceLength = lineText.match(/^[ \t]*/)[0].length;
        let indentSize = atom.config.get('tree.indentSpaces');
        return Math.floor(whitespaceLength / indentSize);
    }
}


function generateTree (text) {
    let splitText = text.split('\n');
    let rootNode = new Node(splitText[0])
    
    splitText.splice(1).forEach((lineText) => {
        let currentNode = new Node(lineText);
        rootNode.addChild(currentNode);
    });
    
    return rootNode.output().slice(0,-1);
}

module.exports = generateTree;
