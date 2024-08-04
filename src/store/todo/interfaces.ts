export interface ITodo {
  id: string;
  name: string;
  status: 'done' | 'pending' | 'cancel' | 'processing';
  executionTime: {
    date: number;
    time: number;
  };
  title: 'Study' | 'Work' | 'Playing' | 'Others';
  priority: 'high' | 'medium' | 'low';
  [key: string]: any;
  isSelected: boolean;
  lastUpdate: number;
  des: string;
}
