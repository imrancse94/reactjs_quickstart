import validation from './validation';
export const getMainEndpoint = (endpoint) => {
    var arr = endpoint.split('/');
    return "/"+arr[1];
}

export const formvalidation = (inputdata) => {
    let validate = new validation('imrancse94@gmail.com');
    alert(validate.email)
}

export const getQueryStringValue = (key) => {
    const value = decodeURIComponent(
        window.location.search.replace(
            new RegExp(
                '^(?:.*[&\\?]' +
                encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
                '(?:\\=([^&]*))?)?.*$',
                'i'
            ),
            '$1'
        )
    );
    return value ? value : null;
}

