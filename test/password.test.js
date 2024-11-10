const bcrypt = require('bcrypt');

describe('Password Hashing and Comparison', () => {
    it('should hash the password correctly', async () => {
        const password = 'TestPassword123';
        const hashedPassword = await bcrypt.hash(password, 12);

        // Check that the hashed password is different from the original
        expect(hashedPassword).not.toBe(password);
    });

    it('should compare the password with the hashed password correctly', async () => {
        const password = 'TestPassword123';
        const hashedPassword = await bcrypt.hash(password, 12);

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, hashedPassword);
        expect(isMatch).toBe(true);
    });
});
