import { config } from "./config.js";

const ByteSuffixesShort = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB", "RB", "QB"],
	ByteSuffixesLong = ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte", "petabyte", "exabyte", "zettabyte", "yottabyte", "ronnabyte", "quettabyte"],
	IECSuffixesShort = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB", "RiB", "QiB"],
	IECSuffixesLong = ["byte", "kibibyte", "mebibyte", "gibibyte", "tebibyte", "pebibyte", "exbibyte", "zebibyte", "yobibyte", "robibyte", "quebibyte"],
	NaturalNumbers = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
	NaturalTeens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
	NaturalTens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

const S_BASE = 10n ** 50n;
const timeUnits = [
	{ id: "Es", labelShort: "Es", labelLong: "exasecond", labelLongPlural: "exaseconds", base: S_BASE * 10n ** 18n },
	{ id: "kalpa", labelShort: "kalpa", labelLong: "kalpa", labelLongPlural: "kalpas", base: S_BASE * 31536000n * 4320000000n },
	{ id: "eon", labelShort: "eon", labelLong: "eon", labelLongPlural: "eons", base: S_BASE * 31536000n * 1000000000n },
	{ id: "galactic", labelShort: "gy", labelLong: "galactic year", labelLongPlural: "galactic years", base: S_BASE * 31536000n * 230000000n },
	{ id: "Ps", labelShort: "Ps", labelLong: "petasecond", labelLongPlural: "petaseconds", base: S_BASE * 10n ** 15n },
	{ id: "Ma", labelShort: "Ma", labelLong: "megaannum", labelLongPlural: "megaannums", base: S_BASE * 31536000n * 1000000n },
	{ id: "Ts", labelShort: "Ts", labelLong: "terasecond", labelLongPlural: "teraseconds", base: S_BASE * 10n ** 12n },
	{ id: "mil", labelShort: "mil", labelLong: "millennium", labelLongPlural: "millennia", base: S_BASE * 31536000n * 1000n },
	{ id: "c", labelShort: "c", labelLong: "century", labelLongPlural: "centuries", base: S_BASE * 31536000n * 100n },
	{ id: "dec", labelShort: "dec", labelLong: "decade", labelLongPlural: "decades", base: S_BASE * 31536000n * 10n },
	{ id: "y", labelShort: "y", labelLong: "year", labelLongPlural: "years", base: S_BASE * 31536000n },
	{ id: "mo", labelShort: "mo", labelLong: "month", labelLongPlural: "months", base: S_BASE * 2592000n },
	{ id: "w", labelShort: "w", labelLong: "week", labelLongPlural: "weeks", base: S_BASE * 604800n },
	{ id: "d", labelShort: "d", labelLong: "day", labelLongPlural: "days", base: S_BASE * 86400n },
	{ id: "h", labelShort: "h", labelLong: "hour", labelLongPlural: "hours", base: S_BASE * 3600n },
	{ id: "m", labelShort: "m", labelLong: "minute", labelLongPlural: "minutes", base: S_BASE * 60n },
	{ id: "s", labelShort: "s", labelLong: "second", labelLongPlural: "seconds", base: S_BASE },
	{ id: "cs", labelShort: "cs", labelLong: "centisecond", labelLongPlural: "centiseconds", base: S_BASE / 100n },
	{ id: "ms", labelShort: "ms", labelLong: "millisecond", labelLongPlural: "milliseconds", base: S_BASE / 1000n },
	{ id: "us", labelShort: "μs", labelLong: "microsecond", labelLongPlural: "microseconds", base: S_BASE / 1000000n },
	{ id: "shake", labelShort: "shake", labelLong: "shake", labelLongPlural: "shakes", base: S_BASE / 100000000n },
	{ id: "ns", labelShort: "ns", labelLong: "nanosecond", labelLongPlural: "nanoseconds", base: S_BASE / 1000000000n },
	{ id: "ps", labelShort: "ps", labelLong: "picosecond", labelLongPlural: "picoseconds", base: S_BASE / 1000000000000n },
	{ id: "svedberg", labelShort: "Sv", labelLong: "svedberg", labelLongPlural: "svedbergs", base: S_BASE / 10000000000000n },
	{ id: "fs", labelShort: "fs", labelLong: "femtosecond", labelLongPlural: "femtoseconds", base: S_BASE / 1000000000000000n },
	{ id: "atomic", labelShort: "au", labelLong: "atomic time", labelLongPlural: "atomic times", base: (S_BASE * 242n) / 10000000000000000000n },
	{ id: "as", labelShort: "as", labelLong: "attosecond", labelLongPlural: "attoseconds", base: S_BASE / 10n ** 18n },
	{ id: "zs", labelShort: "zs", labelLong: "zeptosecond", labelLongPlural: "zeptoseconds", base: S_BASE / 10n ** 21n },
	{ id: "jiffy", labelShort: "jiffy", labelLong: "jiffy", labelLongPlural: "jiffys", base: (S_BASE * 3n) / 10n ** 24n },
	{ id: "ys", labelShort: "ys", labelLong: "yoctosecond", labelLongPlural: "yoctoseconds", base: S_BASE / 10n ** 24n },
	{ id: "rs", labelShort: "rs", labelLong: "rontosecond", labelLongPlural: "rontoseconds", base: S_BASE / 10n ** 27n },
	{ id: "qs", labelShort: "qs", labelLong: "quectosecond", labelLongPlural: "quectoseconds", base: S_BASE / 10n ** 30n },
	{ id: "planck", labelShort: "tP", labelLong: "Planck time", labelLongPlural: "Planck times", base: 539124n },
];

