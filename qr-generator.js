const textInput = document.getElementById('text-input');
const generateBtn = document.getElementById('generate-btn');
const qrPreview = document.getElementById('qr-preview');

generateBtn.addEventListener('click', ()=>{
    qrPreview.innerHTML='';
    if(!textInput.value){ alert('Enter text or URL!'); return; }
    new QRCode(qrPreview, { text:textInput.value, width:200, height:200 });
});
