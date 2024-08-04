import {ITodo} from '../store/todo/interfaces';

export const bgTagPriority = (item: ITodo) => {
  switch (item.priority) {
    case 'high':
      return '#0560FD';
    case 'medium':
      return '#CC00FF';
    case 'low':
      return 'green';
    default:
      return 'green';
  }
};
export const bgTagTitle = (item: ITodo) => {
  switch (item.title) {
    case 'Study':
      return '#CC00FF';
    case 'Others':
      return '#0560FD';
    case 'Playing':
      return '#006D77';
    case 'Work':
      return 'green';
    default:
      return 'green';
  }
};

export const bgTagStatus = (item: ITodo) => {
  switch (item.status) {
    case 'cancel':
      return '#D4D4D4';
    case 'done':
      return '#006D77';
    case 'pending':
      return '#FFDDD2';
    default:
      return '#006D77';
  }
};
