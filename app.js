var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/deltafinal")
var db = mongoose.connection
db.on("error",console.log.bind(console,"connection error"))
db.once("open",function(callback){
    console.log("connection succeeded ");
})
var app = express()
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded(
    {extended:true}
))
app.set("view engine","ejs");
//signinform
app.get('/sign_in',function(req,res){
    res.redirect('signup.html')
})
app.post('/sign_in',function(req,res){
    var username = req.body.username;
    var phone = req.body.phone;
    var email = req.body.email;
    var password = req.body.password;
    
    db.collection('info').find({}).toArray(function(err,result){
        if(err) throw err;
        var data={
            "username":username,
            "phone":phone,
            "email":email,
            "password":password,
            "reviewdata":['great work'],
            "revname":['john'],
            "creativeanswerkey":["A","D","A","A","A","A","D","A","A","B"],
            "codinganswerkey":["A","A","A","A","C","D","A","D","D","C"],
            "fashionanswerkey":["D","D","A","D","D","A","C","C","D","D"],
            "medicoanswerkey":["D","D","B","B","A","B","D","C","B","B"],
            "roboticsanswerkey":["D","A","D","B","D","D","D","A","D","A"],
            "historiananswerkey":["D","D","B","C","D","D","A","D","A","A"],
            "consultancyanswerkey":["A","C","C","A","D","B","C","C","C","A"],
            "politicsanswerkey":["D","B","A","B","A","C","C","C","B","A"],
            "geographeranswerkey":["D","A","A","A","D","A","D","D","A","D"],
            "marketinganswerkey":["A","B","C","C","B","A","A","D","D","D"],
            "socialworkanswerkey":["A","C","D","D","C","D","B","C","D","D"],
            "travelanswerkey":["D","D","B","B","A","D","B","A","C","B"],
            "scoretable":{"creative":0,"coding":0,"fashion":0,"medico":0,"robotics":0,"consultancy":0,"politics":0,"travel":0,
        "socialwork":0,"marketing":0,"geographer":0,"historian":0},
        "chance":{"creative":0,"coding":0,"fashion":0,"medico":0,"robotics":0,"consultancy":0,"politics":0,"travel":0,
        "socialwork":0,"marketing":0,"geographer":0,"historian":0}
            
    
        }
       
        
        
    
    db.collection('info').findOne(data).then(result => {
        if(result){
            console.log('user already exists')
            return res.redirect('signup.html');
        }else{
            db.collection('info').insertOne(data,function(err,collection){
                if(err) throw err ;
                console.log('record inserted successfully')
                return res.redirect('login.html')
            })

        }
    }).catch(err => console.error(err));
})

})
app.get('/log_in',function(req,res){
    res.redirect('login.html')
})
app.post('/logout',function(req,res){
    res.redirect('/')
})
var uname={value:0}
app.post('/log_in',function(req,res){
    var name = req.body.username;
    uname.value = req.body.username
    console.log(uname.value)
    var pass = req.body.password ;
    db.collection('info').findOne({"username":name,"password":pass},{projection:{"username":1,"password":1}}).then(
        result =>{
            if(result){
                console.log('logged in successfully')
                return res.redirect('homepage.html')
            }else{
                console.log('invalid credentials');
                return res.redirect('login.html');
            }
        }).catch(err => console.error(err));
})
app.post('/creative',function(req,res){
    res.render('creative')
})
app.post('/consultancy',function(req,res){
    res.render('consultancy')
})
app.post('/coding',function(req,res){
    res.render('coding')
})
app.post('/fashion',function(req,res){
    res.render('fashion')
})
app.post('/robotics',function(req,res){
    res.render('robotics')
})
app.post('/socialwork',function(req,res){
    res.render('socialwork')
})
app.post('/geographer',function(req,res){
    res.render('geographer')
})
app.post('/historian',function(req,res){
    res.render('historian')
})
app.post('/medico',function(req,res){
    res.render('medico')
})
app.post('/marketing',function(req,res){
    res.render('marketing')
})
app.post('/politics',function(req,res){
    res.render('politics')
})
app.post('/traveling',function(req,res){
    res.render('travel')
})
//test
app.post('/creative/test',function(req,res){
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        var x = result[0].chance
    
    if (x.creative == 0){
    async: true
    var data = {q1:"Professional writing differ from technical writing bcz:",o1:"type of content ",o2:"method of conculsion",o3:"staring point",o4:"tense used",
    q2:"what are the skills you will need to be a professional writter ?",o5:"Clearity",o6:"effectiveness",o7:'usefullness',o8:"All of the above",
    q3:"For what writters are needed in miltary ?",o9:"operational writing",o10:"contracts",o11:'data sheets',o12:"None of the above",
    q4:"Academic writing differ from other writing on the basis of ?",o13:"Style",o14:"Simplicity",o15:'focus',o16:"Seting of plot",
    q5:"The value  needed for making story more dramatic is ?",o17:"Suspence",o18:"over sharing",o19:'fictional character',o20:"None of the above",
    q6:"How you will write about death?",o21:"Treat it as power to attract attention",o22:" make it very emotional",o23:' just write it as a normal writing',o24:" try to ignore it ",
    q7:"Poetry should be ?",o25:"concise ",o26:"impactful",o27:'emotional',o28:"All of above ",
    q8:"How to create a good content?",o29:"By observation",o30:"By thinking exculsively",o31:'By reading other stuff',o32:"None of the above ",
    q9:"What is the important thing if you are writing imaginary verse?",o33:"Focus on reality and detailing",o34:"be more and more creative",o35:'Think extraordinary',o36:"Never try it",
    q10:"What is sonnet ?",o37:"A short story ",o38:"A short poem",o39:'An article',o40:"None of above",value:"creative"}
    res.render('test1',{data:data})
    var y = {"username":uname.value}
    x.creative = 1
    
    var z  = {$set:{"chance": x}}
    db.collection('info').updateOne(y,z,function(err,result){
        if (err) throw err ;

    })}
    else{
        res.render('chance')
    }
})
})

