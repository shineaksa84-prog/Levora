import { collection, addDoc, updateDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { geminiService } from '../ai/gemini';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set PDF.js worker from CDN for ease of use in browser
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

/**
 * Resume Parser Service
 * Handles resume upload, parsing, and candidate profile creation
 */
class ResumeParserService {
    constructor() {
        this.candidatesCollection = 'candidates';
    }

    /**
     * Parse resume file and create candidate profile
     */
    async parseAndCreateCandidate(file, metadata = {}) {
        try {
            // Read file content
            const resumeText = await this.extractTextFromFile(file);

            // Parse using Gemini
            const parsedData = await geminiService.parseResume(resumeText);

            // Create candidate profile in Firestore
            const candidateData = {
                ...parsedData,
                source: metadata.source || 'manual_upload',
                uploadedAt: new Date().toISOString(),
                status: 'new',
                resumeFileName: file.name,
                resumeFileSize: file.size,
                tags: metadata.tags || [],
                notes: []
            };

            const docRef = await addDoc(collection(db, this.candidatesCollection), candidateData);

            return {
                success: true,
                candidateId: docRef.id,
                data: candidateData
            };
        } catch (error) {
            console.error('Resume parsing error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Bulk parse resumes (for campus drives)
     */
    async bulkParseResumes(files, metadata = {}) {
        const results = [];

        for (const file of files) {
            const result = await this.parseAndCreateCandidate(file, metadata);
            results.push({
                fileName: file.name,
                ...result
            });
        }

        return {
            total: files.length,
            successful: results.filter(r => r.success).length,
            failed: results.filter(r => !r.success).length,
            results
        };
    }

    /**
     * Extract text from file (PDF, DOCX, TXT)
     */
    async extractTextFromFile(file) {
        const fileName = file.name.toLowerCase();

        try {
            if (fileName.endsWith('.pdf')) {
                return await this.extractTextFromPDF(file);
            } else if (fileName.endsWith('.docx')) {
                return await this.extractTextFromDocx(file);
            } else if (fileName.endsWith('.txt')) {
                return await this.extractTextFromTxt(file);
            } else {
                throw new Error('Unsupported file format. Please upload PDF, DOCX, or TXT.');
            }
        } catch (error) {
            console.error('Text extraction failed:', error);
            throw new Error(`Failed to extract text: ${error.message}`);
        }
    }

    /**
     * Helper to extract text from PDF
     */
    async extractTextFromPDF(file) {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
        }

        return fullText;
    }

    /**
     * Helper to extract text from Docx
     */
    async extractTextFromDocx(file) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
    }

    /**
     * Helper to extract text from Txt
     */
    async extractTextFromTxt(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('Failed to read TXT file'));
            reader.readAsText(file);
        });
    }

    /**
     * Update candidate profile with additional parsed data
     */
    async updateCandidateFromResume(candidateId, file) {
        try {
            const resumeText = await this.extractTextFromFile(file);
            const parsedData = await geminiService.parseResume(resumeText);

            const candidateRef = doc(db, this.candidatesCollection, candidateId);
            await updateDoc(candidateRef, {
                ...parsedData,
                lastUpdated: new Date().toISOString()
            });

            return { success: true, data: parsedData };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

export const resumeParserService = new ResumeParserService();
export default ResumeParserService;
