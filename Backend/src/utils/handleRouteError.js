const handleRouteError = (err, res) => {
    if (err.name === "ValidationError" || err.isCustomValidation) {
        return res.status(400).json({ success: false, message: err.message, error: err.message });
    }
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error", error: "Internal server error" });
};

module.exports = { handleRouteError };
