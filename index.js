const express = require('express');
const app = express();
const PORT = 8080;
bodyParser = require('body-parser');
uuid = require('uuid');

// LOGGING
morgan = require('morgan');
let fs = require('fs');
let path = require('path');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));


// DOCUMENTATION
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            description: "This API allows a user to receive information on climate movies and directors so that he can learn more about movies he has watched or is interested in. Also he can create a profile, so he can save data about his favorite movies.",
            title: 'Express API for Movies and Users',
            version: '1.0.0',
        },
    },
    // Paths to files containing OpenAPI definitions
    apis: ['./*.js'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/documentation.html', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// BODY PARSER
app.use(bodyParser.json());


// DATA POOL
let users = [
    {
        "id": 1,
        "name": "Lisa",
        "favoriteMovies": ["Downsizing"]
    },
    {
        "id": 2,
        "name": "Alex",
        "favoriteMovies": ["Snowpiercer"]
    }
]

let movies = [
    {
        "Title": "Chasing Ice",
        "Description": "Chasing Ice is a 2012 documentary chronicling environmental photographer James Balog's quest to capture images, through the Extreme Ice Survey, a long-term photography project monitoring 24 of the world's glaciers through 43 time-lapse cameras, that will help tell the story of the changes in Earth's climate brought on by global warming.",
        "Genre": {
            "Name": "Documentary",
            "Description": "A documentary is a non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record."
        },
        "Director": {
            "Name": "Jeff Orlowski",
            "Bio": "Jeff Orlowski is an American filmmaker.He was born and raised in Staten Island, New York, USA. He studied anthropology at Stanford University and joined Extreme Ice Survey by James Balog in his senior year at Standford. He started as the team's videographer, and went to directing the documentary Chasing Ice. He received an Emmy Award for it. He is also known for directing 'Chasing Coral' and 'The Social Dilemma'.",
            "Birth": 1984.0,
            "Death": 0
        },
        "ImageURL": "https://i.picsum.photos/id/1000/200/300.jpg?hmac=fTFlkBSHCXIXMoNE-1_EshZ91TrzHgY8YhIzYDRwH2c",
        "Featured": false
    },
    {
        "Title": "This Changes Everything",
        "Description": "This documentary is based on Naomi Klein's international non-fiction bestseller This Changes Everything. This film surveys a number of environmental activists and communities around the world - from Montana's Powder River Basin to the Alberta Tar Sands, from the coast of South India to Beijing and beyond.",
        "Genre": {
            "Name": "Documentary",
            "Description": "A documentary is a non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record."
        },
        "Director": {
            "Name": "Avi Lewis",
            "Bio": "Avi Lewis is a Canadian documentary filmmaker, former host of the Al Jazeera English show Fault Lines and former host of the Canadian Broadcasting Corporation (CBC) current-affairs programs CounterSpin and On the Map.",
            "Birth": 1967.0,
            "Death": 0
        },
        "ImageURL": "https://i.picsum.photos/id/1015/200/300.jpg?hmac=Rx9zhHRx_cf574gBuoMH5d7HlhZitGMA81AgPmhJDSI",
        "Featured": false
    },
    {
        "Title": "Merchants Of Doubt",
        "Description": "Merchants of Doubt is a 2014 American documentary film directed by Robert Kenner and inspired by the 2010 book of the same name by Naomi Oreskes and Erik M. Conway. The film traces the use of public relations tactics that were originally developed by the tobacco industry to protect their business from research indicating health risks from smoking. The central concern of the film is the ongoing use of these tactics to forestall governmental action to regulate greenhouse gas emissions in response to the risk of global climate change.",
        "Genre": {
            "Name": "Documentary",
            "Description": "A documentary is a non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record."
        },
        "Director": {
            "Name": "Robert Kenner",
            "Bio": "Robert Kenner was born in New Rochelle, New York. He is an American film and television director, producer, and writer. Kenner is best known for directing the film Food, Inc. as well as the films, Command and Control, Merchants of Doubt, and When Strangers Click.",
            "Birth": 1950.0,
            "Death": 0
        },
        "ImageURL": "https://i.picsum.photos/id/310/200/300.jpg?hmac=Zuza6ZJ8P0eOEJ3TsGuBoFjarwaO7vlgyNr9UVx1low",
        "Featured": false
    },
    {
        "Title": "A Plastic Ocean",
        "Description": "A Plastic Ocean is a documentary that explores the fragile state of the world's oceans and uncovers alarming truths about the consequences of people's disposable lifestyle. It documents the global effects of plastic pollution and highlights workable technologies and innovative solutions that everyone - from governments to individuals - can do, to create a cleaner and greener ocean.",
        "Genre": {
            "Name": "Documentary",
            "Description": "A documentary is a non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record."
        },
        "Director": {
            "Name": "Craig Leeson",
            "Bio": "Craig Leeson was born in Tasmania, Australia. He is a journalist, filmmaker, television presenter and public speaker. He began his career as a newspaper journalist before moving to television as a news correspondent and anchor. ",
            "Birth": 0,
            "Death": 0
        },
        "ImageURL": "https://i.picsum.photos/id/295/200/300.jpg?hmac=b6Ets6Bu47pFHcU4UK7lI6xYkfy48orifVzWeHAe0zM",
        "Featured": false
    },
    {
        "Title": "Racing Extinction",
        "Description": "Racing Extinction exposes the trafficking in wildlife and other crimes against nature in a race to protect all life from mass extinction.",
        "Genre": {
            "Name": "Documentary",
            "Description": "A documentary is a non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record."
        },
        "Director": {
            "Name": "Louie Psihoyos",
            "Bio": "Louie Psihoyos was born in Dubuque, Iowa in 1957, as the son of a Greek immigrant who left the Peloponnesos region/Sparta, after World War II. Psihoyos took an interest in photography at the age of fourteen. He now is an American photographer and documentary film director known for his still photography and contributions to National Geographic. As a certified SCUBA diver, he has become increasingly concerned with bringing awareness to underwater life. This reflects in the documentaries he is directing. Among the documentaries he directed are also The Cove, The Game Changers and Mission: Joy.",
            "Birth": 1957.0,
            "Death": 0
        },
        "ImageURL": "https://i.picsum.photos/id/1028/200/300.jpg?hmac=Ka86H0yLDb-Ft8SNNKSVTSFylu-GfaEGBrS2AP01ZSM",
        "Featured": false
    },
    {
        "Title": "Don't Look Up",
        "Description": "Two low-level astronomers must go on a giant media tour to warn mankind of an approaching comet that will destroy planet Earth.",
        "Genre": {
            "Name": "Satire",
            "Description": "A satire is a play, film, or novel in which humour or exaggeration is used to criticize something."
        },
        "Director": {
            "Name": "Adam McKay",
            "Bio": "Adam McKay was born in Philadelphia, Pennsylvania in 1968. is an American screenwriter, director, comedian, and actor. McKay has a comedy partnership with Will Ferrell, with whom he co-wrote the films Anchorman, Talladega Nights, and The Other Guys. Ferrell and McKay also founded their comedy website Funny or Die through their production company Gary Sanchez Productions. He has been married to Shira Piven since 1999. They have two children.",
            "Birth": 1968.0,
            "Death": 0
        },
        "ImageURL": "https://i.picsum.photos/id/1032/200/300.jpg?hmac=QdMNx6kwGjGtQqK_jCFOZa06MImU1ePTGi3mpwLZmwo",
        "Featured": false
    },
    {
        "Title": "Snowpiercer",
        "Description": "After an attempt to stop global warming via climate engineering castastrophically backfires, creating a new ice age in 2014, the remnants of humanity have taken to a circumnavigational train, the Snowpiercer, run by reclusive transportation magnate Wilford. By 2031, the passengers on the train have become segregated by class, with the elite in the extravagant front cars while the poor are forced into squalid tail compartments by armed guards.",
        "Genre": {
            "Name": "Science-fiction",
            "Description": "Science fiction is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issues like the human condition."
        },
        "Director": {
            "Name": "Bong Joon-Ho",
            "Bio": "Bong Joon-ho is a South Korean filmmaker, born in Daegu. He is a writer and producer, known for Snowpiercer (2013), Okja (2017) and Parasite (2019).",
            "Birth": 1969.0,
            "Death": 0
        },
        "ImageURL": "https://i.picsum.photos/id/227/200/300.jpg?hmac=t3Ir7I6CJr-OrWOq4QVsRQTjpp03ce7vtDA3-NLdm-c",
        "Featured": false
    },
    {
        "Title": "The Day After Tomorrow",
        "Description": "The movie follows a series of events that usher in a new ice age across the globe. When scientists begin tracking a series of massive storms in the Northern Atlantic Ocean, the world shuts down. The movie follows the interactions between scientists, political leaders, and two teenagers who find themselves at the center of events.",
        "Genre": {
            "Name": "Science-fiction",
            "Description": "Science fiction is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issues like the human condition."
        },
        "Director": {
            "Name": "Roland Emmerich",
            "Bio": "Roland Emmerich is a German film director, screenwriter, and producer. He is widely known for his science fiction and disaster films and has been called a \"master of disaster\" within the industry. Most of his films are English-language Hollywood productions. He began his work in the film industry by directing the film The Noah's Ark Principle (1984) as part of his university thesis and also co-founded Centropolis Entertainment in 1985 with his sister. He is also known for directing films such as Universal Soldier (1992), Stargate (1994), Independence Day (1996), Godzilla (1998), The Patriot (2000), The Day After Tomorrow (2004), 2012 (2009), White House Down (2013), Independence Day: Resurgence (2016), Midway (2019), and most recently, Moonfall (2022).",
            "Birth": 1955.0,
            "Death": 0
        },
        "ImageURL": "https://i.picsum.photos/id/256/200/300.jpg?hmac=6-SQmUqIECHQ4QadM7mAYY3sHPH5r_8e2pCBs7V67Sc",
        "Featured": false
    },
    {
        "Title": "Downsizing",
        "Description": "It tells the story of Paul Safranek, who decides to undergo a recently-invented procedure to shrink his body so he can start a new life in an experimental community, which he ends up doing alone when his wife backs out at the last minute; his journey takes an unexpected turn after he befriends an impoverished activist.",
        "Genre": {
            "Name": "Science-fiction",
            "Description": "Science fiction is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issues like the human condition."
        },
        "Director": {
            "Name": "Alexander Payne",
            "Bio": "Alexander Payne is an American film director, screenwriter and producer. He is best known for the films Citizen Ruth (1996), Election (1999), About Schmidt (2002), Sideways (2004), The Descendants (2011), Nebraska (2013) and Downsizing (2017). He is noted for his dark humor and satirical depictions of contemporary American society.",
            "Birth": 1961.0,
            "Death": 0
        },
        "ImageURL": "https://i.picsum.photos/id/398/200/300.jpg?hmac=Hfi27DwRf-atKwN-O57cBXGhlUtMCe6rozr2rWH8xH8",
        "Featured": false
    },
    {
        "Title": "WALL-E",
        "Description": "WALL-E follows a solitary robot on a future, uninhabitable, deserted Earth in 2805, left to clean up garbage. However, he is visited by a probe sent by the starship Axiom, a robot called EVE, with whom he falls in love and pursues across the galaxy.",
        "Genre": {
            "Name": "Science-fiction",
            "Description": "Science fiction is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issues like the human condition."
        },
        "Director": {
            "Name": "Andrew Stanton",
            "Bio": "Andrew Ayers Stanton was born in Rockport, Massachusetts. He is an American animator, storyboard artist, film director, screenwriter, producer and voice actor based at Pixar. His film work includes co-writing and co-directing Pixar's A Bug's Life (1998), directing Finding Nemo (2003)[3] and the sequel Finding Dory (2016), WALL-E (2008), and the live-action film, Disney's John Carter (2012), and co-writing all four Toy Story films (1995–2019) and Monsters, Inc. (2001).",
            "Birth": 1965.0,
            "Death": 0
        },
        "ImageURL": "https://i.picsum.photos/id/1002/200/300.jpg?hmac=QAnT71VGihaxEf_iyet9i7yb3JvYTzeojsx-djd3Aos",
        "Featured": false
    }
]

// USER ENDPOINTS
// CREATE - Create and add new user
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create and add a new user.
 *     tags:
 *       - users
 *     responses:
 *       201:
 *         description: New user created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                   example: 0
 *                 name:
 *                   type: string
 *                   description: The new user's name.
 *                   example: Kim
 *                 favoriteMovies:
 *                   type: array
 *                   description: List of the user's favorite movies.
 *                   items:
 *                      type: string
 *                      description: Name of a favorite movie
 *                      example: Snowpiercer
 *       400:
 *         description: bad request, user has no name.
 */
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('users need names')
    }
});

