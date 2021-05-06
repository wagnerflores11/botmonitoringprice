const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const mysql = require('../database/db')

const base = 'url'

const botsantista = async (url = base) => {
    const { data: body } = await axios.get(url)
    return body
  }
  
  botsantista().then(r => {
    const $ = cheerio.load(r)
    const productsDivs = $('[data-cy=vm-productCard-container]').toArray()
    const productsResponse = productsDivs.map(el => {
      // Price
      const elements = $(el).find('span').toArray().map(ell => $(ell).text())
      const onlyMoney = elements.filter(i => i.startsWith('R$'))
      onlyMoney.reverse()
      const [ price, oldPrice ] = onlyMoney
      
      // Name
      const name = $(el).find('div:nth-child(2) > div > p').text()
  
      return { name, price }
    })
    console.log(productsResponse);

    
        
        const values = productsResponse.map((productsResponse) => {
            return [
              productsResponse.name,
              productsResponse.price
             ]});
            
        mysql.execute(`INSERT INTO tb_products(price, name) VALUES ?`, [values], function (error, results, fields) {
            if (error) throw error;
            // console.log(results)
            return res.send(results);

});

  })
exports.botsantista = botsantista;




const getBot = async (req, res, next) => {
    try {
        let produto = '';
        if (req.query.produto) {
            produto = req.query.produto
        }
        const query = `SELECT * FROM tb_base2`;
        const result = await mysql.execute(query)
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.getBot = getBot;