import { render, screen, fireEvent } from '@testing-library/react';
import Total from './Total';

jest.spyOn(window, 'alert').mockImplementation(() => {});

test('renders Total component', () => {
    const data = 0;
    const clearAll = () => {};
    render(<Total data={data} clearAll={clearAll} />);
    const clearElement = screen.getByText('Clear');
    expect(clearElement).toBeInTheDocument(true);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument(true);
    fireEvent.click(screen.getByText(/Check out/i));
    expect(window.alert).toHaveBeenCalledTimes(1);
});
