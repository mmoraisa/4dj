import React from 'react';
import Background from '../../components/Background';
import BackgroundCircles from '../../components/BackgroundCircles';
import Footer from '../../components/Footer';
import TopBar from '../../components/TopBar';

const Main = ({ children, products }) => (
  <>
    <main>
      <TopBar products={products} />
      <BackgroundCircles />
      <Background />
      <section id="content">
        { children }
      </section>
    </main>
    <Footer />
  </>
)

export default Main;
