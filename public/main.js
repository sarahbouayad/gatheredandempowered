// dcode youtube git code

const inpFile = document.getElementById("inpFile");
const btnUpload = document.getElementById("btnUpload");
const resultText = document.getElementById("resultText");
const translatedText = document.getElementById("translatedText");
const translateBtn = document.getElementById("translateBtn");
const lang = document.querySelector(".lang")


// upload button
btnUpload.addEventListener("click", () => {
    const formData = new FormData();

    formData.append("pdfFile", inpFile.files[0]);

    fetch("/convert/postText", {
        method: "POST",
        body: formData
    }).then(response => {
        return response.text();
    }).then(extractedText => {
        resultText.innerText = extractedText.trim();
        console.log(extractedText)
    });
});

// translate button
translateBtn.addEventListener("click", () => {
    console.log(resultText.innerHTML)
    fetch("/convert/getTranslate", {
        method: "POST",
        body: JSON.stringify({
           translatedText: resultText.innerHTML,
           lang: lang.value 
        })
    }).then(response => {
        return response.text();
    }).then(extractedText => {
        console.log(extractedText)
        translatedText.innerHTML = extractedText.trim();
    });
});


