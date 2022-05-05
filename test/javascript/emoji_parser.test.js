import EmojiParser from "../../app/javascript/emoji_parser";

const messageWithNoEmoji = '"<div class="message me mb-2">\n' +
    '  <div class="content-container">\n' +
    '    <div class="content">\n' +
    '      Hello world man whats up \n' +
    '    </div>\n' +
    '    <div class="author">\n' +
    '      User137855\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '"'

const messageWithEmoji = '"<div class="message me mb-2">\n' +
    '  <div class="content-container">\n' +
    '    <div class="content">\n' +
    '      :grinning: Hello world man whats up \n' +
    '    </div>\n' +
    '    <div class="author">\n' +
    '      User137855\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '"'

const convertedMessage = '"<div class="message me mb-2">\n' +
    '  <div class="content-container">\n' +
    '    <div class="content">\n' +
    '      &#x1F600 Hello world man whats up \n' +
    '    </div>\n' +
    '    <div class="author">\n' +
    '      User137855\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '"'

describe("EmojiParser", () => {

    it ('converts an emoji', () => {
        const parsedInput = new EmojiParser(messageWithEmoji).parse();
        expect(parsedInput).toBe(convertedMessage)
    })

    it ('still works when no emoji is present', () => {
        const parsedInput = new EmojiParser(messageWithNoEmoji).parse();
        expect(parsedInput).toBe(messageWithNoEmoji)
    })

})

