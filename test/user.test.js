const request = require('supertest');
const app = require('../server'); // Assuming this is the entry point of your Express app

describe('User Registration', () => {
    it('should successfully register a new user', async () => {
        const newUser = {
            username: 'testuser',
            password: 'TestPassword123',
            email: 'testuser@example.com'
        };

        const response = await request(app)
            .post('/api/users/register')
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should return validation errors for invalid email', async () => {
        const newUser = {
            username: 'testuser',
            password: 'TestPassword123',
            email: 'invalidemail'
        };

        const response = await request(app)
            .post('/api/users/register')
            .send(newUser);

        expect(response.status).toBe(400);
        expect(response.body.errors.email).toBe('Invalid email format');
    });

    it('should return error if username or email already exists', async () => {
        const newUser = {
            username: 'testuser',
            password: 'TestPassword123',
            email: 'testuser@example.com'
        };

        // Register the user once
        await request(app).post('/api/users/register').send(newUser);

        // Try to register again
        const response = await request(app)
            .post('/api/users/register')
            .send(newUser);

        expect(response.status).toBe(400);
        expect(response.body.errors.general).toBe('User with this username or email already exists');
    });
});
