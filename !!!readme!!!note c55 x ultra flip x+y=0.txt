setup{
    npm i
}

url {
    http://localhost:3000

    berita crud : http://localhost:3000/news  
    user crud : http://localhost:3000/user
    login : http://localhost:3000/login
    user auth : http://localhost:3000/protek
}


sequelize? {
    npm install -g sequelize-cli
}

migration {
    sequelize db:migrate

    undo
    sequelize db:migrate:undo:all
}

seeder {
    belum bikin seeder
}

cli command add file {
    file model+migration+attributes : 
        sequelize model:generate --name <User> --attributes name:string,job:string
    file migration : 
        sequelize migration:create --name=<create_users_table>
    file seeder : 
        sequelize seed:generate --name=<nama-seeder>
}

error security = {{ Set-ExecutionPolicy RemoteSigned }}

"id": 1,
"image": "http://localhost:3000/images/WhatsApp_Image_2022-10-11_at_21.52.33.jpeg",
"judul": "judul pertama ",
"author": "jelang",
"isi": "lorem ipsum sit amet dolor",
"createdAt": "2023-05-20T13:26:04.000Z",
"updatedAt": "2023-05-20T13:29:32.000Z"
