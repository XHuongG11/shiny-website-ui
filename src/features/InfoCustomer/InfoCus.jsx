import styles from './InfoCus.module.css';
import Banner from './components/Banner/Banner';
import CustomerInfo from './components/CustomerInfo/CustomerInfo';
import WishList from './components/WishList/WishList';
import Address from './components/Address/Address';
const InfoCustomer = () => {
    return (
        <div>
            <Banner/>
            <div className={styles.container}>
                <CustomerInfo/>
                <div className={styles.containerMore}>
                    <WishList/>
                    <Address/>
                </div>
            </div>
        </div>
    );
};
export default InfoCustomer;