function generate() {
  let text = document.getElementById("text").value;

  if (!text) {
    alert("Enter text");
    return;
  }

  let img = document.getElementById("qrImg");

  img.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
    encodeURIComponent(text);
  img.style.display = "block";
}
