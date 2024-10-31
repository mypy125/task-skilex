import express from 'express';
import combinationsController from './controllers/combinationController.js';

const app = express();
app.use(express.json());

app.use('/api', combinationsController);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
