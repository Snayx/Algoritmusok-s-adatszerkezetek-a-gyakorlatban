# Find Median

A program egy tömb mediánját adja vissza. A feladat garantálja, hogy a tömb hossza mindig páratlan, szóval egyértelmű a középső elem.

## Hogyan működik

```python
arr.sort()
```

Először rendezem a tömböt, mert a medián definíció szerint a rendezett sorozat középső eleme.

```python
median_index = n // 2
return arr[median_index]
```

Páratlan hosszú tömbnél a középső elem indexe `n // 2`. Pl. 5 elemnél ez 2, ami pont a harmadik elem (0-tól indexelve), előtte-utána 2-2 elem van.

## Input/Output

A HackerRank boilerplate-je kezeli a fájlműveleteket, én csak a `findMedian` függvényt írtam meg.
