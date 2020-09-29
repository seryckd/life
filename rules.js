/*jshint browser: true, esversion: 6*/
export const Rules = [
   {
      "id": 0,
      "name" : "2x2",
      "author": "unknown",
      "survive": "125",
      "born": "36",
      "description": [
            "Similar in character to Conway's Life, but creates completely different patterns.",
            "Many different oscillators occur at random, and a rare glider. Simple block seeds usually lead to oscillators of various periods.",
            "This rule is also a 2x2 block universe. This means that patterns consisting entirely of 2x2 blocks, all aligned, will continue to consist of 2x2 blocks."
         ]
   },
   {
      "id": 1,
      "name": "34 Life",
      "author": "unknown",
      "survive": "34",
      "born": "34",
      "description": [
         "One of the first explored alternatives to Conway's Life, back in the early 1970's.",
         "Computing power was so low back then, it was months before anyone noticed that this is an exploding universe.",
         "What makes this universe interesting is the variety of small oscillators and the period-3 orthogonal spaceship."
      ]
   },
   {
      "id": 2,
      "name": "Amoeba",
      "author": "unknown",
      "survive": "1358",
      "born": "357",
      "description": [
         "An 'amoeba' universe - forms large random areas that resemble amoebas.",
         "Internal to a random area is chaos. The edge vacillates wildly, and patterns tend to grow more than shrink.",
         "The more they grow, the more certain their survival. This is a fairly well-balanced rule."
      ]
   },
   {
      "id": 3,
      "name": "Assimilation",
      "author": "unknown",
      "survive": "4567",
      "born": "345",
      "description":[
         "Rule similar to Diamoeba, but much more stable.",
         "The diamond-shaped patterns are filled in 70-85% and never die."
      ]
   },
   {
      "id": 4,
      "name": "Coagulations",
      "author": "unknown",
      "survive": "235678",
      "born": "378",
      "description": [
         "Creates gooey coagulations as it expands forever. Best viewed at zoom=1.",
         "Notice that this is a close variation of the previous rule, 235678/3678, except that there is one less condition for a dead cell to come to life on the next generation.",
         "In general this should make a universe less active, but this is an exception."
      ]
   },
   {
      "id": 5,
      "name": "Conway's Life",
      "author": "John Conway",
      "survive": "23",
      "born": "3",
      "description": [
         "This is the most famous cellular automata ever invented. People have been discovering patterns for this rule since around 1970. Large collections are available on the Internet.",
         "The rule definition is very simple: a living cell remains alive only when surrounded by 2 or 3 living neighbors, otherwise it dies of loneliness or overcrowding. A dead cell comes to life when it has exactly 3 living neighbors."
      ]
   },
   {
      "id": 6,
      "name": "Coral",
      "author": "unknown",
      "survive": "45678",
      "born": "3",
      "description": ["This rule produces patterns with a surprisingly slow rate of expansion and an interesting coral-like texture."]
   },
   {
      "id": 7,
      "name": "Day & Night",
      "author": "Nathan Thompson",
      "survive": "34678",
      "born": "3678",
      "description": [
         "So named because dead cells in fields of live cells act by the same rules as live cells in fields of dead cells.",
         "There are obviously other rules, which have this symmetrical property, but this rule was chosen because it has some interesting high period spaceships and oscillators.",
         "The properties of the rule were explored by David Bell."
      ]
   },
   {
      "id": 8,
      "name": "Diamoeba",
      "author": "Dean Hickerson",
      "survive": "5678",
      "born": "35678",
      "description": [
         "Creates solid diamond-shaped 'amoeba' patterns that are surprisingly unpredictable.",
         "For a long time it was not known whether any diamonds expand forever, or if the tendency toward the catastrophic destruction of corners is too strong.",
         "Finally in March 1999 David Eppstein found the c/7 spaceship, and David Bell made a 100% spacefiller out of it."
      ]
   },
   {
      "id": 9,
      "name": "Flakes",
      "author": "Janko Gravner",
      "survive": "012345678",
      "born": "3",
      "description": [
         "Also known as Life without Death (LwoD).",
         "The rule produces beautiful flakes, starting from simple groups of cells.",
         "Try for example various filled circles with radius > 20 cells.",
         "The rule produces also ladders, what allowed David Griffeath and Cris Moore to prove that the rule is P-complete."
      ]
   },
   {
      "id": 10,
      "name": "Gnarl",
      "author": "Kellie Evans",
      "survive": "1",
      "born": "1",
      "description": ["To see its beauty start with simple patterns, for example with a single dot."]
   },
   {
      "id": 11,
      "name": "High Life",
      "author": "Nathan Thompson",
      "survive": "23",
      "born": "36",
      "description": [
         "This rule is very similar to Conway's Life, but it has a surprise replicator pattern.",
         "There is no known replicator in Conway's Life."
      ]
   },
   {
      "id": 12,
      "name": "Inverse Life",
      "author": "Jason Rampe",
      "survive": "34678",
      "born": "0123478",
      "description": [
         "The rule shows similar oscillators and gliders to GOL, but dead cells create the patterns amongst live cells in the background."
      ]
   },
   {
      "id": 13,
      "name": "Long Life",
      "author": "Andrew Trevorrow",
      "survive": "5",
      "born": "345",
      "description": [
         "This rule is called 'Long life' because of the extremely high period patterns that can be produced in this universe."
      ]
   },
   {
      "id": 14,
      "name": "Maze",
      "author": "unknown",
      "survive": "12345",
      "born": "3",
      "description": [
         "An 'a-maze-ing' universe - crystallizes into maze-like patterns.",
         "Interesting variations: try removing 5 from the 'Survival' list.",
         "To produce mice running in the maze, add 7 to the 'Births' list."
      ]
   },
   {
      "id": 15,
      "name": "Mazecrtic",
      "author": "Charles A. Rockafellor",
      "survive": "1234",
      "born": "3",
      "description": [
         "'Mazectric' and 'Corrosion of Conformity'. An interesting variation of the Maze rule which produces longer halls and a highly linear format.",
         "Adding B7 to maze (keeping S5) allows some 'mice' to run back and forth in the halls.",
         "Switching the B3 to B45 though, electrifies the mazes.",
         "Dropping S3 gives 'Corrosion of Conformity', a slow burn from almost any starting pattern, resulting in a rusting away of the local continuum."
      ]
   },
   {
      "id": 16,
      "name": "Move",
      "author": "unknown",
      "survive": "245",
      "born": "368",
      "description": ["A very calm universe, which nonetheless has a very commonly occurring slow spaceship and a slow puffer."]
   },
   {
      "id": 17,
      "name": "Pseudo Life",
      "author": "unknown",
      "survive": "238",
      "born": "357",
      "description": ["In this close variation of Conway's Life, the chaos is remarkably similar, but almost none of the engineered patterns work."]
   },
   {
      "id": 18,
      "name": "Replicator",
      "author": "unknown",
      "survive": "1357",
      "born": "1357",
      "description": ["In this remarkable universe every pattern is a replicator. After 32 steps every starting pattern is replicated 8 times."]
   },
   {
      "id": 19,
      "name": "Seeds (2)",
      "author": "Brian Silverman",
      "survive": "",
      "born": "2",
      "description": [
         "Every living cell dies every generation, but most patterns explode anyway.",
         "It's a challenge to build new patterns that don't explode. Arguably the simplest challenging rule."
      ]
   },
   {
      "id": 20,
      "name": "Serviettes",
      "author": "unknown",
      "survive": "",
      "born": "234",
      "description": [
         "Like /2, every living cell dies every generation.",
         "This rule is picked for the exceptional fabric-like beauty of the patterns that it produces."
      ]
   },
   {
      "id": 21,
      "name": "Stains",
      "author": "unknown",
      "survive": "235678",
      "born": "3678",
      "description": ["Most close variations of these rules expand forever, but this one curiously does not. Why? "]
   },
   {
      "id": 22,
      "name": "Walled Cities",
      "author": "David Macfarlane",
      "survive": "2345",
      "born": "45678",
      "description": [
         "The rule creates walled cities of activity.",
         "Once the field has stabilized, one can draw lines to connect the cities and the patterns expand to create an even larger city.",
         "But once the wall is complete, the city never grows, even though there is near-random activity inside it."
      ]
   }
];
