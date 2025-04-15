# MovieRental API + Web App 

Tämä projekti on yksinkertainen Node.js-sovellus, jossa on RESTful API ja Handlebarsilla renderöity käyttöliittymä. Sovelluksessa voi lisätä, poistaa ja hakea elokuvia.

##  Teknologiat
- Node.js + Express
- MongoDB (Atlas)
- express-handlebars
- HTML + CSS
- JavaScript (fetch API)

## Ominaisuudet

 REST API:
- `GET /movies` – Hae kaikki elokuvat  
- `GET /movies/:id` – Hae yksi elokuva  
- `POST /movies` – Lisää uusi elokuva  
- `PUT /movies/:id` – Päivitä elokuva  
- `PATCH /movies/:id` – Päivitä osittain  
- `DELETE /movies/:id` – Poista elokuva  

 Web-näkymä:
- Selaa kaikkia elokuvia
- Lisää elokuva lomakkeella
- Poista elokuva napista
- Tyylitelty ulkoasu (CSS)

##  Asennus

1. Lataa projektin kansio  
2. Aja `npm install`  
3. Luo `.env`-tiedosto ja lisää MongoDB-yhteystiedot:
