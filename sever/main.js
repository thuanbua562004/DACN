const express = require('express');
const app = express();
const initAPIRoute = require('./route/api');
const order = require('./route/order');
const sendCode = require('./route/sendCode');
const momo = require('./route/momo');

const cors = require('cors');
const multer = require('multer');
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

initAPIRoute(app);
app.use('/order', order);
app.use('/momo', momo);
app.use('/code', sendCode);

/////////////////upload ảnh lên localhost 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({ error: 'Không có file nào được tải lên.' });
    }
    res.json({ filePath: `http://localhost:${5000}/uploads/${req.file.filename}` });
});

// webSerVer(app); 
app.listen(5000, () => {
    console.log('Server đang chạy tại http://localhost:5000');
});
