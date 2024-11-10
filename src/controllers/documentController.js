const Document = require('../models/Document');

const documentController = {
    async getAllDocuments(req, res, next) {
        try {
            const documents = await Document.find();
            res.json(documents);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getDocumentById(req, res, next) {
        try {
            const document = await Document.findById(req.params.id);
            if (!document) {
                return next({ status: 404, message: 'Document not found' });
            }
            res.json(document);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createDocument(req, res, next) {
        try {
            const { filename, fileType, fileSize, fileUrl, uploadedBy, metadata } = req.body;
            const document = new Document({ filename, fileType, fileSize, fileUrl, uploadedBy, metadata });
            await document.save();
            res.status(201).json(document);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateDocument(req, res, next) {
        try {
            const { filename, fileType, fileSize, fileUrl, uploadedBy, metadata } = req.body;
            const document = await Document.findByIdAndUpdate(
                req.params.id,
                { filename, fileType, fileSize, fileUrl, uploadedBy, metadata },
                { new: true, runValidators: true }
            );
            if (!document) {
                return next({ status: 404, message: 'Document not found' });
            }
            res.json(document);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteDocument(req, res, next) {
        try {
            const document = await Document.findByIdAndDelete(req.params.id);
            if (!document) {
                return next({ status: 404, message: 'Document not found' });
            }
            res.json(document);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = documentController;