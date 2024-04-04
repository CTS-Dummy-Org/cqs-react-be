import { render } from '@testing-library/react';
import { Loader } from '../Container/Loader';


test('renders try to check loader is render or not', (): any => {
    const rendered = render(<Loader />);
    const div:any = rendered.container.querySelector('div')?.firstChild;
    expect(div.className).toBe(
        'MuiCircularProgress-root MuiCircularProgress-indeterminate MuiCircularProgress-colorPrimary css-18lrjg1-MuiCircularProgress-root'
    );
});
