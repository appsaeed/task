import { baseURL, getThemeStore, systemTheme, unSlash } from 'utilies';
import logo from '/logo.png';

const basename = unSlash(import.meta.env.VITE_BASENAME || "");

function makeScope() {
    return '/' + basename + '/';
}

const settings = {

    name: import.meta.env.VITE_NAME || "Appsaeed",

    dev: import.meta.env.DEV,

    logo,

    basename: basename,

    url: baseURL(basename),

    scope: makeScope(),

    theme_key: import.meta.env.VITE_THEME_STORAGE,

    theme: getThemeStore(import.meta.env.VITE_THEME_STORAGE) || systemTheme,
};

export type Settings = typeof settings;
export default settings