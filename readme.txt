Привет, это коротенькая инструкция по созданию пресета webpack.
 https://webpack.js.org/guides/
 

проблемы:  
1) файл не минифицируется после HtmlWebpackPlugin в продакшене
2) work-box во время выполнения на сервере локально сильно увеличивается в размере



Содержание:                                                      
    0) инициализация git                                           // git init = создаст наш гит файл, в него вводим данные для репозитория 
    1) инициализация npm                                           // npm init = coздаст файл package.json                                 
    2) 





0) git init = создаст наш гит файл, в него вводим данные для репозитория
- далее создаем ветку на гитхабе копируем из нее ссылку
-- эту ссылку вставляем в наш конфиг в папке .git там где url (даст возможность делать push)
-создаем гит игнор 

команды для гит :
    - git status - показывает статус всех файлов которые мы изменили
    - git . | git add [file.format] - добавляет все файлы | добавляет определенный файл
    - git commit -m "message" - делает коммит изминений те. добавленых файлов
    - git log - показывает все коммиты
    - git branch - показывает ветки, если добавить что-то то создает ветку
    - git checkout - сбрасывет изминения из добавленых файлов
    - git reset - сбрасывает изминения из самого коммита
    - git -h - помощь


1) npm init -- coздаст файл package.json
- в нем указываем название, описание, репозиторий(устанавливается автоматически т.к. мы создали ранее)
- удаляем main.js 
- добавляем настройку 
    "private": true (нужна для запрета случайных утечек кода)

- добавляем команды(ассеты) в (пример "npm run build")
    "scripst":{
        "test": "echo \"Error: no test specified\" && exit 1", = базовая тестовая команда
        "build": "webpack --config webpack.config.js"
        = кастомная команда добавляет возможность вводить "npm run build"
        = с набором конфигурации webpack.config.js (ee нужно создавать самостоятельно)
        "start": "любая команда доступная через консоль"
    }

правила установки пакетов:
    --save-dev = появится в devDependencies и так далее
    - подробнее https://docs.npmjs.com/cli/install

2) npm install|i webpack webpack-cli --save-dev = добавляем пакеты для разработки  
= создают package-lock.json - файл обслуживания
- создаем webpack.config.js = нужен для наших настроек
    const path = require('path');
    // хз что это
    module.exports = {
    entry: {
        index:  './src/index.js',
        another: './src/another-module.js'
    },     //здесь находится наш входящий файл
    output: {
        filename: '[name].[contenthash].bundle.js',     //здесь исходящий после компиляции - его "исходное_имя+хеш_сумма+bundle.js"
        path: path.resolve(__dirname, 'dist'), // папка или дирректория
    },
    };

- вводим режим разработки webpack.config.js 
    "mode": production = продакшен (код минифицируется и готовится к получению пользователем)
    "mode": development = создание (код с коментариями и др.)

3) npm i --save-dev webpack-dev-server = устанавливаем сервер (оффлайн без кеша и др.)
- webpack.config.js 
    devServer: {
        contentBase: './dist'
    }
- package.json добавляем асет
    "start": "webpack-dev-server --open"
теперь доступна команда "npm run start" для запуска локального сервера

4) добавляем SplitChunksPlugin он вырезает одинаковые куски кода в один файл если импорт есть в нескольких файлах js
- webpack.config.js
    optimization: {
        splitChunks: {
        filename: 'любоеИмя.js'
        chunks: 'all',
        },
    },

ВАЖНО =================== можно использовать динамический импорт подробнее на сайте ((любоеИмя.js))
https://webpack.js.org/guides/code-splitting/

ВАЖНО ==================== Extracting Boilerplate
опция вырезает только используемые куски кода в отличии от предидущей опции ((runtime.[hash].js))
+   optimization: {
+     runtimeChunk: 'single',
+   },

ВАЖНО ==================== Extracting Boilerplate для вендоров ((vendors.[hash].js))
опция вырезает только используемые куски кода для вендоров
+   optimization: {
+     splitChunks: {
+       cacheGroups: {
+         vendor: {
+           test: /[\\/]node_modules[\\/]/,
+           name: 'vendors',
+           chunks: 'all',
+         },
+       },
+     },
+   },

ВАЖНО ==================== удаляем изминение хеш суммы вендоров от изминения index.js
    optimization: {
+     moduleIds: 'hashed',
    }


5) Prefetching или ленивая загрузка (для модулей которые должны быть загружены но не использованы сразу и кешируутся)
- import(/* webpackPrefetch: true */ 'loginModal|любое_имя.js') - загрузится лениво и кешируется
-- в index.js отобразится как <link rel="preferch" href="login-modal.js|любое_имя.js">

- import(/* webpackPreload: true */ 'loginModal|любое_имя.js'); - загрузится самым первым


6) по желанию bundle Analasis для проверок бандла
https://webpack.js.org/guides/code-splitting/


7) CleanWebpackPlugin - очищает директорию ./dist "npm i --save-dev clean-webpack-plugin"
   HtmlWebpackPlugin - создает файл html в ./dist "npm i --save-dev html-webpack-plugin"
           
           
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        title: "Оглавление сайта",
        template: "./src/index.html" // исходный файл брать оттуда
        другие_свойства: "описание характеристик",
    })
    ]

