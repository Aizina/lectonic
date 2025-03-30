import axios from 'axios'
import { useCallback, useState } from 'react'

interface CustomFields {
  cf_time_preferred: Array<{
    hours: number
    minutes: number
    seconds: number
  }>
  cf_date_preferred: string
  cf_contact: {
    email: string
    phone: string
  }
  cf_org_name: string
  cf_lecture_id?: string
  cf_speaker_id?: string
  cf_client: {
    first_name: string
    last_name: string
    middle_name: string
  }
}

interface OrderRequestBody {
  description: string
  custom_fields: CustomFields
}

export function useOrderLecture() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccessful, setIsSuccessful] = useState(false)

  const postLectureOrder = useCallback(
    async (body: OrderRequestBody) => {
      try {
        setLoading(true)
        setError(null)
        setIsSuccessful(false)

        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL

        const headers = {
          'Content-Type': 'application/json',
          'Project_ID': process.env.NEXT_PUBLIC_PROJECT_ID ?? '',
        }

        console.log('request body', body)

        const response = await axios.post(
          `${baseUrl}/raida/order`,
          body,
          { headers }
        )
        
        if (response.status >= 200 && response.status < 300) {
          setIsSuccessful(true)
          
        }
        console.log(response)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Error occurred while sending order')
        } else {
          setError('An unknown error occurred while sending order')
        }
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { postLectureOrder, loading, error, isSuccessful }
}