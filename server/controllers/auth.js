//will need async await when connected and fetching from db
const dummy = (req, res) => {
    // console.log("hit the  endpoint");
    res.json({ message: "Hello from server!" });
}

const register = (req , res) => {
    console.log("hit the endpoint");
    console.log(req.body);
    res.json({ message: "hello from post endpoint"})
}
module.exports = { dummy , register }