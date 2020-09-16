# Tree package

## It's as easy as 123

1. Have an indented list *with a single root element*
2. Select the indented list *(with no trailing whitespace)*
3. Press `ctrl-alt-t`, or trigger the generate command through the menu

## Example

```
root node
    first folder
        second folder
            file1
            file2
        file3
    third folder
        file4
        fourth folder
            file 5
```

**Press `ctrl-alt-t`**

```
root node
├── first folder
│   ├── second folder
│   │   ├── file1
│   │   └── file2
│   └── file3
└── third folder
    ├── file4
    └── fourth folder
        └── file 5
```

## To Do:

1. Make more robust
    1. Won't throw errors
    2. Will skip over invalid indendation
    3. Auto-detect indentation level option
    4. Allow for multiple root nodes

Leave feedback through github issues!
