import app from './app';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`⚡ HOS Backend Server running on port ${PORT}`);
});

export default app;
