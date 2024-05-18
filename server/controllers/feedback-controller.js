const Feedback = require("../models/Feedback");

function createFeedback(req, res) {
    const newFeedback = new Feedback({
        name: req.body.name,
        email: req.body.email,
        rating: req.body.rating,
        comments: req.body.comments,
    });

    newFeedback
        .save()
        .then(feedback => res.status(201).json(feedback))
        .catch(error => res.status(400).json({ error: "Error saving feedback: " + error }));
}

async function getAllFeedback(req, res) {
    try {
        const feedbackList = await Feedback.find();
        res.status(200).json({ feedbackList });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getFeedback(req, res) {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const FeedbackController = {
    createFeedback,
    getAllFeedback,
    getFeedback,
};

module.exports = FeedbackController;
