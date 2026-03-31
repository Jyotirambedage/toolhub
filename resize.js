function resize() {
  let file = document.getElementById("upload").files[0];
  let w = document.getElementById("w").value;
  let h = document.getElementById("h").value;

  let reader = new FileReader();

  reader.onload = function(e) {
    let img = new Image();
    img.src = e.target.result;

    img.onload = function() {
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");

      canvas.width = w;
      canvas.height = h;

      ctx.drawImage(img, 0, 0, w, h);

      let link = document.getElementById("downloadBtn");
      link.href = canvas.toDataURL();
      link.download = "resized.png";
      link.style.display = "inline";
    }
  };

  reader.readAsDataURL(file);
}
