// dcode youtube git code

const inpFile = document.getElementById("inpFile");
const btnUpload = document.getElementById("btnUpload");
const resultText = document.getElementById("resultText");
const translatedText = document.getElementById("translatedText");
const translateBtn = document.getElementById("translateBtn");
const lang = document.querySelector(".lang");

// upload button, pdf-parsed
btnUpload.addEventListener("click", () => {
  const formData = new FormData();

  formData.append("pdfFile", inpFile.files[0]);

  fetch("/convert/postText", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.text();
    })
    .then((extractedText) => {
      resultText.innerHTML = extractedText.trim();
      console.log(extractedText);
    });
});

// translate button
translateBtn.addEventListener("click", () => {
  console.log(resultText.innerHTML);
  fetch("/convert/getTranslate", {
    method: "POST",
    body: JSON.stringify({
      translatedText: resultText.innerHTML,
      lang: lang.value,
    }),
  })
    .then((response) => {
      return response.text();
    })
    .then((extractedText) => {
      console.log(extractedText);
      translatedText.innerHTML = extractedText.trim();

      postToDB(extractedText);
    });
});

// translated text function to save to DB

function postToDB(text) {
  fetch("/convert/postToDB", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      'extractedText': text,
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  });
}
