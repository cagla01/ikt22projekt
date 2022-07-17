if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
            console.log('service worker registriert')
        })
        .catch(
            err => { console.log(err); }
        );
}

let promise = new Promise((resolve, reject) => {
    setTimeout( () => {
        // resolve('resolve -- Ausgabe A');
        reject({code: 500, message: 'An error occurred'});
    }, 3000);
});

promise
    .then(
        value => {
            console.log(value);
        }
    )
    .catch(
        err => {
            console.log(err.code, err.message);
        }
    );

console.log('Ausgabe B');

fetch('https://httpbin.org/ip')
    .then(
        response => response.json()
    )
    .then(
        data => {
            console.log(data);
        }
    )
    .catch(
        err => {
            console.log(err);
        }
    );

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://httpbin.org/ip');
xhr.responseType = 'json';

xhr.onload = function() {
    console.log(xhr.response);
}

xhr.onerror = function() {
    console.log('error');
}

xhr.send();

fetch('https://httpbin.org/post', {
    method: 'POST',
    header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        message: 'just a POST mirror'
    })
})
    .then(
        response => {
            console.log(response);
            return response;
        }
    )
    .then(
        response => {
            console.log(response.body);
            return response.body;
        }
    )
    .then(
        body => {
            const reader = body.getReader();
            return new ReadableStream({
                start(controller) {
                    return pump();
                    function pump() {
                        return reader.read().then(({ done, value }) => {
                            // When no more data needs to be consumed, close the stream
                            if (done) {
                                controller.close();
                                return;
                            }
                            // Enqueue the next data chunk into our target stream
                            controller.enqueue(value);
                            return pump();
                        });
                    }
                }
            })
        })
    .then(stream => new Response(stream))
    .then(response => response.json())
    .then(response => { console.log(response.json); })
    .catch(
        err => {
            console.log(err);
        }
    );