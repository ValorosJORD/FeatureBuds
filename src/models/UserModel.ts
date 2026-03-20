import { AppDataSource } from '../dataSource.js';
import { User } from '../entities/User.js';

const userRepository = AppDataSource.getRepository(User);

export async function addUser(
  email: string,
  passwordHash: string,
  username: string,
  name: string = 'New User',
): Promise<User> {
  const newUser = new User();
  newUser.email = email;
  newUser.passwordHash = passwordHash;
  newUser.username = username;
  newUser.name = name;
  // userId is generated automatically by @BeforeInsert

  return userRepository.save(newUser);
}

export async function getUserById(userId: string): Promise<User | null> {
  return userRepository.findOne({ where: { userId } });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return userRepository.findOne({ where: { email } });
}
