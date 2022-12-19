/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { Dialog, Nav } from '@/components/common';
import { MissionCard, MissionItem } from '@/components/Missions';
import { filteredMissionListState } from '@/states';
import { useHeroes, useMissions } from '@/hooks';
import styles from './Missions.module.css';

export default function Missions() {
  const router = useRouter();
  const { initHeroeList } = useHeroes();
  const { initMissionList } = useMissions();
  const filteredMissionList = useRecoilValue(filteredMissionListState);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  useEffect(() => {
    initHeroeList();
    initMissionList();
  }, []);

  const openMissionInfo = (mission: Mission) => {
    setSelectedMission(mission);
    setOpenDialog(true);
  };
  const openMissionForm = () => {
    setOpenDialog(true);
  };
  const closeMissionCard = () => {
    setSelectedMission(null);
    setOpenDialog(false);
  };

  return (
    <div className={styles.container}>
      <Nav
        buttonName="임무 등록"
        onButtonClick={openMissionForm}
        currentPage={router?.asPath}
      />
      <div className={styles.missionContainer}>
        <ul className={styles.missionList}>
          {filteredMissionList.map((mission) => {
            return (
              <MissionItem
                key={mission.id}
                mission={mission}
                onClick={openMissionInfo}
              />
            );
          })}
        </ul>
      </div>
      {openDialog ? (
        <Dialog modal onClose={closeMissionCard}>
          <MissionCard
            initialMission={selectedMission}
            onClose={closeMissionCard}
          />
        </Dialog>
      ) : null}
    </div>
  );
}
