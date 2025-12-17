import { collection, addDoc, updateDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { geminiService } from '../ai/gemini';

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
        // Mock implementation - in production, use libraries like pdf.js or mammoth
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                // For now, just return a mock resume text
                resolve(`
          John Doe
          Software Engineer
          Email: john@example.com
          Phone: +91-9876543210
          
          Skills: JavaScript, React, Node.js, Python, AWS
          
          Experience:
          - Software Engineer at Tech Corp (2020-2023)
          - Junior Developer at StartupXYZ (2018-2020)
          
          Education:
          - B.Tech in Computer Science, IIT Delhi (2018)
        `);
            };
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
