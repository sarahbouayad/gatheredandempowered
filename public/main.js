// dcode youtube git code
const inpFile = document.getElementById("inpFile");
const btnUpload = document.getElementById("btnUpload");
const resultText = document.getElementById("resultText");
const translatedText = document.getElementById("translatedText");
const lang = document.querySelector(".lang");



// toggle collapse

// upload button, pdf-parsed
btnUpload.addEventListener("click", () => {
  const formData = new FormData();

  if (inpFile.files[0].type !== "application/pdf") {
    return alert("Wrong File Type!");
  } else {
    formData.append("pdfFile", inpFile.files[0]);

    formData.test = "this is a test";
    fetch("/convert/postText", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.text();
      })
      .then((extractedText) => {
        resultText.innerHTML = extractedText.trim();
        translation();
        console.log(extractedText);
      });
  }
});

// translate button
function translation() {
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
}

// translated text function to save to DB

function postToDB(text) {
  fetch("/convert/postToDB", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      extractedText: text,
    }),
  })
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((data) => {
      console.log(data);
      window.location.reload(true);
    });
}

// choose file
