import express from "express"
import axios from "axios"
import bodyParser from "body-parser";
const app = express();
const port = 3000
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"))
app.get("/", (req, res) => {
  res.render("index.ejs")
})

app.post("/get-joke", async (req, res) => {
  const any = req.body.selector;
  var blackList;
  var url ;
  if(any){
    if(req.body.jokeBlacklist){
      blackList = req.body.jokeBlacklist.join(",");
       url=`https://v2.jokeapi.dev/joke/${any}?blacklistFlags=${blackList}`
    }
    url=`https://v2.jokeapi.dev/joke/${any}`;
  }
  if(req.body.jokeType){
    var jokeType=req.body.jokeType.join(",");
     if(req.body.jokeBlacklist){
      blackList = req.body.jokeBlacklist.join(",");
       url=`https://v2.jokeapi.dev/joke/${jokeType}?blacklistFlags=${blackList}`
    }
    url=`https://v2.jokeapi.dev/joke/${jokeType}`;
  }
  try{
    const response=await axios.get(url);
    res.render("display.ejs",{
      joke:response.data
    })
    console.log(response.data)
  }catch(error){
    console.error("failed to make the request", error.message);
     res.status(500).send("please select any of the checboxes")
  }
})


app.listen(port, () => {
  console.log(`Server running on Port ${port}`)
})