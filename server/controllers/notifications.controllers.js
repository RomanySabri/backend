import Notification from '../models/notificationsModel.js';
export const getNotifications = (async (req, res) => {
  try {



    res.send('Reply sent successfully');
  } catch (error) {
    console.error("Error sending reply:", error);
    res.status(500).send("Error sending reply");
  }
});

