import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ClienteHospedagemPage() {
  const session = await auth();
  const userId = (session?.user as any)?.id;

  let limits: any = null;
  try {
    limits = await prisma.clientHostingLimits.findUnique({
      where: { userId },
    });
  } catch {}

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Minha Hospedagem</h1>

      {!limits ? (
        <div className="bg-white rounded-xl p-8 border border-border text-center">
          <p className="text-muted-foreground">
            Nenhum plano de hospedagem vinculado à sua conta.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Entre em contato conosco para contratar um plano.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-6">Limites do seu Plano</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <LimitCard label="Contas de Email" value={limits.maxEmails} icon="📧" />
            <LimitCard label="Bancos de Dados" value={limits.maxDatabases} icon="🗄️" />
            <LimitCard label="Sites" value={limits.maxSites} icon="🌐" />
            <LimitCard label="Espaço em Disco" value={`${limits.diskSpaceMB} MB`} icon="💾" />
            <LimitCard label="Banda Mensal" value={`${limits.bandwidthGB} GB`} icon="📊" />
          </div>

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Precisa de mais recursos? Entre em contato conosco para fazer um upgrade do seu plano.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function LimitCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="text-center p-4 bg-muted rounded-xl">
      <span className="text-2xl">{icon}</span>
      <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
