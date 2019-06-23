window.onload = function () {

    const addAttribute = function () {
        document.documentElement.setAttribute('data-theme', 'dark')
        document.documentElement.classList.add('color-theme-in-transition')
        window.setTimeout(function () {
            document.documentElement.classList.remove('color-theme-in-transition')
        }, 800)
    }

    const removeAttribute = function () {
        document.documentElement.setAttribute('data-theme', 'light')
        document.documentElement.classList.add('color-theme-in-transition')
        window.setTimeout(function () {
            document.documentElement.classList.remove('color-theme-in-transition')
        }, 750)
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
    }

    // -- put your code here
}