const L_BASE = 10n ** 45n;
const lengthUnits = [
	{ id: "Qm", sys: "metric", labelShort: "Qm", labelLong: "quettameter", labelLongPlural: "quettameters", base: L_BASE * 10n ** 30n },
	{ id: "Rm", sys: "metric", labelShort: "Rm", labelLong: "ronnameter", labelLongPlural: "ronnameters", base: L_BASE * 10n ** 27n },
	{ id: "Ym", sys: "metric", labelShort: "Ym", labelLong: "yottameter", labelLongPlural: "yottameters", base: L_BASE * 10n ** 24n },
	{ id: "Zm", sys: "metric", labelShort: "Zm", labelLong: "zettameter", labelLongPlural: "zettameters", base: L_BASE * 10n ** 21n },
	{ id: "pc", sys: "astro", labelShort: "pc", labelLong: "parsec", labelLongPlural: "parsecs", base: L_BASE * 30856775814913670n },
	{ id: "ly", sys: "astro", labelShort: "ly", labelLong: "lightyear", labelLongPlural: "lightyears", base: L_BASE * 9460730472580800n },
	{ id: "Em", sys: "metric", labelShort: "Em", labelLong: "exameter", labelLongPlural: "exameters", base: L_BASE * 10n ** 18n },
	{ id: "Pm", sys: "metric", labelShort: "Pm", labelLong: "petameter", labelLongPlural: "petameters", base: L_BASE * 10n ** 15n },
	{ id: "Tm", sys: "metric", labelShort: "Tm", labelLong: "terameter", labelLongPlural: "terameters", base: L_BASE * 10n ** 12n },
	{ id: "au", sys: "astro", labelShort: "au", labelLong: "astronomical unit", labelLongPlural: "astronomical units", base: L_BASE * 149597870700n },
	{ id: "Gm", sys: "metric", labelShort: "Gm", labelLong: "gigameter", labelLongPlural: "gigameters", base: L_BASE * 10n ** 9n },
	{ id: "Mm", sys: "metric", labelShort: "Mm", labelLong: "megameter", labelLongPlural: "megameters", base: L_BASE * 10n ** 6n },
	{ id: "nmi", sys: "imperial", labelShort: "nmi", labelLong: "nautical mile", labelLongPlural: "nautical miles", base: L_BASE * 1852n },
	{ id: "mi", sys: "imperial", labelShort: "mi", labelLong: "mile", labelLongPlural: "miles", base: (L_BASE * 1609344n) / 1000n },
	{ id: "km", sys: "metric", labelShort: "km", labelLong: "kilometer", labelLongPlural: "kilometers", base: L_BASE * 1000n },
	{ id: "hm", sys: "metric", labelShort: "hm", labelLong: "hectometer", labelLongPlural: "hectometers", base: L_BASE * 100n },
	{ id: "dam", sys: "metric", labelShort: "dam", labelLong: "decameter", labelLongPlural: "decameters", base: L_BASE * 10n },
	{ id: "m", sys: "metric", labelShort: "m", labelLong: "meter", labelLongPlural: "meters", base: L_BASE },
	{ id: "yd", sys: "imperial", labelShort: "yd", labelLong: "yard", labelLongPlural: "yards", base: (L_BASE * 9144n) / 10000n },
	{ id: "ft", sys: "imperial", labelShort: "ft", labelLong: "foot", labelLongPlural: "feet", base: (L_BASE * 3048n) / 10000n },
	{ id: "dm", sys: "metric", labelShort: "dm", labelLong: "decimeter", labelLongPlural: "decimeters", base: L_BASE / 10n },
	{ id: "in", sys: "imperial", labelShort: "in", labelLong: "inch", labelLongPlural: "inches", base: (L_BASE * 254n) / 10000n },
	{ id: "cm", sys: "metric", labelShort: "cm", labelLong: "centimeter", labelLongPlural: "centimeters", base: L_BASE / 100n },
	{ id: "mm", sys: "metric", labelShort: "mm", labelLong: "millimeter", labelLongPlural: "millimeters", base: L_BASE / 1000n },
	{ id: "thou", sys: "imperial", labelShort: "thou", labelLong: "thou", labelLongPlural: "thou", base: (L_BASE * 254n) / 10000000n },
	{ id: "um", sys: "metric", labelShort: "μm", labelLong: "micrometer", labelLongPlural: "micrometers", base: L_BASE / 10n ** 6n },
	{ id: "nm", sys: "metric", labelShort: "nm", labelLong: "nanometer", labelLongPlural: "nanometers", base: L_BASE / 10n ** 9n },
	{ id: "pm", sys: "metric", labelShort: "pm", labelLong: "picometer", labelLongPlural: "picometers", base: L_BASE / 10n ** 12n },
	{ id: "fm", sys: "metric", labelShort: "fm", labelLong: "femtometer", labelLongPlural: "femtometers", base: L_BASE / 10n ** 15n },
	{ id: "am", sys: "metric", labelShort: "am", labelLong: "attometer", labelLongPlural: "attometers", base: L_BASE / 10n ** 18n },
	{ id: "zm", sys: "metric", labelShort: "zm", labelLong: "zeptometer", labelLongPlural: "zeptometers", base: L_BASE / 10n ** 21n },
	{ id: "ym", sys: "metric", labelShort: "ym", labelLong: "yoctometer", labelLongPlural: "yoctometers", base: L_BASE / 10n ** 24n },
	{ id: "rm", sys: "metric", labelShort: "rm", labelLong: "rontometer", labelLongPlural: "rontometers", base: L_BASE / 10n ** 27n },
	{ id: "qm", sys: "metric", labelShort: "qm", labelLong: "quectometer", labelLongPlural: "quectometers", base: L_BASE / 10n ** 30n },
	{ id: "planckLength", sys: "metric", labelShort: "lP", labelLong: "Planck length", labelLongPlural: "Planck lengths", base: 1616255n * (L_BASE / 10n ** 41n) },
];

