
import express from 'express';
import userRoutes from './routes/user';
import walletRoutes from './routes/wallet';
import transferRoutes from './routes/transfer';
import agencyRoutes from './routes/agency';
import adminRoutes from './routes/admin';

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/transfer', transferRoutes);
app.use('/api/agency', agencyRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => res.json({ message: "API المملكة يعمل!" }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