// CREATE AND DELETE ROUTES - Add and delete favorite movie by user ID
app
    .route('/users/:id/:movieTitle')
    /**
     * @swagger
     * /users/{id}/{movieTitle}:
     *   post:
     *     summary: Add favorite movie by user ID.
     *     tags:
     *       - users
     *     responses:
     *       201:
     *         description: favorite movie created
     *         content:
     *           application/json:
     *             schema:
     *               type: string
     *               example: snowpiercer has been added to array of user 1.
     *       400:
     *         description: bad request, user does not exist.
     */
    .post((req, res) => {
        const id = Number(req.params.id);
        const {movieTitle} = req.params;
        let user = users.find(user => user.id === id)

        if (user) {
            user.favoriteMovies.push(movieTitle);
            res.status(201).send(`${movieTitle} has been added to array of user ${id}`);
        } else {
            res.status(400).send('no such user')
        }
    })
    /**
     * @swagger
     * /users/{id}/{movieTitle}:
     *   delete:
     *     summary: Remove favorite movie by user ID.
     *     tags:
     *       - users
     *     responses:
     *       200:
     *         description: favorite movie of selected user removed.
     *         content:
     *           application/json:
     *             schema:
     *               type: string
     *               example: Snowpiercer has been removed from array of user 1.
     *       400:
     *         description: bad request, there is no such user.
     */
    .delete((req, res) => {
        const id = Number(req.params.id);
        const {movieTitle} = req.params;
        let user = users.find(user => user.id === id);

        if (user) {
            user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
            res.status(200).send(`${movieTitle} has been removed from array of user ${id}`);
        } else {
            res.status(400).send('no such user')
        }
    });

