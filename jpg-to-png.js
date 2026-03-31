const fileInputJ = document.getElementById('file-input');
const dragDropJ = document.getElementById('drag-drop');
const convertBtnJ = document.getElementById('convert-btn');
const previewImgJ = document.getElementById('preview-img');
let uploadedFileJ;

fileInputJ.addEventListener('change', e=>{ uploadedFileJ=e.target.files[0]; preview(uploadedFileJ); });
dragDropJ.addEventListener('click',()=>fileInputJ.click());
dragDropJ.addEventListener('dragover', e=>{ e.preventDefault(); dragDropJ.style.background='#f0fff0'; });
dragDropJ.addEventListener('dragleave', ()=>{ dragDropJ.style.background='#fff'; });
dragDropJ.addEventListener('drop', e=>{ e.preventDefault(); uploadedFileJ=e.dataTransfer.files[0]; fileInputJ.files=e.dataTransfer.files; preview(uploadedFileJ); });

function preview(file){
    const reader = new FileReader();
    reader.onload=()=>{ previewImgJ.src=reader.result; previewImgJ.style.display='block'; };
    reader.readAsDataURL(file);
}

convertBtnJ.addEventListener('click', ()=>{
    if(!uploadedFileJ){ alert('Upload a JPG first!'); return; }
    const img=new Image();
    const reader=new FileReader();
    reader.onload=e=>{
        img.src=e.target.result;
        img.onload=()=>{
            const canvas=document.createElement('canvas');
            canvas.width=img.width; canvas.height=img.height;
            const ctx=canvas.getContext('2d'); ctx.drawImage(img,0,0);
            canvas.toBlob(blob=>{
                const link=document.createElement('a'); link.href=URL.createObjectURL(blob);
                link.download=uploadedFileJ.name.replace(/\.(jpg|jpeg)/,'')+'.png'; link.click();
            }, 'image/png');
        };
    };
    reader.readAsDataURL(uploadedFileJ);
});
