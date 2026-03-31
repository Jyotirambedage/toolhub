const fileInput = document.getElementById('file-input');
const dragDrop = document.getElementById('drag-drop');
const compressBtn = document.getElementById('compress-btn');
const qualitySlider = document.getElementById('quality');
const previewImg = document.getElementById('preview-img');
const resultBox = document.getElementById('result-box');
let uploadedFile;

fileInput.addEventListener('change', e => { uploadedFile = e.target.files[0]; preview(uploadedFile); });
dragDrop.addEventListener('click', () => fileInput.click());
dragDrop.addEventListener('dragover', e => { e.preventDefault(); dragDrop.style.background='#f0fff0'; });
dragDrop.addEventListener('dragleave', () => { dragDrop.style.background='#fff'; });
dragDrop.addEventListener('drop', e => { e.preventDefault(); uploadedFile = e.dataTransfer.files[0]; fileInput.files = e.dataTransfer.files; preview(uploadedFile); });

function preview(file){
    const reader = new FileReader();
    reader.onload = () => { previewImg.src = reader.result; previewImg.style.display='block'; };
    reader.readAsDataURL(file);
}

compressBtn.addEventListener('click', ()=>{
    if(!uploadedFile){ alert('Upload an image first!'); return; }
    const quality = qualitySlider.value/100;
    const img = new Image();
    const reader = new FileReader();
    reader.onload = e=>{
        img.src = e.target.result;
        img.onload = ()=>{
            const canvas=document.createElement('canvas');
            canvas.width=img.width; canvas.height=img.height;
            const ctx=canvas.getContext('2d'); ctx.drawImage(img,0,0);
            canvas.toBlob(blob=>{
                const link=document.createElement('a'); link.href=URL.createObjectURL(blob);
                link.download='compressed_'+uploadedFile.name; link.click();
                resultBox.innerHTML=`Original: ${(uploadedFile.size/1024).toFixed(2)} KB | Compressed: ${(blob.size/1024).toFixed(2)} KB`;
            }, uploadedFile.type, quality);
        };
    };
    reader.readAsDataURL(uploadedFile);
});
