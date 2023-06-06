var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Lösenordskryptering
const bcrypt = require('bcrypt');
const saltRounds = 10;

const cors = require("cors");
const fs = require("fs");

const codeGenerator = require('jcg-code-generator');



//const { fstat } = require('fs');

// generera random ID nummer med hjälp av uuid
//const { v4: uuidv4 } = require('uuid');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// funktion för att kryptera ett lösenord
function encryptPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
  }
  
  //funktion för att jämföra ett okrypterat lösenord med ett krypterat
  function comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  
//  Function to generate a file tree for the /public directory
function generateFileTree(directory) {
    const files = fs.readdirSync(directory);
    let fileTree = `<html><head><title>HTML, JS & CSS Boilerplate Generator</title></head>
    <body>
    <h1 style="font-family: arial; color: #00aa00;">HTML, JS & CSS Boilerplate Generator</h1>
    <div style=" width: 590px; font-family: arial; font-size: 12px;">This page generates regular HTML Input Field Code and Dynamically generated Javascript Input Field Code, based on JSON Objects. Textarea and button work too. The idea is too speed up the process of regular input form building and other common code in new projects.</div><br>
    <h3 style="font-family: arial; font-size: 18px;">Generated files</h3><ul>`;
  
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      const isDirectory = stats.isDirectory();
      const linkPath = "backend/" + path.relative(publicDirectory, filePath);
  
      if (isDirectory) {
        fileTree += `<li><strong>${file}</strong>`;
        fileTree += generateFileTree(filePath);
        fileTree += '</li>';
      } else {
        fileTree += `<li><a href="/${linkPath}" style="font-family: arial; color: #0000ff;">${file}</a></li>`;
      }
    });
  
    fileTree += `</ul><br>
    <div style="width: 600px; font-family: arial; font-size: 12px;">Change the JSON boilerplate input below as you want. 
    You can easily generate more fields by extending the fields Array with more entries.
    This first version <b style="color: red;">is not bug tested</b>, and will be upgraded and extended A LOT.<br><br>
    This TOOL uses the npm packages: <b>jcg-generate-code</b> and <b>jcg-writefile</b> by Jonas Bergman.<br>
    CSS generation/function not built in yet. More options coming.
    <br><br>
    When you are finished with the input fields you want/need, click on Generate code below and then reload the page. This will replace the .html, .js and .css files above,
    and you are free to open or download them for your own needs.
    </div><br>
    <textarea id='codeblock' style="padding: 20px; width: 600px; height: 700px; font-size: 12px; font-family: arial; color: #fff; background-color: #000;">{
        "fields": [
          {
            "field-type": "input",
            "type": "text",
            "value": "",
            "placeholder": "your username",
            "class": "my-input-class",
            "id": "login",
            "label": "Login:",
            "eventListener": {
              "type": "change",
              "async": false
            }
          },
          {
            "field-type": "input",
            "type": "password",
            "value": "",
            "placeholder": "your password",
            "class": "my-input-class",
            "id": "password",
            "label": "Password:"
          },
          {
            "field-type": "textarea",
            "value": "test",
            "placeholder": "your password",
            "class": "my-input-class",
            "id": "textarea1",
            "label": "Password:"
          },
          {
            "field-type": "button",
            "value": "Send",
            "class": "my-button-class",
            "id": "submit",
            "eventListener": {
              "type": "click",
              "async": false
            }
          }
        ]
      }</textarea><br>
    <button id="codeblock-btn" style="width: 600px; height: 40px; font-size: 22px;">Generate code</button><br>

    <script>

    let codeblockBtn = document.getElementById("codeblock-btn");
    let codeblock = document.getElementById("codeblock");

    async function createFiles(code) {

        const response = await fetch("https://webinno.se/backend/api/codeblock", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: code,
        });
      
        if (response.ok) {
            alert("Files generated!");
          return true;
        } else {
            console.log(response);
          return false;
        }
      
      }

      codeblockBtn.addEventListener('click', async function() {

        createFiles(codeblock.value);
        //window.location.href = "index.html";
    
    });

    </script>
    </body>
    </html>
    
    `;
    return fileTree;
  }


  
  



app.post("/backend/api/codeblock", (req, res) => {

        let fieldAttributes = req.body;

        let filename = { 
            "html": "public/index.html.txt",
            "js": "public/script.js",
            "css": "public/style.css" 
        }

        //console.log(fieldAttributes);
        codeGenerator(fieldAttributes, filename);
	

	res.status(200).json({ "generated": fieldAttributes });   
	
       

})

const publicDirectory = path.join(__dirname, 'public');

// Custom route to generate file tree
app.get('/backend/webCode', (req, res) => {
  const fileTree = generateFileTree(publicDirectory);
  res.send(fileTree);
});

// Serve files from the "public" directory
//app.use(express.static('public'));


module.exports = app;