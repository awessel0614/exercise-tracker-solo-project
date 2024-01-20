import React from 'react';
import Footer from '../Footer/Footer';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h2>Thank you so much for using the Exerciser Tracker app!</h2>
        <p>I wanted to create something that I would get real-life use from, and I'm
          happy to say that I've done that! Thank you to everyone in the Taaffeite cohort, our
          instructor Chris Black, and to all of the Prime staff! It's been an incredibly rewarding
          (and at times, a whirlwind) experience!
        </p>
        <ol>Technologies used:</ol>
          <li>HTML & CSS</li>
          <li>Javascript</li>
          <li>Axios</li>
          <li>React</li>
          <li>Redux & Sagas</li>
          <li>PostgreSQL & Postico</li>
          <Footer></Footer>
      </div>
    </div>
    
  );
}

export default AboutPage;
