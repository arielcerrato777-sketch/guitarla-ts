import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db.js'
import type { cartItemType, GuitarIdType, GuitarType } from '../types/types.js';

export const useCart = () => {

    const initialCart = (): cartItemType[] => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    };

    const [data, setData] = useState(db);
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: GuitarType) => {
        const itemExists = cart.findIndex((cartItem) => cartItem.id === item.id);
        if (itemExists === -1) {
            const newItem: cartItemType = { ...item, quantity: 1 };
            setCart(prevCart => [...prevCart, newItem]);
        } else {
            const updatedCart = [...cart];
            updatedCart[itemExists].quantity++;
            setCart(updatedCart);
        }
    }

    const deleteItem = (itemId: GuitarIdType) => {
        const updatedCart = cart.filter((item) => item.id !== itemId);
        setCart(updatedCart);
    }


    const increaseQuantity = (itemId: GuitarIdType) => {
        const updatedCart = cart.map((item) => {
            if (item.id === itemId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCart(updatedCart);
    };

    const decreaseQuantity = (itemId: GuitarIdType) => {
        const updatedCart = cart.map((item) => {
            if (item.id === itemId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCart(updatedCart);
    }

    const clearCart = () => {
        setCart([]);
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]);


    return {
        data,
        cart,
        addToCart,
        deleteItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart
        , isEmpty
        , cartTotal

    }

}
