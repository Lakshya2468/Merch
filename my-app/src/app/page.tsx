import Categories from '@/components/Categories'
import FeaturedDesigns from '@/components/FeaturedDesigns'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'MerchStore - Custom Merchandise & Design Marketplace',
  description:
    'Create custom t-shirts, hoodies, and merchandise with our easy-to-use design tools. Choose from thousands of designs or upload your own. Quality guaranteed, fast shipping.',
  keywords:
    'custom merchandise, custom t-shirts, custom hoodies, design marketplace, print on demand, personalized merch',
  openGraph: {
    title: 'MerchStore - Custom Merchandise & Design Marketplace',
    description:
      'Create custom t-shirts, hoodies, and merchandise with our easy-to-use design tools.',
    type: 'website'
  }
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <FeaturedDesigns />
      </main>
      <Footer />
    </>
  )
}
