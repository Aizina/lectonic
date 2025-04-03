import { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Import AxiosResponse for typing
import {
  LectureDisplay,
  LecturesResponse,
  BundleWithOrg,
  LecturesWithoutOrganization,
} from '@/shared/types/lecture.types';

const serializeParams = (params: Record<string, string | number | boolean | string[] | undefined>): string => {
  const searchParams = new URLSearchParams();
  for (const key in params) {
    const value = params[key];
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, String(v))); 
    } else if (value !== undefined && value !== null) { 
      searchParams.append(key, String(value));
    }
  }
  return searchParams.toString();
};


interface IUseLecturesDataProps {
  organizationId?: string;
  searchValue: string;
  selectedThemes: string[];
}

export function useLecturesData({
  organizationId,
  searchValue, 
  selectedThemes,
}: IUseLecturesDataProps) {
  const [lectures, setLectures] = useState<LectureDisplay[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);


  const fetchLectures = useCallback(
    async (pageNumber: number) => {

      if (pageNumber === 1) {
          setLectures([]); 
      }
      setLoading(true);
      setError(null); 

      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      const baseApiUrl = organizationId
        ? `${baseUrl}/organization/${organizationId}/lectures`
        : `${baseUrl}/lectures`;

      const headers = {
        'project-id': process.env.NEXT_PUBLIC_PROJECT_ID || '',
      };


      const commonParams: Record<string, string | number | boolean | string[]> = {
        current_page: pageNumber,
        objects_per_page: 5, 
        add_lecturer_data: true,
      };

      if (selectedThemes.length > 0) {
        commonParams.themes = selectedThemes;
      }

      let fetchedData: (BundleWithOrg | LecturesWithoutOrganization)[] = [];
      let fetchErrorOccurred = false; // Flag to track if any fetch failed

      try {
        const trimmedSearchValue = searchValue.trim();

        if (!trimmedSearchValue) {
          console.log('Fetching without search term', commonParams);
          const response = await axios.get<LecturesResponse>(baseApiUrl, {
            params: commonParams,
            headers,
            paramsSerializer: serializeParams, 
          });
          fetchedData = Array.isArray(response.data?.data) ? response.data.data : [];

        } else {

          const searchParamsTitle = { ...commonParams, title: trimmedSearchValue };
          const searchParamsDesc = { ...commonParams, description: trimmedSearchValue };

          console.log('Fetching with title:', searchParamsTitle);
          console.log('Fetching with description:', searchParamsDesc);

          const promiseTitle = axios.get<LecturesResponse>(baseApiUrl, {
            params: searchParamsTitle,
            headers,
            paramsSerializer: serializeParams,
          });
          const promiseDesc = axios.get<LecturesResponse>(baseApiUrl, {
            params: searchParamsDesc,
            headers,
            paramsSerializer: serializeParams,
          });

          const results = await Promise.allSettled([promiseTitle, promiseDesc]);

          const combinedRawData: (BundleWithOrg | LecturesWithoutOrganization)[] = [];
          let partialError = null; 

          results.forEach((result, index) => {
            const searchType = index === 0 ? 'title' : 'description';
            if (result.status === 'fulfilled') {
              const responseData = result.value.data?.data;
              if (Array.isArray(responseData)) {
                  console.log(`Workspaceed ${responseData.length} items for ${searchType}`);
                  combinedRawData.push(...responseData);
              } else {
                  console.warn(`API call for ${searchType} search succeeded but returned non-array data:`, result.value.data);
              }
            } else {
              fetchErrorOccurred = true; 
              partialError = `Не удалось загрузить результаты ${searchType === 'title' ? 'по названию' : 'по описанию'}. ${result.reason instanceof Error ? result.reason.message : String(result.reason)}`;
              console.error(
                `Error fetching lectures for ${searchType} search:`,
                result.reason
              );
            }
          });

          const uniqueDataMap = new Map<string, BundleWithOrg | LecturesWithoutOrganization>();
          combinedRawData.forEach(item => {
            if (item?.id && !uniqueDataMap.has(item.id)) {
              uniqueDataMap.set(item.id, item);
            }
          });
          fetchedData = Array.from(uniqueDataMap.values());
          console.log(`Combined and deduplicated to ${fetchedData.length} items`);

          if(fetchErrorOccurred && fetchedData.length > 0) {
              setError(partialError); 
          } else if (fetchErrorOccurred) {
              setError(partialError || 'Ошибка загрузки результатов поиска'); 
          }
        }

        let lecturesTransformed: LectureDisplay[] = [];

        if (fetchedData.length > 0) {
            if (organizationId) {
                lecturesTransformed = (fetchedData as BundleWithOrg[]).map((item) => ({
                    id: item.id,
                    title: item.lecture_data.title,
                    description: item.lecture_data.description,
                    image: item.lecture_data.image?.long, // Safe access
                    rating: '0', // Default for org specific?
                    themes: item.themes?.map((t) => t.title) || [], // Safe access
                    lecturers: item.lecturers?.map((obj) => ({ // Safe access
                      lecturer_id: obj.lecturer_id,
                      specialization: obj.lecturer.specialization,
                      first_name: obj.lecturer.first_name,
                      last_name: obj.lecturer.last_name,
                      middle_name: obj.lecturer.middle_name,
                      photo_main: obj.lecturer.photo_main,
                      photo_small: obj.lecturer.photo_small,
                    })) || [],
                  }));
            } else {
                // Assume LecturesWithoutOrganization structure
                lecturesTransformed = (fetchedData as LecturesWithoutOrganization[]).map((item) => ({
                    id: item.id,
                    title: item.lecture_data.title,
                    description: item.lecture_data.description,
                    image: item.lecture_data.image?.long, // Safe access
                    rating: item.lecture_data.rating ?? '0',
                    themes: item.themes?.map((t) => t.title) || [], // Safe access
                    lecturers: item.lecturers?.map((obj) => ({ // Safe access
                      lecturer_id: obj.lecturer_id,
                      specialization: obj.lecturer.specialization,
                      first_name: obj.lecturer.first_name,
                      last_name: obj.lecturer.last_name,
                      middle_name: obj.lecturer.middle_name,
                      photo_main: obj.lecturer.photo_main,
                      photo_small: obj.lecturer.photo_small,
                    })) || [],
                  }));
            }
        }


        setLectures(prev =>
          pageNumber === 1
             ? lecturesTransformed
             : [
                 ...prev,
                 ...lecturesTransformed.filter(newItem => !prev.some(prevItem => prevItem.id === newItem.id))
               ]
        );
  
         const expectedPageSize = commonParams.objects_per_page as number;
         setHasMore(lecturesTransformed.length === expectedPageSize);

      } catch (err: unknown) {
         // This outer catch handles errors from the single fetch scenario or Promise.allSettled itself
         console.error('General error in fetchLectures:', err);
         if (!fetchErrorOccurred) { // Only set general error if no partial error was set
             setError(err instanceof Error ? err.message : 'Ошибка загрузки лекций');
         }
         // Ensure lectures are cleared on page 1 error, and stop pagination
         if (pageNumber === 1) setLectures([]);
         setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    // Ensure all dependencies used in the callback are listed
    [organizationId, searchValue, selectedThemes]
  );

  useEffect(() => {
    console.log(`Effect triggered: Fetching page 1 for search: "${searchValue}", themes: [${selectedThemes.join(', ')}]`);
    setPage(1); 
    fetchLectures(1);
  }, [searchValue, selectedThemes, organizationId]); 


  const refetch = useCallback(() => {
    setPage(1);
    fetchLectures(1);
  }, [fetchLectures]); 

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      console.log(`Loading more: page ${nextPage}`);
      setPage(nextPage);
      fetchLectures(nextPage);
    } else if (loading) {
        console.log("Load more skipped: currently loading");
    } else if (!hasMore) {
        console.log("Load more skipped: no more items");
    }
  }, [page, loading, hasMore, fetchLectures]);

  return { lectures, loading, error, hasMore, loadMore, refetch };
}