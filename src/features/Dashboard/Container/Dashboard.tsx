import { useEffect, useState } from 'react';
import ActiveMessage from '../Component/ActiveMessage';
import { getActiveMessage } from '../Service/apiRequest';
import CustomizedToast from '../../Toast';
import Footer from '../../Footer';

const Dashboard = () => {
    const [activeMessage, setActiveMessage] = useState('');
    const [isLoader, setIsLoader] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    useEffect(() => {
        getActiveMessage()
            .then((data) => {
                if (data.status === 200 && data.data && data.data.length > 0) {
                    const messageActive = data.data.find((obj:any) => {
                        return obj.active === true;
                    });
                    setActiveMessage(messageActive.message);
                    setIsLoader(false);
                }
                setIsLoader(false);
            })
            .catch((err) => {
                const message = err.response && err.response.statusText ? err.response.statusText : '';
                setShowToast(true);
                setToastMessage('Error occurred while fetching active message - ' + message);
            });
    }, []);
    return (
        <div data-testid="dashboard-active-message">
            {isLoader && <Footer />}
            {!isLoader && <ActiveMessage activeMessage={activeMessage}/>}
            <CustomizedToast message={toastMessage} showToast={showToast} setShowToast={setShowToast} />
        </div>
    );
};

export default Dashboard;