function applySeparator(str, locale, separator) {
	if (!separator) {
		return str;
	}

	let groupChar = ",";

	try {
		const parts = new Intl.NumberFormat(locale).formatToParts(10000),
			group = parts.find(p => p.type === "group");

		if (group) {
			groupChar = group.value;
		}
	} catch {}

	return str.split(groupChar).join(separator);
}

const Formatters = {
	default: (val, { locale, options }) => val.toLocaleString(locale, options),
	separated: (val, { locale, options, separator }) => applySeparator(val.toLocaleString(locale, options), locale, separator || "_"),
	scientific: (val, { precision }) => Number(val).toExponential(precision),
	compact: (val, opts) => formatCompact(val, opts.displayMode, opts.locale, opts.options, opts.separator),
	hexadecimal: val => `0x${val.toString(16).toUpperCase()}`,
	octal: val => `0o${val.toString(8)}`,
	binary: val => `0b${val.toString(2)}`,
	base36: val => val.toString(36).toLowerCase(),
	bytes: (val, opts) =>
		formatBytes(val, 1000, { short: ByteSuffixesShort, long: ByteSuffixesLong }, opts.locale, opts.options, opts.displayMode, opts.separator, opts.unitLabels),
	iecBytes: (val, opts) =>
		formatBytes(val, 1024, { short: IECSuffixesShort, long: IECSuffixesLong }, opts.locale, opts.options, opts.displayMode, opts.separator, opts.unitLabels),
	duration: (val, opts) => formatMeasurement(val, timeUnits, opts.durationBaseUnit, opts.displayMode, opts.unitLabels, opts.locale, opts.options, opts.separator),
	length: (val, opts) => formatMeasurement(val, lengthUnits, opts.lengthBaseUnit, opts.displayMode, opts.unitLabels, opts.locale, opts.options, opts.separator),
	fraction: val => formatFraction(val),
	percentage: (val, opts) => `${applySeparator((Number(val) * 100).toLocaleString(opts.locale, opts.options), opts.locale, opts.separator)}%`,
	roman: val => formatRoman(val),
	naturalLanguage: (val, opts) => formatNaturalLanguage(val, opts.displayMode),
	datetime: (_val, opts) => formatDatetime(opts.rawValue, opts.timestampBaseUnit, opts.locale),
	color: (_val, opts) => formatColor(opts.rawValue),
	filePermissions: val => formatFilePermissions(val),
	currency: (_val, opts) => Number(opts.rawValue).toLocaleString(opts.locale, { style: "currency", currency: opts.currencyCode }),
};

