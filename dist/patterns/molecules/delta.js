/** Direction of a numeric change, or of a printed one ("+12 %", "−3"). */
export function deltaDirection(delta) {
    if (delta == null)
        return 'flat';
    if (typeof delta === 'number')
        return delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat';
    if (/^\s*\+/.test(delta))
        return 'up';
    if (/^\s*[-−–]/.test(delta))
        return 'down';
    return 'flat';
}
export function deltaTone(direction, goodWhen) {
    if (direction === 'flat' || goodWhen === 'none')
        return 'neutral';
    return direction === goodWhen ? 'good' : 'bad';
}
/** A relative change in percent, signed: "+12 %", "−3.5 %". */
export function formatDelta(delta, locale = 'en') {
    return `${new Intl.NumberFormat(locale, {
        signDisplay: 'exceptZero',
        maximumFractionDigits: 1,
    }).format(delta)} %`;
}
