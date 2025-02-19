import styles from './InfoCus.module.css';
import Banner from './components/Banner/Banner';
import CustomerInfo from './components/CustomerInfo/CustomerInfo';
import PurchaseHistory from './components/PurchaseHistory/PurchaseHistory';

const InfoCustomer = () => {
    return (
        <div>
            <Banner/>
            <div className={styles.container}>
                <CustomerInfo/>
                <PurchaseHistory/>
            </div>
        </div>
    );
};
export default InfoCustomer;