import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let domain = searchParams.get("domain");

  if (!domain) {
    return NextResponse.json(
      { error: "Domain parameter is required" },
      { status: 400 }
    );
  }

  domain = domain.toLowerCase().trim();
  if (!domain.includes(".")) {
    domain = `${domain}.com.br`;
  }

  try {
    const tld = domain.split(".").slice(1).join(".");
    let rdapUrl: string;

    if (tld === "com.br" || tld === "br") {
      rdapUrl = `https://rdap.registro.br/domain/${domain}`;
    } else {
      rdapUrl = `https://rdap.org/domain/${domain}`;
    }

    const response = await fetch(rdapUrl, {
      headers: { Accept: "application/rdap+json" },
      signal: AbortSignal.timeout(5000),
    });

    if (response.status === 404) {
      return NextResponse.json({ available: true, domain });
    }

    if (response.ok) {
      return NextResponse.json({ available: false, domain });
    }

    return NextResponse.json({ available: true, domain });
  } catch {
    return NextResponse.json({ available: true, domain });
  }
}
