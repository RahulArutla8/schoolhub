import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
import { getPool, ensureSchema } from '@/lib/db';

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream for multer
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname || '') || '.jpg';
    cb(null, `school-${unique}${ext}`);
  },
});

const upload = multer({ storage });

const handler = nextConnect({
  onError(error, req, res) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

handler.get(async (req, res) => {
  await ensureSchema();
  const pool = getPool();

  const { q, city } = req.query;
  const clauses = [];
  const params = [];

  if (q) {
    clauses.push("(name LIKE ? OR address LIKE ?)");
    params.push(`%${q}%`, `%${q}%`);
  }
  if (city) {
    clauses.push("city = ?");
    params.push(city);
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const [rows] = await pool.query(
    `SELECT id, name, address, city, state, contact, image, email_id FROM schools ${where} ORDER BY id DESC`,
    params
  );

  res.json({ schools: rows });
});

handler.use(upload.single('image'));

handler.post(async (req, res) => {
  await ensureSchema();
  const pool = getPool();

  // Validate fields
  const required = ['name', 'address', 'city', 'state', 'contact', 'email_id'];
  for (const field of required) {
    if (!req.body?.[field]) {
      return res.status(400).json({ error: `${field} is required` });
    }
  }

  const email = req.body.email_id;
  const phone = req.body.contact;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9]{7,15}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: 'Invalid contact number' });
  }

  const imagePath = req.file ? `/schoolImages/${req.file.filename}` : '';

  const { name, address, city, state, contact, email_id } = req.body;
  await pool.query(
    `INSERT INTO schools (name, address, city, state, contact, image, email_id)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, address, city, state, contact, imagePath, email_id]
  );

  res.status(201).json({ ok: true });
});

export default handler;
