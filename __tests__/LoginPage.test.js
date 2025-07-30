import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '../src/components/LoginPage';

// Mock Firebase auth so tests don't attempt real network calls
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

describe('LoginPage', () => {
  it('renders login form', () => {
    render(<LoginPage />);
    expect(screen.getByText('Admin Login')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});