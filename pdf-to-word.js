async function convert() {
  let file = document.getElementById("upload").files[0];

  if (!file) {
    alert("Please upload PDF first");
    return;
  }

  let reader = new FileReader();

  reader.onload = async function (e) {
    let typedarray = new Uint8Array(e.target.result);

    let pdf = await pdfjsLib.getDocument(typedarray).promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      let page = await pdf.getPage(i);
      let content = await page.getTextContent();

      let strings = content.items.map((item) => item.str);
      fullText += strings.join(" ") + "\n\n";
    }

    // Create Word file
    let blob = new Blob([fullText], { type: "application/msword" });
    let url = URL.createObjectURL(blob);

    let downloadBtn = document.getElementById("downloadBtn");
    downloadBtn.href = url;
    downloadBtn.download = "converted.doc";
    downloadBtn.style.display = "inline";
  };

  reader.readAsArrayBuffer(file);
}
