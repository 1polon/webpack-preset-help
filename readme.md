# Привет, это коротенькая инструкция v0.0.2 по созданию пресета webpack

Пономаренко Виктор
## О главном

- материалы взяты с официального англ. яз. сайта webpack
[официальная страничка гайдов webpack](https://webpack.js.org/guides/)
- Необходимы базовые знания консоли, **установленый гит, node.js, npm**
- Команды для консоли будут отображены знаком &#9646;
- Код который будет добавлятся по мере наполнения конфига, отображен знаком **+**

## Содержание

1. [Инициализация git](#1_git_init)
2. [Инициализация npm](#2_npm_init)
3. [Установка webpack](#3_webp_i)
4. [Установка локального сервера](#4_ls)
5. [SplitChunksPlugin - вырезает куски кода в один файл](#5_split)
6. [Prefetching - ленивая загрузка файлов](#6_pref)
7. [Плагин проверки бандла bundle Analasis](#7_ananas)
8. []()
9. []()
10. []() 

## <a name="1_git_init"> 1. Инициализация git</a>

- создаем папку, вся магия будет происходить там

- создаем ветку на гитхабе 

- создаем гит локально
  - &#9646;`git init` - создаст наш гит файл
  - &#9646;`git add .` - добавим все созданые файлы
  - &#9646;`git commit -m "first commit"` - сделаем первый коммит
  - &#9646;`git remote add origin https://github.com/[название репозитория].git` - добавим адрес репозитория
  - &#9646;`git push -u origin master` - отправим данные в тридевятое

- &#9646;`type nul > .gitignore` добавляем гит игнор

### Команды для гит :
- &#9646;`git status` - показывает статус всех файлов которые мы изменили
- &#9646;`git . | git add [file.format]` - добавляет все файлы | добавляет определенный файл
- &#9646;`git commit -m "message"` - делает коммит изминений те. добавленых файлов
- &#9646;`git log` - показывает все коммиты
- &#9646;`git branch` - показывает ветки, если добавить что-то то создает ветку
- &#9646;`git checkout [название ветки]` - переключаем ветку
- &#9646;`git checkout [hash]` - сбрасывет изминения до указаного хеша
- &#9646;`git reset` - сбрасывает изминения из самого коммита HEAD
- &#9646;`git -h` - помощь
- &#9646;`git tag [имя_тега]` - добавляет тег к коммиту

## <a name="2_npm_init">2. Инициализация npm</a>

- &#9646;`npm init` - coздаст файл `package.json` с нашими настройками
- в нем указываем название, описание, репозиторий(устанавливается автоматически т.к. мы создали ранее)
- удаляем `"main": main.js` в файле `package.json`
  `
- добавляем настройку `"private": true` в файл `package.json` (нужна для запрета случайных утечек кода)

- добавляем команды(асеты) в файл `package.json`. Это позволяет использовать короткие команды в консоли например  &#9646;`npm run [любой асет]` в нашем случае для запуска webpack нужно ввести &#9646;`npm run build`
  
  ```json
  "scripst":{
          "test": "echo \"Error: no test specified\" && exit 1",
  +       "build": "webpack --config webpack.config.js"
  }
  ```
## <a name="3_webp_i">3. Устанавливаем webpack</a>

- &#9646;`npm install webpack webpack-cli --save-dev` - добавляем пакеты webpack
- создаем папку `src`

> `--save-dev` при в ключении этого режима зависимости появится в devDependencies файла `package.json` и так далее. Подробнее https://docs.npmjs.com/cli/install

- создаем `webpack.config.js` - нужен для наших настроек, на него будет ссылатся команда &#9646;`npm run build` в него вставляем:

     ```js
    const path = require('path');

    module.exports = {
    mode: 'development',
    entry: {
        index:  './src/index.js',
        another: './src/another-module.js'
    },
    output: {
        filename: '[name].[contenthash].bundle.js',    
        path: path.resolve(__dirname, 'dist'), 
    },
    };
    ```

### Расшифровка

- `entry:` здесь находится наш входящий файл или файлы
- `output:` здесь исходящий после компиляции - его "исходное_имя+хеш_сумма+bundle.js"
- `path: path.resolve(__dirname, 'dist')` папка или дирректория будет создана автоматически

> по умолчанию установлен режим разработки `mode: 'development'` - создание (с sours-карты, коментарии и др.)
. В файле webpack.config.js можно заменить - `mode: 'production'` - продакшен (код минифицируется и готовится к получению пользователем)

## <a name="4_ls">4. установка локального сервера</a>

- &#9646;`npm i --save-dev webpack-dev-server` - локальный сервер (оффлайн без кеша и др.)
- в файле `webpack.config.js` добавляем, это папка из которой будут братся данные для сервера

```js
    devServer: {
        contentBase: './dist'
    }
```

- в файл `package.json` добавляем асет `"start": "webpack-dev-server --open"`
теперь доступна команда &#9646;`npm run start` для запуска локального сервера

## <a name="#5_split">5. добавляем SplitChunksPlugin из коробки. Он вырезает одинаковые куски кода

- дописываем в  `webpack.config.js`

```js
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
```

> хорошая практика использовать динамический импорт для вырезания кода подробнее https://webpack.js.org/guides/code-splitting/
> . Extracting Boilerplate опция вырезает только используемые куски кода в отличии от предидущей опции, это опасно если есть **сайд ефекты**

### Расшифровка 
- `moduleIds: 'hashed'` - удаляем изминение хеш суммы вендоров от изминений в файле `index.js`
- `runtimeChunk: 'single'` - выделяем активные куски кода в отдельный файл

## <a name="6_pref">6. Prefetching или ленивая загрузка (для модулей которые должны быть загружены, но не использованы сразу)

- когда добавляем скрипт например в `index.js` с помощью импорта, прописываем коментарий

```js
 import(/* webpackPrefetch: true */ 'любое_имя.js')
```

- загрузится лениво и кешируется. В index.html отобразится как 
```html
<link rel="preferch" href="любое_имя.js">
```

- с другой стороны данный коментарий загрузит самым первым

```js
import(/* webpackPreload: true */ 'любое_имя.js');`
```

- отобразится как

```html
<link rel="preload" href="любое_имя.js">
```

### Важно: для того чтобы изминения отображались в `./dist/index.html` можно использовать например HtmlWebpackPlugin.

## 7) по желанию bundle Analasis для проверок бандла
подробнее:
https://webpack.js.org/guides/code-splitting/


## <a name="8_clean">8. Очистка `./dist` и создание html 

- &#9646;`npm i --save-dev clean-webpack-plugin` - CleanWebpackPlugin - очищает директорию `./dist`

- &#9646;`npm i --save-dev html-webpack-plugin` -  HtmlWebpackPlugin - создает файл и вносит в него бандлы(скрипты) и другие зависимости html в `./dist`

```js
  const path = require('path');
+ const {CleanWebpackPlugin} = require('clean-webpack-plugin');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        polyfills: './src/polyfills.js',
        index: './src/index.js',
    },
+    plugins: [
+    new CleanWebpackPlugin(),
+    new HtmlWebpackPlugin({
+        title: "Оглавление сайта",
+        template: "./src/index.html"
+    })
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
```

## <a name="9_csp">9. CSP - команда для дополнительной защиты от XSS</a>

- блокирует всё что не прописано в `index.html`
- добавляем CSP

```js
new HtmlWebpackPlugin({
    title: 'Hello',
    "meta": {
       'Content-Security-Policy': {'http-equiv': 'Content-Security-Policy', 'content': 'default-src \'self\''}
    },
}),
```


## <a name="10_three">10. three shaking и sideEffects - отрубание не исполняемого кода (пока что не пробовал, чуть позже займусь)

```js
+ mode: 'development',
+ optimization: {
+   usedExports: true, // добавляет возможность помечать скрипт пользователя в експорте
                       // он отображается как    /* unused harmony export square */
                                                 /* harmony export (immutable) */
                       // и остается так как компилятор думает что там есть = side efect
                       // чтобы этого избежать смотри ниже
+ },
```

- `package.json`
```js
+ {
+   "name": "your-project",
+   "sideEffects": false  // ОПАСНО откулючает распознавание сайд ефекта 
                          //потом сложно находить ошибки
//////////// можно сделать иначе //////////////////
+   "name": "your-project", 
+ "sideEffects": [ // если все-таки есть сайд ефекты то 
+   "**/*.css",    // помечаем их в массиве для сайд ефектов
+   "**/*.scss",
+ ],
```
> пометить функцию без сайд ефектов можно коментарием
`/*#__PURE__*/ double(55)`;

### Важно: код обрезаются только в режиме `mode: 'production'`

## <a name="11_merge">11. WebpackMerge - обьединяет наши конфиги в один</a>
- &#9646;`npm install --save-dev webpack-merge`
- добавляем файлы 
  - `webpack.common.js` - как главный файл импор везде
  - `webpack.dev.js` - файл режима buidl(с коментариями и деревьями) и режима start (тоже самое только с сервером)
  - `webpack.prod.js` - режим продакшена prod(минификация, обрезание деревьев)

- асеты в `package.json`

```js
    "build": "webpack --config webpack.dev.js",
    "start": "webpack-dev-server --open --config webpack.dev.js",
    "prod": "webpack --config webpack.prod.js"
```

- Добавим проверку режима разработки в `index.js`

```js
if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} // проверка не находимся ли мы в режиме разработки
```

## <a name="12_pol">12. Полифилы для отображения кода в старых браузерах ( глава нуждается в доработке )</a>
- `npm install --save babel-polyfill` - установка полифила
- npm install --save whatwg-fetch - без понятия что он делает
-добавляем в загрузку самым первым 
webpack.common.js
entry:{
polyfills: './src/polyfills.js',
}
-создаем для них отдельный скрипта
polyfills.js
import 'babel-polyfill';
import 'whatwg-fetch';

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



13) онлайн сервер (симуляция настоящего)
npm install http-server --save-dev

- добавляем асет
"oserver": "http-server dist"



14) рабочая коробка или приложение которое работает без интернета
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



15) public path ============= ВАЖНО ============== узнать больше











## Не знаю как настроить, если кто знает напишите

* **HtmlWebpackPlugin** файл не минифицирутся в продакшене встроеными средствами если использовать "template: ./src/index.html"
* **Work-box** во время выполнения на сервере локально сильно увеличивается в размере






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