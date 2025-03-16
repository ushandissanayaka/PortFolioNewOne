import React from 'react';
import Hero from './sub-components/Hero';
import Timeline from './sub-components/Timeline';
import About from './sub-components/About';
import Skills from './sub-components/Skills';
import Portfolio from './sub-components/Portfolio';
import Apps from './sub-components/Apps';
import Contact from './sub-components/Contact';

const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <article >
        <Hero />
        <Timeline />
        <About />
        <Skills />
        <Portfolio />
        <Apps />
        <Contact />
      </article>
    </div>
  );
};

export default Home;