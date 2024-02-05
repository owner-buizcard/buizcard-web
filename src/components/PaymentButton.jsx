import React, { useCallback } from 'react';
import useRazorpay from "react-razorpay";
import { createOrder, createSubscribe } from '../network/service/paymentService';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader, updateAppUser } from '../store/reducers/app';
import { showSnackbar } from '../utils/snackbar-utils';
import { Button } from '@mui/material';

const PaymentButton = ({planId, type}) => {

  const [ Razorpay ] = useRazorpay();

  const user = useSelector((state)=>state.app.user);
  const dispatch = useDispatch();

  const handlePayment = useCallback(async() => {

    dispatch(showLoader());

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
    rzpay.on("payment.cancel", function (_) {});

    rzpay.open();
  }, [Razorpay]);

  const handlePaymentSuccess = async (response) => {

    response.plan = { id: planId, type}
    const user = await createSubscribe(response);
    dispatch(hideLoader());
    dispatch(updateAppUser(user));
    showSnackbar("Payment successful!")
  };

  return (
    <div className="App">
      <Button variant="contained" onClick={handlePayment}>Subscribe Now</Button>
    </div>
  );
};

export default PaymentButton;
