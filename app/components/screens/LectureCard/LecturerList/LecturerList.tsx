import Image from 'next/image';
import { useState } from 'react';
import { LecturerItem, LecturerProfile } from '@/shared/types/lecturer.types';
import Link from 'next/link';
import arrowDown from '@/assets/svg/chevron-down.svg'

interface LecturerListProps {
  mainLecturer?: LecturerProfile;
  lecturerData: LecturerItem[];
}

const LecturerList: React.FC<LecturerListProps> = ({ mainLecturer, lecturerData }) => {
  const [showAllLecturers, setShowAllLecturers] = useState(false);

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
        <div>
            <div className='flex mt-6 gap-4'>
                {visibleLecturers.map((lecturer, index) => (
                <div key={index} className='relative w-[60px] h-[60px] rounded-full overflow-hidden'>
                    <Image src={lecturer.lecturer.photo_small} fill className='object-cover' alt='Лектор' />
                </div>
                ))}
                {remainingCount > 0 && (
                <div  className='flex items-center justify-center w-[60px] h-[60px] rounded-full bg-gray-200 text-[#4860EF]'>
                    {remainingCount}+
                </div>
                )}
                <button 
                    onClick={() => setShowAllLecturers(true)}
                    className='flex items-center justify-center w-[40px] h-[40px] rounded-full bg-gray-200 hover:bg-gray-300 transition'
                >
                    <Image src={arrowDown} alt='Arrow right' />
                </button>
            </div>

            {showAllLecturers && (
                <div className='mt-6'>
                {filteredLecturers.map((lecturer, index) => (
                    <div key={index} className='flex items-center gap-4 py-2'>
                    <Image src={lecturer.lecturer.photo_small} width={50} height={50} className='rounded-full' alt='Лектор' />
                    <div>
                        <span className='font-bold'>
                        {lecturer.lecturer.first_name} {lecturer.lecturer.middle_name} {lecturer.lecturer.last_name}
                        </span>
                        <span className='text-secondaryText text-[14px]'>
                        {lecturer.lecturer.specialization}
                        </span>
                    </div>
                    </div>
                ))}
                </div>
            )}
            {mainLecturer && (
                <div className='flex mt-6'>
                <div className='relative w-[102px] h-[102px] rounded-full overflow-hidden'>
                    <Image src={mainLecturer.photo_small} fill className='object-cover' alt='Главный лектор' />
                </div>
                <div className='p-5'>
                    <span className='text-[24px] font-bold'>
                    {mainLecturer.first_name} {mainLecturer.middle_name} {mainLecturer.last_name}
                    </span>
                    <span className='text-[16px] text-secondaryText'>{mainLecturer.specialization}</span>
                </div>
                    </div>
                )}
        </div>}



    </div>
  );
};

export default LecturerList;
