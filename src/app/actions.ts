"use server";

export type ActionResult = { success: boolean; message: string };

export async function submitAffiliateTask(formData: FormData): Promise<ActionResult> {
  const affiliateNumber = (formData.get("affiliateNumber") as string)?.trim();
  const formType = formData.get("formType") as string;

  if (!affiliateNumber) {
    return { success: false, message: "El número de afiliado es requerido." };
  }

  const payload = Object.fromEntries(formData.entries());

  // TODO: Replace with your backend call — e.g. fetch("/api/afiliados", { method: "POST", body: JSON.stringify(payload) })
  console.log("[AffiliateTask]", formType, payload);

  return { success: true, message: "Tu solicitud ha sido recibida y se está procesando." };
}

export async function submitContactForm(formData: FormData): Promise<ActionResult> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !message) {
    return { success: false, message: "Completá todos los campos." };
  }

  // TODO: Replace with your email service — e.g. Resend, Nodemailer, etc.
  console.log("[ContactForm]", { name, email, message });

  return { success: true, message: "¡Mensaje enviado! Te respondemos a la brevedad." };
}