export function formatNumber(value) {
	const { format, locale, precision, separator, displayMode, durationBaseUnit, lengthBaseUnit, unitLabels, currencyCode, timestampBaseUnit } = config,
		options = {
			maximumFractionDigits: precision,
		};

	const isNegative = value < 0,
		negativePrefix = isNegative ? "-" : "",
		absValue = isNegative ? -value : value;

	const formatter = Formatters[format] || Formatters.default;

	const result = formatter(absValue, {
		locale: locale,
		options: options,
		separator: separator,
		precision: precision,
		displayMode: displayMode,
		durationBaseUnit: durationBaseUnit,
		lengthBaseUnit: lengthBaseUnit,
		unitLabels: unitLabels,
		currencyCode: currencyCode,
		timestampBaseUnit: timestampBaseUnit,
		rawValue: value,
	});

	if (["naturalLanguage", "duration", "length"].includes(format)) {
		return isNegative ? `negative ${result}` : result;
	}

	if (["datetime", "color", "currency", "filePermissions"].includes(format)) {
		return result;
	}

	return negativePrefix + result;
}

function getMagnitudeSuffix(index, isLong) {
	if (index === 0) {
		return "";
	}

	const standardLong = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion"],
		standardShort = ["", "k", "m", "b", "t", "qdr", "qnt", "sxt", "spt", "oct", "non"];

	if (index < 11) {
		return isLong ? standardLong[index] : standardShort[index];
	}

	const n = index - 1,
		units = n % 10,
		tens = Math.floor(n / 10) % 10,
		hundreds = Math.floor(n / 100) % 10;

	const UNITS = ["", "un", "duo", "tre", "quattuor", "quin", "sex", "septen", "octo", "novem"],
		TENS = ["", "dec", "vigint", "trigint", "quadragint", "quinquagint", "sexagint", "septuagint", "octogint", "nonagint"],
		HUNDREDS = ["", "cent", "ducent", "trecent", "quadringent", "quingent", "sescent", "septingent", "octingent", "nongent"];

	const suffix = `${UNITS[units] + TENS[tens] + HUNDREDS[hundreds]}illion`;

	if (isLong) {
		return suffix;
	}

	let short = "";

	if (units) {
		short += UNITS[units][0];
	}

	if (tens) {
		short += TENS[tens][0];
	}

	if (hundreds) {
		short += HUNDREDS[hundreds][0];
	}

	return short || "z";
}

