module.exports = {
    getChatId(msg) {
        return msg.chat.id;
    },
    isNumeric(value) {
        return /^\d*\.{0,1}\d+$/.test(value);
    },
    isRoman(value) {
        return /^(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/.test(value);
    },
    to_roman(text, font_arab, font_roman) {
        if (!text) return '';
        if (text === '0') return text;
        var rezult = '';
        var n = font_arab.length - 1;
        while (text > 0) {
            if (text >= font_arab[n]) {
                rezult += font_roman[n];
                text -= font_arab[n];
            } else n--;
        }
        return rezult;
    },

    to_arab(text, font_arab, font_roman) {
        var text = text.toUpperCase();
        var rezult = 0;
        var posit = 0;
        var n = font_arab.length - 1;
        while (n >= 0 && posit < text.length) {
            if (text.substr(posit, font_roman[n].length) == font_roman[n]) {
                rezult += font_arab[n];
                posit += font_roman[n].length;
            } else n--;
        }
        return rezult;
    }
}
