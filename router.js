
module.exports = (application) => {
  application.get('/teste1', (req, res) => {
	  res.send().status(400)
  })

  application.get('/teste2', (req, res) => {
	  res.send().status(200)
  })

  application.get('/teste3', (req, res) => {
    res.send().status(300)
  })
  
  application.get('/teste4', (req, res) => {
	  res.send().status(500)
  })
}
