import Image from 'next/image';
import { FC, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import placeholderImg from '../../../../assets/img/theme_carousel.png';

const lectures = [
  { title: 'Цифровая трансформация: Реальные кейсы', description: 'Погрузитесь в практический опыт внедрения цифровых решений...', image: '' },
  { title: 'Эффективное принятие решений', description: 'Изучите методы стратегического анализа и практические...', image: '' },
  { title: 'Аналитика данных в эпоху перемен', description: 'Узнайте, как современные данные могут преобразить бизнес...', image: '' },
  { title: 'Психология мотивации', description: 'Как мотивировать себя и других на достижение высоких результатов.', image: '' },
  { title: 'Дизайн мышления', description: 'Применение методологии дизайн-мышления для решения сложных задач.', image: '' },
];

const LecturesCarousel: FC = () => {
  const totalItems = lectures.length;
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  return (
    <div className="bg-white py-16 font-gotham max-w-[1000px] w-fit">
      <div className="mx-auto">
        <div className="flex justify-between items-center pb-10 py-12">
          <span className="text-[32px] font-bold font-azoft">Лекции спикера</span>
          <div className="flex gap-4">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white cursor-pointer"
              onClick={handlePrev}
            >
              <FaArrowLeft size={20} />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white cursor-pointer"
              onClick={handleNext}
            >
              <FaArrowRight size={20} />
            </button>
          </div>
        </div>
        <div className="overflow-hidden relative w-[590px] 2xl:w-full">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {[...lectures, ...lectures, ...lectures, ...lectures].map((lecture, i) => (
              <div key={i} className="rounded-[26px] bg-white max-w-[278px] flex-shrink-0">
                <Image
                  src={lecture.image || placeholderImg}
                  alt={lecture.title}
                  width={278}
                  height={200}
                  className="rounded-[26px] w-full h-auto"
                />
                <span className="title-clamp text-[14px] 2xl:text-[20px] font-medium text-[#252525] mt-4 block">
                  {lecture.title}
                </span>
                <p className="text-[10px] 2xl:text-[16px] font-normal text-[#6B6B6B] mt-2 line-clamp-2">
                  {lecture.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturesCarousel;
