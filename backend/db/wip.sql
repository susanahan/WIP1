drop database if exists oauth_test;
create database oauth_test;

\connect oauth_test;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS google;
DROP TABLE IF EXISTS interests;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers_user;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS users (
    id              SERIAL PRIMARY KEY,
    username        VARCHAR(100) NOT NULL UNIQUE,
    password        TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS google (
    id             SERIAL PRIMARY KEY,
    user_id        INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    g_token        TEXT NOT NULL,
    g_id           VARCHAR(100) UNIQUE,
    g_email        VARCHAR(100),
    g_name         VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS categories (
    id              SERIAL PRIMARY KEY,
    name            TEXT NOT NULL
);

SELECT uuid_generate_v4();


CREATE TABLE IF NOT EXISTS products  (
    id              SERIAL PRIMARY KEY,
    product_name    TEXT NOT NULL,
    serial_code     uuid NOT NULL DEFAULT uuid_generate_v4(),
    msrp            MONEY,
    description     TEXT NOT NULL,
    steps           TEXT NOT NULL,
    materials       TEXT NOT NULL,
    img_url         TEXT NOT NULL,
    category_id     INTEGER REFERENCES categories(id)
);


CREATE TABLE IF NOT EXISTS interests (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(id),
    category_id     INTEGER REFERENCES categories(id)
);

CREATE TABLE questions (
    id                 SERIAL PRIMARY KEY,
    question_text      TEXT NOT NULL,
    answer_option1     TEXT NOT NULL,
    answer_option2     TEXT NOT NULL,
    answer_option3     TEXT NOT NULL,
    answer_option4     TEXT NOT NULL,
    answer_option5     TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS answers_user (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(id),
    answer_input    TEXT NOT NULL,
    question_id     INTEGER REFERENCES questions(id),
    category_id     INTEGER REFERENCES categories(id)
);

INSERT INTO categories (name)
  VALUES ('Art'), ('Tech'), ('Outdoor'), ('Home'), ('Makeup/Skincare');

INSERT INTO questions (question_text, answer_option1, answer_option2, answer_option3, answer_option4, answer_option5)
 VALUES ('Do you like projects that involve Art, Tech , Outdoor, Home, or Makeup/Skincare?', 
        'Art projects', 'Tech projects', 'Outdoor projects', 'Home projects', 'Makeup/skincare projects'),
        ('Would you rather draw a scenario, build a robot, go camping, craft something for your home, or use more eco friendly products?', 
        'Draw a scenario', 'Build a robot', 'Go camping or hiking', 'Craft something for your home', 'Use more eco friendly products'),
        ('What products do you use more frequently?', 
        'Art products', 'Tech products', 'Outdoor products', 'Home products', 'Makeup/skincare products'),
        ('Are you a ______?', 'Painter', 'Tech savvy', 'Hiker', 'Netflix binger', 'Beauty guru/blogger'),
        ('What activities do you partake on your free time?', 
        'Art activities', 'Tech activities', 'Outdoor activities', 'Home activities', 'Eco-friendly activities');

INSERT INTO products (product_name, msrp, description, steps, materials, img_url, category_id)
  VALUES ('Rosy Stationery', 
            15.00, 
            'Making cards with Rosy Stationery', 
            'Step 1: Cut off stem end with a sharp knife, and stand stem on a paper towel, cut-side down, for 5 minutes to dry. Step 2:Press cut side onto a large stamp pad, then onto cards, stationery, and more, blotting on paper towel between presses. Vary stamp shapes with other vegetables, such as romaine lettuce stems or even brussels sprouts cut in half.', 
            'Paper towel, Large stamp pad Cards, stationery',
            'https://assets.marthastewart.com/styles/wmax-520-highdpi/d25/la101871_0206_rose_cardht/la101871_0206_rose_cardht_vert.jpg?itok=XeBL8w10',
            1);

INSERT INTO products (product_name, msrp, description, steps, materials, img_url, category_id)
  VALUES ('VR goggles (cardboard box)', 
            10.00, 
            'Making VR googles with cardboard', 
            '*please have prepare to have these tools : Utility knife/razor Scissors Metal edged ruler A large, and solid cutting surface. Step 1: Glue Template to Cardboard and Cut Outside Outlines Only. Cut out and glue the template pieces onto cardboard, noting the "grain" (corrugation) to maximize strength. Hold off on cutting out any of the inside pieces, like the lens holes. Step 2: Fold Each Piece. Score (lightly gouge) the folding lines using a metal edged ruler and a dull pencil or coin, then, pressing the edge of the ruler into the scored line, fold the cardboard toward you unless instructed to fold a piece under (like on the button). Step 3: Test Fit and Adjust - your folds and cuts to make sure everything matches. It doesn''t need to be perfect to work well. From this point on, I''ll refer to the "lens face" (with 2 holes for the lenses and a cut out for your nose) and the "phone face" (the goggly looking side where your phone will be placed). ',
           'Printed template, Glue (both stick-style and Elmers), 2’x3′ sheet of corrugated cardboard, pair of 45mm focal length biconvex plastic lenses, either 25mm in diameter (GC 1.0) or 37mm (GC 2.0),velcro patches, copper foil tape, and a small piece of dense foam (roughly 0.25″ x 0.25″ x 1.0″)',
            'https://assets.marthastewart.com/styles/wmax-520-highdpi/d25/la101871_0206_rose_cardht/la101871_0206_rose_cardht_vert.jpg?itok=XeBL8w10',
            2);

INSERT INTO products (product_name, msrp, description, steps, materials, img_url, category_id)
  VALUES ('Rustic Outdoor Chandelier', 
            50.00, 
            'How to Make a Rustic Outdoor Chandelier',
            'Step 1: Making it - Bend a bunch of six or so branches to form a large hoop; fasten them together with heavy-gauge floral wire. Working clockwise around the hoop, continue adding more branches about every 2 feet, securing the cut ends to the base with floral wire. Step 2: Hanging it - To keep it horizontally balanced, attach three pieces of the rope, each about 4 feet long, at evenly-spaced points around the hoop, then gather them in the middle, around an S-hook. Wrap two strands of globe lights around the chandelier, securing them with cable ties. Plug the light strands into an extension cord attached to a tree branch or garden pergola.',
            '40 1⁄2-inch thick and 4 to 5 feet long Pliable branches, heavy gauge floral wire, globe lights, Nylon rope, S-hook, cable ties, and extension cord',
            'https://img.sunset02.com/sites/default/files/styles/1000x1000/public/image/2016/10/main/outdoor-branch-chandelier-0415.jpg',
            3);

INSERT INTO products (product_name, msrp, description, steps, materials, img_url, category_id)
  VALUES ('Butterfly Cloches', 
            50.00, 
            'Capture a Victorian cabinet-of-curiosities vibe—minus all the hunting and gathering—with faux butterflies.',
            'Step 1: Using a serrated knife, cut a one-inch thick circle piece of Styrofoam into a five-inch circle. Next, cut a nine-inch circle from black velvet. Pull the fabric over the Styrofoam until taut and affix underneath with straight pins. Step 2: Cut pieces of 22-gauge wire to various heights that fit within the dome. Place a dot of superglue on one wire end before sliding it into a butterfly''s body; hold in place until dry. Repeat for each butterfly. Step 3: Finally, insert the wires into the Styrofoam base, then top with the glass.',
            'Glass dome with base, Styrofoam, yard of black velvet, 22-gauge wire, superglue, 10-12 Artificial Butterflies various sizes',
            'https://hips.hearstapps.com/clv.h-cdn.co/assets/16/28/1468518465-clx110111-053.jpg',
            4);

INSERT INTO products (product_name, msrp, description, steps, materials, img_url, category_id)
  VALUES ('All Natural Homemade Eyeshadow', 
            10.00, 
            'Making 4 all natural eyeshadow--Pale Pink, Mauve, Light Brown, and Golden Brown',
            'Step 1: Start by placing 1/4 – 1/2 tsp of arrowroot powder in a small bowl. The more arrowroot powder you use the lighter and more subtle the color of your homemade eyeshadow will be. You can always add more, so start with less. Step 2: Add your spices/powders and mix thoroughly until you get the color you desire. (There are four color combinations to get you started below, but have fun and experiment.) For Pale Pink: mix 1/2 tsp. arrowroot powder, 1/2 tsp. dried beet powder, and 1/8 tsp. cocoa powder. For Mauve: mix 1/2 tsp. arrowroot powder, 3/4 tsp. Allspice, 3/4 tsp. dried beet powder, and 1/4 tsp. cocoa powder. For Light Brown: mix 1/2 tsp. Arrowroot, and 3/4 – 1 tsp. cocoa powder. For Golden Brown: mix 1/2 tsp. arrowroot powder, 3/4 tsp. Nutmeg, and 1/4 – 1/2 tsp. Turmeric. Step 3: Once you have a well-mixed color, add in 1/4 – 1/2 tsp. of shea butter. Use the back of a small spoon to “cream” the butter in with the powder against the side of the bowl until you have a soft, creamy powder. (It really will still look mostly like a powder.) The shea butter will help keep this homemade eyeshadow on your lids and provide a nice moisturizing kick.',
            'Bob''s Red Mill Arrowroot Powder, Unrefined raw Shea Butter, Cocoa Powder, Nutmeg, Dried Beet Powder, Turmeric, Allspice',
            'https://www.thankyourbody.com/wp-content/uploads/2013/11/four.jpg',
            5);
