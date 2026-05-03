import { render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

test('renders submit form and backend message', async () => {
  axios.get.mockResolvedValue({
    data: { message: 'Welcome to the React and Node.js API app!' },
  });

  render(<App />);

  expect(
    await screen.findByText(/welcome to the react and node.js api app/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/submit details/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});
