# wayfinder-admin-backend

set env variable

`DATABASE_URL` in ubuntu

`export DATABASE_URL='postgres://postgres:root@localhost:5432/wayfinder'`

in windows

`set DATABASE_URL='postgres://postgres:root@localhost:5432/wayfinder'`

or you can add it to bashrc file of ubuntu

`sudo gedit ~/.bashrc`

add these 2 line at the end

```
#this is wayfinder admin database connection string
export DATABASE_URL='postgres://postgres:root@localhost:5432/wayfinder'
```
