import vscode from 'vscode';

const CompactSuffixes = ['', 'k', 'm', 'b', 't', 'qdr', 'qnt', 'sxt', 'spt', 'oct', 'non', 'dec', 'und', 'duo', 'tre', 'qua', 'qui', 'sxd', 'sep', 'octo', 'nov', 'vig', 'uvg', 'dvg', 'tvg', 'qvg', 'qnv', 'sxv', 'spv', 'ocv', 'novv', 'trg'],
    CompactLongSuffixes = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quattuordecillion', 'quindecillion', 'sexdecillion', 'septendecillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'unvigintillion', 'duovigintillion', 'tresvigintillion', 'quattuorvigintillion', 'quinvigintillion', 'sexvigintillion', 'septenvigintillion', 'octovigintillion', 'novemvigintillion', 'trigintillion'],
    ByteSuffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    IECSuffixes = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
    NaturalNumbers = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
    NaturalTeens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
    NaturalTens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function get(key, defaultValue = false) {
    const config = vscode.workspace.getConfiguration('numnums'),
        value = config.get(key);

    return value === undefined ? defaultValue : value;
}

export function formatNumber(number) {
    const format = get('format', 'default'),
        locale = get('locale', vscode.env.language),
        options = {
            maximumFractionDigits: get('precision', 2)
        };

    switch (format) {
        case 'separated':
            const separator = get('separator') || '_';

            return number.toLocaleString(locale, options).replace(/,/g, separator)
        case 'scientific':
            return number.toExponential(2).toLocaleString(locale, options);
        case 'compact':
            return formatCompact(number, false, locale, options);
        case 'compactLong':
            return formatCompact(number, true, locale, options);
        case 'hexadecimal':
            return `0x${number.toString(16)}`;
        case 'octal':
            return `0o${number.toString(8)}`;
        case 'bytes':
            return formatBytes(number, 1000, ByteSuffixes, locale, options);
        case 'iecBytes':
            return formatBytes(number, 1024, IECSuffixes, locale, options);
        case 'naturalLanguage':
            return formatNaturalLanguage(number, false);
        case 'naturalLanguageLong':
            return formatNaturalLanguage(number, true);
        default:
            return number.toLocaleString(locale, options);
    }
}

function formatCompact(number, long, locale, localeOptions) {
    const suffix = Math.floor(Math.log10(number) / 3),
        suffixes = long ? CompactLongSuffixes : CompactSuffixes,
        suffixString = (long ? ' ' : '') + suffixes[suffix];

    return (number / Math.pow(10, suffix * 3)).toLocaleString(locale, localeOptions) + suffixString;
}

function formatBytes(number, power, suffixes, locale, localeOptions) {
    const suffix = Math.floor(Math.log(number) / Math.log(1024));

    return (number / Math.pow(power, suffix)).toLocaleString(locale, localeOptions) + suffixes[suffix];
}

function formatNaturalLanguage(number, long = false) {
    function _numToLanguage(num) {
        if (num < 10) return NaturalNumbers[num];
        else if (num < 20) return NaturalTeens[num - 10];

        return NaturalTens[Math.floor(num / 10)] + (num % 10 ? '-' + _numToLanguage(num % 10) : '');
    }

    function _formatPartial(num, suffix) {
        const hundreds = Math.floor(num / 100),
            tens = num % 100;

        const hundred = (hundreds > 0 ? `${_numToLanguage(hundreds)} hundred` : ''),
            ten = (tens > 0 ? `${_numToLanguage(tens)}` : '');

        return `${hundred} ${ten} ${suffix}`.trim().replace(/\s+/g, ' ');
    }

    const parts = [];

    while (number > 0) {
        const part = number % 1000,
            suffix = CompactLongSuffixes[parts.length];

        if (part > 0) {
            parts.unshift(_formatPartial(part, suffix));
        } else {
            parts.unshift('');
        }

        number = Math.floor(number / 1000);
    }

    if (!long) return parts.shift().trim();

    return parts.join(' ');
}