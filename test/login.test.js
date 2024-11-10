const request = require('supertest');
const app = require('../server'); // Assuming this is the entry point of your Express app

describe('User Login', () => {
    it('should successfully login a user with valid credentials', async () => {
        const user = {
            username: 'testuser',
            password: 'TestPassword123'
        };

        // Register the user first
        await request(app)
            .post('/api/users/register')
            .send({
                ...user,
                email: 'testuser@example.com'
            });

        // Now attempt to login
        const response = await request(app)
            .post('/api/users/login')
            .send(user);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
        expect(response.body.token).toBeDefined();
    });

    it('should return error for invalid credentials', async () => {
        const user = {
            username: 'nonexistentuser',
            password: 'WrongPassword123'
        };

        const response = await request(app)
            .post('/api/users/login')
            .send(user);

        expect(response.status).toBe(401);
        expect(response.body.errors.general).toBe('Invalid credentials');
    });
});
