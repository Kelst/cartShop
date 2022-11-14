import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useShopingCart } from '../context/ShopingCartContext';

type CartItemProp={
    id:number,
    quantity:number
}
import storeItems from "../data/items.json"
import { formatCurrency } from '../utilities/formatCurency';
export default function CartItem({id,quantity}:CartItemProp) {

    const {removeFromCart}= useShopingCart()
    const item=storeItems.find(i=>i.id===id)
    if (item===null) return null
  return (
    <>
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
        <img src={item?.imgUrl} style={{width:"125px", height:"75px",objectFit:"cover"}}/>
        <div className='me-auto'>
            <div>{item?.name}{quantity>1&&(<span style={{fontSize:".85rem"}} className='text-muted'> {quantity}x</span>)} </div>
            <div className="text-muted"  style={{fontSize:".95rem"}}>{formatCurrency(item?.price || 0 )}</div>
        </div>
        <div className="text-muted"  style={{fontSize:".95rem"}}>{formatCurrency(item?.price|| 0 *quantity)}</div>
       <Button variant="outline-danger" size="sm" onClick={()=>removeFromCart(item?.id || 0 )}>&times;</Button>
    </Stack>
    </>
  );
}
