const multer = require('multer');

module.exports.video = function (destination) { 
    if (destination) {
        destination = `./public/${destination}`;
    } else {
        destination = './public';
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, destination);
        },
        filename: function (req, file, cb) {
            const getFileExt = function (fileName) {
                const fileExt = fileName.split('.');
                if( fileExt.length === 1 || ( fileExt[0] === '' && fileExt.length === 2 ) ) {
                    return '';
                }
                return fileExt.pop();
            };
            cb(null, `${Date.now()  }.${  getFileExt(file.originalname)}`);
        }
    });
    const multerUpload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            if(!file.originalname.match(/\.(mov|mp4|avi|wmf|flv)$/)) {
                return callback(new Error('Only images are allowed'));
            }
            callback(null, true);
        },
        limits:{
            fileSize: 4000 * 4000
        }
    });
    
    return multerUpload.single('upload');
};
module.exports.image = function (destination) {
    if (destination) {
        destination = `./public/${destination}`;
    } else {
        destination = './public';
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, destination);
        },
        filename: function (req, file, cb) {
            const getFileExt = function (fileName) {
                const fileExt = fileName.split('.');
                if( fileExt.length === 1 || ( fileExt[0] === '' && fileExt.length === 2 ) ) {
                    return '';
                }
                return fileExt.pop();
            };
            cb(null, `${Date.now()  }.${  getFileExt(file.originalname)}`);
        }
    });
    const multerUpload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            if(!file.originalname.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
                return callback(new Error('Only images are allowed'));
            }
            callback(null, true);
        },
        limits:{
            fileSize: 4000 * 4000
        }
    });
    
    return multerUpload.single('upload');
};