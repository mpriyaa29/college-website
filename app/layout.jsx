import './globals.css';
import Navigation from '../src/components/Navigation/Navigation';
import Footer from '../src/components/Footer/Footer';

export const metadata = {
  title: 'SKCET — Sri Krishna College of Engineering and Technology',
  description: 'Sri Krishna College of Engineering and Technology — An autonomous institution affiliated with Anna University, Coimbatore.',
  icons: {
    icon: 'https://skcet.ac.in/wp-content/uploads/2023/11/cropped-skcet-logo-final-32x32.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts: Inter + Playfair Display + Google Sans etc. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Google+Sans:wght@400;500;700&family=Google+Sans+Display&family=Hammersmith+One&family=Inter:wght@300;400;500;600;700&family=Oswald:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        {/* Preloads */}
        <link rel="preload" as="image" href="/images/hero-poster.webp" fetchPriority="high" />
        <link rel="preload" as="image" href="https://skcet.ac.in/wp-content/uploads/2024/08/skcet-logo.png" fetchPriority="high" />
        <link rel="preload" as="video" href="/videos/skcet-campus.mp4" type="video/mp4" fetchPriority="auto" />
      </head>
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
