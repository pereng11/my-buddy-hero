type IMissionStatus = 'create' | 'update' | 'complete';

interface IMission {
  id: string;
  groupId: string;
  authorId: string;
  maxReceiver: number;
  receivers: string[];
  title: string;
  description: string;
  isComplete: boolean;
}

type MissionList = IMission[];
