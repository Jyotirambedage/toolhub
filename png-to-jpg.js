const fileInputP = document.getElementById('file-input');
const dragDropP = document.getElementById('drag-drop');
const convertBtnP = document.getElementById('convert-btn');
const previewImgP = document.getElementById('preview-img');
let uploadedFileP;

fileInputP.addEventListener('change', e=>{ uploadedFileP=e.target.files[0]; preview(uploadedFileP); });
dragDropP.addEventListener('click',()=>fileInputP.click());
dragDropP.addEventListener('dragover', e=>{ e.preventDefault(); dragDropP.style.background='#f0fff0'; });
dragDropP.addEventListener('dragleave', ()=>{ dragDropP.style.background='#fff'; });
dragDropP.addEventListener('drop', e=>{ e.preventDefault(); uploadedFileP=e.dataTransfer.files[0]; fileInputP.files=e.dataTransfer.files; preview(uploadedFileP); });

function preview(file){
    const reader = new FileReader();
    reader.onload=()=>{ previewImgP.src=reader.result; previewImgP.style.display='block'; };
    reader.readAsDataURL(file);
}

convertBtnP.addEventListener('click', ()=>{
    if(!uploadedFileP){ alert('Upload a PNG first!'); return; }
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
                link.download=uploadedFileP.name.replace('.png','.jpg'); link.click();
            }, 'image/jpeg', 0.9);
        };
    };
    reader.readAsDataURL(uploadedFileP);
});
