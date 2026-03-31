const fileInputPW = document.getElementById('file-input');
const convertBtnPW = document.getElementById('convert-btn');
const resultBoxPW = document.getElementById('result-box');

convertBtnPW.addEventListener('click', async ()=>{
    if(!fileInputPW.files[0]) { alert('Upload PDF first!'); return; }
    const file = fileInputPW.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    const pdf = await pdfjsLib.getDocument({data: arrayBuffer}).promise;
    let text = '';
    for(let i=1;i<=pdf.numPages;i++){
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(i=>i.str).join(' ') + '\n';
    }
    const blob = new Blob([text], {type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
    const link = document.createElement('a'); link.href=URL.createObjectURL(blob);
    link.download=file.name.replace('.pdf','.docx'); link.click();
    resultBoxPW.innerHTML='PDF converted to Word successfully!';
});
