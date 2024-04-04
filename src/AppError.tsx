import './index.css';

const AppError = (props: any) => {
    return <div className="app-error">{`Login Error - ${props.error.message}`}</div>;
};
export default AppError;
