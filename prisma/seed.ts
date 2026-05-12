import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import { join } from "path";

const portfolioData = JSON.parse(
  readFileSync(join(process.cwd(), "portfolio.json"), "utf-8")
);

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("#Gui0307", 12);
  await prisma.user.upsert({
    where: { email: "admin@codermaster.com.br" },
    update: {},
    create: {
      name: "Coder Master",
      email: "admin@codermaster.com.br",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const categories = [
    { name: "Landing Page", slug: "landing-page" },
    { name: "E-commerce", slug: "e-commerce" },
    { name: "Site Institucional", slug: "site-institucional" },
    { name: "Blog", slug: "blog" },
  ];

  const categoryMap: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.portfolioCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categoryMap[cat.name] = created.id;
  }

  for (const item of portfolioData) {
    const catId = categoryMap[item.categoria];
    if (!catId) continue;

    const imagePath = `/portfolio/${item.imagem.split("/").pop()}`;

    await prisma.portfolioItem.upsert({
      where: { id: String(item.id) },
      update: {},
      create: {
        id: String(item.id),
        title: item.titulo,
        description: item.descricao,
        image: imagePath,
        link: item.link,
        featured: item.destaque,
        order: item.id,
        categoryId: catId,
      },
    });
  }

  const invoiceCategories = [
    { name: "Hospedagem", isRevenue: true },
    { name: "Domínio", isRevenue: false },
    { name: "Criação de Site", isRevenue: true },
    { name: "Manutenção", isRevenue: true },
    { name: "Marketing Digital", isRevenue: true },
  ];

  for (const cat of invoiceCategories) {
    await prisma.invoiceCategory.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }

  await prisma.hostingPlan.upsert({
    where: { id: "plan-starter" },
    update: {},
    create: {
      id: "plan-starter",
      name: "Starter",
      priceMonthly: 29.99,
      priceAnnual: 310.0,
      emails: 5,
      databases: 1,
      sites: 1,
      diskSpaceMB: 5120,
      bandwidthGB: 50,
      features: ["SSL Grátis", "Backup Semanal", "Painel cPanel"],
      highlighted: false,
      order: 1,
    },
  });

  await prisma.hostingPlan.upsert({
    where: { id: "plan-business" },
    update: {},
    create: {
      id: "plan-business",
      name: "Business",
      priceMonthly: 49.99,
      priceAnnual: 520.0,
      emails: 20,
      databases: 5,
      sites: 5,
      diskSpaceMB: 20480,
      bandwidthGB: 200,
      features: ["SSL Grátis", "Backup Diário", "Painel cPanel", "CDN Incluso"],
      highlighted: true,
      order: 2,
    },
  });

  await prisma.hostingPlan.upsert({
    where: { id: "plan-premium" },
    update: {},
    create: {
      id: "plan-premium",
      name: "Premium",
      priceMonthly: 89.99,
      priceAnnual: 940.0,
      emails: 50,
      databases: 20,
      sites: 20,
      diskSpaceMB: 51200,
      bandwidthGB: 500,
      features: [
        "SSL Grátis",
        "Backup Diário",
        "Painel cPanel",
        "CDN Incluso",
        "IP Dedicado",
        "Suporte Prioritário",
      ],
      highlighted: false,
      order: 3,
    },
  });

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
