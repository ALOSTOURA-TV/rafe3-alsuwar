
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.send('لم يتم رفع أي صورة.');
  const imageUrl = `/uploads/${req.file.filename}`;
  res.send(`<p>تم رفع الصورة بنجاح!</p><img src="${imageUrl}" style="max-width:100%"><br><a href="/">رجوع</a>`);
});

app.listen(port, () => {
  console.log(`⚡ رافع الصور يعمل على http://localhost:${port}`);
});
