'use babel';

import { CompositeDisposable } from 'atom';

generateTree = require('./generateTree')

export default {
    config: {
        childIndent: {
            title: 'Child indent text',
            type: 'string',
            default: '├── '
        },
        bottomChildIndent: {
            title: 'Bottom child indent text',
            type: 'string',
            default: '└── '
        },
        indent: {
            title: 'Indent text',
            type: 'string',
            default: '│   '
        },
        bottomIndent: {
            title: 'Bottom indent text',
            type: 'string',
            default: '    '
        }
    },

    subscriptions: null,

    activate(state) {
        this.subscriptions = new CompositeDisposable();
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'tree:generate': () => this.generate()
        }));
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    generate() {
        const editor = atom.workspace.getActiveTextEditor();
        const inputText = editor.getSelectedText();
        outputText = generateTree(inputText);
        editor.insertText(outputText);
    }

};
