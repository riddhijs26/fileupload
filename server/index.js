const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json())
app.post("/fileupload", (req, res) => {
    setTimeout(() => {
        console.log('file uploaded',  req.body.data)
        return res.status(200).json({ result: true, msg: 'file uploaded' });
    }, 4000);
});

app.delete("/upload", (req, res) => {
    console.log(`File deleted`)
    return res.status(200).json({ result: true, msg: 'file deleted' });
});

app.listen(8000, () => {
    console.log(`Server running on port 8000`)
});