app.post('/creative/instruction',function(req,res){
    data = {data:'creative'}
    res.render('instruction',{data:data})
})
app.post('/travel/test',function(req,res){
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        var x = result[0].chance
    if (x.travel == 0){
    async: true
    var data = {q1:"What are the jobs which needs travelling?",o1:"Flight Attendant ",o2:"Cruise Ship Worker",o3:"Travel Agent",o4:"All of the above",
    q2:"Why is customer service important?",o5:"to provide high-quality service",o6:"To get feedbacks",o7:'give chance of finding the error in system',o8:"All of the above",
    q3:"what is share of travelling sector indian economy?",o9:"10%",o10:"9%",o11:'7%',o12:"25%",
    q4:"Which is the world strongest visa?",o13:"American",o14:"Japaneese",o15:'Indian',o16:"Australian",
    q5:"What is job of Au pair ?",o17:"childcare and assisting children with their homework ",o18:"Finding pairs between two locations",o19:'branding and market reach ',o20:"financing the travellers",
    q6:"What is a work of consultant in travelling sector?",o21:" To offer insight and advice to companies",o22:" To establish close relationships with clients ",o23:'  to fix complex problems in  business',o24:" All of the above ",
    q7:"Which country have travelling restrictions ?",o25:"USA ",o26:"Jordan",o27:'Sudan',o28:"North korea",
    q8:"How travelling is associated with health improvement?",o29:"By organization like  the Red Cross or USAID.",o30:"taxing emotionally and physically ",o31:'people working as Peace Corps Volunteer',o32:"Both A and C  ",
    q9:"Which is the most growing economical sector in india?",o33:"service sector",o34:"Agricultural sector",o35:'Travelling sector',o36:"manufacturing sector",
    q10:"What are reasons for  decline of travel agency industry ?",o37:"People are not interested in travelling ",o38:" people started going online to book their own flights and vacation",o39:'Travelling had became expensive for traveller',o40:"They were not able to grab enough attention",value:"travel"}
    res.render('test1',{data:data})
    var y = {"username":uname.value}
    x.travel = 1
    
    var z  = {$set:{"chance": x}}
    db.collection('info').updateOne(y,z,function(err,result){
        if (err) throw err ;

    })}
    else{
        res.render('chance')
    }
})
})
app.post('/travel/instruction',function(req,res){
    data = {data:'travel'}
    res.render('instruction',{data:data})
})
app.post('/coding/test',function(req,res){
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        var x = result[0].chance
    if (x.coding == 0){
    async: true
    var data = {q1:"What is a translator ?",o1:"it acts as an intermedairy between human language and machine ",o2:"it is a memory device",o3:"it is a output device",o4:"None  of the above",
    q2:"what is difference between coding and programming ?",o5:"It is  difference in terminology",o6:"They both works on different feild",o7:'One is suprior to other',o8:"None of the above",
    q3:"What is syntax?",o9:"programming language's surface form",o10:"Alphabets",o11:'symbols and character',o12:"None of the above",
    q4:"What are algorithm ?",o13:"Set of instructions",o14:"precautions for machine language",o15:'Code written in binary',o16:"All of the above",
    q5:"what are operators ?",o17:"Set of character",o18:"they are used in evalution or operation",o19:'Both A and B',o20:"None of the above",
    q6:"what is atom in programming  ?",o21:"number",o22:"0 and 1",o23:'symbol',o24:" Both A and C ",
    q7:"programming language  consists of ?",o25:"Set of instructions",o26:"binary 0 and 1",o27:'Any normal language ',o28:"All of above ",
    q8:"Where python is used?",o29:"Web Development",o30:"Software Development",o31:'System Administration',o32:"All of the above ",
    q9:"Java is -",o33:"Class based",o34:"object orientated",o35:'human language ',o36:"Both A and B",
    q10:"C++ has main component as ?",o37:"a direct mapping of hardware features provided primarily by the C subset ",o38:"zero-overhead abstractions based on those mappings",o39:'Both A and B',o40:"None of above",value:"coding"}
    res.render('test1',{data:data})
    var y = {"username":uname.value}
    x.coding = 1
    
    var z  = {$set:{"chance": x}}
    db.collection('info').updateOne(y,z,function(err,result){
        if (err) throw err ;

    })}
    else{
        res.render('chance')
    }
})
})
app.post('/coding/instruction',function(req,res){
    data = {data:'coding'}
    res.render('instruction',{data:data})
})
app.post('/fashion/test',function(req,res){
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        var x = result[0].chance
    
    if (x.fashion == 0){
    async: true
    var data = {q1:"which one are levels of fashion industry",o1:"mainstream clothing ",o2:" affordable luxury wear",o3:"discount clothing",o4:"All of the above",
    q2:"what is the work of pattern maker?",o5:"link between design and production",o6:"idea into a 3-dimensional shape",o7:'decide the starting material',o8:"Both A and B ",
    q3:"The person who works on clothing of celebrities are known as ?",o9:"wardrobe stylist",o10:"Retail Buyer",o11:'Fashion writers',o12:"Merchandisers",
    q4:"responsiblities in fashion industry includes :",o13:"managing stock levels",o14:"pitching ideas",o15:'producing reports and forecasts',o16:"All of the above",
    q5:"The things you needed for starting a career in fashion industry?",o17:"network",o18:"high valued degree",o19:'creativity with maths skills',o20:"Both A and C ",
    q6:"Why is it neccesary to go with trends?",o21:" it has power to attract attention",o22:"  it is very emotional",o23:'good chance for better investment',o24:"it is not always neccesary ",
    q7:"what is benifit of buying material in retail ?",o25:" easy to transport",o26:"impactful",o27:'money saving',o28:"quality of material ",
    q8:"what the most importent ascept for any fashion brand?",o29:"customer base",o30:"quality and service provided",o31:'Both A and B ',o32:"None of the above ",
    q9:"Key duty of garment technologist are ?",o33:"Risk assess products in terms of safety and analyse test reports.",o34:"Evaluate quality of materials and checking of the final product.",o35:'Experience in pattern cutting and grading is essential.',o36:"All of the above",
    q10:"What is the need of PR department in fashion industry?",o37:"it is a way of communication",o38:" build a brand image and reputation",o39:'Organize events',o40:"All of above",value:"fashion"}
    res.render('test1',{data:data})
    var y = {"username":uname.value}
    x.fashion = 1
    
    var z  = {$set:{"chance": x}}
    db.collection('info').updateOne(y,z,function(err,result){
        if (err) throw err ;

    })}
    else{
        res.render('chance')
    }
})
    
})
app.post('/fashion/instruction',function(req,res){
    data = {data:'fashion'}
    res.render('instruction',{data:data})
})
app.post('/marketing/test',function(req,res){
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        var x = result[0].chance
    
    if (x.marketing == 0){
    async: true
    var data = {q1:"SEO stands for -",o1:"Search engine optimization ",o2:"Search engine operation",o3:"Search engine organisation",o4:"Search engine occupation",
    q2:"In 4P's of marketing ,distribution is represented by -",o5:"Product",o6:"Placement",o7:'Promotion',o8:"Price",
    q3:"CSR stands for --",o9:"corporate strategical relationship",o10:"corporate strategical responsibility",o11:'corporate social responsibility',o12:"corporate social relationship",
    q4:"Which of the following is not a type of marketing ?",o13:"viral marketing",o14:"green marketing",o15:'strategy marketing',o16:"relationship marketing",
    q5:"marketing phenomenon that facilitates and encourages people to pass along a marketing message is ?",o17:"green marketing",o18:"viral marketing",o19:'Keyword Marketing',o20:"Guerilla Marketing",
    q6:"What Academic training in marketing does not teach?",o21:" market requirements",o22:" marketing tools",o23:'stock exchange',o24:"None of the above ",
    q7:"what marketing analyst do ?",o25:"Works on risk of the project ",o26:"works on new trends",o27:'Works with stock exchange',o28:"Works on finacial records of past  ",
    q8:"what is a role of social media manager ?",o29:"Key to social communication",o30:"Support the development of brand identity",o31:'Participate in visual design strategies',o32:"All of the above ",
    q9:"What are the PMs for product manager?",o33:"company fit",o34:"emotional intelligence (EQ)",o35:'core competencies',o36:"All of the above",
    q10:"What marketing professional knows:",o37:"What kind of market they work in ",o38:"Who and where their buyers are",o39:'How to create Preference for their products',o40:"All of the above",value:"marketing"}
    res.render('test1',{data:data})
    var y = {"username":uname.value}
    x.marketing = 1
    
    var z  = {$set:{"chance": x}}
    db.collection('info').updateOne(y,z,function(err,result){
        if (err) throw err ;

    })}
    else{
        res.render('chance')
    }
})
    
    
})
app.post('/marketing/instruction',function(req,res){
    data = {data:'marketing'}
    res.render('instruction',{data:data})
})
app.post('/medico/test',function(req,res){
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        var x = result[0].chance
    
    if (x.medico == 0){
    async: true
    var data = {q1:"Medicine is the practice of establishing:",o1:"Prevention ",o2:"treatment",o3:"progosis",o4:"All of the above",
    q2:"Prescientific form of medicines are ?",o5:"traditional medicines",o6:"tribal plants",o7:'folk medicines',o8:"Both A and C",
    q3:"When the doctor-patient relationship begins ?",o9:"When the patient enter the hospital",o10:"When he shares the medical history ",o11:'when doctor performs over him',o12:"None of the above",
    q4:"cardiovascular relates to  -",o13:"Lungs",o14:"Heart",o15:'Kidney',o16:"All of the above",
    q5:"which light is used in endoscopy ?",o17:"laser",o18:"UV light",o19:'IR light',o20:"None of the above",
    q6:"genetics is study of ?",o21:"cells",o22:" genes",o23:'tissues',o24:" All of above ",
    q7:"What is aerospace medicine ?",o25:"medicical problem related to flying ",o26:"medicical problem related to space travel",o27:'injuries in trvelling in Air ',o28:"All of above ",
    q8:"Which quality you needed the most to take medicine as profession?",o29:"Hardwork",o30:"Money making mind",o31:'serving with expectation',o32:"None of the above ",
    q9:"How medicine can help in crime investigation ?",o33:"Can't help",o34:"through feild called forensic",o35:'Can help in keeping cops fit ',o36:"None of the above",
    q10:"Dermatology is concerned with ?",o37:"Hair",o38:"skin",o39:"Both A and B ",o40:"None of above",value:"medico"}
    res.render('test1',{data:data})
    var y = {"username":uname.value}
    x.medico = 1
    
    var z  = {$set:{"chance": x}}
    db.collection('info').updateOne(y,z,function(err,result){
        if (err) throw err ;

    })}
    else{
        res.render('chance')
    }
})
    
})
app.post('/medico/instruction',function(req,res){
    data = {data:'medico'}
    res.render('instruction',{data:data})
})
app.post('/geographer/test',function(req,res){
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        var x = result[0].chance
    
    if (x.geographer == 0){
    async: true
    var data = {q1:"National Geographic Society identifies themes which are :",o1:"location ",o2:"human-environment interaction",o3:"movement",o4:"All of the above",
    q2:"Regional geography includes",o5:"atmosphere",o6:"Flora",o7:'Fauna',o8:"Outer space",
    q3:"geomorphology belongs to -",o9:"Physical geography",o10:"Human geography",o11:'Regional geography',o12:"hydrospheric geography ",
    q4:"Environmental consultant is ___",o13:"one who address a variety of environmental issues",o14:"government worker",o15:'Researcher',o16:"None of the above",
    q5:"Whats the importantance of town planner?",o17:" deal with the management and development of towns",o18:"satisfy the needs of businesses",o19:'find solutions to environmental issues',o20:"All of the above",
    q6:"A person who do paid or voluntary work for sustainable development is known as--",o21:"Conservation officer ",o22:"Geographical information systems officer",o23:'Politics or non-profit organizations',o24:"Cartographer ",
    q7:"what is landscape archaeology  ?",o25:"study of the ways in which people in the past constructed ",o26:"approach to the study of culture",o27:'relationships between material culture and human alteration',o28:"All of above ",
    q8:"Landscape generally refers to-",o29:" natural environments",o30:"environments constructed by human beings",o31:'Hydrosphere',o32:"All of the above ",
    q9:"Pollen analysis has allowed archaeologists to analyze?",o33:"vegetation",o34:"cultivation",o35:'fauna and flora',o36:"topography",
    q10:"Barbara Voss has done extensive archaeological work to reveal how ideas about ___ were mapped onto the landscape",o37:"gender ",o38:" sexuality",o39:'marriage',o40:"All of above",value:"geographer"}
    res.render('test1',{data:data})
    var y = {"username":uname.value}
    x.geographer = 1
    
    var z  = {$set:{"chance": x}}
    db.collection('info').updateOne(y,z,function(err,result){
        if (err) throw err ;

    })}
    else{
        res.render('chance')
    }
})
    
})
app.post('/geographer/instruction',function(req,res){
    data = {data:'geographer'}
    res.render('instruction',{data:data})
})
app.post('/historian/test',function(req,res){
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        var x = result[0].chance
    
    if (x.historian == 0){
    async: true
    var data = {q1:"The historian must :",o1:" treat sources with appropriate reservations ",o2:"must take the motives of historical actors into consideration",o3:"must clearly indicate any speculation;",o4:"All of the above",
    q2:"Modern historical analysis doesn't inculde ?",o5:"economics",o6:"psychology",o7:'anthropology',o8:"finance",
    q3:"Muslim historical writings first began to develop in-",o9:"8 century",o10:"7 century",o11:'12 century',o12:"15 century",
    q4:"The French Annales School radically changed the focus of historical research to ?",o13:"diplomatic themes",o14:" political ",o15:'social history',o16:"monarchy",
    q5:"What is not a subject of history  ?",o17:"Egyptology",o18:"current military campaigns",o19:'Byzantine folklore',o20:"quantization",
    q6:"what is work of museum curator?",o21:" managing the acquisition",o22:"preservation",o23:'display of museum artifacts',o24:" All of the above ",
    q7:"What is a historical method ?",o25:"a systematic approach to solving the problems of the past",o26:"analysis of present situation wrto past",o27:'statistical method of problem',o28:"none of above ",
    q8:"Which doesn't come under primary source?",o29:"historical record",o30:" medical instruments",o31:'monuments',o32:"technical maps ",
    q9:"  What is Phi Alpha Theta?",o33:"history honor society",o34:"archealogical association",o35:'pre-scientific association',o36:"None of the above",
    q10:"What is classic of history?",o37:"One of the Five Classics of Chinese classic texts ",o38:"official chronicle of the State of Lu ",o39:'example of  type of writing ',o40:"monumental lifelong achievement in literature",value:"historian"}
    res.render('test1',{data:data})
    var y = {"username":uname.value}
    x.historian = 1
    
    var z  = {$set:{"chance": x}}
    db.collection('info').updateOne(y,z,function(err,result){
        if (err) throw err ;

    })}
    else{
        res.render('chance')
    }
})
    
})
app.post('/historian/instruction',function(req,res){
    data = {data:'historian'}
    res.render('instruction',{data:data})
})
app.post('/politics/test',function(req,res){
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        var x = result[0].chance
    
    if (x.politics == 0){
    async: true
    var data = {q1:"Which of the following is not a level of politics ?",o1:"Macropolitics",o2:"Micropolitics",o3:"Mesopolitics",o4:"Neopolitics",
    q2:"Study of politics is called ?",o5:"Poliology",o6:"Politology",o7:'Poetology',o8:"Poletecology",
    q3:"_____ is the science of comparison and teaching of different types of constitutions ",o9:"Comparitive politics",o10:"Anathropology",o11:'sesimology',o12:"philosophy",
    q4:"Which of following is not a form of government ?",o13:"Anocracy",o14:"Neocracy",o15:'naocracy',o16:"plutocracy",
    q5:"_____ are either dictatorships or absolute monarchies ",o17:"Autocracis",o18:"Aristocracis",o19:'timocracy',o20:"theocracy",
    q6:"In terms of vertical integration, political systems can be divided in how many categories?",o21:"10",o22:"5",o23:'3',o24:" 6 ",
    q7:"_____ is a society that is not governed by a state",o25:"Statefed ",o26:"Statefull",o27:'Stateless',o28:"None of above ",
    q8:"Which of the following is not a form of political corruption?",o29:"Nationalism",o30:"Nepotism",o31:'Cronyism',o32:"None of the above ",
    q9:"Which of the following is not a form of political patronage?",o33:"Pork barreling",o34:"Cronyism",o35:'slush funds',o36:"clientism",
    q10:"A form of that is build on corruption is called ?",o37:"kleptocracy",o38:"theocracy ",o39:'Autocracy',o40:"Aristocracy",value:"politics"}
    res.render('test1',{data:data})
    var y = {"username":uname.value}
    x.politics = 1
    
    var z  = {$set:{"chance": x}}
    db.collection('info').updateOne(y,z,function(err,result){
        if (err) throw err ;

    })}
    else{
        res.render('chance')
    }
})
    
})
app.post('/politics/instruction',function(req,res){
    data = {data:'politics'}
    res.render('instruction',{data:data})
})
app.post('/socialwork/test',function(req,res){
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        var x = result[0].chance
    
    if (x.socialwork == 0){
    async: true
    var data = {q1:"Social work doesn't involves subjects like :",o1:"geology",o2:"psychology",o3:" public health",o4:" political science",
    q2:"which one is not the core function of social work ?",o5:"Engagement ",o6:"Implementation",o7:'involvement',o8:"Graduated Disengagement ",
    q3:"How imformation technology helps social work?",o9:"it makes process more transparent",o10:"it brings more standard",o11:'Helps to collect more data',o12:"Both A and C ",
    q4:"How trade unions represent social worker ?",o13:" provides professional advice",o14:" handles discipline or conduct matters ",o15:'bring goodwill of employers',o16:"All of the above",
    q5:"What Social research design doesn't encompasses?",o17:"theoretical",o18:"methodological",o19:'fictionality',o20:"ethical considerations",
    q6:"what are skills of social worker?",o21:"Planning",o22:" organizing",o23:' supervising',o24:"All of these ",
    q7:"What is not a leadership style?",o25:"Authoritarian",o26:"legistative",o27:'Participative',o28:"Delegative ",
    q8:"COS stand for -",o29:"Charity Organization System",o30:"Class orgin system",o31:' Charity Organization Society',o32:"None of the above ",
    q9:"What are the functions of the board?",o33:"reviewing operating information to understand the state of the Company",o34:"approving CSR strategies",o35:'considering management recommendations on proposed acquisitions',o36:"All of these",
    q10:"What are the values of social workers?",o37:"Service",o38:"Importance of human relationships",o39:'Integrity',o40:"All of above",value:"socialwork"}
    res.render('test1',{data:data})
    var y = {"username":uname.value}
    x.socialwork = 1
    
    var z  = {$set:{"chance": x}}
    db.collection('info').updateOne(y,z,function(err,result){
        if (err) throw err ;

    })}
    else{
        res.render('chance')
    }
})
    
})
app.post('/socialwork/instruction',function(req,res){
    data = {data:'socialwork'}
    res.render('instruction',{data:data})
})
app.post('/robotics/test',function(req,res){
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        var x = result[0].chance
    
    if (x.robotics == 0){
    async: true
    var data = {q1:"Robotics involves:",o1:"operation",o2:"design",o3:"construction",o4:"All of the above",
    q2:"what are assembly robots ?",o5:"which are made for assembly works",o6:"which are used in research",o7:'used as a part for other creations',o8:"None of the above ",
    q3:"what are power source for robots ?",o9:"solar",o10:"Heavy metal batteries",o11:'Compressed gas',o12:"All of the above",
    q4:"what is ZMP technique?",o13:"zero movement point",o14:"zero moment point",o15:'zero medium parallel',o16:"zonal medium plane",
    q5:" whatt comes under human- robot interaction?",o17:"Speech recognition",o18:"Robotic voice",o19:'Gestures',o20:"All of the above",
    q6:"How the vision is provided to the computer?",o21:"By visible light  sensors",o22:"By IR sensors",o23:' Pre-planned program',o24:" All of the above ",
    q7:" What are benifits of robots ?",o25:"substitution for people working in unhealthy or dangerous environments.",o26:" used in defence, security",o27:'useds in space as rovers',o28:"All of above ",
    q8:"what is quantum computing?",o29:"The areas on robots running on quantum computer",o30:"The areas on robots running on digital computer",o31:'Both A and B',o32:"None of the above ",
    q9:"how locomation is achieved in robots?",o33:"rolling is provided",o34:"robots can't achieve locomation",o35:'Sperical ball is provided',o36:"Both A and C",
    q10:"What is muscle wire ?",o37:" is a material which contracts (under 5%) when electricity is applied ",o38:" is a material which expands (under 5%) when electricity is applied",o39:'A copper wire',o40:"A wire of non conductive material",
    value:"robotics"}
    res.render('test1',{data:data})
    var y = {"username":uname.value}
    x.robotics = 1
    
    var z  = {$set:{"chance": x}}
    db.collection('info').updateOne(y,z,function(err,result){
        if (err) throw err ;

    })}
    else{
        res.render('chance')
    }
})
    
})
app.post('/robotics/instruction',function(req,res){
    data = {data:'robotics'}
    res.render('instruction',{data:data})
})
app.post('/consultancy/test',function(req,res){
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        var x = result[0].chance
    
    if (x.consultancy == 0){
    async: true
    var data = {q1:"According to MCA's UK consulting industry statistics report 2016 the UK consulting industry is worth :",o1:"12 bn",o2:"16 bn",o3:"122 bn",o4:"1 bn",
    q2:"which of the following is not consulting firm ?",o5:"deloitte",o6:"dccenture",o7:'infosys',o8:"Bain and company",
    q3:"Which one of the following is full form of SMED a management method developed by TOYOTA ?",o9:"Single minute exchange of document",o10:"Single minute exchange of data",o11:'Single minute exchange of die',o12:"Single minute exceution of die",
    q4:"The decade which witnessed origin of consulting industry in UK ?",o13:"1950s",o14:"1940s",o15:'1960s',o16:"1980s",
    q5:"The consulting industry growth rate in 2015 was around -",o17:"6%",o18:"10%",o19:'4%',o20:"8%",
    q6:"HBPs commanly used term in management consultancy stands for -",o21:"Hypothesis based problem structuring",o22:"Hypothesis based problem solving",o23:'Health based problem structuring',o24:"Hypothesis based price structuring",
    q7:"Which of the following is not a tier system of an IT-consulting industry ?",o25:"professional service ",o26:"indepentdent consultant",o27:'depentdent consultant',o28:"staffing ferms ",
    q8:"Which of the following skill is not required for an IT consultant?",o29:"Advisory skills ",o30 :" Business skills",o31:'Financial skills',o32:"Technical  skills ",
    q9:"What are key responsibility of legal consultant?",o33:"To communicate with the academic partners",o34:"To finalize and draft the written summaries",o35:'Both A and B ',o36:"None of the above",
    q10:"The correct order of problem solving is - ",o37:"Problem  formation -> structuring -> formulating ->presenting ",o38:"structuring -> formulating  -> analysing ->presenting",o39:' structuring -> formulating  -> analysing ->presenting',o40:"Presenting -> formulating -> analysing  ->structuring ",value:"consultancy"}
    res.render('test1',{data:data})
    var y = {"username":uname.value}
    x.consultancy = 1
    
    var z  = {$set:{"chance": x}}
    db.collection('info').updateOne(y,z,function(err,result){
        if (err) throw err ;

    })}
    else{
        res.render('chance')
    }
})
    
})
app.post('/consultancy/instruction',function(req,res){
    data = {data:'consultancy'}
    res.render('instruction',{data:data})
})




