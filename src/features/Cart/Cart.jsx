import ListProduct from './ListProduct/listProduct';
import ViewProduct from './ViewProduct/viewProduct';
import './cart.module.css';
const Cart = () => {
    return (
        <div>
            <ListProduct />
            <ViewProduct />
        </div>
    );
};

export default Cart;