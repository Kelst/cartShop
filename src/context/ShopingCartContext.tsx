import { useContext, createContext, ReactNode, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ShoppingCartProviderProps = {
	children: ReactNode;
};
type CartItem={
    id:number
    quantity:number
}
type ShoppingCartContext={
    openCart:()=>void
    closeCart:()=>void
    cartQuantity:number
    getItemQuantity:(id:number)=>number
    increaseCartQuantity:(id:number)=>void
    degreaseCartQuantity:(id:number)=>void
    removeFromCart:(id:number)=>void
    cartItems:CartItem[]
    isOpen:boolean

}


const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShopingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
        const [cartItems,setCartItems]=useLocalStorage<CartItem[]>("shopping-cart",[])
        const [isOpen,setIsOPen]=useState(false)
        function openCart():void{
            setIsOPen(true)
        }
        function closeCart():void{
            setIsOPen(false)
        }
       
        function getItemQuantity(id:number):number{
            return cartItems.find(item=>id===item.id)?.quantity||0
        }
        function increaseCartQuantity(id:number):void{
            setCartItems(currItems=>{
               if(currItems.find(item=>item.id===id)==null){
                    return [...currItems,{id,quantity:1}]
               }else{
                return currItems.map(item=>{
                    if(item.id==id){
                        return {...item,quantity: item.quantity+1}
                    }else{
                        return item
                    }
                })
               }
            })
        }
        function degreaseCartQuantity(id:number):void{
            setCartItems(currItems=>{
               if(currItems.find(item=>item.id===id)?.quantity==1){
                    return currItems.filter(item=>item.id!==id)
               }else{
                return currItems.map(item=>{
                    if(item.id==id){
                        return {...item,quantity: item.quantity-1}
                    }else{
                        return item
                    }
                })
               }
            })
        }
            function removeFromCart(id:number){
                setCartItems(currItems=>{
                    return currItems.filter(item=>item.id!==id)
                })
            }
            const cartQuantity=cartItems.reduce((quantity,item)=>{
                return item.quantity+quantity
            },0)

	return <ShoppingCartContext.Provider value={{isOpen,openCart,closeCart, cartQuantity,cartItems,getItemQuantity,increaseCartQuantity,degreaseCartQuantity,removeFromCart}}>
        {children}
        {<ShoppingCart/>}
        </ShoppingCartContext.Provider>;
}
