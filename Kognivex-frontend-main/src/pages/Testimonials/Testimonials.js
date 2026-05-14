import React, { useEffect } from 'react';
import { updateSeo } from '../../utils/seoHelper';

function Testimonials() {
  useEffect(() => {
    updateSeo({ title: 'Testimonials - Kognivex', description: 'Read what clients say about Kognivex services.' });
  }, []);

  return (
    <section style={{ padding: '1rem 0' }}>
      <h1>Testimonials</h1>
      <p>Our clients trust Kognivex to deliver reliable and scalable digital products.</p>
    </section>
  );
}

export default Testimonials;
