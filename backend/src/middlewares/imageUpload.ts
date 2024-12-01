import multer from 'multer';


export const profilePicUpload = multer({
    limits:{
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        }else{
            cb(new Error('File type not supported'));
        }
    }

});

export const featuredImageUpload = multer({
   // storage: multer.memoryStorage(),////can be deleted
limits:{
    fileSize: 5 * 1024 * 1024, // 5MB
},
fileFilter: (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(new Error('File type not supported'));
    }
}

});

export const inPostImageUpload = multer({
    limits:{
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        }else{
            cb(new Error('File type not supported'));
        }
    }
    
    });