const path = require('path')
const multer  = require('multer')
const mime = require('mime')

let fname = ''

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'))
  },
  filename: function (req, file, cb) {
    let ext = mime.getExtension(file.mimetype)
    fname = file.fieldname + '-' + Date.now() + '.' + ext
    cb(null, fname)
  }
})

const limits = {
  fileSize: 200000,
  files: 1
}

function fileFilter(req, file, cb) {
  const acceptType = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']
  if(!acceptType.includes(file.mimetype)){
    cb(new Error('文件类型必须是 .png .jpg .jpeg .gif!'))
  } else {
    cb(null, true)
  }
}


const upload = multer({ storage, limits, fileFilter }).single('companyLogo')

const uploadMiddleware = (req, res, next) => {
  
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.render("fail", {
        data: JSON.stringify({
          message: "文件大小超过限制200kbytes",
        }),
      });
    } else if (err) {
      res.render("fail", {
        data: JSON.stringify({
          message: err.message,
        }),
      });
    } else {
      req.companyLogo = fname
      next()
    }
  })
}

module.exports = uploadMiddleware
