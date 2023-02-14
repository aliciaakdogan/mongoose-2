import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cors from 'cors';
app.use(cors({ origin: '*'}));

app.use(express.json());



const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Product = mongoose.model('products', productSchema);


app.get('/', (req, res) => {
    res.send('Welcome');
})

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
})

app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
    res.send(product)
    } catch (error) {
        console.log('gick inge bra');
    }
})

app.post('/products', async (req, res) => {
    try {
        console.log(req.body);
    await Product.create(req.body);
    res.send('hej');
    } catch (error) {
        res.send('Det gick inte heller bra')
    }
    

})

app.listen(3000, () => {
    console.log('Started Server');
    mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://alicia:alicia@cluster0.ok7cjmg.mongodb.net/?retryWrites=true&w=majority') 
})