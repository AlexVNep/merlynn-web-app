"use server";

import { z } from "zod";
import User from "../models/Users";
import bcrypt from "bcryptjs";
import connect from "../utils/db";

type RegisterResponse = { success: true } | { error: string };

export async function registerWithCreds(
  formData: FormData
): Promise<RegisterResponse> {
  const registerFormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }).trim(),
    password: z.string().trim(),
  });

  const validatedFields = registerFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    console.error(
      "Validation errors:",
      validatedFields.error.flatten().fieldErrors
    );
    return { error: "Not validated" };
  }

  const { email, password } = validatedFields.data;

  await connect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.error("Email already in use");
    return { error: "Email already in use" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      email,
      password: hashedPassword,
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}
