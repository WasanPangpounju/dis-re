import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProductsSection from '@/components/sections/ProductsSection'
import ChatBotSection from '@/components/sections/ChatBotSection'
import AccessibilitySection from '@/components/sections/AccessibilitySection'
import ContactSection from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ServicesSection />
      <ProductsSection />
      <ChatBotSection />
      <AccessibilitySection />
      <ContactSection />
    </>
  )
}
