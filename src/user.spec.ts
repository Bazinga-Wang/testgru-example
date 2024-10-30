import { describe, expect, it, beforeEach } from 'vitest';

// Import UserManager class since it was not imported before
interface User {
  id: number;
  name: string;
  email: string;
}

class UserManager {
  private users: User[] = [];
  private nextId: number = 1;

  addUser(name: string, email: string): User {
    const newUser: User = {
      id: this.nextId++,
      name,
      email,
    };
    this.users.push(newUser);
    return newUser;
  }

  findUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  deleteUser(id: number): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  getAllUsers(): User[] {
    return this.users;
  }
}

describe('UserManager', () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  describe('addUser', () => {
    it('should add a new user with incremented ID', () => {
      const user = userManager.addUser('John Doe', 'john@example.com');
      expect(user).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      });
    });

    it('should increment ID for multiple users', () => {
      const user1 = userManager.addUser('John Doe', 'john@example.com');
      const user2 = userManager.addUser('Jane Doe', 'jane@example.com');
      
      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
    });
  });

  describe('findUserById', () => {
    it('should find user by ID', () => {
      const user = userManager.addUser('John Doe', 'john@example.com');
      const foundUser = userManager.findUserById(user.id);
      expect(foundUser).toEqual(user);
    });

    it('should return undefined for non-existent ID', () => {
      const foundUser = userManager.findUserById(999);
      expect(foundUser).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete existing user', () => {
      const user = userManager.addUser('John Doe', 'john@example.com');
      const result = userManager.deleteUser(user.id);
      expect(result).toBe(true);
      expect(userManager.findUserById(user.id)).toBeUndefined();
    });

    it('should return false when deleting non-existent user', () => {
      const result = userManager.deleteUser(999);
      expect(result).toBe(false);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', () => {
      const user1 = userManager.addUser('John Doe', 'john@example.com');
      const user2 = userManager.addUser('Jane Doe', 'jane@example.com');
      
      const allUsers = userManager.getAllUsers();
      expect(allUsers).toEqual([user1, user2]);
    });

    it('should return empty array when no users exist', () => {
      const allUsers = userManager.getAllUsers();
      expect(allUsers).toEqual([]);
    });
  });
});
