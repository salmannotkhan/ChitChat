function darkMode() {
    status = document.body.classList.toggle("dark")
    localStorage.setItem("darkmode", status)
    console.log(status)
    if (status == "true") {
        darkBtn.src = "static/images/sun-icon.webp"
        return status
    }
    darkBtn.src = "static/images/moon-icon.webp"
    return status
}

if (localStorage.getItem('darkmode') == "false") {
    darkMode()
}