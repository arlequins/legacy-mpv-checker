cd ./frontend
npm run build
cd ..
cp ./frontend/dist/index.html ./backend/views/index.hbs
cp -R ./frontend/dist/static ./backend/public
cd ./backend
npm start
cd ..
