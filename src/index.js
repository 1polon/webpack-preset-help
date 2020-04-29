import _ from 'lodash';
import './base.scss'


if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}; // проверка не находимся ли мы в режиме разработки




if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}; // проверка работы бокса