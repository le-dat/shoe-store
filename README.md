### 🚀 Live Demo (https://le-dat-shoe-store.vercel.app/)

![shoe-store screenshot](https://raw.githubusercontent.com/le-dat/shoe-store/master/static/screenshot1.png)
![shoe-store screenshot](https://raw.githubusercontent.com/le-dat/shoe-store/master/static/screenshot2.png)
![shoe-store screenshot](https://raw.githubusercontent.com/le-dat/shoe-store/master/static/screenshot3.png)
![shoe-store screenshot](https://raw.githubusercontent.com/le-dat/shoe-store/master/static/screenshot4.png)
![shoe-store screenshot](https://raw.githubusercontent.com/le-dat/shoe-store/master/static/screenshot5.png)

## Server

```
cd server
```

Create an `.env` file and add the following variables.
`CLOUDINARY (create account in CLOUDINARY)`

```
CLOUDINARY_NAME
CLOUDINARY_KEY
CLOUDINARY_SECRET
```

`url (create account in STRIPE)`

```
STRIPE_KEY
CLIENT_URL=http://localhost:3000
```

`develop`

```
yarn install
yarn develop
```

`api`:

```
Get products: http://127.0.0.1:1337/api/products?populate=*

Get categories: http://127.0.0.1:1337/api/categories?populate=*

Pagination page: http://127.0.0.1:1337/api/products?populate=[filter][categories][slug][$eq]=jodan&pagination[page]=1&pagination[pageSize]=3

Get product: http://127.0.0.1:1337/api/products?populate=*&filters[slug][$eq]=jordan-why-not-6-pf

Get relative product: http://127.0.0.1:1337/api/products?populate=*&filters[slug][$ne]=jordan-why-not-6-pf
```

## Client

```
cd client
```

Create an `.env` file and add the following variables.

```
NEXT_PUBLIC_STRAPI_API_TOKEN
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
NEXT_PUBLIC_API_URL
```

`develop`

```
yarn install
yarn dev
```
