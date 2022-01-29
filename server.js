const express = require('express')
const app = express()
const multer = require('multer')
const path = require('path')

/* cria uma instância do middleware configurada
   destination: lida com o destino
   filenane: permite definir o nome do arquivo gravado*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //erro first callback
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        //erro first callback
        cb(null, `${file.fieldname}-${Date.now()}.${path.extname(file.originalname)}`)
    }
})

// Salvando com o mesmo nome do arquivo
/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
 */

// utiliza a storage para configurar a instância do multer
const upload = multer({ storage })

app.use(express.static('public'))

// rota indicada no atributo 'action' do formulário
app.post('/file/upload', upload.single('file'), (req, res) => {
    res.send('<h2>Upload realizado com sucesso!!!</h2>')
})


app.listen(3000, () => console.log('App na porta 3000'))