import emojiTable from "./emoji_table";

const EMOJI_MATCHER = /:([\w])+:/g;

class EmojiParser {

    constructor(rawInput) {
        this.input = rawInput;
    }

    /**
     *  Generate list of Tokens
     * @param matchedTokenList Object {[token name, index:, input: , groups: ]}
     * @returns {[{name: , unicode: }]}
     */
    generateTokenList(matchedTokenList) {
        return matchedTokenList.map(matchedEmoji => {
            return {
                name: matchedEmoji[0],
                unicode: emojiTable[matchedEmoji[0]],
            };
        });
    }

    replaceTokens(rawHtml, tokenList) {
        let html = rawHtml;

        tokenList.forEach(token => {
            html = html.replace(token.name, token.unicode);
        });

        return html;
    }

    parse() {
        const matchedTokenList = [...this.input.matchAll(EMOJI_MATCHER)];
        const tokenList = this.generateTokenList(matchedTokenList);
        return this.replaceTokens(this.input, tokenList);
    }
}

export default EmojiParser;
