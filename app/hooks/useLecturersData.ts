// hooks/useLecturersData.ts
import {
    LecturerDisplay,
    allLecturersResponseData,
} from '@/shared/types/lecturer.types'; // Adjust path if needed
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

// Re-use the serializer
const serializeParams = (params: Record<string, string | number | boolean | string[] | undefined>): string => {
    const searchParams = new URLSearchParams();
    for (const key in params) {
        const value = params[key];
        if (Array.isArray(value)) {
            // Ensure array values are correctly stringified and appended
            value.forEach((v) => searchParams.append(key, String(v)));
        } else if (value !== undefined && value !== null && value !== '') { // Added check for empty string
            searchParams.append(key, String(value));
        }
    }
    return searchParams.toString();
};

// Define the props for the hook
interface IUseLecturersDataProps {
    organizationId?: string;
    selectedThemes: string[];
    searchValue: string; // Add searchValue
}

const INITIAL_OBJECTS_NUM = 4; // Initial number of items to load

// Updated Hook Signature
export function useLecturersData({ organizationId, selectedThemes, searchValue }: IUseLecturersDataProps) {
    const [lecturers, setLecturers] = useState<LecturerDisplay[]>([]);
    const [objectsNum, setObjectsNum] = useState<number>(INITIAL_OBJECTS_NUM);
    const [loading, setLoading] = useState<boolean>(true); // Start loading true for initial fetch
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    
    const fetchLecturers = useCallback(async (numToFetch: number, isRefetch: boolean = false) => {
        // Corrected console log key
        console.log(`WorkspaceLecturers called: numToFetch=${numToFetch}, isRefetch=${isRefetch}, themes=[${selectedThemes.join(',')}]`);
        setLoading(true);
        setError(null);
        // If it's a refetch (filter change), clear existing lecturers immediately
        if (isRefetch) {
            setLecturers([]);
        }

        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
        const endpoint = organizationId ? `/organization/${organizationId}/lecturers` : `/lecturers`;
        const baseApiUrl = `${baseUrl}${endpoint}`;

        const headers = { 'project-id': process.env.NEXT_PUBLIC_PROJECT_ID || '' };

        // --- Build parameters object ---
        const params: Record<string, string | number | boolean | string[]> = {
            current_page: 1, // API seems to work based on total objects, not pages
            objects_per_page: numToFetch,
        };

        // Conditionally add themes if they are selected
        if (selectedThemes.length > 0) {
            params.themes = selectedThemes;
        }

        // --- Add Search Value (Future Implementation Placeholder) ---
        // Uncomment and adjust param name ('search', 'query', etc.) when API supports it
        // if (searchValue && searchValue.trim() !== '') {
        //   params.search = searchValue.trim(); // Example: Use 'search' as the query parameter
        // }
        // -----------------------------------------------

        console.log('Fetching lecturers with params:', params);

        try {
            const response = await axios.get<allLecturersResponseData>(baseApiUrl, {
                headers,
                params, // Pass params object
                paramsSerializer: serializeParams, // Use the serializer
            });

            // Validate response structure
            if (!response.data || !Array.isArray(response.data.data)) {
                console.warn('Invalid response structure or missing data array:', response.data);
                // If it was a refetch, result is empty list. If loadMore, keep existing.
                if (isRefetch) setLecturers([]);
                setHasMore(false);
                // Changed: Set specific error if structure is invalid, helps debugging
                setError('Неверный формат ответа от сервера.');
                return;
            }

            const bundles = response.data.data || []; // Default to empty array with type

            // --- Data Transformation ---
            const lecturersTransformed: LecturerDisplay[] = bundles.map(
                (lecturerData) => ({
                    id: lecturerData.lecturer_id,
                    // Ensure names are handled correctly even if middle name is null/undefined
                    name: [lecturerData.profile.first_name, lecturerData.profile.middle_name, lecturerData.profile.last_name]
                          .filter(Boolean) // Remove null/undefined parts
                          .join(' ')
                          .replace(/\s+/g, ' ').trim(), // Trim and collapse multiple spaces
                    about: lecturerData.lecturer.about,
                    image: lecturerData.profile.photo_main,
                    specialization: lecturerData.lecturer.specialization,
                    // Map themes safely, ensure id/title exist or provide fallbacks
                    themes: Array.isArray(lecturerData.themes)
                        ? lecturerData.themes.map(t => ({
                            id: t.id ?? `fallback-id-${Math.random()}`, // Provide fallback ID if needed
                            title: t.title ?? 'Без названия' // Provide fallback title
                          }))
                        : [],
                    // Map formats safely
                    formats: Array.isArray(lecturerData.lecturer.format) ? lecturerData.lecturer.format : [],
                    emergencySpeaking: lecturerData.lecturer.emergency_speaking,
                })
            );
            // --------------------------

            // Corrected console log key
            console.log(`Workspaceed ${bundles.length} items, transformed ${lecturersTransformed.length}`);

            // Replace state entirely since we fetch the cumulative amount
            setLecturers(lecturersTransformed);

            // Determine hasMore: if fetched less than requested for *this specific call*, no more available
            const actuallyFetchedCount = bundles.length;
            setHasMore(actuallyFetchedCount === numToFetch);
            console.log(`HasMore set to: ${actuallyFetchedCount === numToFetch} (fetched: ${actuallyFetchedCount}, requested: ${numToFetch})`);


        } catch (err: unknown) {
            console.error('Error fetching lecturers:', err);
            let errorMessage = 'Неизвестная ошибка загрузки лекторов';
            if (axios.isAxiosError(err)) {
                // Handle specific Axios error details if needed
                errorMessage = err.response?.data?.message || err.message || errorMessage;
                // Refine error messages based on status and context
                if (err.response?.status === 404) {
                    errorMessage = selectedThemes.length > 0
                        ? 'Лекторы с выбранными темами не найдены.'
                        : 'Лекторы не найдены.';
                } else if (err.response?.status === 500) {
                    errorMessage = 'Ошибка на сервере при загрузке лекторов.';
                }
                // Add more specific error handling if needed (e.g., 401, 403)
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            setError(errorMessage);
            setLecturers([]); // Clear data on error
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [organizationId, selectedThemes /* searchValue */]);

    useEffect(() => {
        console.log(`Filters changed (Themes: [${selectedThemes.join(',')}], OrgID: ${organizationId}, Search: '${searchValue}'). Resetting and fetching.`);
        setObjectsNum(INITIAL_OBJECTS_NUM); // Reset count to initial
        fetchLecturers(INITIAL_OBJECTS_NUM, true); // Fetch initial number, mark as refetch=true
    }, [selectedThemes, organizationId, /* searchValue, */ fetchLecturers]);


    // Function to load more items
    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            const nextNum = objectsNum + INITIAL_OBJECTS_NUM; // Increment by the initial amount (or another step value)
            console.log(`Load more requested. Fetching up to ${nextNum} items.`);
            setObjectsNum(nextNum); // Update the total number to fetch *next time*
            // Fetch the *new total* number. isRefetch = false
            fetchLecturers(nextNum, false);
        } else {
            console.log(`Load more skipped: loading=${loading}, hasMore=${hasMore}`);
        }
    // Add objectsNum and fetchLecturers as dependencies
    }, [loading, hasMore, objectsNum, fetchLecturers]);


    // Function for explicit refetch request from parent (e.g., pull-to-refresh)
    const refetch = useCallback(() => {
        console.log("Explicit refetch requested.");
        setObjectsNum(INITIAL_OBJECTS_NUM); // Reset count
        fetchLecturers(INITIAL_OBJECTS_NUM, true); // Fetch initial, mark as refetch=true
    }, [fetchLecturers]); // Depends only on fetchLecturers


    return { lecturers, loading, error, hasMore, loadMore, refetch };
}