browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
server-->browser: Status Code 302 Found, url redirect
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{"content": "new", "date": "2024-06-06T16:49:42.437Z"},...]