const userService = require('../service/userService');

const register = (req, res) => {
  try {
    const { username, password, isFavorecido, balance } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
    const user = userService.registerUser({ username, password, isFavorecido, balance });
    res.status(201).json({ message: 'Usuário registrado', user: { username: user.username, isFavorecido: user.isFavorecido, balance: user.balance } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
    const user = userService.authenticateUser(username, password);
    res.json({ message: 'Login realizado', user: { username: user.username, isFavorecido: user.isFavorecido, balance: user.balance } });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const getUsers = (req, res) => {
  res.json(userService.getAllUsers());
};

const transfer = (req, res) => {
  try {
    const { from, to, value } = req.body;
    if (!from || !to || value === undefined) return res.status(400).json({ error: 'Campos obrigatórios: from, to, value' });
    const result = userService.transferValue(from, to, value);
    res.json({ message: 'Transferência realizada', ...result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  transfer
};
