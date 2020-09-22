import MessageData from '../model/MessageData';

export default interface ChatData {
  _id: string;
  lastActivity: string;
  receiver: string[];
  messages: MessageData[];
}
