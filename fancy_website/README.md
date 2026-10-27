# ilfc.github.io

Website of the ILFC Seminar (*Interactions entre Linguistiques Formelles et Computationnelles*), organised by RT LIFT2.

The site is built by GitHub Pages: every push to `main` republishes it after a minute or two. Nothing needs to be installed, and every edit can be made with a plain text editor or directly on GitHub (open the file, click the pencil icon, edit, then "Commit changes").

## Where things are

| To change…                                         | Edit                     |
| -------------------------------------------------- | ------------------------ |
| sessions: speakers, titles, abstracts, video links | `_data/talks.yml`        |
| slides                                             | add the PDF to `slides/` |
| mailing list link, organisers                      | `_config.yml`            |
| header, introduction and "About" text              | `index.html`             |
| how a session is displayed                         | `_includes/talk.html`    |
| colours and fonts                                  | `assets/style.css`       |

You never need to edit anything else for day-to-day updates. In particular, the split between "Upcoming sessions" and "Past sessions" is automatic: a session moves to "Past" on its own the day after it takes place. The order of the entries in `_data/talks.yml` does not matter either, since the page sorts them by date.

## Common tasks

All examples below are entries of `_data/talks.yml`. The top of that file also has a commented template to copy.

### Announcing a new session

Add an entry anywhere in the file (at the top is easiest). The title and abstract can stay empty: the page then shows "Title to be announced".

```yaml
- date: 2027-03-11
  time: 16:30-17:30 UTC+1
  speakers:
    - name: "Firstname Lastname"
      affiliation: "University"
  title:
  abstract:
```

- `date` is written `YYYY-MM-DD`.
- `time` is in Paris time: `UTC+1` in winter, `UTC+2` in summer (from the last Sunday of March to the last Sunday of October). Visitors in other time zones also see the time converted to theirs.
- For a session with two speakers, add a second `- name:` / `affiliation:` pair under `speakers:`.

### Adding the title and abstract

```yaml
  title: "Title of the talk"
  abstract: |
    First paragraph of the abstract.

    Second paragraph, after an empty line.
```

- Put the title between double quotes. A double quote inside the title must be written `\"`.
- After `abstract: |`, every line must be indented by 4 spaces. Markdown works in abstracts: `*italics*`, `**bold**`, `[link text](https://...)`.
- Optional references go in a list:

  ```yaml
    references:
      - "Author, Title, Venue, Year"
  ```

### After the session: video and slides

1. Upload the PDF to the `slides/` folder (on GitHub: open the folder, then "Add file → Upload files"). Name it `YYYY-MM-DD-lastname.pdf`, for instance `2026-11-12-blodgett.pdf`.
2. Add these two lines to the session's entry:

   ```yaml
     video: https://uqam.ca.panopto.com/Panopto/Pages/Viewer.aspx?id=...
     slides: slides/2026-11-12-blodgett.pdf
   ```

`slides:` can also be a full `https://` link if the slides are hosted elsewhere.

### A complete entry

```yaml
- date: 2026-04-02
  time: 16:30-17:30 UTC+2
  speakers:
    - name: "Adele Goldberg"
      affiliation: "Princeton University"
  title: "How humans and LLMs combine constructions"
  video: https://uqam.ca.panopto.com/Panopto/Pages/Viewer.aspx?id=9aa57331-1106-4bae-b270-b42600d747d0
  slides: slides/2026-04-02-goldberg.pdf
  abstract: |
    Constructions are learned pairings of form and function that vary in complexity, abstraction, and discourse function. ...
```

## If the site does not update

`_data/talks.yml` is a YAML file, and a formatting mistake stops the site from being rebuilt (the previous version stays online). On GitHub, the "Actions" tab of the repository shows the failed build and the line at fault. The usual causes:

- wrong indentation: use spaces, never tabs, and keep the alignment of the examples above;
- a title containing `:` or `#` that is not between double quotes;
- an unescaped `"` inside a title in double quotes (write `\"`).

## Previewing locally (optional)

With [Jekyll](https://jekyllrb.com/) installed, run `jekyll serve` in this folder and open http://localhost:4000.

## Missing slides

The slides of these sessions could not be recovered from the Web Archive when the site was moved here (only the first 5 MB of each file had been archived). They are marked `# slides: lost` in `_data/talks.yml`. If you get the PDF back from the speaker, upload it to `slides/` and replace that comment with a `slides:` line.

- 2025-05-14 Raffaella Bernardi
- 2025-06-11 Tom McCoy
- 2025-09-17 Timothee Mickus
- 2025-11-24 Ece Takmaz
- 2025-12-17 Ethan Wilcox
- 2026-01-22 Gemma Boleda
- 2026-02-12 Jaap Jumelet
