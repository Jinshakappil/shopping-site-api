import Razorpay from 'razorpay';

export const razorpayProvider = {
  provide: 'RAZORPAY_CLIENT',
  useFactory: () => {
    return new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'your_key_id',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_key_secret',
    });
  },
};
