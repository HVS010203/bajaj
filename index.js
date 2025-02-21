const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/bfhl", (req, res) => {
    res.status(200).json({ "operation_code": 1 });
});

app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));

        const highest_alphabet = alphabets.length > 0
            ? [alphabets.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" })).pop()]
            : [];

        const response = {
            is_success: true,
            user_id: "harsh_vardhan_singh_21032003",  // Change DOB accordingly
            email: "harsh@example.com",
            roll_number: "CU12345",
            numbers,
            alphabets,
            highest_alphabet
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