// UPDATE AND DELETE ROUTES - Update and remove user by ID
app
    .route('/users/:id')
    /**
     * @swagger
     * /users/{id}:
     *   put:
     *     summary: Update username by user ID.
     *     tags:
     *       - users
     *     responses:
     *       200:
     *         description: username was updated
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                   description: The user ID.
     *                   example: 0
     *                 name:
     *                   type: string
     *                   description: The user's name.
     *                   example: Lisa
     *                 favoriteMovies:
     *                   type: array
     *                   description: List of the user's favorite movies.
     *                   items:
     *                       type: string
     *                       description: Name of a favorite movie
     *                       example: Snowpiercer
     *       400:
     *         description: user does not exist.
     */
    .put((req, res) => {
        const userId = Number(req.params.id);
        const updatedUser = req.body;

        let user = users.find(user => user.id === userId);
        if (user) {
            user.name = updatedUser.name;
            res.status(200).json(user);
        } else {
            res.status(400).send('no such user')
        }
    })
    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     summary: Delete a single user.
     *     tags:
     *       - users
     *     description: Delete a single user. Can be used to depopulate a user profile when prototyping or testing an API.
     *     responses:
     *       200:
     *         description: A single user.
     *         content:
     *           application/json:
     *             schema:
     *               type: string
     *               example: User 1 has been removed from array of users.
     *       400:
     *         description: bad request, there is no such user.
     */
    .delete((req, res) => {
        const {id} = req.params;
        let user = users.find(user => user.id = id);

        if (user) {
            users = users.filter(user => user.id !== id);
            res.status(200).send(`user ${id} has been removed from list of users`);
        } else {
            res.status(400).send('no such user')
        }
    });


