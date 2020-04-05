Привет, это коротенькая инструкция по созданию пресета webpack.
 https://webpack.js.org/guides/
 

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

- добавляем команды в (пример "npm run build")
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
        filename: '[name].bundle.js',     //здесь исходящий после компиляции - его "исходное_имя+bundle.js"
        path: path.resolve(__dirname, 'dist'), // папка или дирректория
    },
    };

- вводим режим разработки webpack.config.js 
    "mode": production = продакшен (код минифицируется и готовится к получению пользователем)
    "mode": development = создание (код с коментариями и др.)

3) npm i --save-dev webpack-dev-server = устанавливаем сервер (локальный без кеша и др.)
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