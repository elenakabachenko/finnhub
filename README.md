


## Usage
API KEY is required. Please see `.env` file.<br/>
Pre requirements: node 16


```shell
npm i && npm start
```

Navigate to http://localhost:3000

### Via Docker

```shell
docker build -t app --build-arg REACT_APP_API_KEY=<YOUR_API_KEY> .
```

Once image built

```shell
docker run -p 80:80 app
```
Navigate to http://localhost



d