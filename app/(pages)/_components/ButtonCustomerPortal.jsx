// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// // Customer portal link
// const customerPortalLink =
//   "https://billing.stripe.com/p/login/9AQ16baJEcCH6li3cc";

// const ButtonCustomerPortal = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (!session) {
//       router.push("/");
//     }
//   }, [session]);

//   if (status === "authenticated") {
//     return (
//       <div className="flex justify-center">
//         <a
//           href={customerPortalLink + "?prefilled_email=" + session.user?.email}
//           target="_blank"
//         >
//           <button className="btn btn-wide btn-primary text-lg text-black dark:text-white">
//             Manage Billing
//           </button>
//         </a>
//       </div>
//     );
//   }
// };

// export default ButtonCustomerPortal;
