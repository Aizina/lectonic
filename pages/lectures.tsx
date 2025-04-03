// LecturesPage.tsx

import Lectures from '@/components/screens/Lectures/Lectures';
import { useLecturesData } from '@/hooks/useLecturesData';
import { NextPage } from 'next';
import { useState, useCallback, useEffect } from 'react'; // Import useEffect
import SearchFilters from '@/components/ui/searchFilters/SearchFilters';
import ThemesModal from '@/components/ui/searchFilters/ThemesModal';

interface LecturesCatalogueProps {
  id?: string;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); 

  return debouncedValue;
}

const LecturesPage: NextPage<LecturesCatalogueProps> = ({ id }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [isThemesModalOpen, setIsThemesModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const debouncedSearchValue = useDebounce(searchValue, 800); 

  const { lectures, loading, error, hasMore, loadMore, refetch,
  } = useLecturesData({
    organizationId: id,
    searchValue: debouncedSearchValue,
    selectedThemes,
  });

  const handleOpenModal = () => setIsThemesModalOpen(true);
  const handleCloseModal = () => setIsThemesModalOpen(false);

  const handleApplyFilters = useCallback(() => {
    refetch();
  }, [refetch]);


  const handleResetFilters = useCallback(() => {
    setSelectedThemes([]);
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (loading) {
      setMessage('Загрузка данных...');
      return;
    }
  
    if (lectures.length > 0 || hasMore) {
      setMessage('');
    } else {
      setTimeout(() => {
        setMessage((debouncedSearchValue || selectedThemes.length > 0)
          ? 'Лекции, соответствующие вашим фильтрам, не найдены.'
          : 'Данных о лекциях пока нет.');
      }, 300); // небольшая задержка
    }
  }, [loading, lectures, debouncedSearchValue, selectedThemes, hasMore]);


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
              Каталог лекций
            </span>
            <span className='font-montserrat font-normal text-[20px] text-[#6B6B6B] leading-[136%]'>
              Выберите интересующую вас тему из широкого ассортимента лекций от
              ведущих экспертов.
            </span>
          </div>
        </div>

        <div className='flex flex-col gap-10 basis-7/10 w-[100%]'>
          <SearchFilters
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onOpenThemesModal={handleOpenModal}
            isLectorsPage = {false}
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
            ) : lectures.length === 0 ? (
              <span className="text-xl text-gray-500">{message}</span>
            ) : (
              <Lectures lectures={lectures} hasMore={hasMore} loadMore={loadMore} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturesPage;