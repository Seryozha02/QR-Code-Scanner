scannerApp = document.querySelector(".scanner")
form = document.querySelector("form")
inputImg = document.querySelector("input")
headerText = document.querySelector(".content p")
infoText = document.querySelector(".details textarea")
userQrImage = document.querySelector("img")
closeBtn = document.querySelector(".close")
copyBtn = document.querySelector(".copy")


function fetchRequest(formData, file) {
    headerText.innerText = "Scanning QR code"
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    }).then(response => response.json()).then(result => {
        result = result[0].symbol[0].data
        headerText.innerText = result ? "Upload QR code image for scanning" : "Couldn't scan the QR image"
        if(!result) return;
        userQrImage.src = URL.createObjectURL(file)
        infoText.innerText = result
        scannerApp.classList.add("active")
    }).catch(error => {
        headerText.innerText = "Couldn't scan the QR image"
    })
}


inputImg.addEventListener("change", e => {
    let file = e.target.files[0]
    if(!file) return
    let formData = new FormData()
    formData.append("file", file)
    fetchRequest(formData, file)
})

form.addEventListener("click", () => {
    return inputImg.click()
})

closeBtn.addEventListener("click", () => {
    scannerApp.classList.remove("active")

})

copyBtn.addEventListener("click", () => {
    let text = infoText.textContent
    navigator.clipboard.writeText(text)
})