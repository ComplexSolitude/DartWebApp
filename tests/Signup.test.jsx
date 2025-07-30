import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Signup from '../Signup';

test('shows error when passwords do not match', async () => {
  render(<Signup />);

  await userEvent.type(screen.getByPlaceholderText(/first name/i), 'John');
  await userEvent.type(screen.getByPlaceholderText(/last name/i), 'Doe');
  await userEvent.type(screen.getByPlaceholderText(/email/i), 'john@example.com');
  await userEvent.type(screen.getByPlaceholderText('Password'), 'password1');
  await userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'password2');

  await userEvent.click(screen.getByRole('button', { name: /create account/i }));

  expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
});
