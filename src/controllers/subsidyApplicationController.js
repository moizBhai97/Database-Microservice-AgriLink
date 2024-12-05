const SubsidyApplication = require('../models/SubsidyApplication');
const FarmerProfile = require('../models/FarmerProfile');
const Subsidy = require('../models/Subsidy');

const subsidyApplicationController = {

    // Get all subsidy applications
  async getAllApplications(req, res, next) {
    try {
      const applications = await SubsidyApplication.find()
        .populate("farmer", "farmDetails creditScore bankDetails")
        .populate("subsidy", "title category region amount description")
        .populate("supportingDocuments", "fileUrl fileType metadata")

        .populate({
          path: "farmer",
          populate: {
            path: "user",
            select: "username", 
          },
        });
        console.log ('www')
        res.json (applications)
    } catch (error) {
      next({ status: 500, message: "Internal Server Error", error });
    }
  },

  // Get a specific application by ID
  async getApplicationById(req, res, next) {
    try {
      const application = await SubsidyApplication.findById(req.params.id)
      .populate("farmer", "farmDetails creditScore bankDetails")
      .populate("subsidy", "title category region amount description")
      .populate("supportingDocuments", "fileUrl fileType metadata")
      .populate({
        path: "farmer",
        populate: {
          path: "user",
          select: "username", // Only include username
        },
      });
      
      if (!application) {
        return next({ status: 404, message: "Subsidy Application not found" });
      }
      res.json(application);
    } catch (error) {
      next({ status: 500, message: "Internal Server Error", error });
    }
  },
// Create a new subsidy application
async createApplication(req, res, next) {
    try {
      const { farmer, subsidy, status, supportingDocuments, rejectionReason } = req.body;
  
      // Validate farmer existence
      const farmerExists = await FarmerProfile.findById(farmer);
      if (!farmerExists) {
        return next({ status: 404, message: "Farmer profile not found" });
      }
  
      // Validate subsidy existence
      const subsidyExists = await Subsidy.findById(subsidy);
      if (!subsidyExists) {
        return next({ status: 404, message: "Subsidy not found" });
      }
  
      // Create a new subsidy application
      const newApplication = new SubsidyApplication({
        farmer,
        subsidy,
        status,
        supportingDocuments,
        rejectionReason: null, // Only include if status is 'Rejected'
      });
  
      await newApplication.save();
      res.status(201).json(newApplication);
    } catch (error) {
      next({ status: 500, message: "Internal Server Error", error });
    }
  },

    // Update an existing subsidy application
    async updateApplication(req, res, next) {
        try {
            const updates = req.body;

            const application = await SubsidyApplication.findByIdAndUpdate(
                req.params.id,
                updates,
                { new: true, runValidators: true }
            )
                .populate('farmer', 'farmDetails creditScore bankDetails')
                .populate('subsidy', 'name description eligibilityCriteria')
                .populate('supportingDocuments', 'url type');
            if (!application) {
                return next({ status: 404, message: 'Subsidy Application not found' });
            }

            res.json(application);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Delete a subsidy application
    async deleteApplication(req, res, next) {
        try {
            const application = await SubsidyApplication.findByIdAndDelete(req.params.id);
            if (!application) {
                return next({ status: 404, message: 'Subsidy Application not found' });
            }

            res.json({ message: 'Subsidy Application deleted successfully', application });
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },
};
  
module.exports = subsidyApplicationController;
