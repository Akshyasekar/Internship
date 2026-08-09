const express = require("express");
const router = express.Router();

const db = require("../db");


// POST contact message
router.post("/", async (req, res) => {

    try {

        const {
            name,
            email,
            message
        } = req.body;

        // Validation
        if (!name || !email || !message) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        const [result] = await db.query(
            `INSERT INTO contacts
            (name, email, message)
            VALUES (?, ?, ?)`,
            [
                name,
                email,
                message
            ]
        );

        res.status(201).json({
            message: "Message sent successfully!",
            contactId: result.insertId
        });

    } catch (error) {

        console.error("Error saving contact:", error);

        res.status(500).json({
            message: "Failed to send message"
        });
    }
});


// GET all contacts
router.get("/", async (req, res) => {

    try {

        const [contacts] = await db.query(
            "SELECT * FROM contacts ORDER BY id DESC"
        );

        res.status(200).json(contacts);

    } catch (error) {

        console.error("Error fetching contacts:", error);

        res.status(500).json({
            message: "Failed to fetch contacts"
        });
    }
});


module.exports = router;
