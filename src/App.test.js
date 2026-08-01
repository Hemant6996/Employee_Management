import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';

jest.mock('./api/axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: { user: null } })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
  },
}));

test('renders the app shell without crashing', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );

  expect(screen.getByText(/login/i)).toBeInTheDocument();
});
