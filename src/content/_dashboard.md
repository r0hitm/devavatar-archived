## Drafts

```dataview
TABLE title, tags FROM "blog" WHERE draft = true
```

## Published

```dataview
TABLE title, tags, pubDatetime, modDatetime FROM "blog" WHERE draft != true SORT pubDatetime DESC
```
