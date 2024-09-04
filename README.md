# StudyThere

This is the backend for StudyThere, a tool for students to find available empty rooms. Built with FastAPI + SQLAlchemy.

## Get Started

To run in production, follow the tutorial under [WebArtistryBAID](https://github.com/WebArtistryBAID)/[*
*studythere-docker**](https://github.com/WebArtistryBAID/studythere-docker).

To run in development:

* Ensure that you have node.js and npm available.
* Follow the tutorial under
  [WebArtistryBAID](https://github.com/WebArtistryBAID)/[**studythere-backend**](https://github.com/WebArtistryBAID/studythere-backend) to run
  the backend development server.
* Copy `.env.example` to `.env`, and change `VITE_API_HOST` accordingly. Typically, you will change it
  to `http://localhost:8000`.
* Also change `VITE_HOST` according to where the frontend is hosted.
* Run `npm install`.
* Run `npm run dev`.

## Contribution

To contribute, simply open a pull request.

## License

```
    StudyThere is a tool for students to find empty rooms.
    Copyright (C) 2024  Team WebArtistry

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