app.post('/back',function(req,res){
    res.redirect('homepage.html')
})
//result
 
app.post('/creative/result',function(req,res){
       
        sans=[req.body.q1,req.body.q2,req.body.q3,req.body.q4,req.body.q5,req.body.q6,req.body.q7,req.body.q8,req.body.q9,req.body.q10]
        var counter={value:0}
        var data = {data:0}
        
        db.collection('info').find({"username":uname.value}).toArray(function(err,result){
            var ans = result[0].creativeanswerkey
            var score = result[0].scoretable
            for (i=0;i<10;i++){
                if (ans[i]==sans[i]){
                    counter.value = counter.value +1
                    }
            }
            data.data=counter.value
            score.creative = counter.value
            
            var filter1 = {"username":uname.value}
            var change1  = {$set:{"scoretable":score}}
            db.collection('info').updateOne(filter1,change1,function(err,res){
                if(err) throw err;

            })
            
            res.render('result',{data:data})
        })
        
})

app.post('/travel/result',function(req,res){
       
    sans=[req.body.q1,req.body.q2,req.body.q3,req.body.q4,req.body.q5,req.body.q6,req.body.q7,req.body.q8,req.body.q9,req.body.q10]
    var counter={value:0}
    var data = {data:0}
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        var ans = result[0].travelanswerkey
        var score = result[0].scoretable
        for (i=0;i<10;i++){
            if (ans[i]==sans[i]){
                counter.value = counter.value +1
                }
        }
        data.data=counter.value
        score.travel = counter.value
        var filter6 = {"username":uname.value}
        var change6  = {$set:{"scoretable":score}}
        db.collection('info').updateOne(filter6,change6,function(err,res){
                if(err) throw err;

            })
        
        res.render('result',{data:data})
    })
})
app.post('/medico/result',function(req,res){
       
    sans=[req.body.q1,req.body.q2,req.body.q3,req.body.q4,req.body.q5,req.body.q6,req.body.q7,req.body.q8,req.body.q9,req.body.q10]
    var counter={value:0}
    var data = {data:0}
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        var ans = result[0].medicoanswerkey
        var score = result[0].scoretable
        for (i=0;i<10;i++){
            if (ans[i]==sans[i]){
                counter.value = counter.value +1
                }
        }
        data.data=counter.value
        score.medico = counter.value
        var filter5 = {"username":uname.value}
        var change5  = {$set:{"scoretable":score}}
        db.collection('info').updateOne(filter5,change5,function(err,res){
                if(err) throw err;

            })
        res.render('result',{data:data})
    })
})
app.post('/coding/result',function(req,res){
       
    sans=[req.body.q1,req.body.q2,req.body.q3,req.body.q4,req.body.q5,req.body.q6,req.body.q7,req.body.q8,req.body.q9,req.body.q10]
    var counter={value:0}
    var data = {data:0}
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        var ans = result[0].codinganswerkey
        var score = result[0].scoretable
        for (i=0;i<10;i++){
            if (ans[i]==sans[i]){
                counter.value = counter.value +1
                }
        }
        data.data=counter.value
        score.coding = counter.value
        var filter4 = {"username":uname.value}
        var change4  = {$set:{"scoretable":score}}
        db.collection('info').updateOne(filter4,change4,function(err,res){
                if(err) throw err;

            })
         res.render('result',{data:data})
    })
})
app.post('/robotics/result',function(req,res){
       
    sans=[req.body.q1,req.body.q2,req.body.q3,req.body.q4,req.body.q5,req.body.q6,req.body.q7,req.body.q8,req.body.q9,req.body.q10]
    var counter={value:0}
    var data = {data:0}
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        
        var ans = result[0].roboticsanswerkey
        var score = result[0].scoretable
        for (i=0;i<10;i++){
            if (ans[i]==sans[i]){
                counter.value = counter.value +1
                }
        }
        data.data=counter.value
        score.robotics = counter.value
        var filter3 = {"username":uname.value}
        var change3 = {$set:{"scoretable":score}}
        db.collection('info').updateOne(filter3,change3,function(err,res){
                if(err) throw err;

            })
        res.render('result',{data:data})
    })
})
app.post('/consultancy/result',function(req,res){
       
    sans=[req.body.q1,req.body.q2,req.body.q3,req.body.q4,req.body.q5,req.body.q6,req.body.q7,req.body.q8,req.body.q9,req.body.q10]
    var counter={value:0}
    var data = {data:0}
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        
        var ans = result[0].consultancyanswerkey
        var score = result[0].scoretable
        for (i=0;i<10;i++){
            if (ans[i]==sans[i]){
                counter.value = counter.value +1
                }
        }
        data.data=counter.value
        score.consultancy = counter.value
        var filter2 = {"username":uname.value}
        var change2  = {$set:{"scoretable":score}}
        db.collection('info').updateOne(filter2,change2,function(err,res){
                if(err) throw err;

            })
        res.render('result',{data:data})
    })
})
app.post('/socialwork/result',function(req,res){
       
    sans=[req.body.q1,req.body.q2,req.body.q3,req.body.q4,req.body.q5,req.body.q6,req.body.q7,req.body.q8,req.body.q9,req.body.q10]
    var counter={value:0}
    var data = {data:0}
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        
        var ans = result[0].socialworkanswerkey
        var score = result[0].scoretable
        for (i=0;i<10;i++){
            if (ans[i]==sans[i]){
                counter.value = counter.value +1
                }
        }
        data.data=counter.value
        score.socialwork = counter.value
        var filter7 = {"username":uname.value}
            var change7  = {$set:{"scoretable":score}}
            db.collection('info').updateOne(filter7,change7,function(err,res){
                if(err) throw err;

            })
        res.render('result',{data:data})
    })
})
app.post('/fashion/result',function(req,res){
       
    sans=[req.body.q1,req.body.q2,req.body.q3,req.body.q4,req.body.q5,req.body.q6,req.body.q7,req.body.q8,req.body.q9,req.body.q10]
    var counter={value:0}
    var data = {data:0}
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        
        var ans = result[0].fashionanswerkey
        var score = result[0].scoretable
        
        for (i=0;i<10;i++){
            if (ans[i]==sans[i]){
                counter.value = counter.value +1
                }
        }
        data.data=counter.value
        score.fashion = counter.value
        var filter8 = {"username":uname.value}
            var change8  = {$set:{"scoretable":score}}
            db.collection('info').updateOne(filter8,change8,function(err,res){
                if(err) throw err;

            })
        res.render('result',{data:data})
    })
})
app.post('/politics/result',function(req,res){
       
    sans=[req.body.q1,req.body.q2,req.body.q3,req.body.q4,req.body.q5,req.body.q6,req.body.q7,req.body.q8,req.body.q9,req.body.q10]
    var counter={value:0}
    var data = {data:0}
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        
        var ans = result[0].politicsanswerkey
        var score = result[0].scoretable
        
        for (i=0;i<10;i++){
            if (ans[i]==sans[i]){
                counter.value = counter.value +1
                }
        }
        data.data=counter.value
        score.politics = counter.value
        var filter9 = {"username":uname.value}
            var change9  = {$set:{"scoretable":score}}
            db.collection('info').updateOne(filter9,change9,function(err,res){
                if(err) throw err;

            })
        res.render('result',{data:data})
    })
})
app.post('/marketing/result',function(req,res){
       
    sans=[req.body.q1,req.body.q2,req.body.q3,req.body.q4,req.body.q5,req.body.q6,req.body.q7,req.body.q8,req.body.q9,req.body.q10]
    var counter={value:0}
    var data = {data:0}
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        
        var ans = result[0].marketinganswerkey
        var score = result[0].scoretable
        
        for (i=0;i<10;i++){
            if (ans[i]==sans[i]){
                counter.value = counter.value +1
                }
        }
        data.data=counter.value
        score.marketing = counter.value
        var filter10 = {"username":uname.value}
            var change10  = {$set:{"scoretable":score}}
            db.collection('info').updateOne(filter10,change10,function(err,res){
                if(err) throw err;

            })
        res.render('result',{data:data})
    })
})
app.post('/geographer/result',function(req,res){
       
    sans=[req.body.q1,req.body.q2,req.body.q3,req.body.q4,req.body.q5,req.body.q6,req.body.q7,req.body.q8,req.body.q9,req.body.q10]
    var counter={value:0}
    var data = {data:0}
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        
        var ans = result[0].geographeranswerkey
        var score = result[0].scoretable
        
        for (i=0;i<10;i++){
            if (ans[i]==sans[i]){
                counter.value = counter.value +1
                }
        }
        data.data=counter.value
        score.geographer = counter.value
        var filter11 = {"username":uname.value}
            var change11  = {$set:{"scoretable":score}}
            db.collection('info').updateOne(filter11,change11,function(err,res){
                if(err) throw err;

            })
        res.render('result',{data:data})
    })
})
app.post('/historian/result',function(req,res){
       
    sans=[req.body.q1,req.body.q2,req.body.q3,req.body.q4,req.body.q5,req.body.q6,req.body.q7,req.body.q8,req.body.q9,req.body.q10]
    var counter={value:0}
    var data = {data:0}
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        
        var ans = result[0].historiananswerkey
        var score = result[0].scoretable
        
        for (i=0;i<10;i++){
            if (ans[i]==sans[i]){
                counter.value = counter.value +1
                }
        }
        data.data=counter.value
        score.historian = counter.value
        var filter12 = {"username":uname.value}
            var change12  = {$set:{"scoretable":score}}
            db.collection('info').updateOne(filter12,change12,function(err,res){
                if(err) throw err;

            })
        res.render('result',{data:data})
    })
})
app.get('/testcancel',function(req,res){
    var data = {value:"practicing unfair means , against role of conduct"}
    res.render('timeresult',{data:data})
})