// MOVIE ENDPOINTS
// READ - Get list of all movies
/**
 * @swagger
 *  /movies:
 *      get:
 *          summary: Read and display all movies.
 *          tags:
 *            - movies
 *          description: Retrieve a list of all movies from local variable
 *          responses:
 *              200:
 *                  description: lists all movies
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      Title:
 *                                          type: string
 *                                          description: The title of the movie.
 *                                          example: WALL-E
 *                                      Description:
 *                                          type: string
 *                                          description: The plot of the movie.
 *                                      Genre:
 *                                          type: object
 *                                          properties:
 *                                              Name:
 *                                                  type: string
 *                                                  description: The genre of the movie.
 *                                                  example: documentary.
 *                                              Description:
 *                                                  type: string
 *                                                  description: The definition of the genre.
 *                                      Director:
 *                                          type: object
 *                                          properties:
 *                                              Name:
 *                                                  type: string
 *                                                  description: The name of the director.
 *                                              Bio:
 *                                                  type: string
 *                                                  description: Biographic details about the director.
 *                                              Birth:
 *                                                  type: integer
 *                                                  description: The year of birth of the director.
 *                                              Death:
 *                                                  type: integer
 *                                                  description: The year of death of the director.
 *                                      ImageURL:
 *                                          type: string
 *                                          description: url of an image fitting the plot of the movie.
 *                                      Featured:
 *                                          type: boolean
 */
