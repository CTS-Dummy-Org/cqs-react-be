import { render, screen } from '@testing-library/react';
import { Footer } from '../Container/Footer';


test('renders Footer', (): any => {
    render(<Footer />);
    const linkElement = screen.getByText('Cognizant’s Privacy Statement.');
    expect(linkElement).toBeInTheDocument();
});
