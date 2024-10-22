## Installation

1.Clone the project

    git@github.com:Moyhe/quizzes.git

2.Run

    composer install

3.then go to react folder and run

    npm install

3.Copy .env.example into .env and use your database credentials

    cp .env.example .env

4.Set encryption key

    php artisan key:generate --ansi

5.Run migrations

    php artisan migrate

6.Start the project

    php artisan serve

7.go to react folder and run

    npm run dev
