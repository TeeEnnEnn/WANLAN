from flask import Blueprint, render_template, send_file
# from flask import abort

from wan.main.util import Repository, python_game, java_game, stats_site, store_management, portfolio, \
    repositories

main = Blueprint("main", __name__)

strengths = ["Fast Learner", "Good Team Player", "Goal Oriented", "Self Motivated"]

programming_languages = [
    ["Python", 3],
    ["Java", 3],
    ["HTML+CSS", 2],
    ["JavaScript", 1]
]

ALLOWED_EXTENSIONS = {"pdf"}


def allowed_file(filename: str):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@main.route("/", methods=["GET", "POST"])
def home():
    return render_template("home.html", projects=repositories, strengths=strengths, languages=programming_languages)


def create_project_route(repository: Repository, template_name):
    @main.route(repository.name, methods=["GET", "POST"], endpoint=f"{repository.name}_endpoint")
    def project_function():
        return render_template(
            template_name,
            project_name=repository.name,
            motivation=repository.motivation,
            about=repository.about,
            skills=repository.skills,
            languages=repository.languages
        )

    return project_function


@main.route("/download_resume", )
def download_resume():
    file_path = "static/theophilus-nenhanga-resume.pdf"
    # if not allowed_file(file_path):
    # abort(403)
    return send_file(file_path, as_attachment=True)


# Create routes for individual projects
python_game_route = create_project_route(python_game, "python_game.html")

java_game_route = create_project_route(java_game, "java_game.html")

stats_route = create_project_route(stats_site, "stats.html")

portfolio_route = create_project_route(portfolio, "portfolio.html")

store_management_route = create_project_route(store_management, "store_management.html")

# Register routes
main.add_url_rule("/projects/python-game", view_func=python_game_route, endpoint="python_game_endpoint")
main.add_url_rule("/projects/java-game", view_func=java_game_route, endpoint="java_game_endpoint")
main.add_url_rule("/projects/stats", view_func=stats_route, endpoint="stats_endpoint")
main.add_url_rule("/projects/portfolio", view_func=portfolio_route, endpoint="portfolio_endpoint")
main.add_url_rule("/projects/store-management", view_func=store_management_route, endpoint="store_management_endpoint")
