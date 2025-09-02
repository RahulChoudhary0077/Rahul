// This makes TypeScript happy about the globals injected by the CDN scripts
declare const PDFLib: any;
declare const saveAs: any;
declare const JSZip: any;

const { PDFDocument, rgb, StandardFonts, degrees } = PDFLib;

async function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

export const processFiles = async (toolId: string, files: File[], options: Record<string, any>) => {
    switch (toolId) {
        case 'merge-pdf':
            await mergePdfs(files);
            break;
        case 'split-pdf':
            await splitPdf(files[0]);
            break;
        case 'rotate-pdf':
            await rotatePdf(files[0], options.rotationAngle);
            break;
        case 'watermark-pdf':
            await watermarkPdf(files[0], options.watermarkText);
            break;
        case 'jpg-to-pdf':
            await jpgToPdf(files);
            break;
        case 'page-number-pdf':
             await addPageNumbers(files[0], options.pageNumberPosition);
             break;
        case 'organise-pdf':
             await organisePdf(files[0], options.pageOrder);
             break;
        case 'protect-pdf':
             await protectPdf(files[0], options.password);
             break;
        case 'unlock-pdf':
             await unlockPdf(files[0], options.password);
             break;
        default:
            throw new Error("This tool is not yet implemented on the client-side.");
    }
};

async function mergePdfs(files: File[]) {
    // ... (no changes)
}

async function splitPdf(file: File) {
    // ... (no changes)
}

async function rotatePdf(file: File, angle: number) {
    // ... (no changes)
}

async function watermarkPdf(file: File, text: string) {
    // ... (no changes)
}

async function jpgToPdf(files: File[]) {
    // ... (no changes)
}

async function addPageNumbers(file: File, position: string) {
    // ... (no changes)
}

async function organisePdf(file: File, pageOrder: number[]) {
    if (!file) throw new Error("Please select a PDF file to organise.");
    if (!pageOrder || pageOrder.length === 0) throw new Error("No pages selected to save.");
    
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdf = await PDFDocument.load(arrayBuffer);
    
    const newPdf = await PDFDocument.create();
    const copiedPages = await newPdf.copyPages(pdf, pageOrder);
    copiedPages.forEach(page => newPdf.addPage(page));
    
    const pdfBytes = await newPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'organised.pdf');
}

async function protectPdf(file: File, password: string) {
    if (!file) throw new Error("Please select a PDF file to protect.");
    if (!password) throw new Error("Please provide a password.");
    
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdf = await PDFDocument.load(arrayBuffer);
    
    const pdfBytes = await pdf.save({
        useObjectStreams: false,
        userPassword: password,
        ownerPassword: password,
        permissions: {
            printing: 'high',
            modifying: false,
            copying: false,
            annotating: false,
            fillingForms: false,
            contentAccessibility: false,
            documentAssembly: false,
        }
    });
    
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'protected.pdf');
}

async function unlockPdf(file: File, password: string) {
    if (!file) throw new Error("Please select a PDF file to unlock.");
    if (!password) throw new Error("Please provide the password to unlock the file.");
    
    try {
        const arrayBuffer = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(arrayBuffer, {
            ownerPassword: password,
            userPassword: password,
        });

        // Re-saving without a password removes the encryption
        const pdfBytes = await pdf.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        saveAs(blob, 'unlocked.pdf');
    } catch (e) {
        if (e instanceof Error && e.message.includes('password')) {
            throw new Error("Incorrect password provided.");
        }
        throw new Error("Could not unlock the PDF. It might be corrupted or use an unsupported encryption.");
    }
}
