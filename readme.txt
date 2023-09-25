Initial steps to be follow:

step 1: create a file with folder backend and file server.js with the console to check
step 2: write ('npm init')
step 3: create file called (.gitignore) inside write node_modules and .evn
step 4: write 'npm i express dotenv mongoose colors'
step 5: write npm i -D nodemon
step 6: update the file called package.js 
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1"
        }, 
        to
        "scripts": {
          "start": "node backend/server.js",
          "server": "nodemon backend/server.js"
        },
step 7: npm run server
step 8: then sync git with visual studio
step 9: git init
step 10: git add .
step 11: git commit -m "Karthi || initial commit"