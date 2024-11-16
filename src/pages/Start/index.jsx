import React from 'react';
import { Link } from 'react-router-dom';

function ClassCard() {
  const cardData = [
    { slug: 'rpl-1/gallery', title: 'XII RPL 1', description: 'Menampilkan pameran project dari kelas kami!', logo: '/images/rpl1.png' },
    { slug: 'rpl-2/gallery', title: 'XII RPL 2', description: 'Menampilkan pameran project dari kelas kami!', logo: '/images/rpl2.png' },
    { slug: 'pplg-1/gallery', title: 'XI PPLG 1', description: 'Menampilkan pameran project dari kelas kami!', logo: '/images/pplg1.png' },
    { slug: 'pplg-2/gallery', title: 'XI PPLG 2', description: 'Menampilkan pameran project dari kelas kami!', logo: '/images/pplg2.png' }
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-8">
      <div className="flex flex-wrap justify-center items-center gap-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white w-60 h-80 rounded-lg shadow-lg p-4 flex flex-col items-center justify-between cursor-pointer transition-transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="w-24 h-24 overflow-hidden rounded-full mb-4">
              <img
                src={card.logo}
                alt={`${card.title} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Container garis kiri, title, dan garis kanan */}
            <div className="flex items-center w-full justify-center mb-2 space-x-2">
              <span className="flex-grow h-[1px] bg-orange-500"></span> {/* Garis di kiri */}
              <div className="bg-orange-500 text-white px-3 py-0.5 rounded-md text-sm font-semibold text-center">
                {card.title}
              </div>
              <span className="flex-grow h-[1px] bg-orange-500"></span> {/* Garis di kanan */}
            </div>

            <p className="text-gray-600 text-center mb-4">{card.description}</p>
            <Link
              to={`/${card.slug}`}
              className="text-orange-500 font-normal"
            >
              View Gallery
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassCard;