===================== ВАЖНО узнать больше=========== блокирует на локалхосте все стили и тд
8) добавляем CSP (защищает от осполнения скрипта извне) = 'content': 'default-src \'self\'
new HtmlWebpackPlugin({
    title: 'Hello',
    "meta": {
       'Content-Security-Policy': {'http-equiv': 'Content-Security-Policy', 'content': 'default-src \'self\''}
    },
}),



9) three shaking||sideEffects или отрубание не исполняемого кода
+ mode: 'development',
+ optimization: {
+   usedExports: true, // добавляет возможность помечать скрипт пользователя в експорте
                       // он отображается как    /* unused harmony export square */
                                                 /* harmony export (immutable) */
                       // и остается так как компилятор думает что там есть = side efect
                       // чтобы этого избежать смотри ниже
+ },

package.json
+ {
+   "name": "your-project",
+   "sideEffects": false  // откулючает распознавание сайд ефекта
//////////////////////////////////////////////////////////////////////////////
                          // если все-таки есть сайд ефекты то помечаем их в массиве
+   "name": "your-project",
+ "sideEffects": [
+   "**/*.css",
+   "**/*.scss",
+   "./esnext/index.js",
+   "./esnext/configure.js"
+ ],                    

/////////////////////////////////////////////////////////////////////////////
                          // пометить функцию без сайд ефектов можно коментарием
/*#__PURE__*/ double(55);


ВАЖНО ======================= сайд ефекты обрезаются только в режиме 
+ mode: 'production',



10) webpackMerge = обьединяет наши конфиги в один
-npm install --save-dev webpack-merge
-добавляем файлы 
--webpack.common.js // как главный файл импор везде
--webpack.dev.js // файл режима buidl(с коментариями и деревьями) и режима start (тоже самое только с сервером)
--webpack.prod.js // режим продакшена prod(минификация, обрезание деревьев)

-асеты в package.json
    "build": "webpack --config webpack.dev.js",
    "start": "webpack-dev-server --open --config webpack.dev.js",
    "prod": "webpack --config webpack.prod.js"

-if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} // проверка не находимся ли мы в режиме разработки



11) полифилы для отображения кода в старых браузерах
npm install --save babel-polyfill
npm install --save whatwg-fetch

-добавляем в загрузку самым первым 
webpack.common.js
+       entry: {
+       polyfills: './src/polyfills.js',
+ }
-создаем для них отдельный скрипта
polyfills.js
+    import 'babel-polyfill';
+    import 'whatwg-fetch';

-создаем в директории ./dist => index.html
-добавляем в index.html в директории ./dist
+     <title>Getting Started</title>
+     <script>
+       const modernBrowser = (
+         'fetch' in window &&
+         'assign' in Object
+       );
+
+       if ( !modernBrowser ) {
+         const scriptElement = document.createElement('script');
+
+         scriptElement.async = false;
+         scriptElement.src = '/polyfills.bundle.js';
+         document.head.appendChild(scriptElement);
+       }
+     </script>

-этот скрипт для теста ========= фетча
fetch('https://jsonplaceholder.typicode.com/users')
+   .then(response => response.json())
+   .then(json => {
+     console.log('We retrieved some data! AND we\'re confident it will work on a variety of browser distributions.')
+     console.log(json)
+   })
+   .catch(error => console.error('Something went wrong when fetching this data: ', error))



12) онлайн сервер (симуляция настоящего)
npm install http-server --save-dev

- добавляем асет
"oserver": "http-server dist"



13) рабочая коробка или приложение которое работает без интернета
npm install workbox-webpack-plugin --save-dev

===============================ВАЖНО====================================
в проде он не минифицирован нужно узнать как это сделать

-webpack.common.js добавляем настройки
const WorkboxPlugin = require('workbox-webpack-plugin');
+     new WorkboxPlugin.GenerateSW({
+       // these options encourage the ServiceWorkers to get in there fast
+       // and not allow any straggling "old" SWs to hang around
+       clientsClaim: true,
+       skipWaiting: true,
+     }),

-проверка работы index.js смотреть в консоли
+ if ('serviceWorker' in navigator) {
+   window.addEventListener('load', () => {
+     navigator.serviceWorker.register('/service-worker.js').then(registration => {
+       console.log('SW registered: ', registration);
+     }).catch(registrationError => {
+       console.log('SW registration failed: ', registrationError);
+     });
+   });
+ }



13) public path ============= ВАЖНО ============== узнать больше


















далее загружаем и настраиваем пакеты в зависимости от потребностей











3) npm i --save-dev style-loader css-loader = утсанавливаем для создания css в нашей dist папке
- добавляем модуль webpack.config.js
    module: {
        rules: [
        {
            test: /\.css$/, добавляет все css файлы из ./src
            use: [
            'style-loader', - лоадер 1
            'css-loader', - лоадер 2
            ],
        },
        ],
    },

- добавляем импорт в index.js
    import './style.css';

















