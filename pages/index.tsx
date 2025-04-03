import { NextPage, GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: 'https://lectonic.ru/',
      permanent: false,
    },
  }
}

const Home: NextPage = () => null

export default Home