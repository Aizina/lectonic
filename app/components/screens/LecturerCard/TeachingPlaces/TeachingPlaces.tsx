import Image from 'next/image';
import { FC } from 'react';
import placeholderImg from '@/assets/img/theme_carousel.png';
import VSELogo from '@/assets/img/VSE_logo.png';  // Direct import
import MSULogo from '@/assets/img/MSU_logo.png'; 

const places = [
    { image: VSELogo },
    { image: MSULogo },
];

const TeachingPlaces: FC = () => {
  return (
    <div className="bg-white font-gotham max-w-[1000px] w-fit mt-10">
      <div className="mx-auto">
        <span className="text-[32px] font-bold font-azoft">Места преподавания</span>
        <div className="flex flex-wrap gap-6 mt-10">
          {places.map((place, i) => (
            <div
              key={i}
              className="overflow-hidden shadow-[0px_1px_15.4px_0px_#00000005] flex-shrink-0"
              style={{ width: '327px', height: '84px' }}
            >
              <Image
                src={place.image || placeholderImg}
                alt={`Teaching Place ${i + 1}`}
                width={327}
                height={84}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeachingPlaces;
