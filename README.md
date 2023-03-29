`.env`

```env
REACT_APP_LOGGING=0
```
<div class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]"><div class="flex flex-grow flex-col gap-3"><div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap"><div class="markdown prose w-full break-words dark:prose-invert dark"><p>Данный проект является трехмерным визуализатором молекул, атомов и связей между ними на основе библиотеки Three.js и React-Three-Fiber. Проект использует стейт-менеджмент на основе Mobx-state-tree и имеет модульную архитектуру, что позволяет удобно добавлять новые функции и расширять возможности проекта.</p><p>Проект состоит из нескольких модулей:</p><ul><li><code>components</code> содержит компоненты, которые отображают атомы и связи между ними.</li><li><code>data</code> содержит данные о молекулах и атомах, используемые для создания моделей.</li><li><code>models</code> содержит модели для использования в Mobx-state-tree.</li><li><code>actions</code> содержит функции-действия, которые изменяют состояние Mobx-state-tree.</li><li><code>stores</code> содержит сторы, которые объединяют модели и действия.</li><li><code>features</code> содержит функциональные модули проекта, такие как освещение и камера.</li></ul><p>Главный файл проекта <code>App.js</code> использует сторы, чтобы создать и отрисовать трехмерное пространство, в котором отображаются атомы и связи между ними.</p></div></div></div><div class="flex justify-between"><div class="text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-3 md:gap-4 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible"><button class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg></button><button class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg></button></div></div></div>