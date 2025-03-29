import Image from 'next/image';
import { useState } from 'react';
import { LecturerItem } from '@/shared/types/lecturer.types';
import Link from 'next/link';
import arrowDown from '@/assets/svg/chevron-down.svg'

interface LecturerListProps {
  mainLecturer?: LecturerItem;
  lecturerData: LecturerItem[];
}

const LecturerList: React.FC<LecturerListProps> = ({ mainLecturer, lecturerData }) => {
  const [showAllLecturers, setShowAllLecturers] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const handleClick = () => {
    setShowAllLecturers(!showAllLecturers);
    setIsRotated(!isRotated);
  }
  const filteredLecturers = mainLecturer
    ? lecturerData.filter(lecturer => lecturer.lecturer_id !== mainLecturer.lecturer_id)
    : lecturerData;

  const visibleLecturers = filteredLecturers.slice(0, 2);
  const remainingCount = filteredLecturers.length - visibleLecturers.length;

  return (
    <div>

        {lecturerData.length === 1 ? 
        <div>
            <Link href={`/lecturer/${lecturerData[0].lecturer_id}`}>
                <div className='flex'>
                    <div className='relative flex w-[102px] h-[102px] rounded-full overflow-hidden'>
                        <Image
                            src={lecturerData[0].lecturer.photo_small}
                            fill
                            sizes='(max-width: 288px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            alt='Лектор'
                            className='object-cover'
                        />
                    </div>
                    <div className='max-w-[625px] p-5 flex flex-col'>
                        <span className='font-roboto text-black uppercase text-[24px] leading-[32px]'>
                            {lecturerData[0].lecturer.first_name}{' '}
                            {lecturerData[0].lecturer.middle_name}{' '}
                            {lecturerData[0].lecturer.last_name}
                        </span>
                        <span className='font-montserrat text-secondaryText text-[16px]'>
                            {lecturerData[0].lecturer.specialization}
                        </span>
                    </div>
                </div>
			</Link>
        </div> : 
        <div className='flex flex-row'>
            <div className={`relative flex bg-white w-[400px] p-4 ${showAllLecturers ? 'shadow-xl' : ''}`}
                style={{ zIndex: 2 }} >
                {visibleLecturers.map((lecturer, index) => (
                <div key={index} 
                    className={'relative w-[55px] h-[55px] rounded-full overflow-hidden mr-[-24px] border-[3px] border-white'}
                    style={{ zIndex: 1 }} >
                    <Link href={`/lecturer/${lecturer.lecturer_id}`}>
                        <Image src={lecturer.lecturer.photo_small} fill className='object-cover' alt='Лектор' />
                    </Link>          
                </div>
                ))}
                {remainingCount > 0 && (
                <div  className='flex items-center justify-center w-[55px] h-[55px] rounded-full bg-[#E9EFFF] text-[#4860EF] border-[3px] border-white'
                        style={{ zIndex: 1 }} >
                    {remainingCount}+
                </div>
                )}
                <button 
                    onClick={handleClick}
                    className='flex items-center justify-center w-[55px] h-[55px] rounded-full pointer'
                >
                    <Image src={arrowDown} alt='Arrow right' className={`transition-transform duration-300 ${isRotated ? 'rotate-180' : ''}`} />
                </button>
                {showAllLecturers && (
                    <div className='absolute bg-white top-[70px] left-0 pt-[20px] w-[100%] p-4 shadow-xl'>
                    {filteredLecturers.map((lecturer, index) => (
                        <div key={index} className='flex items-center justify-between gap-4 py-2'>
                            <div className='relative w-[40px] h-[40px] rounded-full overflow-hidden'>
                                <Image src={lecturer.lecturer.photo_small} 
                                 fill className='object-cover' alt='Лектор' />
                            </div>
                        
                            <div className='flex flex-col w-[300px]'>
                                <span className='font-bold text-sm'>
                                {lecturer.lecturer.first_name} {lecturer.lecturer.middle_name} {lecturer.lecturer.last_name}
                                </span>
                                <span className='text-secondaryText text-[14px]'>
                                {lecturer.lecturer.specialization}
                                </span>
                            </div>
                            
                            <Link href={`/lecturer/${lecturer.lecturer_id}`}>
                                <button>
                                    &gt;
                                </button>
                            </Link>

                        </div>
                    ))}
                    </div>
                )}
            </div>


            {mainLecturer && (
                <Link href={`/lecturer/${mainLecturer.lecturer_id}`}>
                    <div className='flex flex-row items-center gap-4 ml-4  py-4'>
                        <div className='relative w-[55px] h-[55px] rounded-full overflow-hidden  border-[3px] border-white'>
                            <Image src={mainLecturer.lecturer.photo_small} fill className='object-cover' alt='Главный лектор' />
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm font-bold'>
                            {mainLecturer.lecturer.first_name} {mainLecturer.lecturer.middle_name} {mainLecturer.lecturer.last_name}
                            </span>
                            <span className='text-xs text-secondaryText'>{mainLecturer.lecturer.specialization}</span>
                        </div>
                    </div>
                </Link>

                )}
        </div>}



    </div>
  );
};

export default LecturerList;
