import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const AIBEE_BASE_URL = "https://api.aibee.cloud";
const MODEL = "claude-haiku-4-5-20251001";

const SYSTEM_PROMPT = `Você é um redator especialista em marketing digital para pequenas empresas brasileiras.
Seu público-alvo são empresários e profissionais que NÃO são técnicos em tecnologia — eles não sabem por que precisam de um site, sistema ou aplicativo.

Seu objetivo é criar conteúdo que:
- Explique de forma simples e acessível os benefícios de ter presença digital
- Use linguagem clara, sem jargões técnicos
- Convença o leitor de que investir em tecnologia (site, sistema, app) traz retorno real
- Seja otimizado para SEO
- Tenha tom profissional mas acolhedor

Sempre responda em português brasileiro.`;

async function callClaude(messages: any[], maxTokens = 4096) {
  const apiKey = process.env.AIBEE_API_KEY;
  if (!apiKey) {
    throw new Error("AIBEE_API_KEY not configured");
  }

  const res = await fetch(`${AIBEE_BASE_URL}/v1/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`AIBee API error: ${res.status} - ${error}`);
  }

  return res.json();
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { action, topic, content } = body;

  try {
    if (action === "suggest") {
      const response = await callClaude([
        {
          role: "user",
          content: `Sugira 5 tópicos de blog posts que seriam relevantes para empresários brasileiros que não entendem de tecnologia.
Foque em temas que convençam sobre a importância de ter site, sistema ou aplicativo.
Considere tendências atuais de marketing digital e transformação digital para pequenos negócios.

Para cada sugestão, forneça:
- Título atrativo (otimizado para SEO)
- Breve descrição do que abordar (2 linhas)

Responda em formato JSON assim:
[{"title": "...", "description": "..."}]

Responda APENAS o JSON, sem texto adicional.`,
        },
      ]);

      const text = response.content[0]?.text || "[]";
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      const suggestions = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

      return NextResponse.json({ suggestions });
    }

    if (action === "generate") {
      const response = await callClaude([
        {
          role: "user",
          content: `Escreva um blog post completo sobre o seguinte tópico: "${topic}"

O post deve:
- Ter um título atrativo e otimizado para SEO
- Ter entre 800-1200 palavras
- Usar subtítulos (H2, H3) para organizar o conteúdo
- Ser escrito em HTML simples (p, h2, h3, ul, li, strong, em)
- Ter uma introdução que prenda a atenção
- Incluir exemplos práticos e dados quando possível
- Ter uma conclusão com call-to-action

Responda em formato JSON assim:
{"title": "...", "content": "...HTML do conteúdo..."}

Responda APENAS o JSON, sem texto adicional.`,
        },
      ]);

      const text = response.content[0]?.text || "{}";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const result = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      return NextResponse.json(result);
    }

    if (action === "improve") {
      const response = await callClaude([
        {
          role: "user",
          content: `Melhore e expanda o seguinte conteúdo de blog post.

Tópico/Contexto: "${topic}"
${content ? `\nConteúdo atual:\n${content}` : ""}

Gere um post completo e aprimorado que:
- Tenha um título atrativo e otimizado para SEO
- Tenha entre 800-1200 palavras
- Use subtítulos (H2, H3) para organizar o conteúdo
- Seja escrito em HTML simples (p, h2, h3, ul, li, strong, em)
- Mantenha o tom acessível para leigos em tecnologia
- Inclua exemplos práticos
- Tenha uma conclusão com call-to-action

Responda em formato JSON assim:
{"title": "...", "content": "...HTML do conteúdo..."}

Responda APENAS o JSON, sem texto adicional.`,
        },
      ]);

      const text = response.content[0]?.text || "{}";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const result = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "AI generation failed" },
      { status: 500 }
    );
  }
}
