# Tree package

---

## Nested ascii lists are as easy as 1, 2, *tree!*

1. Write an indented list
2. Select the indented list
3. Press `ctrl-alt-t`, or trigger the generate command through the menu

*Note: This uses the editor's global indentation level for parsing*

## Example

```
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
first folder
├── second folder
│   ├── file1
│   └── file2
└── file3
third folder
├── file4
└── fourth folder
    └── file 5
```

## Custom tree characters:

```
first folder
+-- second folder
|   +-- file1
|   \-- file2
\-- file3
third folder
+-- file4
\-- fourth folder
    \-- file 5

```


***Leave feedback through github issues!***
