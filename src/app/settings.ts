import { deviceTheme } from "appmon/detection";
import { getThemeStore } from "appmon/storage";
import { unslash } from "appmon/url";

export default {
    name: import.meta.env.VITE_NAME || "Appsaeed",
    dev: import.meta.env.DEV,
    basename: unslash(import.meta.env.VITE_BASENAME || ""),
    url: unslash(import.meta.env.BASE_URL),
    theme_key: import.meta.env.VITE_THEME_STORAGE,
    theme: getThemeStore(import.meta.env.VITE_THEME_STORAGE) || deviceTheme(),
};