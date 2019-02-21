/*
Lexical analysis of the script src code happens here

Priority for matching:
1. comments and strings
2. remove unecessary whitespace (though since significant whitespace, not much to remove)
3. keywords
4. the rest of the data types
*/

const overlappingTokens = [
    { type: 'string', regex: /(["'])(\1|.*?([^\\]\1))/g },
    { type: 'string', multiLine: true, regex: /"{3}[\s\S]*"{3}/g },
    { type: 'comment', remove: true, regex: /\/\/.*$/gm },
    { type: 'comment', multiLine: true, remove: true, regex: /\/\*[\s\S]*\*\//g }
]

// Array so that some token matches will have priority over others
const tokens = [
    { keywords: /(\W|^)(if|elseif|else|for|while|break|continue|function|return)(\W|$)/gm },
    {
        number: /\d+(\.\d+)?([+-]?e\d+)?/g,
        variable: /[_a-z][_a-z\d]*/gi,
        boolean: /true|false/g
    },
    {
        operator: /(\+|-|\/|\*)/g
    }
]

function addToSymbolTable(item, symbolTable) {
    let index = 0
    for (let otherItem of symbolTable) {
        if (otherItem.pos[0] > item.pos[0]) break
        index++
    }
    symbolTable.splice(index, 0, item)
}

function stripOverlappingTokens(symbolTable) {
    let lastItem = symbolTable[0]
    let newSymbolTable = [lastItem]

    for (let i = 1; i < symbolTable.length; i++) {
        if (lastItem.pos[1] < symbolTable[i].pos[0]) {
            newSymbolTable.push(symbolTable[i])
            lastItem = symbolTable[i]
        }
    }

    return newSymbolTable
}

function parseOverlappingTokens(rawSrc) {
    const symbolTable = []

    for (let tokenType of overlappingTokens) {
        let match
        while ((match = tokenType.regex.exec(rawSrc))) {
            const item = { input: match[0], type: tokenType.type, pos: [match.index, match.index + match[0].length] }
            addToSymbolTable(item, symbolTable)
        }
    }

    const strippedSymbolTable = stripOverlappingTokens(symbolTable)

    return { symbolTable: strippedSymbolTable, updatedSrc: rawSrc }
}

function firstStageLexical(rawSrc) {
    const { symbolTable, updatedSrc } = parseOverlappingTokens(rawSrc)
    console.log(symbolTable)
}

function lexicalAnalysis(rawSrc) {
    firstStageLexical(rawSrc)
}

lexicalAnalysis('// "string inside comment"')
