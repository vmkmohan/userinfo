exports.validatingErrors = function (err) {
    var errors = {};
    if (err) {
        switch (err.name) {
            case 'ValidationError':
                for (field in err.errors) {
                    switch (err.errors[field].kind) {
                        case 'required':
                            errors[field] = [field] + ' is Required';
                            break;
                        case 'user defined':
                            errors[field] = 'Already Exist';
                            break;
                        case 'enum':
                            errors[field] = 'Invalid ' + [field];
                    }
                }
                break;
            case 'MongoError':
                if(err.code == 11000){
                    let [i, field, value] = err.errmsg.match(/index:\s([a-z]+).*{\s?\:\s?(["a-z0-9.]+)/i);
                    errors[field] = value + " Already Exists"
                }else{
                    errors["error"] = 'Unexpected error occurred';
                }
                break;
            case 'CastError':
                console.log(err.type);
                if (err.type === 'number') {
                    errors[err.path] = [err.path] + ' must be a Number';
                }
                if (err.type === 'date') {
                    errors[err.path] = [err.path] + ' must be a Valid Date';
                }
                if (err.type === 'ObjectId') {
                    errors[err.path] = [err.path] + ' is NotValid';
                }
                break;
            default:
                errors["error"] = 'Unexpected error occurred';
                break;

        }
    }
    return errors;
};