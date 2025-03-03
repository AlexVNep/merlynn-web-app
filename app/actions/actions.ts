"use server";

import { z } from "zod";
import User from "../models/Users";
import bcrypt from "bcryptjs";
import connect from "../utils/db";
import { signIn } from "@/auth";
import { EndpointState } from "../utils/definitions";
import Decision from "../models/Decisions";

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

export async function loginWithCreds(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false, // Prevent automatic redirect
    });

    if (!response || response.error) {
      console.error("Invalid credentials.");
      return { error: "Invalid credentials." };
    }

    return { sucess: true }; // Success case, return an empty object
  } catch (error) {
    console.error("Something went wrong.", error);
    return { error: "Something went wrong. Please try again later." };
  }
}

export async function endpointSubmit(
  state: EndpointState | null | undefined,
  formData: FormData
): Promise<EndpointState | undefined> {
  const endpointSchema = z.object({
    url: z.string().trim(),
    key: z.string().trim(),
  });

  const validatedFields = endpointSchema.safeParse({
    url: formData.get("url"),
    key: formData.get("key"),
  });

  if (!validatedFields.success) {
    console.error(
      "Validation errors:",
      validatedFields.error.flatten().fieldErrors
    );
    return { error: "Not validated" };
  }

  const { url, key } = validatedFields.data;

  console.log(url, key);

  try {
    const data = await fetch(`${url}`, {
      headers: {
        Authorization: `ApiKey ${key}`,
        "Content-Type": "application/vnd.api+json",
      },
      method: "GET",
    });

    if (!data.ok) {
      return { error: `Request failed with status: ${data.status}` };
    }

    const result = await data.json();
    console.log(result);
    return {
      ...state,
      data: result,
      message: "Good request",
      url: url,
      key: key,
    };
  } catch (error) {
    console.error("Fetch error:", error);

    // Ensure `error` is converted to a string
    let errorMessage = "Request failed";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return { error: errorMessage };
  }
}

export async function formSubmit(
  state: EndpointState,
  formData: FormData,
  url: string,
  apiKey: string
): Promise<EndpointState | undefined> {
  interface InputData {
    [key: string]: number | string | undefined;
  }

  await connect();
  try {
    if (!state?.data?.metadata?.attributes) {
      console.error("Invalid state data: Missing metadata attributes.");
      return;
    }

    const input: InputData = {};

    state.data.metadata.attributes.forEach((attr, index) => {
      const inputVarKey = `INPUTVAR${index + 1}`;
      const value = formData.get(attr.question);

      if (value !== null && !(value instanceof File)) {
        input[inputVarKey] =
          attr.domain.type === "number" ? Number(value) : value;
      }
    });

    const requestBody = { input };

    console.log("Formatted Request Body:", requestBody);

    const res = await fetch(url, {
      headers: {
        Authorization: `ApiKey ${apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    const data = await res.json();
    console.log(data);

    if (data.errors) {
      console.log("API Error:", data.errors);
    } else {
      await createDecision({
        id: data.id,
        modelInput: data.modelInput,
        userInput: data.userInput,
        decision: data.decision,
        confidence: data.confidence,
      });
      console.log("Decision saved successfully.");
    }

    return {
      ...state,
      data: data,
      message: "Good request",
    };
  } catch (error) {
    console.error("Network or API error:", error);
  }
}

export async function createDecision(data: {
  id: string;
  modelInput: Record<string, number | string>;
  userInput: (number | string)[];
  decision: string;
  confidence: number;
}) {
  try {
    const newDecision = new Decision(data);
    await newDecision.save();
    console.log("Decision saved successfully:", newDecision);
  } catch (error) {
    console.error("Error saving decision:", error);
  }
}
