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

      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        function (blob) {
          let url = URL.createObjectURL(blob);

          let btn = document.getElementById("downloadBtn");
          btn.href = url;
          btn.download = "image.jpg";
          btn.style.display = "inline";
        },
        "image/jpeg",
        0.9
      );
    };
  };
  reader.readAsDataURL(file);
}