function formatCompact(val, displayMode, locale, localeOptions, separator) {
	if (val === 0 || val === 0n) {
		return "0";
	}

	const numVal = Number(val),
		suffixIndex = Math.floor(Math.log10(numVal) / 3),
		isLong = displayMode === "full",
		suffixString = (isLong ? " " : "") + getMagnitudeSuffix(suffixIndex, isLong);

	const formattedNum = applySeparator((numVal / Math.pow(10, suffixIndex * 3)).toLocaleString(locale, localeOptions), locale, separator);

	return formattedNum + suffixString;
}

function formatBytes(val, power, suffixes, locale, localeOptions, displayMode, separator, labelFormat) {
	const isLong = labelFormat === "long";

	function getSuffix(index, count) {
		if (!isLong) {
			return suffixes.short[index];
		}

		const base = suffixes.long[index];

		return count === 1 || count === 1n ? base : `${base}s`;
	}

	if (val === 0 || val === 0n) {
		return `0 ${getSuffix(0, 0)}`;
	}

	if (displayMode === "short") {
		const numVal = Number(val);

		let suffixIndex = Math.floor(Math.log(numVal) / Math.log(power));

		suffixIndex = Math.max(0, Math.min(suffixIndex, suffixes.short.length - 1));

		const count = numVal / Math.pow(power, suffixIndex),
			formattedNum = applySeparator(count.toLocaleString(locale, localeOptions), locale, separator);

		return `${formattedNum} ${getSuffix(suffixIndex, count)}`;
	}

	let bigValue;

	try {
		bigValue = typeof val === "bigint" ? val : BigInt(Math.trunc(val));
	} catch {
		return "too large";
	}

	const bigPower = BigInt(power),
		parts = [];

	for (let i = suffixes.short.length - 1; i >= 0; i--) {
		const unitValue = bigPower ** BigInt(i),
			count = bigValue / unitValue;

		if (count > 0n) {
			const formattedCount = applySeparator(Number(count).toLocaleString(locale), locale, separator);

			parts.push(`${formattedCount} ${getSuffix(i, count)}`);

			bigValue %= unitValue;
		}
	}

	return parts.length > 0 ? parts.join(" ") : `0 ${getSuffix(0, 0)}`;
}

function formatMeasurement(val, unitMap, baseUnitId, displayMode, labelFormat, locale, localeOptions, separator) {
	const baseUnitDef = unitMap.find(u => u.id === baseUnitId) || unitMap[Math.floor(unitMap.length / 2)];

	if (val === 0 || val === 0n) {
		const label = labelFormat === "long" ? baseUnitDef.labelLongPlural : baseUnitDef.labelShort;

		return `0${labelFormat === "long" ? " " : ""}${label}`;
	}

	let totalBaseUnits;

	if (typeof val === "bigint") {
		totalBaseUnits = val * baseUnitDef.base;
	} else {
		totalBaseUnits = BigInt(Math.trunc(val * Number(baseUnitDef.base)));
	}

	if (displayMode === "short") {
		let numVal = Number(totalBaseUnits),
			targetUnit = unitMap[unitMap.length - 1];

		for (const unit of unitMap) {
			if (numVal >= Number(unit.base)) {
				targetUnit = unit;
				break;
			}
		}

		const count = numVal / Number(targetUnit.base),
			isPlural = count !== 1,
			label = labelFormat === "long" ? (isPlural ? targetUnit.labelLongPlural : targetUnit.labelLong) : targetUnit.labelShort,
			space = labelFormat === "long" ? " " : "";

		const formattedCount = applySeparator(count.toLocaleString(locale, localeOptions), locale, separator);

		return `${formattedCount}${space}${label}`;
	}

	const parts = [],
		validUnits = baseUnitDef.sys ? unitMap.filter(u => u.sys === baseUnitDef.sys || u.sys === "astro") : unitMap;

	let remaining = totalBaseUnits;

	for (const unit of validUnits) {
		const count = remaining / unit.base;

		if (count > 0n) {
			const isPlural = count !== 1n,
				label = labelFormat === "long" ? (isPlural ? unit.labelLongPlural : unit.labelLong) : unit.labelShort,
				space = labelFormat === "long" ? " " : "";

			const formattedCount = applySeparator(Number(count).toLocaleString(locale), locale, separator);

			parts.push(`${formattedCount}${space}${label}`);

			remaining %= unit.base;
		}
	}

	return parts.length > 0 ? parts.join(" ") : "";
}

