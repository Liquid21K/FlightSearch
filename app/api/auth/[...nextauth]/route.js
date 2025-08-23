import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          await connectDB();

          const user = await User.findOne({ email });
          console.log("User fetched:", user);
          // Check if user exists and is verified
          if (!user || !user.verified) {
            console.log("Email not verified or user not found");
            return null;
          }

          // Check if user is paused
          if (user.status === "paused") {
            console.log("User account is paused");
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(password, user.password);
          if (!isPasswordCorrect) {
            console.log("Incorrect password");
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: `${user.firstname} ${user.lastname}`,
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
            image: user.image || "assets/images/user_icon.png",
            dob: user.dob,
            isAdmin: user.isAdmin || "user",
            status: user.status,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.gender = user.gender;
        token.status = user.status;
        token.image = user.image || "assets/images/user_icon.png";
        token.dob = user.dob;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      await connectDB();
      const dbUser = await User.findOne({ email: token.email });

      session.user.id = dbUser._id.toString();
      session.user.email = dbUser.email;
      session.user.name = `${dbUser.firstname} ${dbUser.lastname}`;
      session.user.firstname = dbUser.firstname;
      session.user.lastname = dbUser.lastname;
      session.user.gender = dbUser.gender;
      session.user.status = dbUser.status;
      session.user.image = dbUser.image || "assets/images/user_icon.png";
      session.user.dob = dbUser.dob;
      session.user.isAdmin = dbUser.isAdmin || "user";

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
