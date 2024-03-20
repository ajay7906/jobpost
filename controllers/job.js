const Job = require("../models/job");

const createJobPost = async (req, res, next) => {
    try {
        const {
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            skills,
            refUserId,
        } = req.body;

        if (
            !companyName ||
            !logoUrl ||
            !title ||
            !description ||
            !salary ||
            !location ||
            !duration ||
            !locationType ||
            !skills
        ) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const userId = req.userId;
        console.log(req);

        const jobDetails = new Job({
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            skills,
            refUserId: userId,
        });

        await jobDetails.save();
        res.json({ message: "Job created successfully" });
    } catch (error) {
        next(error);
    }
};

const getJobDetailsById = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;

        const jobDetails = await Job.findById(jobId);

        if (!jobDetails) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        res.json({ data: jobDetails });
    } catch (error) {
        next(error);
    }
};

const updateJobDetailsById = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.userId;


        if (!jobId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const isJobExists = Job.findOne({ _id: jobId, refUserId: userId });


        if (!isJobExists) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const {
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            skills,
        } = req.body;

        if (
            !companyName ||
            !logoUrl ||
            !title ||
            !description ||
            !salary ||
            !location ||
            !duration ||
            !locationType ||
            !skills
        ) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        await Job.updateOne(
            { _id: jobId, refUserId: userId },
            {
                $set: {
                    companyName,
                    logoUrl,
                    title,
                    description,
                    salary,
                    location,
                    duration,
                    locationType,
                    skills,
                },
            }
        );

        res.json({ message: "Job updated successfully" });
    } catch (error) {
        next(error);
    }
};

const getAllJobs = async (req, res, next) => {
    try {
        const title = req.query.title || "";
        const skills = req.query.skills;
        let filteredSkills;
        let filter = {};

        if (skills) {
            filteredSkills = skills.split(",");
            const caseInsensitiveFilteredSkills = filteredSkills.map(
                (element) => new RegExp(element, "i")
            );
            filter = { skills: { $in: caseInsensitiveFilteredSkills } };
        }

        const jobList = await Job.find(
            {
                title: { $regex: title, $options: "i" },
                ...filter,
            },
            { companyName: 1, title: 1 }
        );
        res.json({ data: jobList });
    } catch (error) {
        next(error);
    }
};
const deleteJobs = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.userId;


        if (!jobId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }
        const isJobExists = Job.findOne({ _id: jobId, refUserId: userId });


        if (!isJobExists) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }
        //delete the job
        const deleteJob = await Job.findByIdAndDelete({ _id: jobId, refUserId: userId })
        if (!deleteJob) {
            return res.status(500).json({
                errorMessage: "Failed to delete the job"
            })

        }
        res.status(200).json({
            message: "Job deleted successfully",
            deletedJob: deleteJob // Optionally, you can send the deleted job back in the response
        });


    } catch (error) {
        next(error);

    }
}

module.exports = {
    createJobPost,
    getJobDetailsById,
    updateJobDetailsById,
    getAllJobs,
    deleteJobs
};