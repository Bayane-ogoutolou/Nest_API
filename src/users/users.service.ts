import { Injectable, NotFoundException } from '@nestjs/common';
import type { User } from '../../types/usersType';
import { CreateUserDto } from 'dto/create-user.dto';
import { UpdateUserDto } from 'dto/update-user.dto';
import { not } from 'rxjs/internal/util/not';
@Injectable()
export class UsersService {
    private users: User[] = [
        { 
            id: 1, 
            name: 'John Doe',
            email: 'john@example.com', 
            role: 'admin' 
        },
        { 
            id: 2, 
            name: 'Jane Smith', 
            email: 'jane@example.com', 
            role: 'user' 
        },
        { 
            id: 3, 
            name: 'Bob Johnson', 
            email: 'bob@example.com', 
            role: 'user' 
        },
        { 
            id: 4, 
            name: 'Alice Brown', 
            email: 'alice@example.com', 
            role: 'user' 
        },
        { 
            id: 5, 
            name: 'Charlie Wilson', 
            email: 'charlie@example.com', 
            role: 'user' 
        },
    ];
    findAll(): User[] {
        return this.users;
    }

    findOne(id: number): User {
        const user = this.users.find((user) => user.id === id);
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        return user;
    }

    create(userCreat: CreateUserDto): User {
        const newId = this.users.length + 1; // string
        const newUser: User = {
            ...userCreat,
            id: newId
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUser: UpdateUserDto): User {
        const index = this.users.findIndex(u => u.id === id);
        this.users[index] = { ...this.users[index], ...updateUser };
        if (!this.users[index]) {
            throw new NotFoundException(`User not found`);
        }
        return this.users[index];
    }

    delete(id: number): string {
        this.users = this.users.filter(user => user.id !== id);
        if (!this.users.find(user => user.id === id)) {
            throw new NotFoundException(`User not found`);
        }
        return `User deleted successfully`;
    }
}








