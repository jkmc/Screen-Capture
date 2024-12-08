const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json({ limit: '50mb' })); // Handle large image payloads

app.post('/screenshot', (req, res) => {
    const { screenshot } = req.body;

    // Save the screenshot as a file
    const base64Data = screenshot.replace(/^data:image\/png;base64,/, "");
    fs.writeFile("screenshot.png", base64Data, 'base64', err => {
        if (err) {
            console.error("Error saving screenshot:", err);
            res.status(500).json({ error: "Failed to save screenshot" });
        } else {
            console.log("Screenshot saved successfully!");
            res.json({ message: "Screenshot received and saved!" });
        }
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
