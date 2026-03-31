const fileInputIP = document.getElementById('file-input');
const convertBtnIP = document.getElementById('convert-btn');

convertBtnIP.addEventListener('click', ()=>{
    if(!fileInputIP.files.length){ alert('Upload images first!'); return; }
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const files = Array.from(fileInputIP.files);
    let count = 0;
    files.forEach((file, idx)=>{
        const reader = new FileReader();
        reader.onload = e=>{
            const img = new Image(); img.src=e.target.result;
            img.onload = ()=>{
                const w = pdf.internal.pageSize.getWidth();
                const h = (img.height * w)/img.width;
                if(idx>0) pdf.addPage();
                pdf.addImage(img, 'JPEG', 0, 0, w, h);
                count++; if(count===files.length) pdf.save('images.pdf');
            };
        };
        reader.readAsDataURL(file);
    });
});
