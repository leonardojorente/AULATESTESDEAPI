const { users } = require('../model/userModel');

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

function registerUser({ username, password, isFavorecido = false, balance = 0 }) {
  if (findUserByUsername(username)) {
    throw new Error('Usuário já existe');
  }
  const user = { username, password, isFavorecido, balance };
  users.push(user);
  return user;
}

function authenticateUser(username, password) {
  const user = findUserByUsername(username);
  if (!user || user.password !== password) {
    throw new Error('Credenciais inválidas');
  }
  return user;
}

function getAllUsers() {
  return users.map(({ password, ...rest }) => rest);
}

function transferValue(fromUsername, toUsername, value) {
  if (typeof value !== 'number' || value <= 0) throw new Error('Valor inválido');
  const fromUser = findUserByUsername(fromUsername);
  const toUser = findUserByUsername(toUsername);
  if (!fromUser || !toUser) throw new Error('Usuário não encontrado');
  if (fromUser.balance < value) throw new Error('Saldo insuficiente');
  if (!toUser.isFavorecido && value >= 5000) throw new Error('Transferência acima do limite para não favorecidos');
  fromUser.balance -= value;
  toUser.balance += value;
  return { from: fromUser.username, to: toUser.username, value };
}

module.exports = {
  findUserByUsername,
  registerUser,
  authenticateUser,
  getAllUsers,
  transferValue
};
