import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 8800;

app.get('/text-files', (req, res) => {
    const folderPath = 'backup'; // replace with your folder path

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading folder');
        } else {
            const textFiles = files.filter(file => path.extname(file) === '.txt');
            res.status(200).send(textFiles);
        }
    });
});

app.post('/create-file', (req, res) => {
    console.log("first")
    const folderPath = 'backup'; // replace with your folder path
    const fileName = `${new Date().toISOString().replace(/:/g, '-')}.txt`; // use current date-time as filename
    const fileContent = new Date().toISOString(); // use current timestamp as content
    console.log(fileName)
    const filePath = path.join(folderPath, fileName);

    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating file');
        } else {
            res.status(200).send(`File ${fileName} created in ${folderPath}`);
        }
    });
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
