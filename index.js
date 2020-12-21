const express= require('express');
const app=express();
const pool=require('./db');
const cors = require('cors')

app.use(cors())

app.use(express.json());
const PORT=process.env.PORT || 80;


//Autocomplete API to return possible matches based on the branch name ordered by IFSC code (ascending order) with limit and offset.
//Endpoint: /api/branches/autocomplete?q=<>
//Example: /api/branches/autocomplete?q=RTGS&limit=3&offset=0

app.get('/api/branches/autocomplete',async(req,res)=>{

  if(!req.query.q){
    return res.send('Type Something to Search');
  }
 
  try{
    const allBranches= await pool.query(`SELECT * FROM branches WHERE branch LIKE $1 || '%' ORDER BY ifsc ASC OFFSET $2 LIMIT $3`,[req.query.q, req.query.offset, req.query.limit]);
    if(allBranches.rows.length===0){
      return res.send('No branch in the city');
    }
    res.json(allBranches.rows);

  }catch(e){
    res.send(e);

  }

});


//Search API to return possible matches across all columns and all rows, ordered by IFSC code (ascending order) with limit and offset.
//Endpoint: /api/branches?q=<>
//Example: /api/branches?q=BANGALORE&limit=4&offset=0

app.get('/api/branches',async(req,res)=>{
  if(!req.query.q){
    return res.send('Please select a city!');
  }
 
  try{
    const allBranches= await pool.query(`SELECT * FROM branches WHERE city = $1 ORDER BY ifsc ASC OFFSET $2 LIMIT $3`,[req.query.q, req.query.offset, req.query.limit]);
    if(allBranches.rows.length===0){
      return res.send('No branch in the city');
    }
    res.json(allBranches.rows);

  }catch(e){
    res.send(e);

  }

});


//listening the application on localhost port 6000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });