import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Toggle Theme"
        >
            <div className="relative w-5 h-5">
                <Sun className="h-5 w-5 absolute top-0 left-0 transition-all scale-100 rotate-0 dark:scale-0 dark:rotate-90" />
                <Moon className="h-5 w-5 absolute top-0 left-0 transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
            </div>
        </button>
    )
}
