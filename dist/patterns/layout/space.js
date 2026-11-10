export const SPACE = {
    none: '0',
    xs: 'var(--space-1)',
    sm: 'var(--space-2)',
    md: 'var(--space-4)',
    lg: 'var(--space-6)',
    xl: 'var(--space-8)',
    '2xl': 'var(--space-12)',
};
export const space = (step) => step === undefined ? undefined : SPACE[step];
const JUSTIFY = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
};
const ALIGN = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
    baseline: 'baseline',
};
export const justifyValue = (j) => j === undefined ? undefined : JUSTIFY[j];
export const alignValue = (a) => a === undefined ? undefined : ALIGN[a];
