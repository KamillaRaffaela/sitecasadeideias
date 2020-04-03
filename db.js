const sqlite3 = require ('sqlite3').verbose()
const db = new sqlite3.Database ('./ws.db')

db.serialize(function() {
    // criar tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideias(
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
        
    `)

    // inserir dados na tabela
    const query = `
            INSERT INTO ideias(
            image,
            title,
            category,
            description,
            link
        )VALUES(?,?,?,?,?);
        `   

    const values = [
        "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        "Curso de Programação",
        "Estudo",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut, totam maiores reprehenderit in ipsum", 
        "https://rocketseat.com.br"
    ]
    
    db.run (query, values, function(err) {
      if (err) return console.log (err)

            console.log (this)

       
    })

    // Deletar um dados da tabela 
    // db.run (`DELETE FROM ideias  WHERE id = ?`, [], function (err) {
    //     if(err) return console.log (err)

    //     console.log ("DELETEI", this)
    // })

    // //consultar dados na tabel 
    // db.all(`SELECT * FROM ideias`, function(err, rows) {
    // if (err) return console.log(err)

    // console.log (rows)
    // });


});

module.exports = db