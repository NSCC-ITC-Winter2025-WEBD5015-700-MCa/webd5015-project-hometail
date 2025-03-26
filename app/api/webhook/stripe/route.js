// import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import connectToDB from "@/utils/db";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// export const POST = async (req) => {
//   await connectToDB();

//   const body = await req.text();

//   const signature = req.headers.get("Stripe-Signature");

//   let data;
//   let eventType;
//   let event;

//   //verify Stripe event is legit
//   try {
//     event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
//   } catch (err) {
//     console.error(`Webhook signature verification failed. ${err.message}`);
//     return NextResponse.json({ error: err.message }, { status: 400 });
//   }

//   data = event.data;
//   eventType = event.type;

//   try {
//     switch (eventType) {
//       //99% of cases only need these two events
//       case "checkout.session.completed": {
//         //First payment is successful and a subscription is created
//         //Grant access to the product
//         const session = await stripe.checkout.sessions.retrieve(
//           data.object.id,
//           {
//             expand: ["line_items"],
//           }
//         );

//         const customerId = session?.customer;
//         const customer = await stripe.customers.retrieve(customerId);

//         const priceId = session?.line_items.data[0].price.id;
//         //   const plan = plans.find((p) => p.priceId === priceId);

//         let user;

//         if (customer.email) {
//           user = await User.findOne({ email: customer.email });

//           if (!user) {
//             user = await User.create({
//               email: customer.email,
//               customerId: customer.id,
//             });

//             await user.save();
//           }
//         }

//         //Update user data + grant user access to the product. It's a boolean in the database, but could be a number of credits, etc...
//         user.priceId = priceId;
//         user.customerId = customer.id;
//         user.hasAccess = true;
//         user.isSubscribed = true;
//         await user.save();

//         //Send email to user

//         break;
//       }

//       case "customer.subscription.deleted": {
//         //Subscription is canceled
//         //Revoke access to the product
//         const subscription = await stripe.subscriptions.retrieve(
//           data.object.id
//         );

//         const user = await User.findOne({ customerId: subscription.customer });

//         //Revoking access to the product
//         user.hasAccess = false;
//         user.isSubscribed = false;
//         await user.save();

//         //Send email to user

//         break;
//       }
//     }
//   } catch (error) {
//     console.log(
//       "stripe error: " + error.message + " | EVENT TYPE: " + eventType
//     );
//   }
//   return NextResponse.json({});
// };
