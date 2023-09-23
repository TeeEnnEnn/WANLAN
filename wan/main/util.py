class Repository:
    """
    Using this class because I can't figure out how to use the gitHub api
    """

    def __init__(self, name, motivation, about, languages, skills, date, link, learn_more):
        self.name = name
        self.motivation = motivation
        self.about = about
        self.languages = languages
        self.skills = skills
        self.date = date
        self.link = link
        self.learn_more = learn_more


python_game = Repository(
    "Python Text Based Adventure Game",
    "I worked on this project to expand my knowledge of python. I had also just played Zork and was inspired to try "
    "and make a text based experience.",
    "This is a text based adventure game made with python using object oriented principles.",
    ["Python"],
    ["Object Oriented Programming", "Small Scale Project Management"],
    "December 2020",
    "https://github.com/TeeEnnEnn/Text-Based-Adventure-Game",
    "/projects/python-game"
)

java_game = Repository(
    "Java Text Based Adventure Game",
    "After having learnt Java I decided to work on this project as a way to reinforce my java skills.",
    "This is a text based adventure game made with Java using object oriented principles.",
    ["Java"],
    ["Translation (Python -> Java)", "Small Scale Project Management"],
    "October 2022",
    "https://github.com/TeeEnnEnn/Java-Text-Based-Game",
    "/projects/java-game"
)

stats_site = Repository("Statistics Website",
                        "I wanted to make a website that could make use some of the knowledge of statistics that i "
                        "had recently acquired.",
                        "A website that calculates simple descriptive statistics and probabilities.",
                        ["Python", "HTML", "CSS", "JavaScript"],
                        ["Use of Numpy", "Use of Scipy", "Web Design"],
                        "June 2023",
                        "https://github.com/TeeEnnEnn/StatisticsWebsiteClone",
                        "/projects/stats"
                        )

portfolio = Repository("wan Website",
                       "I wanted to create a website to display what i have worked on and what i am capable of.",
                       "A simple portfolio website built with flask",
                       ["Python", "HTML", "CSS", "JavaScript"],
                       ["Web Design"],
                       "July 2023",
                       "https://github.com/TeeEnnEnn/PortfolioWebsite",
                       "/projects/portfolio"
                       )

store_management = Repository("Store Management System",
                              "I wanted to learn how to manage databases and thought that this project would be a "
                              "perfect fit",
                              "This is a store management system. The store has different employees and tasks that "
                              "are all managed by the system using databases",
                              ["Java"],
                              ["SQL Querying"],
                              "August 2023",
                              "https://github.com/TeeEnnEnn/MCD-SCHEDULING",
                              "/projects/store-management"
                              )

repositories = (python_game, java_game, stats_site, portfolio, store_management)
