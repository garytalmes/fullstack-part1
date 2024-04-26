const express = require('express');
const path = require('path');
const { writeFile } = require('fs/promises');
const { checkFile } = require("./lib/fileExists")

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


/* ===== page routes ================================== */

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/contact', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/contact.html'))
);




/* ===== api routes below ================================ */

app.post('/api/contact', async (req, res) => {

  if( !req.body.name || !req.body.email ){
    return res.status(400).json({ status: "fail", msg: "Data missing" })
  }

  const filename = `${req.body.name.replaceAll(" ", "").toLowerCase()}.json`
  const check = await checkFile(path.join(__dirname, `./submissions/${filename}`))

  if( check === true ){
    res.json({ status: "exists" })
  } else {

    await writeFile(`./submissions/${filename}`, JSON.stringify(req.body)).catch( err => {
      return res.json({ status: "fail", msg: "Could not write file." })
    })

    res.json({ status: "ok" })
  }
})



app.listen(PORT, () => {
  console.log(`Express listening at http://localhost:${PORT}`)
})