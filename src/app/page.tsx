import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import HostingPlans from "@/components/home/HostingPlans";
import DomainCheck from "@/components/home/DomainCheck";
import PortfolioHighlights from "@/components/home/PortfolioHighlights";
import MarketingSection from "@/components/home/MarketingSection";
import SocialMediaSection from "@/components/home/SocialMediaSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogHighlights from "@/components/home/BlogHighlights";
import CTASection from "@/components/home/CTASection";
import { prisma } from "@/lib/prisma";

async function getPortfolioHighlights() {
  try {
    return await prisma.portfolioItem.findMany({
      where: { featured: true },
      include: { category: true },
      orderBy: { order: "asc" },
      take: 6,
    });
  } catch {
    return [];
  }
}

async function getBlogHighlights() {
  try {
    return await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
      },
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [portfolioItems, blogPosts] = await Promise.all([
    getPortfolioHighlights(),
    getBlogHighlights(),
  ]);

  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <HostingPlans />
        <DomainCheck />
        <PortfolioHighlights items={portfolioItems} />
        <MarketingSection />
        <SocialMediaSection />
        <PricingSection />
        <TestimonialsSection />
        <BlogHighlights posts={blogPosts} />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
