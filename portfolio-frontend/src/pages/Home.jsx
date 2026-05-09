import React from 'react';
import Hero from './sub-components/Hero';
import MyWorks from './sub-components/MyWorks';
import About from './sub-components/About';
import Skills from './sub-components/Skills';
import Portfolio from './sub-components/Portfolio';
import Apps from './sub-components/Apps';
import Contact from './sub-components/Contact';
import ScrollReveal from '../components/ScrollReveal';

const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <article >
        <Hero />
        <ScrollReveal direction="up" delay={100}>
          <MyWorks />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <About />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <Skills />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <Portfolio />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <Apps />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <Contact />
        </ScrollReveal>
      </article>
    </div>
  );
};

export default Home;