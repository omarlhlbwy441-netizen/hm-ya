
import express from 'express';
import userRoutes from './routes/user';
import walletRoutes from './routes/wallet';

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/wallet', walletRoutes);

app.get('/', (req, res) => res.json({ message: "API المملكة يعمل!" }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
