# webpack-preset-help

Пономаренко Виктор

## О главном

- Привет, это коротенькая инструкция v0.0.3 по созданию пресета webpack
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
8. [Очистка `.dist` и автоматическое создание html](#8_clean)
9. [CSP - команда для дополнительной защиты от XSS](#9_csp)
10. [three shaking и sideEffects - отрубание не исполняемого кода](#10_three) 
11. [WebpackMerge - обьединяет наши конфиги в один](#11_merge) 
12. [Workbox - для работы сайта без интернета](#12_work) 
15. [Public path - будет добавлено в скором будующем :)](#15_pp) 
- [Вывод](#vv) 
- [Если кто-то разбирается](#help) 

## <a name="1_git_init"> 1. Инициализация git</a>

- создаем папку, вся магия будет происходить там

- создаем ветку на гитхабе 

- создаем гит локально
  - &#9646;`git init` - создаст наш гит файл
  - &#9646;`git add .` - добавим все созданые файлы
  - &#9646;`git commit -m "first commit"` - сделаем первый коммит
  - &#9646;`git remote add origin https://github.com/[название репозитория].git` - добавим адрес репозитория
  - &#9646;`git push -u origin master` - отправим данные в тридевятое п.с. `-u` нужен только когда нужно запомнить ветку

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

- добавляем команды(**асеты**) в файл `package.json`. Это позволяет использовать короткие команды в консоли например  &#9646;`npm run [любой асет]` в нашем случае для запуска webpack нужно ввести &#9646;`npm run build`
  
  ```json
  "scripst":{
          "test": "echo \"Error: no test specified\" && exit 1",
  +       "build": "webpack --config webpack.config.js"
  }
  ```
  
## <a name="3_webp_i">3. Устанавливаем webpack</a>

- &#9646;`npm install webpack webpack-cli --save-dev` - добавляем пакеты webpack
- создаем папку `src`

> `--save-dev` при в ключении этого режима, зависимости появится в devDependencies файла `package.json` и так далее. Подробнее <https://docs.npmjs.com/cli/install>

- создаем `webpack.config.js` - нужен для наших настроек, на него будет ссылатся команда &#9646;`npm run build` в него вставляем:

     ```js
  +   const path = require('path');

  +   module.exports = {
  +   mode: 'development',
  +   entry: {
  +       index:  './src/index.js',
  +       another: './src/another-module.js'
  +   },
  +   output: {
  +       filename: '[name].[contenthash].bundle.js',    
  +       path: path.resolve(__dirname, 'dist'), 
  +   },
  +   };
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
    mode: 'development',
+   devServer: {
+       contentBase: './dist'
+   },
```

- в файл `package.json` добавляем асет `"start": "webpack-dev-server --open"`
теперь доступна команда &#9646;`npm run start` для запуска локального сервера

## <a name="5_split">5. добавляем SplitChunksPlugin из коробки. Он вырезает одинаковые куски кода</a>

- дописываем в  `webpack.config.js`

```js
    output: {
         filename: '[name].[contenthash].bundle.js',    
         path: path.resolve(__dirname, 'dist'), 
    },
+   optimization: {
+       moduleIds: 'hashed',
+       runtimeChunk: 'single',
+       splitChunks: {
+           cacheGroups: {
+               vendor: {
+                   test: /[\\/]node_modules[\\/]/,
+                   name: 'vendors',
+                   chunks: 'all',
+               },
+           },
+       },
+   },
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

## <a name="7_ananas"> 7. По желанию bundle Analasis для проверок бандла</a>

- подробнее: <https://webpack.js.org/guides/code-splitting/>

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
        index: './src/index.js',
    },
+    plugins: [
+    new CleanWebpackPlugin(),
+    new HtmlWebpackPlugin({
+        title: "Оглавление сайта",
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

> `template: "./src/index.html"` это директория из которой будут взяты изминения. Остальные параметры которые не указаны будут добавлены автоматически. По умолчанию не минифицируется.

## <a name="9_csp">9. CSP - команда для дополнительной защиты от XSS</a>

- блокирует всё что не прописано в `index.html`
- подробнее: <https://webpack.js.org/guides/csp/>
- пример включение в плагин автоматического заполнения html

```js
new HtmlWebpackPlugin({
    title: 'Hello',
    "meta": {
       'Content-Security-Policy': {'http-equiv': 'Content-Security-Policy', 'content': 'default-src \'self\''}
    },
}),
```


## <a name="10_three">10. three shaking и sideEffects - отрубание не исполняемого кода (пока что не пробовал, чуть позже займусь) - в конечный код не добавлял

```json
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

```json
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
- пометить функцию без сайд ефектов можно коментарием
`/*#__PURE__*/ double(55)`;

### Важно: код обрезаются только в режиме `mode: 'production'` в режиме `development` остается

## <a name="11_merge">11. WebpackMerge - обьединяет наши конфиги в один</a>

- &#9646;`npm install --save-dev webpack-merge`
- добавляем файлы 
  - `webpack.common.js` - как главный файл он експортируется в остальные

    ```js
    +    const path = require('path');
    +    const {CleanWebpackPlugin} = require+('clean-webpack-plugin');
    +    const HtmlWebpackPlugin = require('html-webpack-plugin');

    +    module.exports = {
    +        mode: 'development',
    +        entry: {
    +            index: './src/index.js',
    +        },
    +        plugins: [
    +            new CleanWebpackPlugin(),
    +            new HtmlWebpackPlugin({
    +                title: 'Hello',
    +                template: './src/index.html',
    +            }),
    +            new WorkboxPlugin.GenerateSW({
    +                clientsClaim: true,
    +                skipWaiting: true,
    +            }),
    +        ],
    +        output: {
    +            filename: '[name].[contenthash].js',
    +            path: path.resolve(__dirname, 'dist'),
    +        },
    +        optimization: {
    +            moduleIds: 'hashed',
    +            runtimeChunk: 'single',
    +            splitChunks: {
    +                cacheGroups: {
    +                    vendor: {
    +                        test: /[\\/]node_modules[\\/]/,
    +                        name: 'vendors',
    +                        chunks: 'all',
    +                    },
    +                },
    +            },
    +        },
    +};
    ```

  - `webpack.dev.js` - файл режима buidl(с коментариями и деревьями)

    ```js
    + const merge = require('webpack-merge');
    + const common = require('./webpack.common.js');

    +  module.exports = merge(common, {
    +      devServer: {
    +          contentBase: './dist',
    +      },
    +      mode: 'development',
    +      devtool: 'inline-source-map',
    +  });
    ```

  - `webpack.prod.js` - режим продакшена prod(минификация, обрезание деревьев)

    ```js
    +  const merge = require('webpack-merge');
    +  const common = require('./webpack.common.js');

    +  module.exports = merge(common, {
    +      mode: 'production',
    +      optimization: {
    +          moduleIds: 'hashed',
    +          runtimeChunk: 'single',
    +          splitChunks: {
    +              cacheGroups: {
    +                  vendor: {
    +                      test: /[\\/]node_modules[\\/]/,
    +                      name: 'vendors',
    +                      chunks: 'all',
    +                  },
    +              },
    +          },
    +      },
    +  });
    ```

  - асеты в `package.json`

   ```js
    +   "build": "webpack --config webpack.dev.js",
    +   "start": "webpack-dev-server --open --config webpack.dev.js",
    +   "prod": "webpack --config webpack.prod.js"
    ```

- Добавим проверку режима разработки в `index.js`

    ```js
    +   if (process.env.NODE_ENV !== 'production') {
    +   console.log('Looks like we are in development mode!');
    +   } // проверка не находимся ли мы в режиме разработки
    ```

## <a name="12_work"> 12. Workbox - для работы сайта без интернета </a>

- &#9646;`npm install workbox-webpack-plugin --save-dev`

- `webpack.common.js` добавляем настройки

```js
const WorkboxPlugin = require('workbox-webpack-plugin');`
```

```js
plugins: [
+     new WorkboxPlugin.GenerateSW({
+       clientsClaim: true,
+       skipWaiting: true,
+     }),
],
```

- проверка работы плагина, добавить в `index.js`. Результаты смотреть в консоли

```js
+   if ('serviceWorker' in navigator) {
+     window.addEventListener('load', () => {
+       navigator.serviceWorker.register('/service-worker.js').then(registration => {
+         console.log('SW registered: ', registration);
+       }).catch(registrationError => {
+         console.log('SW registration failed: ', registrationError);
+       });
+     });
+   }
```

## <a name="15_pp">15. Public path - будет добавлено в скором будующем :)</a>

## <a name="vv"> Вывод:</a>

1. Пресет создает чанки автоматом добавляя хеши, html.
2. конфиги разделены на несколько файлов.
3. Скрипты разделены на используемые, вендорные и импортируемые.
4. Также подключена система для офлайн работы сайта.

---

## <a name="help"> Далее то в чем я не разобрался:</a>

- **HtmlWebpackPlugin** файл не минифицирутся в продакшене встроеными средствами если использовать `"template: ./src/index.html"`

- **Work-box** во время выполнения на сервере локально сильно увеличивается в размере

## <a name="help"> если кто знает напишите</a>
