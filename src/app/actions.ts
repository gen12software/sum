"use server";

export type ActionResult = { success: boolean; message: string };

export async function submitContactForm(formData: FormData): Promise<ActionResult> {
  try {
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!name || !email || !message) {
      return { success: false, message: "Completá todos los campos." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "El correo electrónico no es válido." };
    }

    return { success: true, message: "¡Mensaje enviado! Te respondemos a la brevedad." };
  } catch {
    return { success: false, message: "Ocurrió un error al enviar el mensaje. Intentá nuevamente." };
  }
}
