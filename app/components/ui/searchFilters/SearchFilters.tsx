import React from 'react'
import Image from 'next/image'
import Slider from '@/assets/svg/slider.svg'
import Search from '@/assets/svg/search.svg'

interface ISearchFiltersProps {
  searchValue: string
  setSearchValue: (value: string) => void
  onOpenThemesModal: () => void
  isLectorsPage?: boolean 
}

const SearchFilters: React.FC<ISearchFiltersProps> = ({
  searchValue,
  setSearchValue,
  onOpenThemesModal,
  isLectorsPage,
}) => {
  return (
    <div className="flex items-center gap-4">
        <Image src={Slider} alt="Themes Icon" width={70} height={52}
         onClick={onOpenThemesModal}
         className="" />

        <div className="relative w-full">
          <div className="absolute inset-y-0 left-4 flex items-center">
            <Image src={Search} alt="Search Icon" width={24} height={24} />
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={isLectorsPage ? 'Найти лектора' : 'Найти лекцию'}
            disabled={isLectorsPage} // Disable input if Lectors Page
            className="
              border
              rounded-3xl
              px-12  /* Adjusted for icon space */
              py-2
              w-full
              h-[50px]
              pl-12 /* Extra padding for the icon */
            "
          />
        </div>


    </div>
  )
}

export default SearchFilters