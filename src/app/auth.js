// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google"

// export default NextAuth({
//     providers: [
//       Google({
//         clientId: process.env.AUTH_GOOGLE_ID,
//         clientSecret: process.env.AUTH_GOOGLE_SECRET,
//         authorization: {
//           params: {
//             scope : "https://www.googleapis.com/auth/youtube.readonly"
//           }
//         }
        
//       })
//     ],
//     callbacks: {
//       async jwt(token, account) {
//         if (account) {
//           token.accessToken = account.accessToken;
//           token.refreshToken = account.refreshToken;
//         }
//         return token;
//       },
//       async session(session, token) {
//         session.accessToken = token.accessToken;
//         return session;
//       }
//     }
//   })