app.get('/movies', (req, res) => {
    res.status(200).json(movies)
});

// READ - Get movie by title
/**
 * @swagger
 *  /movies/{title}:
 *      get:
 *          summary: Read and display movie by title.
 *          tags:
 *            - movies
 *          description: Retrieve a single movie from local variable title.
 *          responses:
 *              200:
 *                  description: lists all movies
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      Title:
 *                                          type: string
 *                                          description: The title of the movie.
 *                                          example: WALL-E
 *                                      Description:
 *                                          type: string
 *                                          description: The plot of the movie.
 *                                      Genre:
 *                                          type: object
 *                                          properties:
 *                                              Name:
 *                                                  type: string
 *                                                  description: The genre of the movie.
 *                                                  example: documentary.
 *                                              Description:
 *                                                  type: string
 *                                                  description: The definition of the genre.
 *                                      Director:
 *                                          type: object
 *                                          properties:
 *                                              Name:
 *                                                  type: string
 *                                                  description: The name of the director.
 *                                              Bio:
 *                                                  type: string
 *                                                  description: Biographic details about the director.
 *                                              Birth:
 *                                                  type: integer
 *                                                  description: The year of birth of the director.
 *                                              Death:
 *                                                  type: integer
 *                                                  description: The year of death of the director.
 *                                      ImageURL:
 *                                          type: string
 *                                          description: url of an image fitting the plot of the movie.
 *                                      Featured:
 *                                          type: boolean
 *              400:
 *                description: bad request, movie was not found.
 */
app.get('/movies/:title', (req, res) => {
    const {title} = req.params;
    const movie = movies.find(movie => movie.Title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie')
    }
});

// READ - Get data about genre by genreName
/**
 * @swagger
 *  /movies/genre/{genreName}:
 *      get:
 *          summary: Read and display data about genre of movie by genreName.
 *          tags:
 *            - movies
 *          description: Retrieve information about the genre of a movie from local variable genreName.
 *          responses:
 *              200:
 *                  description: lists information about genre
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      Name:
 *                                          type: string
 *                                          description: The genre of the movie.
 *                                          example: documentary
 *                                      Description:
 *                                          type: string
 *                                          description: The definition of the genre.
 *              400:
 *                description: bad request, there is no such genre.
 */
app.get('/movies/genre/:genreName', (req, res) => {
    const {genreName} = req.params;
    const foundMovie = movies.find(movie => movie.Genre.Name.toLowerCase() === genreName.toLowerCase());

    if (foundMovie) {
        res.status(200).json(foundMovie.Genre);
    } else {
        res.status(400).send('no such genre')
    }
});

// READ - Get data about director by directorName
/**
 * @swagger
 *  /movies/director/{directorName}:
 *      get:
 *          summary: Read and display data about director by directorName.
 *          tags:
 *            - movies
 *          description: Retrieve a single director by local variable directorName
 *          responses:
 *              200:
 *                  description: information about director of movie.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      Name:
 *                                          type: string
 *                                          description: The name of the director.
 *                                      Bio:
 *                                          type: string
 *                                          description: Biographic details about the director.
 *                                      Birth:
 *                                          type: integer
 *                                          description: The year of birth of the director.
 *                                      Death:
 *                                          type: integer
 *                                          description: The year of death of the director.
 *              400:
 *                description: bad request, director was not found.
 */
app.get('/movies/director/:directorName', (req, res) => {
    const {directorName} = req.params;
    const foundMovie = movies.find(movie => movie.Director.Name.toLowerCase() === directorName.toLowerCase());

    if (foundMovie) {
        res.status(200).json(foundMovie.Director);
    } else {
        res.status(400).send('no such director')
    }
});


// LISTEN FOR REQUESTS
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}!`)
});


