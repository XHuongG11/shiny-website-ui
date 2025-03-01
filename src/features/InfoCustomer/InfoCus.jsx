import styles from './InfoCus.module.css';
import Banner from './components/Banner/Banner';
import CustomerInfo from './components/CustomerInfo/CustomerInfo';
import WishList from './components/WishList/WishList';
import Address from './components/Address/Address';
import Breadcrumb from '../../components/Breadcrumb/breadcrum';
import { Grid2 } from '@mui/material';
const InfoCustomer = () => {
    return (
        <div className={styles.infoCus}>
            <Banner />
            <Breadcrumb currentPage="Thông tin tài khoản" />
            {/* <div className={styles.container}> */}
            <Grid2 container direction="row" spacing={3} sx={{ justifyContent: "center" }} >
                <Grid2 size={{ md: 5, xs: 11 }}>
                    <CustomerInfo />
                </Grid2>
                {/* <div className={styles.containerMore}> */}
                <Grid2 container size={{ md: 5, xs: 11 }} direction="column" spacing={3}>
                    <Grid2 size={12} >
                        <WishList />
                    </Grid2 >
                    <Grid2 size={12}>
                        <Address />
                    </Grid2>
                </Grid2>
                {/* </div> */}
            </Grid2>

            {/* </div> */}
        </div>
    );
};
export default InfoCustomer;