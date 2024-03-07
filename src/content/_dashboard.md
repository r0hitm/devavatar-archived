> [!caution] Not auto-git syncing
> DO a manual git commit after making changes!
>
> ```sh
> cd d:\paths\devavatar\
> # git add .
> # git commit -m "new post"
> ```

## Drafts

```dataview
TABLE
  title AS "Title",
  tags AS "Tags"
FROM "blog"
WHERE
  draft = true
SORT file.mtime DESC
```

## Scheduled

```dataview
TABLE
  title AS "Title",
  pubDatetime AS "Date",
  tags AS "Tags"
FROM "blog"
WHERE
  date(pubDatetime) >= date(today)
  AND
  draft != true
SORT pubDatetime ASC
```

## Published

```dataview
TABLE
  title AS "Title",
  tags AS "Tags",
  pubDatetime AS "Published",
  modDatetime AS "Modified"
FROM "blog"
WHERE
  draft != true
  AND
  date(pubDatetime) <= date(today)
SORT pubDatetime DESC
```
