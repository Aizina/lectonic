import React, { useEffect, useState, useCallback } from 'react'; // Import useCallback
import axios from 'axios';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';


interface IThemeData {
  id: string;
  theme_data: {
    title: string;
    description: string;
    image?: { long: string; short: string };
  };
  subthemes: {
    id: string;
    theme_data: {
      title: string;
      description: string;
      image?: { long: string; short: string };
    };
  }[];
}

interface IThemesModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedThemes: string[]; 
  setSelectedThemes: (ids: string[]) => void;
  onApplyFilters: () => void; 
  onResetFilters: () => void; 
}

const ThemesModal: React.FC<IThemesModalProps> = ({
  isOpen,
  onClose,
  selectedThemes, 
  setSelectedThemes, 
  onApplyFilters,
  onResetFilters, 
}) => {
  const [themes, setThemes] = useState<IThemeData[]>([]);
  const [expandedThemes, setExpandedThemes] = useState<string[]>([]);
  const [localSelectedThemes, setLocalSelectedThemes] = useState<string[]>(selectedThemes);
  const [filteredThemes, setFilteredThemes] = useState<IThemeData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchThemes();
      setLocalSelectedThemes(selectedThemes);
    }
  }, [isOpen]); 

  useEffect(() => {
      if (isOpen) {
          setLocalSelectedThemes(selectedThemes);
      }
  }, [selectedThemes, isOpen]);

  useEffect(() => {
    const newFilteredThemes = themes.filter(theme =>
      theme.theme_data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theme.subthemes.some(sub => sub.theme_data.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredThemes(newFilteredThemes);
  }, [searchQuery, themes]);

  const fetchThemes = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      const url = `${baseUrl}/themes`;
      const headers = { 'project-id': process.env.NEXT_PUBLIC_PROJECT_ID };
      const response = await axios.get<{ data: [{ themes: IThemeData[] }] }>(url, { headers }); 

      if (response.data?.data?.[0]?.themes) {
        const allThemes = response.data.data[0].themes;
        setThemes(allThemes);
        console.log(allThemes); 
      } else {
        console.warn("Themes data not found in the expected structure:", response.data);
        setThemes([]);
      }
    } catch (err) {
      console.error('Error fetching themes:', err);
      setThemes([]); 
    }
  };

  const toggleThemeExpand = (themeId: string) => {
    setExpandedThemes(prev =>
      prev.includes(themeId) ? prev.filter(id => id !== themeId) : [...prev, themeId]
    );
  };

  const handleThemeSelect = useCallback((themeId: string, subthemeIds: string[]) => {
    setLocalSelectedThemes(currentSelected => {
        const isAlreadySelected = currentSelected.includes(themeId);
        let newSelectedThemes = [...currentSelected];

        if (isAlreadySelected) {
          newSelectedThemes = newSelectedThemes.filter(id => id !== themeId && !subthemeIds.includes(id));
        } else {
          newSelectedThemes.push(themeId, ...subthemeIds);
        }

        return Array.from(new Set(newSelectedThemes));
      });
  }, []); 

  const handleSubthemeSelect = useCallback((subthemeId: string) => {
    setLocalSelectedThemes(currentSelected => {
        const isAlreadySelected = currentSelected.includes(subthemeId);
        let newSelectedThemes = [...currentSelected];

        if (isAlreadySelected) {
            newSelectedThemes = newSelectedThemes.filter(id => id !== subthemeId);
        } else {
            newSelectedThemes.push(subthemeId);
        }

        return Array.from(new Set(newSelectedThemes));
    });
}, []);

  const handleReset = useCallback(() => {
    setLocalSelectedThemes([]); 
    onResetFilters();
    onClose();
  }, [onResetFilters]);


  const handleApply = useCallback(() => {
    setSelectedThemes(localSelectedThemes);
    onApplyFilters();
    onClose();
  }, [localSelectedThemes, setSelectedThemes, onApplyFilters, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-start z-50 p-4"> 
      <div className="absolute left-5 bg-white rounded-3xl p-6 w-full max-w-[400px] flex flex-col shadow-lg">
        <h2 className="text-xl font-bold mb-4 flex-shrink-0">Выберите тему</h2> {/* Title */}

        <input
          type="text"
          className="w-full p-2 mb-4 border rounded-md"
          placeholder="Поиск темы..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="overflow-y-auto flex-grow mb-4">
          {filteredThemes.length === 0 && <p>Загрузка тем...</p>}
          {filteredThemes.map((theme) => {
            const subthemeIds = theme.subthemes.map((st) => st.id);
            const isThemeSelected = localSelectedThemes.includes(theme.id);
            const areAllSubthemesSelected = subthemeIds.length > 0 && subthemeIds.every(stId => localSelectedThemes.includes(stId));
            const areSomeSubthemesSelected = subthemeIds.some(stId => localSelectedThemes.includes(stId));

            let parentCheckboxState: 'checked' | 'indeterminate' | 'unchecked' = 'unchecked';
            if (isThemeSelected || areAllSubthemesSelected) {
                parentCheckboxState = 'checked';
            } else if (areSomeSubthemesSelected) {
                parentCheckboxState = 'indeterminate';
            }


            return (
              <div key={theme.id} className="mb-2">
                <div className="flex items-center justify-between font-medium">
                  <label className="flex items-center gap-2 cursor-pointer"> 
                    <input
                      type="checkbox"  
                      checked={parentCheckboxState === 'checked'}
                      ref={el => { 
                        if (el) {
                          el.indeterminate = parentCheckboxState === 'indeterminate';
                        }
                      }}
                      onChange={() => handleThemeSelect(theme.id, subthemeIds)}
                    />
                    <span>{theme.theme_data.title}</span>
                  </label>
  
                  {theme.subthemes.length > 0 && (
                     <button
                        onClick={() => toggleThemeExpand(theme.id)}
                        className="p-1 text-gray-600 hover:text-gray-800" 
                     >
                       {expandedThemes.includes(theme.id) ? (
                        <FiChevronUp size={18}/>
                       ) : (
                         <FiChevronDown size={18}/>
                       )}
                     </button>
                  )}
                </div>


                {expandedThemes.includes(theme.id) && theme.subthemes.length > 0&& (
                  <div className="pl-6 mt-2 border-l-2 border-gray-200 ml-2">
                    {theme.subthemes.map((subtheme) => {
                      const isSubthemeSelected = localSelectedThemes.includes(subtheme.id);
                      return (
                        <div key={subtheme.id} className="flex items-center gap-2 mb-1">
                          <label className="flex items-center gap-2 cursor-pointer"> 
                           <input
                            type="checkbox"
                            checked={isSubthemeSelected}
                            onChange={() => handleSubthemeSelect(subtheme.id)}
                           />
                           <span>{subtheme.theme_data.title}</span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-4 mt-auto flex-shrink-0 pt-4 border-t"> 
          <button
            className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100" 
            onClick={handleReset}
          >
            Сбросить все фильтры
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700" 
            onClick={handleApply}
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemesModal;