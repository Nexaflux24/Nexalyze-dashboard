import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users, addUser } from '../data/mockData.js';

const JWT_SECRET = process.env.JWT_SECRET || 'nexalyze-secret';
const JWT_EXPIRES_IN = '8h';

const createToken = (user) => jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = users.find((item) => item.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = createToken(user);
  res.json({ user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }, token });
};

export const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const existing = users.find((item) => item.email === email);
  if (existing) {
    return res.status(409).json({ error: 'Email already exists' });
  }

  const user = await addUser({ email, password, firstName, lastName, role: 'User' });
  const token = createToken(user);

  res.status(201).json({ user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }, token });
};
