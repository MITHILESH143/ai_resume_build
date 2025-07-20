import { env } from "@/env";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

export default razorpay;
