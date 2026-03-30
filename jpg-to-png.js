document.getElementById("tool").innerHTML = `
<input type="file" id="upload"><br><br>
<button onclick="convert()">Convert</button>
<canvas id="canvas"></canvas><br>
<a id="downloadBtn" style="display:none;"><button>Download</button></a>
`;

function convert() {
  let file = document.getElementById("upload").files[0];
  let reader = new FileReader();

  reader.onload = function (e) {
    let img = new Image();
    img.src = e.target.result;

    img.onload = function () {
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      let data = canvas.toDataURL("image/png");

      let btn = document.getElementById("downloadBtn");
      btn.href = data;
      btn.download = "image.png";
      btn.style.display = "inline";
    };
  };
  reader.readAsDataURL(file);
}
