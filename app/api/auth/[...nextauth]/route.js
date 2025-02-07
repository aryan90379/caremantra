import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import { connectToDatabase } from '@/md/mongodb';
import Article from '@/models/Article';
import User from '@/models/User';


export const authoptions = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider == "google") {
                await connectToDatabase();
                // Check if the user already exists in the database
                const currentUser = await User.findOne({ email: user.email });
                if (!currentUser) {
                    // Create a new user
                    const newUser = await User.create({
                        email: user.email,
                        
                        username: user.email.split("@")[0],
                    });
                }
                return true;
            }
            
        },

        async session({ session, user, token }) {
            const dbUser = await User.findOne({ email: session.user.email });
            session.user.name = dbUser.username;
            return session;
        },
    }
});

export { authoptions as GET, authoptions as POST }
