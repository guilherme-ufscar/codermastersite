import { NextRequest, NextResponse } from "next/server";
import { getResend, FROM_EMAIL } from "@/lib/resend";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, phone, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: "contato@codermaster.com.br",
      subject: `Novo contato: ${name}`,
      html: `
        <h2>Novo contato pelo site</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone || "Não informado"}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
    });
  } catch {
    // Log but don't fail
  }

  return NextResponse.json({ success: true });
}
