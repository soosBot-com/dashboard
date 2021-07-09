function format_server_name(name) {
    return name.split(' ').map(x => x[0]).join('');
  };

function if_equal (obj, value, trueString, falseString) {
    return ( (obj===value) ? trueString : falseString );
};

module.exports = { format_server_name, if_equal };