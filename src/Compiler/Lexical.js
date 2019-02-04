/*
Lexical analysis of the script src code happens here

Priority for matching:
1. comments and strings
2. remove unecessary whitespace (though since significant whitespace, not much to remove)
3. the rest of the data types
*/

const comments = {
    singleLine: /\/\/.*$/gm,
    multiLine: /\/\*.*\*\//g // still doesn't quite work over multiple lines
}

const dataTypes = {
    string: /(['"])(?:.*(?!\\\1))*\1/g, // Still doesn't quite work. See https://regex101.com/r/0TojFo/4/
    variable: /[_a-z][_a-z\d]*/gi,
    number: /\d+(\.\d+)?/g,
    boolean: /true|false/g
}
