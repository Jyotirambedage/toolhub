document.getElementById("tool").innerHTML = `
<input type="file" id="upload"><br>
<label>Quality</label>
<input type="range" id="q" min="0.1" max="1" step="0.1" value="0.7"><br>
<button onclick="compress()">Compress</button>
<p id="sizes"></p>
<canvas id="canvas"></canvas><br>
<a id="downloadBtn" style="display:none;"><button>Download</button></a>
`;

function compress() {
  let file = document.getElementById("upload").files[0];
  let reader = new FileReader();

  reader.onload = function (e) {
    let img = new Image();
    img.src = e.target.result;

    img.onload = function () {
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");

      canvas.width = img.width * 0.5;
      canvas.height = img.height * 0.5;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        function (blob) {
          document.getElementById("sizes").innerHTML =
            "Original: " +
            (file.size / 1024).toFixed(2) +
            " KB<br>" +
            "Compressed: " +
            (blob.size / 1024).toFixed(2) +
            " KB";

          let url = URL.createObjectURL(blob);

          let btn = document.getElementById("downloadBtn");
          btn.href = url;
          btn.download = "compressed.jpg";
          btn.style.display = "inline";
        },
        "image/jpeg",
        0.7
      );
    };
  };
  reader.readAsDataURL(file);
}
