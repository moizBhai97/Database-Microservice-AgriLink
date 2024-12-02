const CropDiagnosis = require('../models/CropDiagnosis');

const cropDiagnosisController = {
    async getAllDiagnoses(req, res, next) {
        try {
            const diagnoses = await CropDiagnosis.find();
            res.json(diagnoses);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getDiagnosisById(req, res, next) {
        try {
            const diagnosis = await CropDiagnosis.findById(req.params.id);
            if (!diagnosis) {
                return next({ status: 404, message: 'Diagnosis not found' });
            }
            res.json(diagnosis);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createDiagnosis(req, res, next) {
        try {
            const { cropImage, predictedDisease } = req.body;
            const diagnosis = new CropDiagnosis({ cropImage, predictedDisease });
            await diagnosis.save();
            res.status(201).json(diagnosis);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateDiagnosis(req, res, next) {
        try {
            const { cropImage, predictedDisease } = req.body;
            const diagnosis = await CropDiagnosis.findByIdAndUpdate(
                req.params.id,
                { cropImage, predictedDisease },
                { new: true, runValidators: true }
            );
            if (!diagnosis) {
                return next({ status: 404, message: 'Diagnosis not found' });
            }
            res.json(diagnosis);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteDiagnosis(req, res, next) {
        try {
            const diagnosis = await CropDiagnosis.findByIdAndDelete(req.params.id);
            if (!diagnosis) {
                return next({ status: 404, message: 'Diagnosis not found' });
            }
            res.json(diagnosis);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = cropDiagnosisController;