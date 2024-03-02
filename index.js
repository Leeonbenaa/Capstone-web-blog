import  express from "express";
import  bodyParser from "body-parser";

const app = express();
const port = 3000;


app.set('view engine', 'ejs');


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


let blogPosts = [];


app.get('/', (req, res) => {
    res.render('index', { blogPosts: blogPosts });
});


app.post('/', (req, res) => {
    const newPost = {
        id: Date.now(), 
        title: req.body.title,
        content: req.body.content
    };

    
    blogPosts.push(newPost);

    
    res.redirect('/');
});


app.post('/delete/:id', (req, res) => {
    const postId = req.params.id;
    
    blogPosts = blogPosts.filter(post => post.id !== parseInt(postId));
    
    res.redirect('/');
});




app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
