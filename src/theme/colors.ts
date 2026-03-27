const colors: {
    primary: string,
    secondary: string,

    onPrimary: string,
    lightPrimary: string,

    bgLight: string,
    bg: string,
    bgDark: string,

    text: string,
    textMuted: string,

    success: string,
    danger: string,

    border: string,
    shadow: string,
    
    gradientPrimary: [string, string, ...string[]];
} = {
    primary: 'hsla(210, 100%, 50%, 1.0)',
    secondary: 'hsla(36, 100%, 50%, 1.0)',

    onPrimary: 'hsla(0, 0%, 95%, 1.0)',
    lightPrimary: 'hsla(210, 100%, 60%, 1.0)',

    bgLight: 'hsla(0, 0%, 100%, 1.0)',
    bg: 'hsla(0, 0%, 95%, 1.0)',
    bgDark: 'hsla(0, 0%, 90%, 1.0)',

    text: 'hsla(0, 0%, 5%, 1.0)',
    textMuted: 'hsla(0, 0%, 30%, 1.0)',

    border: 'hsla(0, 0%, 75%, 1.0)',
    shadow: 'hsla(0, 0%, 0%, 1.0)',

    success: 'hsl(118, 64%, 49%)',
    danger: 'hsla(15, 100%, 50%, 1.0)',

    gradientPrimary: ['hsla(46, 100%, 50%, 1.0)', 'hsla(20, 100%, 50%, 1.0)']
};

export default colors;