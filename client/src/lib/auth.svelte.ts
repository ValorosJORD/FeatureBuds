import { api } from './api';

export interface User {
  userId: string;
  email: string;
  username: string;
}

class AuthStore {
  user = $state<User | null>(null);
  loading = $state<boolean>(true);

  async refresh(): Promise<void> {
    this.loading = true;
    try {
      const res = await api.get<User>('/me');
      console.log(res.data);
      this.user = res.ok ? res.data : null;
    } catch {
      this.user = null;
    } finally {
      this.loading = false;
    }
  }

  setUser(user: User | null): void {
    this.user = user;
  }

  get isLoggedIn(): boolean {
    return this.user !== null;
  }
}

export const auth = new AuthStore();
