function notifyMe(message) {
    // Проверка поддержки браузером уведомлений
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    }
  
    // Проверка разрешения на отправку уведомлений
    else if (Notification.permission === 'granted' && message) {
      // Если разрешено, то создаем уведомление
      const notification = new Notification('Замовлення готове!', {
        body: 'Підходь на видачу і забирай :)',
        icon: 'https://e7.pngegg.com/pngimages/1024/637/png-clipart-youtube-computer-icons-button-small-bell-hat-black-thumbnail.png',
        vibrate: window.navigator.vibrate([200, 100, 200]),
        requireInteraction: true,
        lang: 'ua'
      });
    }
  
    // В противном случае, запрашиваем разрешение
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // Если пользователь разрешил, то создаем уведомление
        // if (permission === "granted") {
        //   const notification = new Notification("Hi there!");
        // }
      });
    }
  
    // В конечном счете, если пользователь отказался от получения
    // уведомлений, то стоит уважать его выбор и не беспокоить его
    // по этому поводу.
  }

  export default notifyMe;