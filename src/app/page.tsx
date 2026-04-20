export const dynamic = 'force-dynamic'

import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProductsSection from '@/components/sections/ProductsSection'
import ChatBotSection from '@/components/sections/ChatBotSection'
import AccessibilitySection from '@/components/sections/AccessibilitySection'
import ContactSection from '@/components/sections/ContactSection'
import { content } from '@/lib/content'

export default async function HomePage() {
  const [general, portfolioItems, services, products] = await Promise.all([
    content.general.get(),
    content.portfolio.get(),
    content.services.get(),
    content.products.get(),
  ])

  return (
    <>
      <HeroSection stats={general.stats} />
      <AboutSection />
      <PortfolioSection items={portfolioItems} />
      <ServicesSection services={services} />
      <ProductsSection products={products} />
      <ChatBotSection />
      <AccessibilitySection />
      <ContactSection company={general.company} />
    </>
  )
}
