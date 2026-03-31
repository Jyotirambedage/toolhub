function compress() {
  let file = document.getElementById("upload").files[0];
  let q = document.getElementById("q").value;

  let reader = new FileReader();

  reader.onload = function(e) {
    let img = new Image();
    img.src = e.target.result;

    img.onload = function() {
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      let dataUrl = canvas.toDataURL("image/jpeg", q);

      let newSize = Math.round(dataUrl.length / 1024);
      let oldSize = Math.round(file.size / 1024);

      document.getElementById("sizes").innerText =
        "Original: " + oldSize + "KB | Compressed: " + newSize + "KB";

      let link = document.getElementById("downloadBtn");
      link.href = dataUrl;
      link.download = "compressed.jpg";
      link.style.display = "inline";
    }
  };

  reader.readAsDataURL(file);
}
