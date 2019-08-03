const LOCAL_STORAGE_THEME = "theme.mode"
let currentTheme


if (localStorage.getItem(LOCAL_STORAGE_THEME)) {
    currentTheme = localStorage.getItem(LOCAL_STORAGE_THEME)
} else {
    currentTheme = 'light'
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_THEME, currentTheme)
}
document.documentElement.setAttribute('data-theme', currentTheme)


window.onload = function () {
    const themeSwitcher = document.getElementById('theme-switcher-input')


    if (currentTheme === "dark") {
        themeSwitcher.setAttribute('checked', true)
    }

    const addAttribute = function () {
        document.documentElement.setAttribute('data-theme', 'dark')
        document.documentElement.classList.add('color-theme-in-transition')
        window.setTimeout(function () {
            document.documentElement.classList.remove('color-theme-in-transition')
        }, 1000)
        currentTheme = 'dark'
        save()
    }

    const removeAttribute = function () {
        document.documentElement.setAttribute('data-theme', 'light')
        document.documentElement.classList.add('color-theme-in-transition')
        window.setTimeout(function () {
            document.documentElement.classList.remove('color-theme-in-transition')
        }, 50)
        currentTheme = 'light'
        save()
    }

    // addAttribute()

    themeSwitcher.addEventListener("change", function () {
        isChecked()
    });

    function isChecked() {
        let isChecked = themeSwitcher.checked
        if (isChecked) {
            addAttribute()
        } else {
            removeAttribute()
        }
    }
}