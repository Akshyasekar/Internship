const express = require("express");

const router = express.Router();

const db = require("../db");


// GET all projects
router.get("/", async (req, res) => {

    try {

        const [projects] = await db.query(
            "SELECT * FROM projects ORDER BY id DESC"
        );

        res.status(200).json(projects);

    } catch (error) {

        console.error("Database error:", error);

        res.status(500).json({
            message: "Failed to fetch projects",
            error: error.message
        });

    }

});


module.exports = router;
