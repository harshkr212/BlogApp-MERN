const express = require('express')
const app = express()
const cors=require('cors');
const path = require('path');
const connectToMongo=require('./db')
connectToMongo();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
const port =process.env.PORT || 5000
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
 app.use('/api/blogs',require('./Routes/blogs'))
  app.use('/api/user',require('./Routes/auth'))
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Example app listening on port temp ${port}`)
})
