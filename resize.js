function resize() {
  let file = document.getElementById("upload").files[0];

  if (!file) {
    alert("Upload image first");
    return;
  }

  let width = document.getElementById("width").value;
  let height = document.getElementById("height").value;

  let reader = new FileReader();

  reader.onload = function (e) {
    let img = new Image();
    img.src = e.target.result;

    img.onload = function () {
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");

      canvas.width = width || img.width;
      canvas.height = height || img.height;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        function (blob) {
          let url = URL.createObjectURL(blob);

          let btn = document.getElementById("downloadBtn");
          btn.href = url;
          btn.download = "resized.jpg";
          btn.style.display = "inline";
        },
        "image/jpeg",
        0.9
      );
    };
  };

  reader.readAsDataURL(file);
}
