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
TABLE title, tags FROM "blog" WHERE draft = true
```

## Published

```dataview
TABLE title, tags, pubDatetime, modDatetime FROM "blog" WHERE draft != true SORT pubDatetime DESC
```
