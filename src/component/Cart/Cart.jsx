import { useContext, useEffect, useState } from 'react'
import LoadingScreen from '../LoadingScreen/loadingScreen';
import { Link } from 'react-router-dom';
import { projectContext } from '../../context/Context';
import toast from 'react-hot-toast';

export default function Cart() {

    /////////////////////////// Hooks /////////////////////////////////

    const [cartItems,setCartItems] = useState([]);
    const [cartInfo,setCartInfo] = useState();
    const {getCartItems,updateQuantity,removeFromCart,setNumOfCart} = useContext(projectContext)


    useEffect(() =>{
        showCartItems();
      },[]);

    ///////////////////////////////////////////////////////////////////////
    // get all Cart items
    async function showCartItems() {
        let {data} = await getCartItems()
        console.log(data);
        if (data?.status === "success") {
            console.log(data.data.products);
            setCartItems(data.data.products);
            setCartInfo(data.data)
        }else{
          setCartInfo("empty")
          setCartItems(["Cart is Empty"]);
        }
    }

    // update all Cart items quantity
    async function handleUpdateQuantity(id,count) {
        let {data} = await updateQuantity(id,count)
        if (data.status === "success") {
            console.log(data.data);
            setCartItems(data.data.products);
            setCartInfo(data.data)
            toast.success("The number of products has been successfully modified")
        }else {
            toast.error("Error : The product has not been modified")
        }
    }
    // remove Cart item 
    async function handleRemoveFromCart(id) {
        let {data} = await removeFromCart(id);
        console.log(data);
        if (data.status === "success") {
            console.log(data.data);
            setCartItems(data.data.products);
            setCartInfo(data.data)
            setNumOfCart(data.numOfCartItems)
            toast.success("The product has been successfully removed")
        }else {
          toast.error("Error : The product has not been removed")
        }
    }


   if (cartInfo === "empty") {
    return <>
    {cartInfo ?<div className=" py-3 my-3 p-3 container">
      <h3 className="">Shop Cart</h3>
        {cartItems.map((item , index) =>{
            return   <div key={index} className="row align-items-center my-4 p-3 bg-light">
              {item}
          </div>
        })}
    
      <button className="btn bg-main ">
        <Link className="text-white" to = "/payment ">Online Payment</Link>
      </button>
    </div>: <LoadingScreen/> }
      </>
   }else{
    return <>
{cartInfo ?<div className=" py-3 my-3 p-3 container">
  <h3 className="">Shop Cart</h3>
  <h4 className="py-3 text-main h6">Total Price : { cartInfo.totalCartPrice }</h4>
    {cartItems.map((item , index) =>{
        return   <div key={index} className="row align-items-center my-4 p-3 bg-light">
        <div className="col-md-2">
          <img className="w-100"  src = {item.product.imageCover } alt= {item.product.title} />
        </div>
        <div className="col-md-10 my-3 my-md-0  d-flex justify-content-between">
            <div>
              <h4 className="h5">{ item.product.title }</h4>
              <span className ="text-main d-block">Price : { item.price } EGP</span>
              <button onClick ={()=>handleRemoveFromCart(item.product._id)} className="btn cursor-pointer"><i className="fas fa-trash-can text-main "></i> Remove</button>
           </div>
           <div className="d-flex align-items-center">
              <button onClick= {()=>handleUpdateQuantity(item.product._id , item.count + 1)} className="btn btn-outline-success fs-2"> + </button>
              <span className ="px-3 fs-4">{ item.count }</span>
                {(item.count === 1)?<button onClick = {()=>handleUpdateQuantity(item.product._id , item.count - 1)} className="btn btn-outline-success fs-2 disabled"> - </button>
                :<button onClick = {()=>handleUpdateQuantity(item.product._id , item.count - 1)} className="btn btn-outline-success fs-2 col-md-6"> - </button>}
           </div>
        </div>
      </div>
    })}

  <button className="btn bg-main ">
    <Link className="text-white" to = "/payment ">Online Payment</Link>
  </button>
</div>: <LoadingScreen/> }
  </>
   }
  
}
