import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON
  app.use(express.json());

  // API Routes (Prefix with /api)
  app.get('/api/health', (req, res) => {
    res.json({ status: 'AncientLingua AI Backend Operational', timestamp: new Date() });
  });

  // Linguistic Metadata Index (Mock for now, to be integrated with real datasets)
  app.get('/api/languages', (req, res) => {
    res.json([
      { id: 'skt-v', name: 'Vedic Sanskrit', period: 'Ancient', date: '1500–500 BCE' },
      { id: 'skt-c', name: 'Classical Sanskrit', period: 'Classical', date: '500 BCE – 1000 CE' },
      { id: 'grk-a', name: 'Ancient Greek', period: 'Classical', date: '800 BCE – 300 CE' },
      { id: 'lat-c', name: 'Classical Latin', period: 'Classical', date: '75 BCE – 3rd Century CE' },
      { id: 'eng-o', name: 'Old English', period: 'Old', date: '450–1150 CE' }
    ]);
  });

  // Vite integration for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serving static files in production
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    🏛️  AncientLingua AI Server 
    --------------------------
    Local: http://localhost:${PORT}
    Environment: ${process.env.NODE_ENV || 'development'}
    `);
  });
}

startServer();