app.get('/timelost',function(req,res){
    var data = {value:"time limit exceeded"}
    res.render('timeresult',{data:data})
    
})


app.post('/finalresult',function(req,res){
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        if(err) throw err;
        var x = result[0].scoretable
        var y = result[0].scoretable
          // Create items array
          var items = Object.keys(y).map(function(key) {
            return [key, y[key]];
          });
          
          // Sort the array based on the second element
          items.sort(function(first, second) {
            return second[1] - first[1];
          });
          
          // Create a new array with only the first 5 items
          var z =items.slice(0, 3)
          var data = {value1:result[0].revname,value2:result[0].reviewdata,v1:x.creative,v2:x.coding,v3:x.consultancy,v4:x.socialwork,v5:x.fashion,v6:x.travel,
            v7:x.politics,v8:x.historian,v9:x.robotics,v10:x.medico,v11:x.marketing,v12:x.geographer,high:z[0][1],highval:z[0][1],sechigh:z[1][0],
        sechighval:z[1][1],thihigh:z[2][0],thihighval:z[2][1]}
        res.render("fresult",{data:data})
        
    })
})
app.post('/back2',function(req,res){
    res.redirect('homepage.html')
})
app.post('/fresult',function(req,res){
    res.render("fresult")
})
app.get('/fresult',function(req,res){
    db.collection('info').find({"username":uname.value}).toArray(function(err,result){
        if(err) throw err;
        
        var x = result[0].scoretable
        var y = result[0].scoretable
          // Create items array
          var items = Object.keys(y).map(function(key) {
            return [key, y[key]];
          });
          
          // Sort the array based on the second element
          items.sort(function(first, second) {
            return second[1] - first[1];
          });
          
          // Create a new array with only the first 5 items
          var z =items.slice(0, 3)
        
        
        var data = {value1:result[0].revname,value2:result[0].reviewdata,v1:x.creative,v2:x.coding,v3:x.consultancy,v4:x.socialwork,v5:x.fashion,v6:x.travel,
            v7:x.politics,v8:x.historian,v9:x.robotics,v10:x.medico,v11:x.marketing,v12:x.geographer,high:z[0][0],highval:z[0][1],sechigh:z[1][0],
            sechighval:z[1][1],thihigh:z[2][0],thihighval:z[2][1]}
        
        //var data = {value1:result[0].revname,value2:result[0].reviewdata}
        res.render("fresult",{data:data})
        
    })
    
})
app.get('/result',function(req,res){
    res.render('result' );
});

//review 

app.post('/review', function(req,res){
    var data =req.body.content
    
    
    
    db.collection('info').findOne({"username":uname.value}).then(
        result => {
            console.log(result)
            var reviewda = result.reviewdata
            var revnameda = result.revname
            reviewda.push(data)
            revnameda.push(uname.value)
            var newdata={$set:{"reviewdata":reviewda,"revname":revnameda}}
            db.collection('info').updateMany({},newdata,function(err,data){
                if (err) throw err;
                db.collection('info').find({}).toArray(function(err,result){
                    if(err) throw err;
                    console.log(result)
                    var data = {value1:result[0].revname,value2:result[0].reviewdata}
                    res.render("fresult",{data:data})
                    
                })
                
                
                
        
            })
        }
    )
   
    
})


 


app.listen(5000)
console.log("port is active on 5000")