import { render, screen, fireEvent } from '@testing-library/react';
import Basket from './Basket';
import {mockData} from './mockData';

jest.spyOn(window, 'alert').mockImplementation(() => {});

test('renders Basket component', () => {
    render(<Basket data={mockData} />);
    const removeElement = screen.getAllByText('X');
    expect(removeElement).toHaveLength(10);

    const inputElement = screen.getAllByLabelText('Change amount of item in the basket');
    expect(inputElement).toHaveLength(10);

    fireEvent.change(inputElement[1], { target: { value: '2' } })
    expect(inputElement[1].value).toBe('2');
    const priceElement = screen.getByText('£44.6');
    expect(priceElement).toBeInTheDocument(true);

});
