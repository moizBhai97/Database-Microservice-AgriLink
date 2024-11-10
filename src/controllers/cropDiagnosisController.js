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
            const { cropImage, healthStatus, predictedDiseases, suggestedActions } = req.body;
            const diagnosis = new CropDiagnosis({ cropImage, healthStatus, predictedDiseases, suggestedActions });
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
            const { cropImage, healthStatus, predictedDiseases, suggestedActions } = req.body;
            const diagnosis = await CropDiagnosis.findByIdAndUpdate(
                req.params.id,
                { cropImage, healthStatus, predictedDiseases, suggestedActions },
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
    },

    async addSuggestedAction(req, res, next) {
        try {
            const { resource, usageInstructions } = req.body;
            const diagnosis = await CropDiagnosis.findById(req.params.id);
            if (!diagnosis) {
                return next({ status: 404, message: 'Diagnosis not found' });
            }
            diagnosis.suggestedActions.push({ resource, usageInstructions });
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

    async updateSuggestedAction(req, res, next) {
        try {
            const { actionId, usageInstructions } = req.body;
            const diagnosis = await CropDiagnosis.findById(req.params.id);
            if (!diagnosis) {
                return next({ status: 404, message: 'Diagnosis not found' });
            }
            const action = diagnosis.suggestedActions.id(actionId);
            if (!action) {
                return next({ status: 404, message: 'Suggested action not found' });
            }
            action.usageInstructions = usageInstructions;
            await diagnosis.save();
            res.json(diagnosis);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteSuggestedAction(req, res, next) {
        try {
            const { actionId } = req.params;
            const diagnosis = await CropDiagnosis.findById(req.params.id);
            if (!diagnosis) {
                return next({ status: 404, message: 'Diagnosis not found' });
            }
            const action = diagnosis.suggestedActions.id(actionId);
            if (!action) {
                return next({ status: 404, message: 'Suggested action not found' });
            }
            action.remove();
            await diagnosis.save();
            res.json(diagnosis);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = cropDiagnosisController;