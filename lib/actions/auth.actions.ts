'use server';

import { auth } from "@/lib/better-auth/auth";
import { inngest } from "@/lib/inngest/client";
import { headers } from "next/headers";

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry
}: SignUpFormData) => {
  try {
    const authInstance = await auth;

    const response = await authInstance.api.signUpEmail({
      body: {
        email,
        password,
        name: fullName,
      },
    });

    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        },
      });
    }

    return { success: true, data: response };
  } catch (e) {
    console.log("Sign up failed", e);
    return { success: false, error: "Sign up failed" };
  }
};

export const signInWithEmail = async ({
  email,
  password,
}: SignInFormData) => {
  try {
    const authInstance = await auth;

    const response = await authInstance.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { success: true, data: response };
  } catch (e) {
    console.log("Sign in failed", e);
    return { success: false, error: "Sign in failed" };
  }
};

export const signOut = async () => {
  try {
    const authInstance = await auth;

    await authInstance.api.signOut({
      headers: await headers(),
    });

    return { success: true };
  } catch (e) {
    console.log("Sign out failed", e);
    return { success: false, error: "Sign out failed" };
  }
};