function formatNaturalLanguage(val, displayMode) {
	if (val === 0 || val === 0n) {
		return "zero";
	}

	let bigValue;

	try {
		bigValue = typeof val === "bigint" ? val : BigInt(Math.trunc(val));
	} catch {
		return "too large";
	}

	function _numToLanguage(num) {
		if (num < 10) {
			return NaturalNumbers[num];
		}

		if (num < 20) {
			return NaturalTeens[num - 10];
		}

		return NaturalTens[Math.floor(num / 10)] + (num % 10 ? `-${NaturalNumbers[num % 10]}` : "");
	}

	function _formatPartial(num, suffix) {
		const hundreds = Math.floor(num / 100),
			tens = num % 100,
			hundredStr = hundreds > 0 ? `${_numToLanguage(hundreds)} hundred` : "",
			tenStr = tens > 0 ? _numToLanguage(tens) : "";

		return `${hundredStr} ${tenStr} ${suffix}`.trim().replace(/\s+/g, " ");
	}

	const parts = [];

	let magnitude = 0;

	while (bigValue > 0n) {
		const part = Number(bigValue % 1000n),
			suffix = getMagnitudeSuffix(magnitude, true);

		if (part > 0) {
			parts.unshift(_formatPartial(part, suffix));
		}

		bigValue /= 1000n;
		magnitude++;
	}

	return displayMode === "full" ? parts.join(" ") : parts[0].trim();
}

function formatRoman(val) {
	const num = Number(val);

	if (num < 1 || num > 3999 || !Number.isInteger(num)) {
		return "Out of range (1-3999)";
	}

	const romanMap = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };

	let result = "",
		tempNum = num;

	for (const key in romanMap) {
		const count = Math.floor(tempNum / romanMap[key]);

		tempNum -= count * romanMap[key];

		result += key.repeat(count);
	}

	return result;
}

function formatFraction(val) {
	const num = Number(val);

	if (num === 0) {
		return "0";
	}

	const whole = Math.floor(num),
		decimal = num - whole;

	if (decimal < 0.000001) {
		return `${whole}`;
	}

	let h1 = 1,
		h2 = 0,
		k1 = 0,
		k2 = 1,
		b = decimal;

	do {
		const a = Math.floor(b);

		let aux = h1;
		h1 = a * h1 + h2;
		h2 = aux;

		aux = k1;
		k1 = a * k1 + k2;
		k2 = aux;

		b = 1 / (b - a);
	} while (Math.abs(decimal - h1 / k1) > 0.000001 && k1 < 10000);

	if (whole === 0) {
		return `${h1}/${k1}`;
	}

	return `${whole} ${h1}/${k1}`;
}

function formatDatetime(val, baseUnit, locale) {
	let ms = Number(val);

	if (baseUnit === "s") {
		ms *= 1000;
	}

	const date = new Date(ms);

	if (Number.isNaN(date.getTime())) {
		return "Invalid date";
	}

	return date.toLocaleString(locale, {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
}

function formatColor(val) {
	if (val < 0 || val > 0xffffffff) {
		return "Invalid color";
	}

	const num = Number(val);

	const hex = num.toString(16).toUpperCase();

	if (num <= 0xffffff) {
		return `#${hex.padStart(6, "0")}`;
	}

	return `#${hex.padStart(8, "0")}`;
}

function formatFilePermissions(val) {
	const num = Math.trunc(Number(val)),
		octalStr = num.toString(8).slice(-3).padStart(3, "0"),
		map = ["---", "--x", "-w-", "-wx", "r--", "r-x", "rw-", "rwx"];

	let result = "";

	for (const char of octalStr) {
		result += map[parseInt(char, 10)] || "---";
	}

	return result;
}
