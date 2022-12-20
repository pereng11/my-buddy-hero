import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Nav, HeroCard } from '@/components/common';
import { useHeroes, useMissions } from '@/hooks';
import styles from './herolist.module.css';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export default function Herolist() {
  const router = useRouter();
  const { heroList, initHeroeList } = useHeroes();
  const { initMissionList } = useMissions();

  useEffect(() => {
    initHeroeList();
    initMissionList();
    console.log(router.asPath);
  }, []);

  return (
    <div className={styles.container}>
      <Nav
        buttonName="히어로 추가"
        onButtonClick={() => {
          router.replace('/register');
        }}
        currentPage={router?.asPath}
      />
      <ul className={styles.listContainer}>
        {heroList.map((heroInfo, index) => (
          <li key={index}>
            <HeroCard heroInfo={heroInfo}></HeroCard>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
