 
```mermaid
 sequenceDiagram
    participant browser
    participant server

    browser->>server: POST `form input` request to https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: Found 302 
    <--Server asks the browser to create a GET request to /exampleapp/notes(Redirecting)-->
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: text/HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    <--The user input into the form has already been added to data.json on the server side and this js file will append the data.json as a child to the "notes" when the file is fetched -->
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "This is the user input", "date": "2023-06-23" }, ... ]
    deactivate server
```


