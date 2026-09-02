import express from 'express';
import app from './app';
import path from 'path';
import fs from 'fs';

const PORT = process.env.PORT || 5000;

// Serve static frontend in production (if built)
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../../frontend/dist');
  if (fs.existsSync(clientBuildPath)) {
    app.use(express.static(clientBuildPath));
    
    // Express 5 requires '/*splat' instead of '*' for catch-all routes
    app.get('/*splat', (req, res) => {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
  }
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));