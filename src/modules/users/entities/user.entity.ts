import { randomUUID } from 'crypto';

export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
