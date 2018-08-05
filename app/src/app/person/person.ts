export class Person {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  created: Date;
  updated: Date;
  updatedBy: string;
  admin: boolean;
  manager: Person;
}
