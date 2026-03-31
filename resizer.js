const fileInputR = document.getElementById('file-input');
const dragDropR = document.getElementById('drag-drop');
const resizeBtn = document.getElementById('resize-btn');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const previewImgR = document.getElementById('preview-img');
const resultBoxR = document.getElementById('result-box');
let uploadedFileR;

fileInputR.addEventListener('change', e=>{ uploadedFileR=e.target.files[0]; preview(uploadedFileR); });
dragDropR.addEventListener('click',()=>fileInputR.click());
dragDropR.addEventListener('dragover', e=>{ e.preventDefault(); dragDropR.style.background='#f0fff0'; });
dragDropR.addEventListener('dragleave', ()=>{ dragDropR.style.background='#fff'; });
dragDropR.addEventListener('drop', e=>{ e.preventDefault(); uploadedFileR=e.dataTransfer.files[0]; fileInputR.files=e.dataTransfer.files; preview(uploadedFileR); });

function preview(file){
    const reader = new FileReader();
    reader.onload=()=>{ previewImgR.src=reader.result; previewImgR.style.display='block'; };
    reader.readAsDataURL(file);
}

resizeBtn.addEventListener('click', ()=>{
    if(!uploadedFileR){ alert('Upload an image first!'); return; }
    const w = parseInt(widthInput.value);
    const h = parseInt(heightInput.value);
    if(!w || !h){ alert('Enter valid width and height'); return; }
    const img=new Image();
    const reader=new FileReader();
    reader.onload=e=>{
        img.src=e.target.result;
        img.onload=()=>{
            const canvas=document.createElement('canvas');
            canvas.width=w; canvas.height=h;
            const ctx=canvas.getContext('2d'); ctx.drawImage(img,0,0,w,h);
            canvas.toBlob(blob=>{
                const link=document.createElement('a'); link.href=URL.createObjectURL(blob);
                link.download='resized_'+uploadedFileR.name; link.click();
                resultBoxR.innerHTML=`Resized to ${w}x${h}px`;
            }, uploadedFileR.type, 1);
        };
    };
    reader.readAsDataURL(uploadedFileR);
});
