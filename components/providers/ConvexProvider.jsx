// "use client";

// import { ClerkProvider, useAuth } from "@clerk/clerk-react";
// import { ConvexReactClient } from "convex/react";
// import { ConvexProviderWithClerk } from "convex/react-clerk"

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// export const ConvexClientProvider = ({ children }) => {
//   return (
//     <ClerkProvider
//       publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
//     >
//       <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
//         {children}
//       </ConvexProviderWithClerk>
//     </ClerkProvider>
//   );
// };

"use client";

import { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export const ConvexClientProvider = ({ children }) => {
  return (
    <ConvexProvider client={convex}>
      {children}
    </ConvexProvider>
  );
};