import request from 'supertest';
import app from '../../api/index'; // Import the Express app

describe('POST /api/maintenance-requests', () => {
  it('should create a new maintenance request', async () => {
    const response = await request(app)
      .post('/api/maintenance-requests')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        unitNumber: '101',
        serviceType: 'Plumbing',
        summary: 'Leaky faucet',
        details: 'The faucet is leaking.',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('John Doe');
  });
});

describe('POST /api/admin/login', () => {
  it('should log in with correct credentials', async () => {
    const response = await request(app)
      .post('/api/admin/login')
      .send({
        username: 'admin',
        password: 'admin123',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Login successful');
  });

  it('should fail with incorrect credentials', async () => {
    const response = await request(app)
      .post('/api/admin/login')
      .send({
        username: 'admin',
        password: 'wrongpassword',
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });
});
