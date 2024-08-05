## 💡 Use Case

Let's say you want to send some requests to an API with different resources. Some of them are `GET` requests with some param and queries, some of the are `POST` with body and some authorization headers. And you may have a combinition of them and you need to repeat them frequently.

## ❌ Bad Practice

This is not neccessarily a bad practice if you only have one request. But it can be hard to maintanance if you have multiple API calls with different shapes.
