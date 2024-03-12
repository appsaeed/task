import { deviceTheme } from "appmon/detection";
import { getThemeStore } from "appmon/storage";
import { adslash, unslash } from "appmon/url";
import logo from '/logo.png';

const settings = {

    name: import.meta.env.VITE_NAME || "Appsaeed",

    dev: import.meta.env.DEV,

    logo,

    basename: unslash(import.meta.env.VITE_BASENAME || ""),

    url: adslash(location.origin) + unslash(import.meta.env.BASE_URL),

    theme_key: import.meta.env.VITE_THEME_STORAGE,

    theme: getThemeStore(import.meta.env.VITE_THEME_STORAGE) || deviceTheme(),
};

export type Settings = typeof settings;
export default settings