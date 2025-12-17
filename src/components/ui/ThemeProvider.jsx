import { createContext, useContext, useEffect, useState } from 'react';

const ThemeProviderContext = createContext();

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme" }) {
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem(storageKey) || defaultTheme;
        } catch {
            return defaultTheme;
        }
    });

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    const value = {
        theme,
        setTheme: (theme) => {
            try {
                localStorage.setItem(storageKey, theme);
            } catch {
                console.warn('Failed to save theme to localStorage');
            }
            setTheme(theme);
        },
    };

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};
