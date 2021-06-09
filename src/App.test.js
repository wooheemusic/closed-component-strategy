import { render, screen } from '@testing-library/react';
import App from './App';

debugger; // this is necessary
const x = 55433;
test('renders learn react link', () => {
  console.log(x)
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
