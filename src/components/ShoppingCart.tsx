import React from 'react';
import { Offcanvas,Stack } from 'react-bootstrap';
import { useShopingCart } from '../context/ShopingCartContext';
import { formatCurrency } from '../utilities/formatCurency';
import CartItem from './CartItem';
import storeItems from "../data/items.json"

export default function ShoppingCart() {
    const { closeCart,isOpen,cartItems}=useShopingCart() 
  return (
    <>
    <Offcanvas show={isOpen} placement="end">
        <Offcanvas.Header closeButton onHide={closeCart}>
        <Offcanvas.Title>
          Cart
        </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
        {cartItems.map(item=>(
            <CartItem key={item.id} {...item}/>
        ))}
        <div className='ms-auto fw-bold fs-5'>
                Total {
                  formatCurrency( cartItems.reduce((total,cartItem)=>{
                        const item=storeItems.find(i=>i.id===cartItem.id)
                        return total+(item?.price||0)*cartItem.quantity

                    },0))
                }
        </div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
    </>
  );
}
