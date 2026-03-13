const Listing = require("../models/listing.js");

// Index - Show all listings
module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    res.json({ listings: allListings });
};

// Create new listing
module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    res.json({ success: true, message: "New Place Added", listing: newListing });
};

// Show individual listing
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({ path: "review", populate: { path: "author" } })
        .populate("owner");
    if (!listing) {
        return res.status(404).json({ error: "Listing does not exist!" });
    }
    res.json({ listing });
};

// Update listing
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    
    res.json({ success: true, message: "Changes applied", listing });
};

// Delete listing
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.json({ success: true, message: "Place Deleted" });
};