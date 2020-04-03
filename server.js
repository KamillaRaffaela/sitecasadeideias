// usei o express para cirar e configurar meu servidor
const express = require("express")
const server = express()

const db = require("./db")

// const ideias = [
//     {
//         img:"https://image.flaticon.com/icons/svg/2729/2729007.svg",
//         title:"Curso de Programação",
//         category:"Estudo",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut, totam maiores reprehenderit in ipsum", 
//         url:"https://rocketseat.com.br"
//     },
//     {
//         img:"https://image.flaticon.com/icons/svg/2729/2729005.svg",
//         title:"Exercicios ",
//         category:"Saúde",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut, totam maiores reprehenderit in ipsum", 
//         url:"https://rocketseat.com.br"
//     },
//     {
//         img:"https://image.flaticon.com/icons/svg/2729/2729027.svg",
//         title:"Meditação",
//         category:"Mentalidade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut, totam maiores reprehenderit in ipsum", 
//         url:"https://rocketseat.com.br"
//     },
//     {
//         img:"https://image.flaticon.com/icons/svg/2729/2729032.svg",
//         title:"Karaokeee",
//         category:"Diversão Em Família",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut, totam maiores reprehenderit in ipsum", 
//         url:"https://rocketseat.com.br"
//     }, 
// ]

//configurr arquivos estáticos (css, scripts, imsgens)
server.use(express.static("public"))

server.use(express.urlencoded ({extended:true}))

//configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true // boolean
})


//criei uma rota /
//e capturo o pedido do cliente para responder
server.get("/", function(req, res) {

    
    
    db.all(`SELECT * FROM ideias`, function(err, rows) {

        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
    const reversedIdeas = [...rows].reverse()

    let lastIdeias = []
    for (let ideia of reversedIdeas) {
        if(lastIdeias.length < 2){
            lastIdeias.push(ideia)
        }
    }

    return res.render("index.html", {ideias: lastIdeias})

    
    });

   
})

server.get("/ideias", function(req, res) {

    db.all(`SELECT * FROM ideias`, function(err, rows) {

        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

            const reversedIdeas = [...rows].reverse()
    
        return res.render("ideias.html", {ideias: reversedIdeas})
    })
})

server.post("/", function (req, res) {

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
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]
    
    db.run (query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        return res.redirect("ideias")
       
    })

})
//liguei meu servidor na porta 3000

server.listen(3000)