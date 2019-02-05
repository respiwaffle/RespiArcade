/*
Lexical analysis of the script src code happens here

Priority for matching:
1. comments and strings
2. remove unecessary whitespace (though since significant whitespace, not much to remove)
3. keywords
4. the rest of the data types
*/

const comments = {
    singleLine: /\/\/.*$/gm,
    multiLine: /\/\*[\s\S]*\*\//g
}

const strings = {
    singleLine: /(["'])(\1|.*?([^\\]\1))/g,
    multiLine: /"{3}[\s\S]*"{3}/g
}

const keywords = ['if', 'elseif', 'else', 'for', 'while', 'break', 'continue', 'function', 'return']

const tokens = {
    variable: /[_a-z][_a-z\d]*/gi,
    number: /\d+(\.\d+)?([+-]?e\d+)?/g,
    boolean: /true|false/g
}
