'use strict'

var fs = require('fs');
const pdf = require('html-pdf')


class CreatePdfController {
  async store({ request, response, view }) {
    try {
      const { name } = request.all()

      const templete = view.render('pdf.create', { name })

      const fileName = `${name}-${Math.random().toString(36).substring(2, 16)}.pdf`

      const fileNameNormalized = fileName.toLocaleLowerCase().replace(' ', '-')

      pdf.create(templete).toStream(function(err, stream){
        stream.pipe(fs.createWriteStream(`./uploads/${fileNameNormalized}`));
      });

    } catch (err) {
      return response.status(err.status).send(err)
    }
  }
}

module.exports = CreatePdfController
