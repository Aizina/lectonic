import Lecturers from '@/components/screens/Lecturers/Lecturers';
import { useLecturersData } from '@/hooks/useLecturersData'; // Adjust path if needed
import { NextPage } from 'next';
import React, { useState, useCallback, useEffect } from 'react'; // Import useState, useCallback
import SearchFilters from '@/components/ui/searchFilters/SearchFilters';
import ThemesModal from '@/components/ui/searchFilters/ThemesModal';

interface LecturersPageProps { 
    organizationId?: string; 
}

const LecturersPage: NextPage<LecturersPageProps> = ({ organizationId }) => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
    const [isThemesModalOpen, setIsThemesModalOpen] = useState(false);
    const [message, setMessage] = useState('');

    const { lecturers, loading, error, hasMore, loadMore, refetch } = useLecturersData({
        organizationId,
        selectedThemes,
        searchValue, 
    });

    const handleOpenModal = useCallback(() => {
        setIsThemesModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsThemesModalOpen(false);
    }, []);

    const handleApplyFilters = useCallback(() => {
        refetch(); 
        handleCloseModal();
    }, [handleCloseModal]);

    const handleResetFilters = useCallback(() => {
        setSelectedThemes([]);
        refetch();
        handleCloseModal();
    }, []);

   useEffect(() => {
       if (loading) {
         setMessage('Загрузка данных...');
         return;
       }
     
       if (lecturers.length > 0 || hasMore) {
         setMessage('');
       } else {
         setTimeout(() => {
           setMessage((selectedThemes.length > 0)
             ? 'Лекции, соответствующие вашим фильтрам, не найдены.'
             : 'Данных о лекциях пока нет.');
         }, 300);
       }
     }, [loading, lecturers, selectedThemes, hasMore]);

     if (error) {
        return (
          <div className='container h-[700px] flex justify-center items-center mx-auto my-12 p-4 font-roboto uppercase font-bold text-[48px] text-center'>
            Произошла ошибка: {error}
          </div>
        )
      }


    return (
        <div className='container mx-auto my-8 px-4 relative'>
            <div className='container mx-auto flex py-24 justify-between gap-10'>
        <div className='text-left basis-3/10'>
          <div className='max-w-[356px] flex flex-col gap-5'>
            <span className='font-roboto font-medium text-[48px] leading-[125%]'>
                Каталог лекторов
            </span>
            <span className='font-montserrat font-normal text-[20px] text-[#6B6B6B] leading-[136%]'>
            Выберите интересующего вас  эксперта.
            </span>
          </div>
        </div>

        <div className='flex flex-col gap-10 basis-7/10 w-[100%]'>
          <SearchFilters
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onOpenThemesModal={handleOpenModal}
            isLectorsPage = {true}
          />

          <ThemesModal
            isOpen={isThemesModalOpen}
            onClose={handleCloseModal}
            selectedThemes={selectedThemes}
            setSelectedThemes={setSelectedThemes}
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
          />

          <div className="min-h-[700px] flex justify-center items-center ">
            {loading ? (
              <span className="text-[48px] font-roboto uppercase font-bold">Загрузка данных...</span>
            ) : lecturers.length === 0 ? (
              <span className="text-xl text-gray-500">{message}</span>
            ) : (
              <Lecturers lecturers={lecturers} hasMore={hasMore} loadMore={loadMore} loading={loading} />
            )}
          </div>
        </div>
      </div>

        </div>
    );
}; 


export default LecturersPage;