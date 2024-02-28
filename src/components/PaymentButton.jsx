import React, { useCallback } from 'react';
import useRazorpay from "react-razorpay";
import { createOrder, createSubscribe } from '../network/service/paymentService';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader, updateAppUser } from '../store/reducers/app';
import { Button } from '@mui/material';

const PaymentButton = ({plan, type}) => {

  console.log("PaymentButton type:", type);

  const [ Razorpay ] = useRazorpay();

  const user = useSelector((state)=>state.app.user);
  const dispatch = useDispatch();

  const handlePayment = useCallback(async() => {
    try{
      dispatch(showLoader());

      // const amount = (type=="m" ? plan.price.m.amount: plan.price.y.amount) * 100;
      const amount = 100;

      const order = await createOrder(amount);  
  
      const options = {
        key: 'rzp_live_v5uEoz77A8mTwT',
        amount: amount,
        currency: 'INR',
        name: 'Bizcard',
        description: 'Your digital business card',
        image: 'https://firebasestorage.googleapis.com/v0/b/bizcard-spiderlingz.appspot.com/o/logo%2Fcard.png?alt=media&token=ded33d94-1fb7-4538-9bd4-e307d8bd778a',
        order_id: order.id,
        handler: handlePaymentSuccess,
        prefill: {
          name: `${user.firstName??''} ${user.lastName??''}`,
          email: user.email,
          contact: user.phoneNumber,
        },
        notes: {
          address: `${user.address?.addressLine1??''} ${user.address?.state??''} ${user.address?.country??''}`,
        },
        theme: {
          color: '#528FF0',
        },
      };
  
      const rzpay = new Razorpay(options);
  
      rzpay.open();
    }catch(e){
      console.log(e)
    }finally{
      dispatch(hideLoader());
    }
   
  }, [Razorpay]);

  const handlePaymentSuccess = async (response) => {
    try{
      dispatch(showLoader());
      console.log(type);
      response.plan = { id: plan._id, type}
      const user = await createSubscribe(response);
      dispatch(updateAppUser(user));
    }catch(e){

    }finally{
      dispatch(hideLoader());
    }

  };

  return (
    <div className="App">
      <Button variant="contained" onClick={handlePayment} sx={{fontWeight: 600}}>Subscribe Now</Button>
    </div>
  );
};

export default PaymentButton;
