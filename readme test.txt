
## <a name="12_pol">12. Полифилы для отображения кода в старых браузерах ( глава нуждается в доработке )</a>
- `npm install --save babel-polyfill` - установка полифила

~~npm install --save whatwg-fetch - без понятия что он делает
-добавляем в загрузку самым первым
import 'whatwg-fetch';~~

import 'babel-polyfill';
webpack.common.js
entry:{
polyfills: './src/polyfills.js',
}
-создаем для них отдельный скрипта
polyfills.js

-создаем в директории ./dist => index.html
-добавляем в index.html в директории ./dist
<title>Getting Started</title>
<script>
 const modernBrowser = (
   'fetch' in window &&
   'assign' in Object
 );

 if ( !modernBrowser ) {
   const scriptElement = document.createElement('script');

   scriptElement.async = false;
   scriptElement.src = '/polyfills.bundle.js';
   document.head.appendChild(scriptElement);
 }
</script>

-этот скрипт для теста ========= фетча
fetch('https://jsonplaceholder.typicode.com/users')
+   .then(response => response.json())
+   .then(json => {
+     console.log('We retrieved some data! AND we\'re confident it will work on a variety of browser distributions.')
+     console.log(json)
+   })
+   .catch(error => console.error('Something went wrong when fetching this data: ', error))

