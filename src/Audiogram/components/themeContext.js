import { createContext } from 'react';

const ThemeContext = createContext();

export default ThemeContext;

export const defaultTheme = {
    darkGray: '#333333',
    mediumGray: '#696969',
    lightGray: '#c9c9c9',
    red: '#ec1141',
    blue: '#4111ec',
    font: 'Arial',
    fontSize: 10,
};
