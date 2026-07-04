import React, { useEffect, useRef } from 'react';

const defaultTestimonials = [
  {
    title: { rendered: 'Alex Orchilles' },
    content: { rendered: 'This is the authentic taco spot that we all needed. The birria tacos and steak burritos are phenomenal. The caesar salad with chicken is amazing too. I highly recommend you come check this place out!' }
  },
  {
    title: { rendered: 'Mary Ellen Carrillo' },
    content: { rendered: 'I am so pleased to find a place where they focus on the food and not just atmosphere. This place has it all! Everything we had was amazing. Prices are super decent too for the quality — so worth it.' }
  },
  {
    title: { rendered: 'Sandy Cheng' },
    content: { rendered: 'Such delicious food! Perfect portion sizes. The service was great and very attentive. We ordered birria, flautas, barbacoa, mushroom and flan. Delicious delicious delicious. Check it out for yourself!' }
  }
];

const TableTalk = ({ data }) => {
  const sectionRef = useRef(null);
  
  // Dynamically build testimonials array from data
  let testimonials = [];
  const count = data?.testimonial_count || 0;
  for (let i = 1; i <= count; i++) {
    const quote = data?.[`testimonial_${i}_quote`];
    const author = data?.[`testimonial_${i}_author`];
    if (quote || author) {
      testimonials.push({
        content: { rendered: quote || "" },
        title: { rendered: author || "" }
      });
    }
  }

  // Fallback to default testimonials if none provided by API
  if (testimonials.length === 0) {
    testimonials = defaultTestimonials;
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 200);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="talk-section" style={{
      width: '100%',
      padding: '140px 40px',
      background: '#F5F1EB',
      position: 'relative',
      zIndex: 10
    }}>
      <style>{`
        @media (max-width: 768px) {
          .talk-section {
            padding: 60px 20px !important;
          }
          .talk-container {
            flex-direction: column !important;
            gap: 20px !important;
          }
          .testimonial-columns {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
      <div className="talk-container" style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '60px',
        maxWidth: '100%',
      }}>
        {/* Left Heading */}
        <div className="fade-in" style={{
          flex: '0 0 auto',
          paddingTop: '4px'
        }}>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            margin: 0,
            writingMode: 'horizontal-tb',
            whiteSpace: 'nowrap'
          }}>TABLE TALK</h2>
        </div>

        {/* Testimonials Columns */}
        <div 
          className="testimonial-columns"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
            flex: 1
          }}>
          {testimonials.map((item, idx) => {
            const quote = typeof item.content.rendered === 'string'
              ? item.content.rendered.replace(/<[^>]*>/g, '')
              : item.content.rendered;
            const author = typeof item.title.rendered === 'string'
              ? item.title.rendered.replace(/<[^>]*>/g, '')
              : item.title.rendered;

            return (
              <div key={idx} className="testimonial-item fade-in" style={{ textAlign: 'left' }}>
                <p className="testimonial-quote" style={{
                  fontFamily: '"Courier Prime", monospace',
                  fontSize: '15px',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  letterSpacing: '0.01em',
                  color: '#1a1a1a',
                  marginBottom: '24px'
                }}>"{quote}"</p>
                <p className="testimonial-author" style={{
                  fontFamily: '"Courier Prime", monospace',
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  color: '#1a1a1a'
                }}>- {author}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TableTalk;
