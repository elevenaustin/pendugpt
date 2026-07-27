import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  whatsapp: z.string().trim().regex(/^[6-9]\d{9}$/),
  email: z.string().trim().email().max(160),
  age: z.number().int().min(13).max(90),
  occupation: z.string().trim().min(2).max(80),
  district: z.string().trim().min(2).max(60),
  state: z.string().trim().min(2).max(60),
  hasLaptop: z.boolean(),
  language: z.enum(["en", "pa"]),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const createRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => registrationSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("registrations")
      .insert({
        full_name: data.fullName,
        whatsapp: data.whatsapp,
        email: data.email,
        age: data.age,
        occupation: data.occupation,
        district: data.district,
        state: data.state,
        has_laptop: data.hasLaptop,
        language: data.language,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      console.error("[registrations] insert failed", error.message);
      throw new Error("REGISTRATION_FAILED");
    }
    return { id: row.id as string };
  });

/**
 * Placeholder payment confirmation.
 * Replace the simulated block with a Razorpay order + signature verification
 * when live keys are available; the rest of the flow stays the same.
 */
export const confirmPayment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const paymentRef = `TEST-${Date.now().toString(36).toUpperCase()}`;
    const { error } = await supabaseAdmin
      .from("registrations")
      .update({ status: "paid", payment_ref: paymentRef })
      .eq("id", data.id);

    if (error) {
      console.error("[registrations] payment update failed", error.message);
      throw new Error("PAYMENT_FAILED");
    }
    return { ok: true, paymentRef };
  });
