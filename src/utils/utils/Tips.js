import { Notification, MessageBox, Message } from 'element-ui';
let utils_notification;
let utils_message;
export default class Tips {
  static notify(notifyConf) {
    if (!notifyConf.duration && notifyConf.duration !== 0) notifyConf.duration = 2000
    utils_notification && utils_notification.close();
    utils_notification = Notification(notifyConf);
  }

  static async confirm(confirmConf) {
    return await MessageBox.confirm(confirmConf);
  }

  static message(messageConf) {
    if (!messageConf.duration && messageConf.duration !== 0) messageConf.duration = 2000
    utils_message && utils_message.close();
    utils_message = Message(messageConf);
  }

  static messageClose(){
    utils_message.close()
  }
}
