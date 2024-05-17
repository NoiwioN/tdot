import React, { useContext } from 'react';
import CartContext from '@/store/CartContext';
import styles from './ShoppingCart.module.css';
import ICTKebabAPI from '@/lib/api/ICTKebab';
import { useGlobalContext } from '@/store/index';
import { toast } from 'react-toastify';

export default function ShoppingCart({ isCartOpen, setIsCartOpen }) {

  const { cartItems, removeFromCart } = useContext(CartContext);
  const { session } = useGlobalContext();

  const calculateTotal = () => {
    try {
      const total = cartItems.reduce((total, item) => total + item.preis, 0);
      return total.toFixed(2);
    } catch (e) {
      return 0;
    }
  };

  const postCartItems = async (cartItems) => {
    try {
      const sortedCartItems = [...cartItems].sort((a, b) => {
        const order = ['food', 'drink', 'sauce'];
        return order.indexOf(a.type) - order.indexOf(b.type);
      });
      console.log(sortedCartItems)
  
      const cartItemObjects = sortedCartItems.reduce((acc, item, index) => {
        const { type, ...itemWithoutType } = item;
        if (index === 0) acc.food = itemWithoutType;
        if (index === 1) acc.drink = itemWithoutType;
        if (index === 2) acc.sauce = itemWithoutType;
        return acc;
      }, {});
  
      console.log(cartItemObjects);
      await ICTKebabAPI.create(cartItemObjects, session.accesstoken);
      toast.success('Bestellung erfolgreich erstellt');
      removeFromCart(sortedCartItems[0]);
      removeFromCart(sortedCartItems[1]);
      removeFromCart(sortedCartItems[2]);
      
    } catch(e) {
      console.error(e);
      toast.error('Fehler beim Erstellen der Bestellung');
    }
  };
  
  return (
    <div className={`${styles.cart} ${isCartOpen ? styles.open : styles.closed}`}>
      <div className={styles.cartHeader}>
        <button onClick={() => setIsCartOpen(false)} className={styles.button}>Schliessen</button>
        <h2 className={styles.title}>Warenkorb</h2>
      </div>
      <div className={styles.cartBody}>
        <ul className={styles.list}>
        {cartItems.map((item) => (
            <li key={item.id}>{item.name}
            <button className={styles.button} onClick={() => removeFromCart(item)}>Entfernen</button></li>
          ))}
          <li className={styles.total}>Total: {calculateTotal()} CHF</li>
        </ul>
        <button onClick={() => postCartItems(cartItems)} className={styles.button}>Bestellen</button>
      </div>
    </div>
  );
}