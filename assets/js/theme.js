window.onload = function () {

    const addAttribute = function () {
        document.documentElement.setAttribute('data-theme', 'dark')
        document.documentElement.classList.add('color-theme-in-transition')
        window.setTimeout(function () {
            document.documentElement.classList.remove('color-theme-in-transition')
        }, 50)
    }

    const removeAttribute = function () {
        document.documentElement.setAttribute('data-theme', 'light')
        document.documentElement.classList.add('color-theme-in-transition')
        window.setTimeout(function () {
            document.documentElement.classList.remove('color-theme-in-transition')
        }, 50)
    }

    // addAttribute()


    const themeSwitcher = document.getElementById('theme-switcher-input')

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
        console.log(document.cookie)
    }
}

// function togglePageContentLightDark() {
//     var body = document.getElementById('body')
//     var currentClass = body.className
//     var newClass = body.className == 'dark-mode' ? 'light-mode' : 'dark-mode'
//     body.className = newClass

//     document.cookie = 'theme=' + (newClass == 'light-mode' ? 'light' : 'dark')
//     console.log('Cookies are now: ' + document.cookie)
// }


// document.cookie = 'theme=' + themeAttr
// console.log(document.cookie)


// function isDarkThemeSelected() {
//     return document.cookie.match(/theme=dark/i) != null
//     console.log(i)
// }

// function setThemeFromCookie() {
//     let theme = isDarkThemeSelected() ? 'dark' : 'light'
//     document.documentElement.setAttribute('data-theme', theme)
//     console.log(theme)
// }

// (function () {
//     setThemeFromCookie()
// })();