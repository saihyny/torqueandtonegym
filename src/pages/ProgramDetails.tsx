import { useParams } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceSchema from '@/components/schema/ServiceSchema';

const ProgramDetails = () => {
  const { programTitle } = useParams();

  // Format program title for display
  const formattedTitle = programTitle?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Program';

  // Generate SEO-friendly content
  const seoTitle = `${formattedTitle} | TORQUE & TONE FITNESS`;
  const seoDescription = `Discover our ${formattedTitle.toLowerCase()} program at TORQUE & TONE FITNESS. Expert-led training designed to help you achieve your fitness goals with personalized coaching and support.`;
  const canonicalUrl = `https://torqueandtonefitness.com/program/${programTitle}`;
  const keywords = `${formattedTitle.toLowerCase()}, fitness program, personal training, gym classes, TORQUE & TONE FITNESS, workout, exercise, strength training`;

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={keywords}
        canonical={canonicalUrl}
        ogType="article"
      />

      <ServiceSchema
        services={[{
          name: formattedTitle,
          description: seoDescription,
          serviceType: "FitnessService",
          provider: "TORQUE & TONE FITNESS",
          areaServed: "Kompally, Hyderabad, Telangana, India",
          availableChannel: "InPerson",
          category: formattedTitle,
          offers: {
            price: "4000",
            priceCurrency: "INR",
            availability: "InStock",
            validFrom: "2025-01-01"
          }
        }]}
      />

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="container mx-auto px-6 lg:px-8 py-24">
          <h1 className="text-4xl font-bold text-white mb-6">{formattedTitle}</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Detailed information about the {formattedTitle} program will go here.
          </p>

          {/* Program content would go here */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-white mb-4">Program Overview</h2>
            <p className="text-muted-foreground">
              This is where detailed program information, schedules, pricing, and benefits would be displayed.
              The SEO component above ensures this page is properly optimized for search engines.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProgramDetails;
