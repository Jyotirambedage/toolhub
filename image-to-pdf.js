async function convert() {
  let files = document.getElementById("upload").files;

  if (files.length === 0) {
    alert("Upload images");
    return;
  }

  const { jsPDF } = window.jspdf;
  let pdf = new jsPDF();

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    let reader = new FileReader();

    await new Promise((resolve) => {
      reader.onload = function (e) {
        let img = new Image();
        img.src = e.target.result;

        img.onload = function () {
          if (i !== 0) pdf.addPage();
          pdf.addImage(img, "JPEG", 10, 10, 180, 160);
          resolve();
        };
      };
      reader.readAsDataURL(file);
    });
  }

  let blob = pdf.output("blob");
  let url = URL.createObjectURL(blob);

  let btn = document.getElementById("downloadBtn");
  btn.href = url;
  btn.download = "images.pdf";
  btn.style.display = "inline";
}
